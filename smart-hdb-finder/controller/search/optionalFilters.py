from math import radians, sin, cos, asin, sqrt
from typing import List, Any, Tuple, Type
from functools import lru_cache

from model.hdb import HDBRecord
from model.amenities.MRTStation import MRTStation
from model.amenities.Supermarket import Supermarket
from model.amenities.Hawker import Hawker
from model.amenities.CommunityClub import CommunityClub
from model.amenities.CHASClinic import CHASClinic
from model.amenities.PrimarySch import PrimarySch
from model.amenities.SecondarySch import SecondarySch
from model.amenities.JuniorCollege import JuniorCollege

from controller.utils.firebaseClient import db

import logging
logging.basicConfig(
    level=logging.INFO,  # Set the logging level to INFO
    format="%(message)s",  # Format for logs
)
logger = logging.getLogger("controller.main")

# Mapping of amenity keys to a tuple of (Firestore Collection Name, Pydantic Model)
AMENITY_MAP = {
    "mrtStation": ("mrt_stations", MRTStation),
    "clinics": ("clinic_locations", CHASClinic),
    "hawkerCentre": ("hawker_centres", Hawker),
    "communityClub": ("community_clubs", CommunityClub),
    "superMarket": ("supermarket_locations", Supermarket),
    "primarySchool": ("primary_schools", PrimarySch),
    "secondarySchool": ("secondary_schools", SecondarySch),
    "juniorCollege": ("junior_colleges", JuniorCollege),
}

class AmenityQueryCache:
    @staticmethod
    @lru_cache(maxsize=3000)
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

    try:
        hdb_geohash_prefix = record_obj.geohash[:6]

        for amenity_key, is_enabled in toggles.items():
            if is_enabled:
                try:
                    candidates = AmenityQueryCache.fetch_cached_amenities(amenity_key, hdb_geohash_prefix)
                    matching_candidates = []
                    for candidate in candidates:
                        dist = calculate_distance(record_obj.latitude, record_obj.longitude,
                                                  candidate.latitude, candidate.longitude)
                        logger.info(f"Distance to {candidate.name}: {dist:.2f} km")
                        if dist <= 0.5: #within 500m
                            matching_candidates.append((candidate, dist))
                    # If no candidates for this amenity type meet the threshold, return False
                    if not matching_candidates:
                        return False
                    for candidate, dist in matching_candidates:
                        record_obj.nearby_amenities.append({
                            "name": candidate.name,
                            "distance": dist,
                            "latitude": candidate.latitude,
                            "longitude": candidate.longitude
                        })
                except Exception as e:
                    logger.error(f"Error fetching amenities for {amenity_key}: {e}")
                    return False
        # If all enabled toggles had at least one matching candidate, return True
        return True

    except Exception as e:
        logger.error(f"Error in meets_toggle_criteria: {e}")
        return False