from pydantic import BaseModel  # A class for defining the schema and data validation rules (expected fields, data types and any constraints or rules that should be applied to them)
from typing import Optional
from datetime import datetime, date


class UserDTO(BaseModel):
    id: Optional[int]
    name: Optional[str]
    age: Optional[int]
    email: Optional[str]
    birthday: Optional[date]
    datetime: Optional[datetime]

    # This allows Pydantic to handle SQLAlchemy objects as dictionaries
    class Config:
        orm_mode = True
