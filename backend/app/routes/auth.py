from fastapi import APIRouter, HTTPException
from app.models.user_model import RegisterUser, LoginUser
from app.core.database import users_collection
from app.core.auth import hash_password, verify_password, create_access_token

router = APIRouter()

@router.post("/register")
async def register_user(user: RegisterUser):
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pw = hash_password(user.password)
    new_user = {"email": user.email, "password": hashed_pw}
    await users_collection.insert_one(new_user)
    
    return {"message": "User registered successfully"}

@router.post("/login")
async def login_user(user: LoginUser):
    found_user = await users_collection.find_one({"email": user.email})
    if not found_user or not verify_password(user.password, found_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token_data = {"sub": str(found_user["_id"])}
    access_token = create_access_token(data=token_data)

    return {"access": access_token}
