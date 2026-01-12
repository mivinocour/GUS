from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from typing import List

from schemas.database import get_db
from schemas.models import (
    Restaurant as RestaurantModel,
    Table as TableModel,
    TableUser as TableUserModel
)
from schemas import TableUser, TableUserJoin, TableUserUpdate, SuccessResponse

router = APIRouter()


async def get_restaurant_and_table(
    restaurant_identifier: str,
    table_number: int,
    db: AsyncSession
):
    """Helper to get restaurant and table, ensuring they exist.
    restaurant_identifier can be UUID or slug"""

    # Try to find restaurant by slug first, then by UUID
    restaurant_result = await db.execute(
        select(RestaurantModel).where(RestaurantModel.slug == restaurant_identifier)
    )
    restaurant = restaurant_result.scalar_one_or_none()

    # If not found by slug, try UUID
    if not restaurant:
        restaurant_result = await db.execute(
            select(RestaurantModel).where(RestaurantModel.id == restaurant_identifier)
        )
        restaurant = restaurant_result.scalar_one_or_none()

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    # Get table by restaurant_id + table_number
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
            detail=f"Table {table_number} not found in restaurant"
        )

    return restaurant, table


@router.get(
    "/api/restaurants/{restaurant_id}/tables/{table_number}/users",
    response_model=List[TableUser],
    tags=["tables"]
)
async def get_table_users(
    restaurant_id: str,
    table_number: int,
    db: AsyncSession = Depends(get_db)
):
    """Get all active users at a table"""

    _, table = await get_restaurant_and_table(restaurant_id, table_number, db)

    # Get active users at this table
    users_result = await db.execute(
        select(TableUserModel)
        .where(TableUserModel.table_id == table.id)
        .where(TableUserModel.is_active == True)
        .order_by(TableUserModel.joined_at)
    )
    users = users_result.scalars().all()

    return [TableUser.from_db_model(user) for user in users]


@router.post(
    "/api/restaurants/{restaurant_id}/tables/{table_number}/users",
    response_model=TableUser,
    tags=["tables"]
)
async def join_table(
    restaurant_id: str,
    table_number: int,
    user_data: TableUserJoin,
    user_id: str,  # This would come from request headers/auth in real app
    db: AsyncSession = Depends(get_db)
):
    """Join a table (add user to table session)"""

    _, table = await get_restaurant_and_table(restaurant_id, table_number, db)

    # Check if user is already at this table
    existing_user_result = await db.execute(
        select(TableUserModel)
        .where(TableUserModel.table_id == table.id)
        .where(TableUserModel.user_id == user_id)
        .where(TableUserModel.is_active == True)
    )
    existing_user = existing_user_result.scalar_one_or_none()

    if existing_user:
        # Update existing user's name if different
        if existing_user.name != user_data.name:
            existing_user.name = user_data.name
            await db.commit()
            await db.refresh(existing_user)
        return TableUser.from_db_model(existing_user)

    # Create new table user
    table_user = TableUserModel(
        table_id=table.id,
        user_id=user_id,
        name=user_data.name,
        is_active=True
    )

    db.add(table_user)
    await db.commit()
    await db.refresh(table_user)

    return TableUser.from_db_model(table_user)


@router.put(
    "/api/restaurants/{restaurant_id}/tables/{table_number}/users/{user_id}",
    response_model=TableUser,
    tags=["tables"]
)
async def update_table_user(
    restaurant_id: str,
    table_number: int,
    user_id: str,
    user_data: TableUserUpdate,
    db: AsyncSession = Depends(get_db)
):
    """Update user name at table"""

    _, table = await get_restaurant_and_table(restaurant_id, table_number, db)

    # Get user at table
    user_result = await db.execute(
        select(TableUserModel)
        .where(TableUserModel.table_id == table.id)
        .where(TableUserModel.user_id == user_id)
        .where(TableUserModel.is_active == True)
    )
    table_user = user_result.scalar_one_or_none()

    if not table_user:
        raise HTTPException(status_code=404, detail="User not found at table")

    table_user.name = user_data.name
    await db.commit()
    await db.refresh(table_user)

    return TableUser.from_db_model(table_user)


@router.delete(
    "/api/restaurants/{restaurant_id}/tables/{table_number}/users/{user_id}",
    response_model=SuccessResponse,
    tags=["tables"]
)
async def leave_table(
    restaurant_id: str,
    table_number: int,
    user_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Leave table (mark user as inactive)"""

    _, table = await get_restaurant_and_table(restaurant_id, table_number, db)

    # Get user at table
    user_result = await db.execute(
        select(TableUserModel)
        .where(TableUserModel.table_id == table.id)
        .where(TableUserModel.user_id == user_id)
        .where(TableUserModel.is_active == True)
    )
    table_user = user_result.scalar_one_or_none()

    if not table_user:
        raise HTTPException(status_code=404, detail="User not found at table")

    table_user.is_active = False
    table_user.left_at = db.execute("SELECT NOW()").scalar()
    await db.commit()

    return SuccessResponse(message=f"User {user_id} left table {table_number}")