from pydantic import BaseModel
from typing import Optional, Dict

class HDBSearchParams(BaseModel):
    location: str
    flat_type: str
    min_price: int
    max_price: int
    toggles: Optional[Dict[str, bool]] = {}