from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from motor.motor_asyncio import AsyncIOMotorClient

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login/")

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

# Mongo setup
MONGO_URI = "your-mongo-uri"
client = AsyncIOMotorClient(MONGO_URI)
db = client["product_db"]

async def get_db():
    return db

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload  # or fetch user from DB
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
