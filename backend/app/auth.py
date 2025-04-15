# Import necessary libraries for handling dates, JWT tokens, password hashing, and environment variables
from datetime import datetime, timedelta
from jose import JWTError, jwt  # jose for JWT encoding/decoding
from passlib.context import CryptContext  # passlib for password hashing
import os

# Secret key for JWT signing, should be kept secure and stored as an environment variable
SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")  # Use a default value for development if the env var is missing
ALGORITHM = "HS256"  # JWT algorithm for encoding and decoding
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Default expiration time for the access token (in minutes)

# Initialize a password context (use bcrypt algorithm for hashing passwords)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Function to hash a password using bcrypt algorithm
def hash_password(password: str) -> str:
    """
    Hash the provided password using bcrypt.
    
    Args:
    - password (str): The password to be hashed.

    Returns:
    - str: The hashed password.
    """
    return pwd_context.hash(password)

# Function to verify if a plain password matches a hashed password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against a hashed password.
    
    Args:
    - plain_password (str): The plain password to verify.
    - hashed_password (str): The previously hashed password to compare against.

    Returns:
    - bool: True if the passwords match, False otherwise.
    """
    return pwd_context.verify(plain_password, hashed_password)

# Function to create an access token (JWT) that expires after a specified time
def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """
    Create an access token (JWT) with an expiration time.
    
    Args:
    - data (dict): The data to encode in the JWT payload (e.g., user information).
    - expires_delta (timedelta, optional): The expiration duration for the token. 
      Defaults to 15 minutes if not provided.

    Returns:
    - str: The encoded JWT token.
    """
    # Make a copy of the data to avoid modifying the original object
    to_encode = data.copy()
    
    # Set the expiration time; if not provided, default to 15 minutes
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    
    # Add the expiration time to the token's payload
    to_encode.update({"exp": expire})
    
    # Encode the JWT token with the provided data and secret key
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

