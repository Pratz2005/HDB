from pydantic import BaseModel

class CommunityClub(BaseModel):
    name: str
    postal: str
    latitude: float
    longitude: float
    geohash: str