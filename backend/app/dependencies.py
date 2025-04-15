# Import necessary modules
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from motor.motor_asyncio import AsyncIOMotorClient

# OAuth2 setup for extracting the token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login/")

# Secret key and algorithm for JWT
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

# MongoDB setup
MONGO_URI = "your-mongo-uri"
client = AsyncIOMotorClient(MONGO_URI)
db = client["product_db"]

# Dependency to get the database
async def get_db():
    return db

# Dependency to get the current user from the token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        # Decode the token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload  # Return the decoded payload (can be extended to fetch user from DB)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )
