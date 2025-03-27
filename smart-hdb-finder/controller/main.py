from fastapi import FastAPI
from .search import router as search_router

app = FastAPI()

# Routing for search
app.include_router(search_router)

# Include other routes below in similar fashion

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}