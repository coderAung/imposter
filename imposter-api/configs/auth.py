from http import HTTPStatus
from typing import Annotated, Any

from fastapi import Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordBearer
import jwt
from pwdlib import PasswordHash
from sqlmodel import Session, select

from data.database import get_session, safecall
from data.models import Account, AdminAccount
from utilities.constants import ALGO, SECURITY_KEY
from utilities.exceptions import AppBusinessException
from utilities.security import LoginUser, SecurityConfiguration

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")
password_hasher = PasswordHash.recommended()

def hash_password(password:str) -> str:
    return password_hasher.hash(password)

def verify_password(password:str, hash:str) -> bool:
    return password_hasher.verify(password, hash)

def jwt_encode(payload:dict[str, Any]):
    return jwt.encode(payload=payload, key=SECURITY_KEY, algorithm=ALGO)

def jwt_decode(token:str) -> dict[str, Any]:
    return jwt.decode(jwt=token, key=SECURITY_KEY, algorithms=[ALGO])

def get_login_user(token:Annotated[str, Depends(oauth2_scheme)], session:Annotated[Session, Depends(get_session)], request:Request) -> LoginUser:
    payload = jwt_decode(token)
    email = payload.get("email")
    role = payload.get("role")
    try:
        if role == "player":
            account = safecall(session.exec(select(Account).where(Account.email == email)).first(), "Account", "email", email)
            login_user = LoginUser(userid=str(account.account_id), username=account.email, password=account.password, role=role)
        if role == "admin":
            admin = safecall(session.exec(select(AdminAccount).where(AdminAccount.admin_email == email)).first(), "AdminAccount", "email", email)
            login_user = LoginUser(userid=str(admin.admin_id), username=admin.admin_email, password=admin.admin_password, role=role)
        request.state.user = login_user
        return login_user
    except AppBusinessException:
        raise HTTPException(
            status_code=HTTPStatus.UNAUTHORIZED,
            detail="Invalid token"
        )

security = SecurityConfiguration(
    login_user=lambda:Depends(get_login_user)
)