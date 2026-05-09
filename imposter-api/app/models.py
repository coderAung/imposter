from datetime import datetime
from enum import Enum
from typing import Optional
from uuid import UUID, uuid4

from sqlmodel import Field, Relationship, SQLModel


class PlayerLobbyLink(SQLModel, table=True):
    account_id:UUID = Field(primary_key=True, default=None, foreign_key="account.account_id")
    lobby_id:UUID = Field(primary_key=True, default=None, foreign_key="lobby.lobby_id")
    joined_at:datetime = Field()

class AdminAccount(SQLModel, table=True):
    admin_id:Optional[UUID] = Field(primary_key=True, default=None)
    admin_email:str = Field(unique=True)
    admin_password:str = Field()
    created_at:datetime = Field()


class Account(SQLModel, table=True):
    account_id:Optional[UUID] = Field(primary_key=True, default_factory=uuid4)
    name:str = Field(nullable=False)
    email:str = Field(unique=True)
    username:str = Field(nullable=False, unique=True)
    profile_photo:str = Field(nullable=True)
    created_at:datetime = Field()
    lobbies:list["Lobby"] = Relationship(back_populates="players", link_model=PlayerLobbyLink)

    class AccountType(Enum):
        G = "Google"
        T = "Telegram"
        E = "Email"

    account_type:AccountType = Field(nullable=False)


class AccountPassword(SQLModel, table=True):
    account_id:UUID = Field(primary_key=True, foreign_key="account.account_id")
    password:str = Field(nullable=False)
    updated_at:datetime

class Follower(SQLModel, table=True):
    account_id:UUID = Field(primary_key=True, foreign_key="account.account_id")
    follower_id:UUID = Field(primary_key=True, foreign_key="account.account_id")
    followed_at:datetime = Field()

class Category(SQLModel, table=True):
    category_id:Optional[int] = Field(primary_key=True)
    title:str = Field(nullable=False)
    context:str = Field(nullable=False)
    created_by:UUID = Field(foreign_key="adminaccount.admin_id")

class Lobby(SQLModel, table=True):
    lobby_id:UUID = Field(primary_key=True, default_factory=uuid4)
    players:list[Account] = Relationship(back_populates="lobbies", link_model=PlayerLobbyLink)
    created_by:UUID = Field(foreign_key="account.account_id")
    is_playing:bool = Field(nullable=False)
    limit:int = Field(nullable=False)
    created_at:datetime = Field()

class Game(SQLModel, table=True):
    game_id:UUID = Field(primary_key=True, default_factory=uuid4)
    lobby_id:UUID = Field(nullable=False, foreign_key="lobby.lobby_id")
    imposter_id:UUID = Field(nullable=False)
    is_ended:bool = Field(nullable=Field)

class History(SQLModel, table=True):
    game_id:UUID = Field(primary_key=True, foreign_key="game.game_id")
    winner_id:UUID = Field(nullable=False)

class CurrentGame(SQLModel, table=True):
    account_id:UUID = Field(primary_key=True, foreign_key="account.account_id")
    game_id:UUID = Field(foreign_key="game.game_id")
