from typing import Annotated, cast
from uuid import UUID

from fastapi import APIRouter, Depends, Request
from sqlmodel import Session

from app.apis.lobbies.services import LobbyService
from app.inputs import LobbyForm
from app.outputs import LobbyDetail, LobbyListItem, ModificationResult
from data.database import get_session
from configs.auth import security
from utilities.security import LoginUser


def get_lobby_service(session:Annotated[Session, Depends(get_session)]) -> LobbyService:
    return LobbyService(session)

api = APIRouter(prefix="/lobbies")

@api.get("/", response_model=list[LobbyListItem])
@security.login(permit_roles=["player"])
def items(service:Annotated[LobbyService, Depends(get_lobby_service)]):
    return service.items()

@api.put("/{lobby_id}", response_model=ModificationResult[UUID])
@security.login(permit_roles=["player"])
def update(form:LobbyForm, lobby_id:UUID, request:Request, service:Annotated[LobbyService, Depends(get_lobby_service)]):
    return service.update(form, lobby_id, cast(LoginUser, request.user).userid)

@api.get("/{lobby_id}", response_model=LobbyDetail)
@security.login(permit_roles=["player"])
def detail(lobby_id:UUID, service:Annotated[LobbyService, Depends(get_lobby_service)]):
    return service.detail(lobby_id)

@api.post("/", response_model=ModificationResult[UUID])
@security.login(permit_roles=["player"])
def create(form:LobbyForm, request:Request, service:Annotated[LobbyService, Depends(get_lobby_service)]):
    return service.create(form, cast(LoginUser, request.user).userid)