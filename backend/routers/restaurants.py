from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List

from schemas.database import get_db
from schemas.models import Restaurant as RestaurantModel, MenuCategory, MenuItem
from schemas import Restaurant, RestaurantData, CategoryWithItems, MenuItemResponse

router = APIRouter(prefix="/api/restaurants", tags=["restaurants"])


@router.get("/", response_model=List[Restaurant])
async def list_restaurants(db: AsyncSession = Depends(get_db)):
    """Get list of all restaurants"""
    result = await db.execute(select(RestaurantModel))
    restaurants = result.scalars().all()
    return restaurants


@router.get("/{restaurant_identifier}", response_model=RestaurantData)
async def get_restaurant(restaurant_identifier: str, db: AsyncSession = Depends(get_db)):
    """Get restaurant data with full menu. Can use UUID or slug (e.g. 'gus', 'sikwa')"""

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

    # Get categories with items
    categories_result = await db.execute(
        select(MenuCategory)
        .where(MenuCategory.restaurant_id == restaurant.id)
        .order_by(MenuCategory.sort_order, MenuCategory.name)
    )
    categories = categories_result.scalars().all()

    # Get all menu items for this restaurant
    items_result = await db.execute(
        select(MenuItem)
        .where(MenuItem.restaurant_id == restaurant.id)
        .where(MenuItem.is_available == True)
        .order_by(MenuItem.name)
    )
    items = items_result.scalars().all()

    # Get recommended items
    recommended_result = await db.execute(
        select(MenuItem)
        .where(MenuItem.restaurant_id == restaurant.id)
        .where(MenuItem.is_recommended == True)
        .where(MenuItem.is_available == True)
    )
    recommendations = recommended_result.scalars().all()

    return RestaurantData.from_db_models(
        restaurant=restaurant,
        categories=categories,
        items=items,
        recommendations=recommendations
    )