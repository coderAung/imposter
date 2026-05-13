from sqlmodel import SQLModel, Session, create_engine

from utilities.exceptions import AppBusinessException
import data.models

engine = create_engine(url="sqlite:///app.db", echo=True)

def get_session():
    with Session(bind=engine) as session:
        yield session

def safecall[T](t:T | None, model:str, key:str, value:str) -> T:
    if t is None:
        raise AppBusinessException(f"{model} with {key} : {value} is not found.")
    return t

def save_and_refresh[T:SQLModel](session:Session, t:T):
    session.add(t)
    session.flush()
    session.refresh(t)