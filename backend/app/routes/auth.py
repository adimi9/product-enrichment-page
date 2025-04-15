from fastapi import APIRouter, HTTPException
from app.models.user_model import RegisterUser, LoginUser
from app.core.database import users_collection
from app.core.auth import hash_password, verify_password, create_access_token

router = APIRouter()

@router.post("/register")
async def register_user(user: RegisterUser):
    """
    Endpoint to register a new user.
    
    Args:
        user (RegisterUser): User details for registration.

    Returns:
        JSONResponse: A response containing a success message.
    
    Raises:
        HTTPException: If the email is already registered.
    """
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash the password before storing it
    hashed_pw = hash_password(user.password)
    new_user = {"email": user.email, "password": hashed_pw}
    await users_collection.insert_one(new_user)
    
    return {"message": "User registered successfully"}

@router.post("/login")
async def login_user(user: LoginUser):
    """
    Endpoint to authenticate a user and provide an access token.
    
    Args:
        user (LoginUser): User login credentials (email and password).

    Returns:
        JSONResponse: A response containing the access token.
    
    Raises:
        HTTPException: If the credentials are invalid.
    """
    found_user = await users_collection.find_one({"email": user.email})
    if not found_user or not verify_password(user.password, found_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Generate access token
    token_data = {"sub": str(found_user["_id"])}
    access_token = create_access_token(data=token_data)

    return {"access": access_token}
