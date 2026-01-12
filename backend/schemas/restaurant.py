from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict, Any, Literal
from datetime import datetime
from decimal import Decimal
import uuid


# Base schemas
class TimestampedBase(BaseModel):
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Restaurant schemas
class RestaurantBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    slug: str = Field(..., min_length=1, max_length=50, description="URL-friendly identifier")
    address: Optional[str] = None
    phone: Optional[str] = Field(None, max_length=20)
    email: Optional[str] = Field(None, max_length=255)
    logo: Optional[str] = None
    colors: Dict[str, str] = Field(default_factory=dict)


class RestaurantCreate(RestaurantBase):
    pass


class RestaurantUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    slug: Optional[str] = Field(None, min_length=1, max_length=50)
    address: Optional[str] = None
    phone: Optional[str] = Field(None, max_length=20)
    email: Optional[str] = Field(None, max_length=255)
    logo: Optional[str] = None
    colors: Optional[Dict[str, str]] = None


class Restaurant(RestaurantBase, TimestampedBase):
    id: uuid.UUID

    class Config:
        from_attributes = True


# Menu Category schemas
class MenuCategoryBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    sort_order: int = Field(default=0)


class MenuCategoryCreate(MenuCategoryBase):
    restaurant_id: uuid.UUID


class MenuCategoryUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    sort_order: Optional[int] = None


class MenuCategory(MenuCategoryBase, TimestampedBase):
    id: uuid.UUID
    restaurant_id: uuid.UUID

    class Config:
        from_attributes = True


# Menu Item schemas
class MenuItemBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    price: int = Field(..., gt=0, description="Price in cents")
    image: Optional[str] = None
    is_available: bool = Field(default=True)
    is_recommended: bool = Field(default=False)

    @validator('price')
    def validate_price(cls, v):
        if v <= 0:
            raise ValueError('Price must be positive')
        return v


class MenuItemCreate(MenuItemBase):
    restaurant_id: uuid.UUID
    category_id: Optional[uuid.UUID] = None


class MenuItemUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    price: Optional[int] = Field(None, gt=0)
    image: Optional[str] = None
    category_id: Optional[uuid.UUID] = None
    is_available: Optional[bool] = None
    is_recommended: Optional[bool] = None


class MenuItem(MenuItemBase, TimestampedBase):
    id: uuid.UUID
    restaurant_id: uuid.UUID
    category_id: Optional[uuid.UUID] = None

    class Config:
        from_attributes = True


# Frontend-compatible MenuItem (prices in colones/dollars)
class MenuItemResponse(BaseModel):
    id: str
    name: str
    description: str
    price: float = Field(..., description="Price in colones/dollars")
    image: str
    category: str

    @classmethod
    def from_db_model(cls, item: MenuItem, category_name: str = ""):
        return cls(
            id=str(item.id),
            name=item.name,
            description=item.description or "",
            price=float(item.price) / 100.0,  # Convert cents to currency
            image=item.image or "",
            category=category_name
        )


# Category with items for menu display
class CategoryWithItems(BaseModel):
    id: str
    title: str
    items: List[MenuItemResponse]

    @classmethod
    def from_db_model(cls, category: MenuCategory, items: List[MenuItem]):
        return cls(
            id=str(category.id),
            title=category.name,
            items=[
                MenuItemResponse.from_db_model(item, category.name)
                for item in items
            ]
        )


# Table schemas
class TableBase(BaseModel):
    table_number: int = Field(..., gt=0)
    seats: int = Field(default=4, gt=0)
    status: Literal["available", "occupied", "reserved", "maintenance"] = "available"


class TableCreate(TableBase):
    restaurant_id: uuid.UUID


class TableUpdate(BaseModel):
    table_number: Optional[int] = Field(None, gt=0)
    seats: Optional[int] = Field(None, gt=0)
    status: Optional[Literal["available", "occupied", "reserved", "maintenance"]] = None


class Table(TableBase, TimestampedBase):
    id: uuid.UUID
    restaurant_id: uuid.UUID

    class Config:
        from_attributes = True


# Table User schemas
class TableUserBase(BaseModel):
    user_id: str = Field(..., min_length=1, max_length=255)
    name: str = Field(..., min_length=1, max_length=255)


class TableUserJoin(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)


class TableUserUpdate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)


class TableUser(BaseModel):
    id: str  # Frontend expects string IDs
    name: str
    joined_at: datetime
    is_active: bool = True

    @classmethod
    def from_db_model(cls, table_user):
        return cls(
            id=table_user.user_id,
            name=table_user.name,
            joined_at=table_user.joined_at,
            is_active=table_user.is_active
        )

    class Config:
        from_attributes = True


# Order schemas
class OrderItemBase(BaseModel):
    menu_item_id: uuid.UUID
    quantity: int = Field(..., gt=0)
    notes: Optional[str] = None
    ordered_by: str = Field(..., min_length=1)


