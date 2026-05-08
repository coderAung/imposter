from typing import Any

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
import jwt

from app.constants import ALGO, SECURITY_KEY
from app.utilities.security import LoginUser, SecurityConfiguration

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

def encode(payload:dict[str, Any]):
    return jwt.encode(payload=payload, key=SECURITY_KEY, algorithm=ALGO)

def decode(token:str) -> dict[str, Any]:
    return jwt.decode(jwt=token, key=SECURITY_KEY, algorithms=ALGO)

def get_login_user(token:str = Depends(oauth2_scheme)) -> LoginUser:
    pass

security = SecurityConfiguration(
    login_user=lambda:Depends(get_login_user)
)