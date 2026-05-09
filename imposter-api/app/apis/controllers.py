from http import HTTPStatus

from fastapi import APIRouter, FastAPI, Request
from fastapi.responses import JSONResponse

from app.exceptions import AppBusinessException

import app.apis.auths.controller as auths_controller
import app.apis.lobbies.controller as lobbies_controller

controller = APIRouter()

controller.include_router(router=auths_controller.api)
controller.include_router(router=lobbies_controller.api)

def exception_handers(app:FastAPI):
    @app.exception_handler(AppBusinessException)
    async def app_business_exception_handler(request:Request, exc:AppBusinessException):
        return JSONResponse(
            status_code=HTTPStatus.BAD_REQUEST,
            content={"message": exc.message}
        )