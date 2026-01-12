from sqlalchemy import Column, String, Integer, Text, Boolean, DECIMAL, ForeignKey, DateTime, JSON, Index
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

Base = declarative_base()


class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    slug = Column(String(50), unique=True, nullable=False)  # URL-friendly identifier (gus, sikwa, filippo)
    address = Column(Text)
    phone = Column(String(20))
    email = Column(String(255))
    logo = Column(Text)
    colors = Column(JSON, default={})
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    tables = relationship("Table", back_populates="restaurant", cascade="all, delete-orphan")
    menu_categories = relationship("MenuCategory", back_populates="restaurant", cascade="all, delete-orphan")
    menu_items = relationship("MenuItem", back_populates="restaurant", cascade="all, delete-orphan")
    orders = relationship("Order", back_populates="restaurant", cascade="all, delete-orphan")


class Table(Base):
    __tablename__ = "tables"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    restaurant_id = Column(UUID(as_uuid=True), ForeignKey("restaurants.id"), nullable=False)
    table_number = Column(Integer, nullable=False)
    seats = Column(Integer, default=4)
    status = Column(String(20), default="available")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    restaurant = relationship("Restaurant", back_populates="tables")
    orders = relationship("Order", back_populates="table")
    table_users = relationship("TableUser", back_populates="table", cascade="all, delete-orphan")

    # Indexes
    __table_args__ = (
        Index("idx_tables_restaurant_id", "restaurant_id"),
        Index("idx_unique_table_number", "restaurant_id", "table_number", unique=True),
    )


class TableUser(Base):
    __tablename__ = "table_users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    table_id = Column(UUID(as_uuid=True), ForeignKey("tables.id"), nullable=False)
    user_id = Column(String(255), nullable=False)  # Frontend-generated user ID
    name = Column(String(255), nullable=False)
    joined_at = Column(DateTime(timezone=True), server_default=func.now())
    left_at = Column(DateTime(timezone=True), nullable=True)
    is_active = Column(Boolean, default=True)

    # Relationships
    table = relationship("Table", back_populates="table_users")

    # Indexes
    __table_args__ = (
        Index("idx_table_users_table_id", "table_id"),
        Index("idx_table_users_active", "table_id", "is_active"),
    )


class MenuCategory(Base):
    __tablename__ = "menu_categories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    restaurant_id = Column(UUID(as_uuid=True), ForeignKey("restaurants.id"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    restaurant = relationship("Restaurant", back_populates="menu_categories")
    menu_items = relationship("MenuItem", back_populates="category")

    # Indexes
    __table_args__ = (
        Index("idx_menu_categories_restaurant_id", "restaurant_id"),
    )


class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    restaurant_id = Column(UUID(as_uuid=True), ForeignKey("restaurants.id"), nullable=False)
    category_id = Column(UUID(as_uuid=True), ForeignKey("menu_categories.id"), nullable=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    price = Column(Integer, nullable=False)  # Price in cents (avoid float precision issues)
    image = Column(Text)
    is_available = Column(Boolean, default=True)
    is_recommended = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    restaurant = relationship("Restaurant", back_populates="menu_items")
    category = relationship("MenuCategory", back_populates="menu_items")
    order_items = relationship("OrderItem", back_populates="menu_item")

    # Indexes
    __table_args__ = (
        Index("idx_menu_items_restaurant_id", "restaurant_id"),
        Index("idx_menu_items_category_id", "category_id"),
        Index("idx_menu_items_available", "restaurant_id", "is_available"),
        Index("idx_menu_items_recommended", "restaurant_id", "is_recommended"),
    )


class Order(Base):
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    restaurant_id = Column(UUID(as_uuid=True), ForeignKey("restaurants.id"), nullable=False)
    table_id = Column(UUID(as_uuid=True), ForeignKey("tables.id"), nullable=True)
    order_number = Column(Integer, nullable=False)
    total_amount = Column(Integer, default=0)  # Total in cents
    status = Column(String(20), default="active")  # active, paid, cancelled
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    restaurant = relationship("Restaurant", back_populates="orders")
    table = relationship("Table", back_populates="orders")
    order_items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="order")

    # Indexes
    __table_args__ = (
        Index("idx_orders_restaurant_id", "restaurant_id"),
        Index("idx_orders_table_id", "table_id"),
        Index("idx_orders_created_at", "created_at"),
    )


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=False)
    menu_item_id = Column(UUID(as_uuid=True), ForeignKey("menu_items.id"), nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    unit_price = Column(Integer, nullable=False)  # Price in cents at time of order
    total_price = Column(Integer, nullable=False)  # quantity * unit_price
    notes = Column(Text)
    ordered_by = Column(String(255), nullable=False)  # User ID who ordered
    status = Column(String(20), default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    order = relationship("Order", back_populates="order_items")
    menu_item = relationship("MenuItem", back_populates="order_items")

    # Indexes
    __table_args__ = (
        Index("idx_order_items_order_id", "order_id"),
        Index("idx_order_items_menu_item_id", "menu_item_id"),
        Index("idx_order_items_status", "status"),
        Index("idx_order_items_ordered_by", "ordered_by"),
    )


class Payment(Base):
    __tablename__ = "payments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=False)
    table_id = Column(UUID(as_uuid=True), ForeignKey("tables.id"), nullable=False)
    paid_by = Column(String(255), nullable=False)  # User ID who made payment
    payment_method = Column(String(20), nullable=False)  # CARD, SINPE, CASH

    # Price breakdown (all in cents)
    subtotal = Column(Integer, nullable=False)
    tax = Column(Integer, nullable=False)  # IVA 13%
    service = Column(Integer, nullable=False)  # Service 10%
    tip = Column(Integer, default=0)  # Voluntary tip
    total = Column(Integer, nullable=False)

    # Payment details
    items_data = Column(JSON)  # Store paid items details
    payment_reference = Column(String(255))  # External payment reference
    processed_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    order = relationship("Order", back_populates="payments")
    table = relationship("Table")

    # Indexes
    __table_args__ = (
        Index("idx_payments_order_id", "order_id"),
        Index("idx_payments_table_id", "table_id"),
        Index("idx_payments_processed_at", "processed_at"),
    )