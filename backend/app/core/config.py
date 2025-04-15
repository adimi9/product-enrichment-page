import os
from dotenv import load_dotenv

# Load environment variables from a .env file (if available)
load_dotenv()

# Fetch the SECRET_KEY from environment variables, with a default fallback value of "supersecret"
SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")

# Define the algorithm used for encoding and decoding the JWT token
ALGORITHM = "HS256"
