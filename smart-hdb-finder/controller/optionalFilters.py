from math import radians, sin, cos, asin, sqrt
from typing import List, Any, Tuple, Type
from functools import lru_cache
import os
import pygeohash as pgh
import firebase_admin
from firebase_admin import firestore, credentials
from .model.HDBRecord import HDBRecord
from .model.MRTStation import MRTStation
from .model.Supermarket import Supermarket
from .model.Hawker import Hawker
from .model.CommunityClub import CommunityClub
from .model.CHASClinic import CHASClinic
from .oneMap import get_lat_lon_from_onemap

import logging
logging.basicConfig(
    level=logging.INFO,  # Set the logging level to INFO
    format="%(message)s",  # Format for logs
)
logger = logging.getLogger("controller.main")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
cred_file = os.path.join(BASE_DIR, "smart-hdb-finder-firebase-adminsdk-fbsvc-7384d88d6e.json")

cred = credentials.Certificate(cred_file)
firebase_admin.initialize_app(cred)
db = firestore.client()

# Mapping of amenity keys to a tuple of (Firestore Collection Name, Pydantic Model)
AMENITY_MAP = {
    "mrtStation": ("mrt_stations", MRTStation),
    "clinics": ("clinic_locations", CHASClinic),
    "hawkerCentre": ("hawkers_centres", Hawker),
    "communityClub": ("community_clubs", CommunityClub),
    "superMarket": ("supermarket_locations", Supermarket),
}

class AmenityQueryCache:
    @staticmethod
    @lru_cache(maxsize=500)
    def fetch_cached_amenities(amenity_key: str, geohash_prefix: str) -> List[Any]:
        """
        Cached version of fetch_amenities_by_type with LRU caching
        
        :param amenity_key: Type of amenity to fetch
        :param geohash_prefix: Geohash prefix for filtering
        :return: Cached list of amenities
        """
        if amenity_key not in AMENITY_MAP:
            return []
        
        collection, model = AMENITY_MAP[amenity_key]
        query = db.collection(collection).where("geohash", ">=", geohash_prefix).where("geohash", "<", geohash_prefix + "z")
        results = [doc.to_dict() for doc in query.stream()]
        return [model(**data) for data in results]
    
#####################################
# Helper functions 
#####################################
def get_geohash_prefix(lat: float, lon: float, length: int = 6) -> str:
    full_hash = pgh.encode(lat, lon)
    prefix = full_hash[:length]
    return prefix

def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculates the Haversine distance (in km) between two points.
    """
    R = 6371  # Earth's radius in kilometers
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    return R * c

#####################################
# Main function
#####################################

def meets_toggle_criteria(record_obj, toggles) -> bool:
    """
    Checks if, for every true toggle, there's at least one nearby amenity.
    If any enabled amenity type has no candidate within 1 km, returns False.
    """
    record_obj.nearby_amenities = []
    hdb_address = record_obj.block + " " + record_obj.street_name

    try:
        hdb_latitude, hdb_longitude = get_lat_lon_from_onemap(hdb_address)
        hdb_prefix = get_geohash_prefix(hdb_latitude, hdb_longitude)

        for amenity_key, is_enabled in toggles.items():
            if is_enabled:
                try:
                    candidates = AmenityQueryCache.fetch_cached_amenities(amenity_key, hdb_prefix)
                    # Filter candidates by distance threshold (1km)
                    matching_candidates = []
                    for candidate in candidates:
                        dist = calculate_distance(hdb_latitude, hdb_longitude,
                                                  candidate.latitude, candidate.longitude)
                        logger.info(f"Distance to {candidate.name}: {dist:.2f} km")
                        if dist <= 1.0:
                            matching_candidates.append(candidate)
                    # If no candidates for this amenity type meet the threshold, return False
                    if not matching_candidates:
                        return False
                    for candidate in matching_candidates:
                        record_obj.nearby_amenities.append(candidate.name)
                except Exception as e:
                    logger.error(f"Error fetching amenities for {amenity_key}: {e}")
                    return False
        # If all enabled toggles had at least one matching candidate, return True
        return True

    except Exception as e:
        logger.error(f"Error in meets_toggle_criteria: {e}")
        return False