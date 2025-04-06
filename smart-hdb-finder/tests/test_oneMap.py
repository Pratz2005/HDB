import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from controller.main import app

client = TestClient(app)

FAKE_LATLON_RESPONSE = {
    "results": [
        {
            "LATITUDE": "1.3521",
            "LONGITUDE": "103.8198"
        }
    ]
}

@patch("controller.oneMap.requests.get")
def test_onemap(mock_get):
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = FAKE_LATLON_RESPONSE
    mock_get.return_value = mock_response

    response = client.get("/api/coordinates", params={"address": "Singapore"})
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert round(data[0], 4) == 1.3521
    assert round(data[1], 4) == 103.8198
