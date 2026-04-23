from fastapi import APIRouter


api = APIRouter(prefix="/auth")

@api.get("/sign-up")
def sign_up():
    pass

@api.get("/token")
def token():
    pass

@api.get("/google")
def google():
    pass