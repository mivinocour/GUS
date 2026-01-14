from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, func
from typing import List, Optional

from schemas.database import get_db
from schemas.models import (
    Restaurant as RestaurantModel,
    Table as TableModel,
    Order as OrderModel,
    OrderItem as OrderItemModel,
    MenuItem as MenuItemModel
)
from schemas import Order, OrderCreate, OrderItemCreate, OrderSummary, SuccessResponse, OrderItem, PaymentCalculation

router = APIRouter()


async def get_restaurant_and_table(
    restaurant_slug: str,
    table_number: int,
    db: AsyncSession
):
    """Helper to get restaurant and table by slug"""
    # Get restaurant by slug
    restaurant_result = await db.execute(
        select(RestaurantModel).where(RestaurantModel.slug == restaurant_slug)
    )
    restaurant = restaurant_result.scalar_one_or_none()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    # Get table
    table_result = await db.execute(
        select(TableModel).where(
            and_(
                TableModel.restaurant_id == restaurant.id,
                TableModel.table_number == table_number
            )
        )
    )
    table = table_result.scalar_one_or_none()
    if not table:
        raise HTTPException(
            status_code=404,
            detail=f"Table {table_number} not found"
        )

    return restaurant, table


@router.get(
    "/api/restaurants/{restaurant_slug}/tables/{table_number}/orders",
    response_model=Optional[Order],
    tags=["orders"]
)
async def get_table_order(
    restaurant_slug: str,
    table_number: int,
    db: AsyncSession = Depends(get_db)
):
    """Get the active (unpaid) order for a table"""

    _, table = await get_restaurant_and_table(restaurant_slug, table_number, db)

    # Get the most recent ACTIVE order for this table
    order_result = await db.execute(
        select(OrderModel)
        .where(OrderModel.table_id == table.id)
        .where(OrderModel.status == "active")
        .order_by(OrderModel.created_at.desc())
        .limit(1)
    )
    order = order_result.scalar_one_or_none()

    if not order:
        return None

    # Get order items
    items_result = await db.execute(
        select(OrderItemModel)
        .where(OrderItemModel.order_id == order.id)
        .order_by(OrderItemModel.created_at)
    )
    order_items = items_result.scalars().all()

    # Build the response manually
    return Order(
        id=order.id,
        restaurant_id=order.restaurant_id,
        table_id=order.table_id,
        order_number=order.order_number,
        total_amount=order.total_amount,
        status=order.status,
        notes=order.notes,
        created_at=order.created_at,
        updated_at=order.updated_at,
        items=[
            OrderItem(
                id=item.id,
                menu_item_id=item.menu_item_id,
                quantity=item.quantity,
                unit_price=item.unit_price,
                total_price=item.total_price,
                notes=item.notes,
                ordered_by=item.ordered_by,
                status=item.status,
                created_at=item.created_at
            ) for item in order_items
        ]
    )


@router.post(
    "/api/restaurants/{restaurant_slug}/tables/{table_number}/orders",
    response_model=Order,
    tags=["orders"]
)
async def create_order(
    restaurant_slug: str,
    table_number: int,
    order_data: OrderCreate,
    db: AsyncSession = Depends(get_db)
):
    """Create new order or add items to existing active order"""

    restaurant, table = await get_restaurant_and_table(restaurant_slug, table_number, db)

    # Check if there's an active (unpaid) order for this table
    existing_order_result = await db.execute(
        select(OrderModel)
        .where(OrderModel.table_id == table.id)
        .where(OrderModel.status == "active")  # Only get unpaid orders
        .order_by(OrderModel.created_at.desc())
        .limit(1)
    )
    existing_order = existing_order_result.scalar_one_or_none()

    if existing_order:
        # Add items to existing active order
        order = existing_order
    else:
        # Create new order
        # Generate order number (incremented for each new order in the restaurant)
        order_number_result = await db.execute(
            select(func.coalesce(func.max(OrderModel.order_number), 0) + 1)
            .where(OrderModel.restaurant_id == restaurant.id)
        )
        order_number = order_number_result.scalar()

        order = OrderModel(
            restaurant_id=restaurant.id,
            table_id=table.id,
            order_number=order_number,
            status="active",  # New orders start as active
            notes=order_data.notes
        )
        db.add(order)
        await db.flush()  # Get the order ID

    # Add items to order
    total_amount = 0
    new_items = []

    for item_data in order_data.items:
        # Get menu item to validate and get current price
        menu_item_result = await db.execute(
            select(MenuItemModel)
            .where(MenuItemModel.id == item_data.menu_item_id)
            .where(MenuItemModel.restaurant_id == restaurant.id)
            .where(MenuItemModel.is_available == True)
        )
        menu_item = menu_item_result.scalar_one_or_none()

        if not menu_item:
            raise HTTPException(
                status_code=400,
                detail=f"Menu item {item_data.menu_item_id} not available"
            )

        # Create order item
        unit_price = menu_item.price
        total_price = unit_price * item_data.quantity

        order_item = OrderItemModel(
            order_id=order.id,
            menu_item_id=item_data.menu_item_id,
            quantity=item_data.quantity,
            unit_price=unit_price,
            total_price=total_price,
            notes=item_data.notes,
            ordered_by=item_data.ordered_by,
            status="confirmed"
        )

        db.add(order_item)
        new_items.append(order_item)
        total_amount += total_price

    # Update order subtotal (store subtotal only, calculate taxes dynamically)
    if existing_order:
        order.total_amount += total_amount  # Add new items subtotal
    else:
        order.total_amount = total_amount   # Set initial subtotal

    await db.commit()

    # Refresh to get all items
    await db.refresh(order)
    items_result = await db.execute(
        select(OrderItemModel).where(OrderItemModel.order_id == order.id)
    )
    order_items = items_result.scalars().all()

    # Calculate total with taxes and service charges for display
    # Convert total_amount to int (it may be Decimal from database)
    subtotal_cents = int(order.total_amount) if order.total_amount else 0
    payment_calc = PaymentCalculation.calculate(subtotal_cents)
    total_with_taxes = payment_calc.total

    # Build the response manually since SQLAlchemy relationship loading can be problematic with async
    return Order(
        id=order.id,
        restaurant_id=order.restaurant_id,
        table_id=order.table_id,
        order_number=order.order_number,
        total_amount=total_with_taxes,  # Return total including taxes/service
        status=order.status,
        notes=order.notes,
        created_at=order.created_at,
        updated_at=order.updated_at,
        items=[
            OrderItem(
                id=item.id,
                menu_item_id=item.menu_item_id,
                quantity=item.quantity,
                unit_price=item.unit_price,
                total_price=item.total_price,
                notes=item.notes,
                ordered_by=item.ordered_by,
                status=item.status,
                created_at=item.created_at
            ) for item in order_items
        ]
    )


