from pydantic import BaseModel, Field
from typing import List

class HDBRecord(BaseModel):
    resale_price: int
    town: str
    flat_type: str
    month: str
    block: str
    street_name: str
    nearby_amenities: List[str] = Field(default_factory=list)