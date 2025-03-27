import requests
import json

# Make sure your FastAPI app is running (e.g. using uvicorn on localhost:8000)
url = "http://127.0.0.1:8000/api/search"

# Example input parameters, adjust as needed
payload = {
    "location": "ANG MO KIO",
    "flat_type": "4 ROOM",
    "min_price": 100000,
    "max_price": 500000
}

try:
    response = requests.post(url, json=payload)
    response.raise_for_status()
    data = response.json()
    # Write the result to a JSON file for inspection.
    with open("search_output.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)
    print("Test successful. Results written to search_output.json")
except Exception as e:
    print("Error during testing:", e)