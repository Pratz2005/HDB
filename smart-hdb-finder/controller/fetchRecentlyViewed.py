from fastapi import APIRouter, HTTPException
from .utils.firebaseClient import db
import logging

router = APIRouter()

import logging
logging.basicConfig(
    level=logging.INFO,
    format="%(message)s", 
)
logger = logging.getLogger("controller.main")

@router.get("/listing")
async def get_listing(user_id: str, postal_code: str = None):
    try:
        if postal_code:
            # If postal_code is provided, fetch specific listing
            listing = await fetch_listing(user_id, postal_code)
            if not listing:
                logger.error("Listing not found for user_id: %s, postal_code: %s", user_id, postal_code)
                raise HTTPException(status_code=404, detail="Listing not found")
            
            # Get HDB record to get coordinates
            hdb_query = db.collection("hdb").where("postal", "==", postal_code)
            hdb_docs = list(hdb_query.stream())
            
            if hdb_docs:
                hdb_data = hdb_docs[0].to_dict()
                # Add coordinates to the listing
                listing.update({
                    "latitude": hdb_data.get("latitude"),
                    "longitude": hdb_data.get("longitude"),
                    "geohash": hdb_data.get("geohash")
                })
            
            return listing
        else:
            # If no postal_code, fetch all recently viewed listings
            return await fetch_all_recently_viewed(user_id)
            
    except Exception as e:
        logging.error(f"Error fetching listing: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching listing: {str(e)}")

async def fetch_all_recently_viewed(user_id: str):
    try:
        user_ref = db.collection('users').document(user_id)
        user_doc = user_ref.get()

        if user_doc.exists:
            data = user_doc.to_dict()
            recently_viewed = data.get('recentlyViewed', [])

            # Get coordinates for all listings
            for listing in recently_viewed:
                postal = listing.get('postal')
                if postal:
                    hdb_query = db.collection("hdb").where("postal", "==", postal)
                    hdb_docs = list(hdb_query.stream())
                    
                    if hdb_docs:
                        hdb_data = hdb_docs[0].to_dict()
                        listing.update({
                            "latitude": hdb_data.get("latitude"),
                            "longitude": hdb_data.get("longitude"),
                            "geohash": hdb_data.get("geohash")
                        })

            return recently_viewed
        return []

    except Exception as e:
        logging.error(f"Error fetching all recently viewed: {str(e)}")
        return []

async def fetch_listing(user_id: str, postal_code: str):
    try:
        user_ref = db.collection('users').document(user_id)
        user_doc = user_ref.get()

        if user_doc.exists:
            data = user_doc.to_dict()
            recently_viewed = data.get('recentlyViewed', [])

            for listing in recently_viewed:
                listing_postal = str(listing.get('postal'))
                postal_code_str = str(postal_code)

                if listing_postal == postal_code_str:
                    return listing
                
            return None
        else:
            return None
    except Exception as e:
        logging.error(f"Error fetching listing by postal code: {str(e)}")
        return None