class OrderItemCreate(OrderItemBase):
    pass


class OrderItemUpdate(BaseModel):
    quantity: Optional[int] = Field(None, gt=0)
    notes: Optional[str] = None
    status: Optional[Literal["pending", "confirmed", "preparing", "ready", "served", "cancelled"]] = None


class OrderItem(BaseModel):
    id: uuid.UUID
    menu_item_id: uuid.UUID
    quantity: int
    unit_price: int  # Price in cents
    total_price: int  # Price in cents
    notes: Optional[str] = None
    ordered_by: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# Cart item (frontend format)
class CartItem(BaseModel):
    id: str
    name: str
    description: str
    price: float
    image: str
    category: str
    quantity: int
    ordered_by: Optional[str] = None


class OrderBase(BaseModel):
    table_id: Optional[uuid.UUID] = None
    notes: Optional[str] = None


class OrderCreate(OrderBase):
    items: List[OrderItemCreate] = Field(..., min_items=1)


class OrderUpdate(BaseModel):
    notes: Optional[str] = None


class Order(BaseModel):
    id: uuid.UUID
    restaurant_id: uuid.UUID
    table_id: Optional[uuid.UUID] = None
    order_number: int
    total_amount: int  # In cents
    status: str = "active"  # active, paid, cancelled
    notes: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    items: List[OrderItem] = []

    class Config:
        from_attributes = True


# Order summary for frontend
class OrderSummary(BaseModel):
    total_items: int
    pending_items: int
    served_items: int
    cancelled_items: int
    all_served: bool
    has_pending: bool


# Payment schemas
class PaymentItemBase(BaseModel):
    menu_item_id: uuid.UUID
    quantity: int = Field(..., gt=0)


class PaymentCreate(BaseModel):
    order_id: uuid.UUID
    paid_by: str = Field(..., min_length=1)
    payment_method: Literal["CARD", "SINPE", "CASH"]
    items: List[PaymentItemBase] = Field(..., min_items=1)
    tip: int = Field(default=0, ge=0, description="Tip amount in cents")
    payment_reference: Optional[str] = None


class Payment(BaseModel):
    id: uuid.UUID
    order_id: uuid.UUID
    table_id: uuid.UUID
    paid_by: str
    payment_method: str
    subtotal: int
    tax: int
    service: int
    tip: int
    total: int
    items_data: Optional[Dict[str, Any]] = None
    payment_reference: Optional[str] = None
    processed_at: datetime

    class Config:
        from_attributes = True


# Payment calculation response
class PaymentCalculation(BaseModel):
    subtotal: int  # In cents
    tax: int  # IVA 13% in cents
    service: int  # Service 10% in cents
    tip: int  # Tip in cents
    total: int  # Total in cents

    # Frontend-friendly versions (in currency)
    subtotal_display: float
    tax_display: float
    service_display: float
    tip_display: float
    total_display: float

    @classmethod
    def calculate(cls, subtotal_cents: int, tip_cents: int = 0):
        tax = int(subtotal_cents * 0.13)  # 13% IVA
        service = int(subtotal_cents * 0.10)  # 10% service
        total = subtotal_cents + tax + service + tip_cents

        return cls(
            subtotal=subtotal_cents,
            tax=tax,
            service=service,
            tip=tip_cents,
            total=total,
            subtotal_display=subtotal_cents / 100.0,
            tax_display=tax / 100.0,
            service_display=service / 100.0,
            tip_display=tip_cents / 100.0,
            total_display=total / 100.0
        )


# Full restaurant data for frontend
class RestaurantData(BaseModel):
    name: str
    logo: Optional[str] = None
    colors: Dict[str, str] = Field(default_factory=dict)
    recommendations: List[MenuItemResponse] = []
    menu: List[CategoryWithItems] = []

    @classmethod
    def from_db_models(cls, restaurant: Restaurant, categories: List[MenuCategory],
                      items: List[MenuItem], recommendations: List[MenuItem]):
        # Group items by category
        items_by_category = {}
        for item in items:
            if item.category_id:
                category_id = str(item.category_id)
                if category_id not in items_by_category:
                    items_by_category[category_id] = []
                items_by_category[category_id].append(item)

        # Build menu structure
        menu = []
        for category in categories:
            category_items = items_by_category.get(str(category.id), [])
            if category_items:  # Only include categories with items
                menu.append(CategoryWithItems.from_db_model(category, category_items))

        # Build recommendations
        recommendation_responses = [
            MenuItemResponse.from_db_model(item, "")
            for item in recommendations
        ]

        return cls(
            name=restaurant.name,
            logo=restaurant.logo,
            colors=restaurant.colors,
            recommendations=recommendation_responses,
            menu=menu
        )


# Error responses
class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None


# API Response wrappers
class SuccessResponse(BaseModel):
    success: bool = True
    data: Optional[Any] = None
    message: Optional[str] = None