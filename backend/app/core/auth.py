from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from app.core.config import SECRET_KEY, ALGORITHM

# OAuth2PasswordBearer instance to extract token from the request
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

# CryptContext instance for hashing and verifying passwords
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Function to hash a plain password using bcrypt
def hash_password(password: str) -> str:
    """
    Hash the provided password using bcrypt.
    
    Args:
        password (str): The password to be hashed.

    Returns:
        str: The hashed password.
    """
    return pwd_context.hash(password)

# Function to verify if a plain password matches the hashed password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify if the provided plain password matches the hashed password.

    Args:
        plain_password (str): The password to verify.
        hashed_password (str): The previously hashed password to compare against.

    Returns:
        bool: True if the passwords match, False otherwise.
    """
    return pwd_context.verify(plain_password, hashed_password)

# Function to create a new access token with optional expiration time
def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """
    Create a new JWT access token with the given data and expiration time.

    Args:
        data (dict): The data to encode into the JWT token.
        expires_delta (timedelta | None): Optional expiration time delta. If None, the default is 30 minutes.

    Returns:
        str: The encoded JWT access token.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=30))
    to_encode.update({"exp": expire})  # Add expiration time to the token data
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Dependency to get the current user from the token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Decode the JWT token to retrieve the current user's data.

    Args:
        token (str): The JWT token provided by the user.

    Raises:
        HTTPException: If token is invalid or expired.

    Returns:
        dict: The decoded payload from the JWT token.
    """
    try:
        # Decode the JWT token using the secret key and algorithm
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload  # Return the decoded user data from the token
    except JWTError:
        # Raise an HTTP exception if the token is invalid
        raise HTTPException(status_code=401, detail="Invalid token")
