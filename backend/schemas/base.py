from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Any


class TimestampedBase(BaseModel):
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None


class SuccessResponse(BaseModel):
    success: bool = True
    data: Optional[Any] = None
    message: Optional[str] = None