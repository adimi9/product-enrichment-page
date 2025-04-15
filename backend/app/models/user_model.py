from pydantic import BaseModel, EmailStr


class RegisterUser(BaseModel):
    """
    Model to represent the user registration data.
    
    Attributes:
        email (EmailStr): The email address of the user.
        password (str): The password for the user.
    """
    email: EmailStr
    password: str


class LoginUser(BaseModel):
    """
    Model to represent the user login data.
    
    Attributes:
        email (EmailStr): The email address of the user.
        password (str): The password for the user.
    """
    email: EmailStr
    password: str
