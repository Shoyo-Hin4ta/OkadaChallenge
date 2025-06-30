from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum
from decimal import Decimal

class StatusEnum(str, Enum):
    available = 'available'
    leased = 'leased'

class Property(BaseModel):
    id: int
    address: str
    floor: Optional[str] = None
    suite: Optional[str] = None
    size: int
    rent: Decimal
    broker_name: str
    broker_email: EmailStr
    broker_phone: str
    annual_rent: Decimal
    status: StatusEnum
    landlord_name: str
    landlord_email: EmailStr
