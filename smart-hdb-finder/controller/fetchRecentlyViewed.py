from fastapi import APIRouter, HTTPException
from .firebaseClient import db
import logging

router = APIRouter()

import logging
logging.basicConfig(
    level=logging.INFO,
    format="%(message)s", 
)
logger = logging.getLogger("controller.main")

@router.get("/listing")
async def get_listing(user_id: str, postal_code: str):
    try:
        # logging.info(f"Fetching listing for user_id: {user_id}, postal_code: {postal_code}")

        listing = await fetch_listing(user_id, postal_code)
        if not listing:
            raise HTTPException(status_code=404, detail="Listing not found")
        return listing
    except Exception as e:
        logging.error(f"Error fetching listing: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching listing: {str(e)}")

async def fetch_listing(user_id: str, postal_code: str):
    try:
        # logging.info(f"Querying Firestore for user_id: {user_id}, postal_code: {postal_code}")

        user_ref = db.collection('users').document(user_id)
        user_doc = user_ref.get()  # Use await here for async call

        if user_doc.exists:
            data = user_doc.to_dict()  # Retrieve the user's data
            recently_viewed = data.get('recentlyViewed', [])  # Get the recentlyViewed array

            # logging.info(f"Found {len(recently_viewed)} recently viewed listings.")

            for listing in recently_viewed:
                # logging.info(f"Listing: {listing}")

                listing_postal = str(listing.get('postal'))
                postal_code_str = str(postal_code)

                if listing_postal == postal_code_str:
                    # logging.info(f"Found matching listing for postal code: {postal_code_str}")
                    return listing 
                
            # logging.info(f"No listing found with postal code: {postal_code}")
            return None
        else:
            # logging.info(f"User document not found for user_id: {user_id}")
            return None  
    except Exception as e:
        logging.error(f"Error fetching listing by postal code: {str(e)}")
        return None
