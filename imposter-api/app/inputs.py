from dataclasses import dataclass
from uuid import UUID


@dataclass
class SignInForm:
    email:str
    password:str

@dataclass
class SignUpForm:
    name:str
    email:str
    password:str
    confirm:str

@dataclass
class GameForm:
    lobby_id:UUID
    category_id:int
    imposters:int
    created_by:UUID

@dataclass
class LobbyInviteForm:
    lobby_id:UUID
    invited_by:UUID
    player_id:UUID

@dataclass
class LobbyJoinForm:
    lobby_id:UUID
    joined_by:str

@dataclass
class LobbyForm:
    name:str