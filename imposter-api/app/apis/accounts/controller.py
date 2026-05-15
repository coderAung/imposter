from typing import Annotated, cast

from fastapi import APIRouter, Depends, Query, Request
from sqlmodel import Session

from app.apis.accounts.services import ProfileService
from app.outputs import Profile, ProfileListItem
from app.searches import ProfileSearch
from configs.auth import security
from data.database import get_session
from utilities.security import LoginUser

def get_profile_service(session:Annotated[Session, Depends(get_session)]) -> ProfileService:
    return ProfileService(session)

api = APIRouter(prefix="/accounts")

@api.get("/me", response_model=Profile)
@security.login(permit_roles=["player"])
def profile(request:Request, service:Annotated[ProfileService, Depends(get_profile_service)]):
    return service.profile(cast(LoginUser, request.state.user).userid)

@api.get("/", response_model=list[ProfileListItem])
def items(search:Annotated[ProfileSearch, Query()], request:Request, service:Annotated[ProfileService, Depends(get_profile_service)]):
    return service.search(search, cast(LoginUser, request.state.user).userid)