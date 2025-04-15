from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, product

app = FastAPI()

origins = [
    "http://localhost:8080",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Root endpoint
@app.get("/", tags=["root"])
async def read_root():
    return {"message": "Welcome to AI Attribute Enricher."}

# Register routes
app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(product.router, prefix="/api", tags=["products"])
