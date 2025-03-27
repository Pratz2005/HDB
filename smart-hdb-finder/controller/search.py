import json
import requests
from fastapi import APIRouter, HTTPException
from typing import List
from .model.HDBRecord import HDBRecord
from .model.HDBSearchParams import HDBSearchParams

router = APIRouter()

@router.post("/api/search")
def search_hdb(params: HDBSearchParams):
    filters = {
        "town": params.location,
        "flat_type": params.flat_type,
        "month": ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06", "2024-07", "2024-08", "2024-09", "2024-10", "2024-11", "2024-12",
                  "2025-01", "2025-02", "2025-03", "2025-04", "2025-05", "2025-06", "2025-07", "2025-08", "2025-09", "2025-10", "2025-11", "2025-12"]
    }
    resource_id = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc"
        url = ("https://data.gov.sg/api/action/datastore_search?resource_id=" + resource_id +
           "&filters=" + json.dumps(filters) +
           "&limit=1000" +
           "&sort=resale_price")
    
    try:
        response = requests.get(url)
    except Exception as e:
        raise HTTPException(status_code=500, detail="API request failed") from e

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch data")
    
    data = response.json()
    processed = process_data(data, params.min_price, params.max_price)
    return processed

def process_data(data, min_price, max_price) -> dict:
    if "result" in data and "records" in data["result"]:
        records = data["result"]["records"]
        filtered_records: List[HDBRecord] = []
        for record in records:
            try:
                record_obj = HDBRecord(**record)
                if min_price <= record_obj.resale_price <= max_price:
                    filtered_records.append(record_obj)
            except Exception:
                # If conversion fails, skip the record.
                continue
        return {
            "number of records": len(filtered_records),
            "records": filtered_records  # This will be serialized as a list of dicts
        }
    return {"number of records": 0, "records": []}