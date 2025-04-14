import threading
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .search import router as search_router
from .oneMap import router as onemap_router
from .insights import router as insights_router
from .sync_firestore import fetch_and_upload_latest_hdb_data 
from .fetchRecentlyViewed import router as recentlyViewed_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search_router)
app.include_router(onemap_router)
app.include_router(insights_router)
app.include_router(recentlyViewed_router)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

def run_periodic_sync():
    while True:
        try:
            fetch_and_upload_latest_hdb_data()
        except Exception as e:
            print("🔥 Error during sync:", e)
        time.sleep(86400)

# @app.on_event("startup")
# def startup_event():
#     print("🚀 Starting background Firestore sync thread...")
#     thread = threading.Thread(target=run_periodic_sync, daemon=True)
#     thread.start()
