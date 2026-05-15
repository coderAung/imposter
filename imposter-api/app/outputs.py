from dataclasses import dataclass
from datetime import datetime
from uuid import UUID

from sqlmodel import func, select, distinct
from sqlalchemy.orm import aliased

from data.models import Account, Follower, PlayerLobbyLink


@dataclass
class Profile:
    account_id:UUID
    username:str
    name:str
    email:str
    profile_photo:str
    lobbies:int;followers:int;followings:int

    @staticmethod
    def select():
        Followers = aliased(Follower)
        Followings = aliased(Follower)
        statement = (select(
            func.count(distinct(PlayerLobbyLink.lobby_id)).label("lobbies"),
            func.count(distinct(Followers.account_id)).label("followers"),
            func.count(distinct(Followings.follower_id)).label("followings"))
        .select_from(Account)
        .outerjoin(PlayerLobbyLink, PlayerLobbyLink.account_id == Account.account_id)
        .outerjoin(Followers, Followers.account_id == Account.account_id)
        .outerjoin(Followings, Followings.follower_id == Account.account_id)
        .group_by(Account.account_id))
        return statement


@dataclass
class LobbyListItem:
    lobby_id:UUID
    name:str
    players:int

@dataclass
class PlayerProfile:
    player_id:UUID
    name:str
    profile:str
    username:str

@dataclass
class LobbyDetail:
    lobby_id:UUID
    name:str
    players:list[PlayerProfile]
    created_at:datetime

@dataclass
class CurrentGame:
    game_id:UUID
    lobby_id:UUID
    lobby_name:str
    players:int

@dataclass
class GameSecret:
    eng:str;myan:str

@dataclass
class GameDisplay:
    game_id:UUID
    started_at:datetime
    secret:GameSecret
    players:list[PlayerProfile]

@dataclass
class VoteResult(PlayerProfile):
    votes:int

@dataclass
class GameResult:
    game_id:UUID
    game_id:UUID
    started_at:datetime
    secret:GameSecret
    players:list[VoteResult]
    imposter:list[PlayerProfile]

@dataclass
class CategoryListItem:
    category_id:int
    name:str

@dataclass
class ModificationResult[ID]:
    result_id:ID

@dataclass
class ProfileListItem(PlayerProfile):
    email:str