from dataclasses import dataclass
from datetime import datetime
from uuid import UUID


@dataclass
class Profile:
    account_id:UUID
    username:str
    name:str
    email:str
    profile_photo:str
    lobbies:int;games:int;followers:int;followings:int

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