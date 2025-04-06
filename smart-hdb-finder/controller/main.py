from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from .search import router as search_router
from .oneMap import router as onemap_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Change this to match your frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Routing for search
app.include_router(search_router)

# Routing for coordinates
app.include_router(onemap_router)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}