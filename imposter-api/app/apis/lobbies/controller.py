from typing import Annotated, cast
from uuid import UUID

from fastapi import APIRouter, Depends, Request
from sqlmodel import Session

from app.apis.lobbies.services import LobbyService
from app.inputs import LobbyForm, LobbyJoinForm
from app.outputs import LobbyDetail, LobbyListItem, ModificationResult
from data.database import get_session
from configs.auth import security
from utilities.security import LoginUser


def get_lobby_service(session:Annotated[Session, Depends(get_session)]) -> LobbyService:
    return LobbyService(session)

api = APIRouter(prefix="/lobbies")

@api.get("/", response_model=list[LobbyListItem])
@security.login(permit_roles=["player"])
def items(request:Request, service:Annotated[LobbyService, Depends(get_lobby_service)]):
    return service.lobbies(cast(LoginUser, request.state.user).userid)

@api.put("/{lobby_id}", response_model=ModificationResult[UUID])
@security.login(permit_roles=["player"])
def update(form:LobbyForm, lobby_id:UUID, request:Request, service:Annotated[LobbyService, Depends(get_lobby_service)]):
    return service.update(form, lobby_id, cast(LoginUser, request.state.user).userid)

@api.get("/{lobby_id}", response_model=LobbyDetail)
@security.login(permit_roles=["player"])
def detail(lobby_id:UUID, service:Annotated[LobbyService, Depends(get_lobby_service)]):
    return service.detail(lobby_id)

@api.post("/", response_model=ModificationResult[UUID])
@security.login(permit_roles=["player"])
def create(form:LobbyForm, request:Request, service:Annotated[LobbyService, Depends(get_lobby_service)]):
    return service.create(form, cast(LoginUser, request.state.user).userid)

@api.post("/join", response_model=ModificationResult[UUID])
@security.login(permit_roles=["player"])
def join(form:LobbyJoinForm, service:Annotated[LobbyService, Depends(get_lobby_service)]):
    return service.add_player(lobby_id=form.lobby_id, player_id=UUID(form.joined_by))

@api.post("/leave/{lobby_id}", response_model=ModificationResult[UUID])
@security.login(permit_roles=["player"])
def leave(lobby_id:UUID, request:Request, service:Annotated[LobbyService, Depends(get_lobby_service)]):
    return service.remove_player(lobby_id=lobby_id, player_id=UUID(cast(LoginUser, request.state.user).userid))