from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends

import app
from app.apis.lobbies.services import LobbyService
from app.dependencies import get_lobby_service
from app.inputs import LobbyForm
from app.outputs import LobbyDetail, LobbyListItem, ModificationResult


api = APIRouter(prefix="/lobbies")

@api.get("/", response_model=list[LobbyListItem])
@app.security.login(permit_roles=["player"])
def items(service:Annotated[LobbyService, Depends(get_lobby_service)]):
    return service.items()


@api.get("/{id}", response_model=LobbyDetail)
@app.security.login(permit_roles=["player"])
def detail(id:UUID, service:Annotated[LobbyService, Depends(get_lobby_service)]):
    return service.detail(id)

@api.post("/", response_model=ModificationResult[UUID])
@app.security.login(permit_roles=["player"])
def create(form:LobbyForm, service:Annotated[LobbyService, Depends(get_lobby_service)]):
    return service.create(form)