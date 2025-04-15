# Import FastAPI framework and middleware components
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import custom route modules for authentication and products
from app.routes import auth, product

# Create FastAPI app instance
app = FastAPI()

# Define allowed origins for CORS (Cross-Origin Resource Sharing) policy
origins = [
    "http://localhost:8080",  # Local development server
    "http://localhost:5173",  # Local development server (possibly for frontend)
    "https://product-enrichment-page-cqu6h04je-aditis-projects-76071257.vercel.app",  # Staging or production app URL
    "https://product-enrichment-page.vercel.app"  # Production app URL
]

# Add middleware for handling CORS issues, allowing cross-origin requests from the listed origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # List of allowed origins for cross-origin requests
    allow_credentials=True,       # Allow credentials like cookies to be sent in cross-origin requests
    allow_methods=["*"],          # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"]           # Allow all headers in the request
)

# Root endpoint for the API to confirm that the service is running
@app.get("/", tags=["root"])
async def read_root():
    return {"message": "Welcome to AI Attribute Enricher."}

# Register authentication and product-related routes with the FastAPI app
# It's good practice to group related endpoints using routers for modularity
app.include_router(auth.router, prefix="/api", tags=["auth"])    # Auth routes under '/api/auth'
app.include_router(product.router, prefix="/api", tags=["products"])  # Product routes under '/api/products'
