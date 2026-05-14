from contextlib import asynccontextmanager

from sqlmodel import SQLModel

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from data.database import engine

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
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

controllers.exception_handers(app)

if __name__ == "__main__":
    uvicorn.run(app=app)