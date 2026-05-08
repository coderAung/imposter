from fastapi import APIRouter

from app.apis import lobbies


controller = APIRouter()

controller.include_router(lobbies.controller.api)