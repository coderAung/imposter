from typing import Annotated

from fastapi import Depends
from sqlmodel import Session

import app
from app.apis.auths.services import SignInService, SignUpService
from app.apis.lobbies.services import LobbyService


def get_session():
    with Session(bind=app.engine) as session:
        yield session

def get_lobby_service(session:Annotated[Session, Depends(get_session)]) -> LobbyService:
    return LobbyService(session)

def get_sign_in_service(session:Annotated[Session, Depends(get_session)]) -> SignInService:
    return SignInService(session)

def get_sign_up_service(session:Annotated[Session, Depends(get_session)]) -> SignUpService:
    return SignUpService(session)