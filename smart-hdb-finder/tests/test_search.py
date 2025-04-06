import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from fastapi import FastAPI

from controller.main import app

client = TestClient(app)

FAKE_RESPONSE = {
    "result": {
        "records": [
            {
                "month": "2024-01",
                "town": "TAMPINES",
                "flat_type": "4 ROOM",
                "block": "123",
                "street_name": "TAMPINES ST 11",
                "resale_price": 500000
            },
            {
                "month": "2024-01",
                "town": "TAMPINES",
                "flat_type": "4 ROOM",
                "block": "124",
                "street_name": "TAMPINES ST 12",
                "resale_price": 600000
            }
        ]
    }
}

@patch("controller.search.requests.get")
def test_search_api(mock_get):
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = FAKE_RESPONSE
    mock_get.return_value = mock_response

    payload = {
        "location": "TAMPINES",
        "flat_type": "4 ROOM",
        "min_price": 400000,
        "max_price": 700000,
        "toggles": {
            "mrt": False,
            "hawker": False,
            "supermarket": False
        }
    }

    response = client.post("/api/search", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["number of records"] == 2
    assert all("resale_price" in rec for rec in data["records"])
