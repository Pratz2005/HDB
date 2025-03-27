import requests
from fastapi import APIRouter, HTTPException
import logging

logger = logging.getLogger("controller.main")
router = APIRouter()

def get_lat_lon_from_onemap(address: str) -> tuple:
    """
    Query OneMap API to get latitude and longitude for the given address.
    """
    url = f"https://www.onemap.gov.sg/api/common/elastic/search?searchVal={address}&returnGeom=Y&getAddrDetails=Y&pageNum=1"
    headers = {"Authorization": "Bearer **********************"}  # Replace with your OneMap API key
    
    logger.info("Querying OneMap API with address: %s", address)
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        logger.error("OneMap API call failed with status code: %s", response.status_code)
        raise HTTPException(status_code=500, detail="OneMap API request failed")
    
    data = response.json()
    results = data.get("results")
    if not results:
        logger.error("No results returned from OneMap API for address: %s", address)
        raise HTTPException(status_code=404, detail="Address not found on OneMap")
    
    # Assuming the first result is the best match
    result = results[0]
    try:
        latitude = float(result.get("LATITUDE"))
        longitude = float(result.get("LONGITUDE"))
    except (TypeError, ValueError):
        logger.error("Failed to parse latitude or longitude from OneMap API result: %s", result)
        raise HTTPException(status_code=500, detail="Invalid coordinates returned from OneMap")
    
    return latitude, longitude

@router.get("/api/coordinates")
def get_coordinates(address: str):
    """
    API endpoint to query OneMap API for coordinates given an address string.
    """
    lat, lon = get_lat_lon_from_onemap(address)
    return {"latitude": lat, "longitude": lon}