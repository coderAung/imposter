from typing import Annotated

from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.apis.auths.services import SignInService, SignUpService
from app.inputs import SignInForm, SignUpForm
from data.database import get_session

def get_sign_in_service(session:Annotated[Session, Depends(get_session)]) -> SignInService:
    return SignInService(session)

def get_sign_up_service(session:Annotated[Session, Depends(get_session)]) -> SignUpService:
    return SignUpService(session)

api = APIRouter(prefix="/auth")

@api.post("/sign-up")
def sign_up(form:SignUpForm, service:Annotated[SignUpService, Depends(get_sign_up_service)]):
    return service.sign_up(form)

@api.post("/token")
def token(form:SignInForm, service:Annotated[SignInService, Depends(get_sign_in_service)]):
    token = service.sign_in(form)
    return {"access_token": token, "token_type": "Bearer"}

@api.post("/google")
def google():
    pass