@router.get(
    "/api/restaurants/{restaurant_slug}/orders/{order_id}/summary",
    response_model=OrderSummary,
    tags=["orders"]
)
async def get_order_summary(
    restaurant_slug: str,
    order_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Get order progress summary"""

    # Get restaurant by slug
    restaurant_result = await db.execute(
        select(RestaurantModel).where(RestaurantModel.slug == restaurant_slug)
    )
    restaurant = restaurant_result.scalar_one_or_none()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    # Verify order belongs to restaurant
    order_result = await db.execute(
        select(OrderModel)
        .where(OrderModel.id == order_id)
        .where(OrderModel.restaurant_id == restaurant.id)
    )
    order = order_result.scalar_one_or_none()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Get order items with status counts
    summary_result = await db.execute(
        select(
            func.count().label('total_items'),
            func.count().filter(
                OrderItemModel.status.in_(['pending', 'confirmed', 'preparing', 'ready'])
            ).label('pending_items'),
            func.count().filter(OrderItemModel.status == 'served').label('served_items'),
            func.count().filter(OrderItemModel.status == 'cancelled').label('cancelled_items')
        )
        .where(OrderItemModel.order_id == order_id)
    )
    summary = summary_result.first()

    all_served = summary.pending_items == 0 and summary.total_items > 0
    has_pending = summary.pending_items > 0

    return OrderSummary(
        total_items=summary.total_items,
        pending_items=summary.pending_items,
        served_items=summary.served_items,
        cancelled_items=summary.cancelled_items,
        all_served=all_served,
        has_pending=has_pending
    )


@router.put(
    "/api/restaurants/{restaurant_slug}/order-items/{item_id}",
    response_model=SuccessResponse,
    tags=["orders"]
)
async def update_order_item_status(
    restaurant_slug: str,
    item_id: str,
    status: str,  # This would be a proper enum in production
    db: AsyncSession = Depends(get_db)
):
    """Update order item status (for kitchen/staff use)"""

    # Get restaurant by slug
    restaurant_result = await db.execute(
        select(RestaurantModel).where(RestaurantModel.slug == restaurant_slug)
    )
    restaurant = restaurant_result.scalar_one_or_none()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    # Get order item and verify it belongs to this restaurant
    item_result = await db.execute(
        select(OrderItemModel)
        .join(OrderModel)
        .where(OrderItemModel.id == item_id)
        .where(OrderModel.restaurant_id == restaurant.id)
    )
    order_item = item_result.scalar_one_or_none()

    if not order_item:
        raise HTTPException(status_code=404, detail="Order item not found")

    # Validate status
    valid_statuses = ["pending", "confirmed", "preparing", "ready", "served", "cancelled"]
    if status not in valid_statuses:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status. Must be one of: {valid_statuses}"
        )

    order_item.status = status
    await db.commit()

    return SuccessResponse(
        message=f"Order item status updated to {status}"
    )


@router.put(
    "/api/restaurants/{restaurant_slug}/orders/{order_id}/complete",
    response_model=SuccessResponse,
    tags=["orders"]
)
async def complete_order(
    restaurant_slug: str,
    order_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Mark order as paid/complete - called when payment is processed"""

    # Get restaurant by slug
    restaurant_result = await db.execute(
        select(RestaurantModel).where(RestaurantModel.slug == restaurant_slug)
    )
    restaurant = restaurant_result.scalar_one_or_none()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    # Get and verify order belongs to restaurant
    order_result = await db.execute(
        select(OrderModel)
        .where(OrderModel.id == order_id)
        .where(OrderModel.restaurant_id == restaurant.id)
    )
    order = order_result.scalar_one_or_none()

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if order.status == "paid":
        raise HTTPException(status_code=400, detail="Order already paid")

    # Mark order as paid
    order.status = "paid"
    await db.commit()

    return SuccessResponse(
        message=f"Order {order.order_number} marked as paid"
    )


