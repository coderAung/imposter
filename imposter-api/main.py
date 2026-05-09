from contextlib import asynccontextmanager

from sqlmodel import SQLModel

from app import engine, apis
from fastapi import FastAPI
import uvicorn

from app.apis import controllers

@asynccontextmanager
async def lifespan(app:FastAPI):
    print("""
    ======================================
    Application is started.
    ======================================
    """)
    
    SQLModel.metadata.create_all(bind=engine)

    yield

    print("""
    ======================================
    Application is closed.
    ======================================
    """)


app = FastAPI(lifespan=lifespan)
app.include_router(controllers.controller)

controllers.exception_handers(app)

if __name__ == "__main__":
    uvicorn.run(app=app)