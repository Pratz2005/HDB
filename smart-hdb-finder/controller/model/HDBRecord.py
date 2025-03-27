from pydantic import BaseModel

class HDBRecord(BaseModel):
    resale_price: int
    town: str
    flat_type: str
    month: str
    block: str
    street_name: str