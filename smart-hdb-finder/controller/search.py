import json
from fastapi import APIRouter, HTTPException
from typing import List
from .model.HDBSearchParams import HDBSearchParams
from .model.HDBRecord import HDBRecord
from .optionalFilters import meets_toggle_criteria

from .firebaseClient import db

router = APIRouter()

@router.post("/api/search")
def search_hdb(params: HDBSearchParams):
    query = db.collection("hdb")
    query = query.where("TOWN", "==", params.location)
    query = query.where("FLAT_TYPE", "==", params.flat_type)
    query = query.where("RESALE_PRICE", ">=", params.min_price)\
                .where("RESALE_PRICE", "<=", params.max_price)\
                .order_by("RESALE_PRICE")\
                .limit(500)
    
    try:
        print("Executing query...")
        docs = query.stream()
        print("Query executed, retrieving results...")
        records = [doc.to_dict() for doc in docs]
        print(f"Retrieved {len(records)} records")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Firestore query failed") from e

    data = {"result": {"records": records}}
    processed = process_data(data, params.toggles)
    return processed

def process_data(data, toggles) -> dict:
    if "result" in data and "records" in data["result"]:
        records = data["result"]["records"]
        filtered_records: List[HDBRecord] = []
        seen_addresses = set()
        for record in records:
            try:
                record_obj = HDBRecord(**record)
                address = record_obj.block + " " + record_obj.street_name
                if any(toggles.values()):
                    if not meets_toggle_criteria(record_obj, toggles):
                        continue
                filtered_records.append(record_obj)
                if len(filtered_records) >= 5:
                    break
            except Exception:
                continue
        return {
            "number of records": len(filtered_records),
            "records": filtered_records
        }
    return {"number of records": 0, "records": []}