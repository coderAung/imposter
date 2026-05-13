from datetime import datetime
from uuid import UUID, uuid4

from app.apis.base_service import BaseService
from app.inputs import LobbyForm
from app.outputs import LobbyDetail, LobbyListItem, ModificationResult, PlayerProfile
from data.database import safecall, save_and_refresh
from data.models import Account, Lobby
from utilities.constants import LOBBY_LIMIT
from utilities.exceptions import AppBusinessException


class LobbyService(BaseService):

    def items(self) -> list[LobbyListItem]:
        return [LobbyListItem(lobby_id=uuid4(), name="Hello", players=7)]

    def detail(self, id:UUID) -> LobbyDetail:
        lobby = safecall(self.session.get(Lobby, id), "Lobby", "id", str(id))
        return LobbyDetail(
            lobby_id=lobby.lobby_id,
            name=lobby.name,
            created_at=lobby.created_at,
            players=[PlayerProfile(player_id=p.account_id, name=p.name, username=p.username, profile=p.profile_photo) for p in lobby.players]
        )
    
    def update(self, form:LobbyForm, lobby_id:UUID, userid:str) -> ModificationResult[UUID]:
        with self.session.begin():
            lobby = safecall(self.session.get(Lobby, lobby_id), "Lobby", "lobby_id", lobby_id)
            if lobby.created_by != UUID(userid):
                raise AppBusinessException(f"User with id : {userid} cannot update lobby.")
            lobby.name = form.name
            save_and_refresh(self.session, lobby)
        return ModificationResult[UUID](lobby_id)

    def create(self, form:LobbyForm, userid:str) -> ModificationResult[UUID]:
        with self.session.begin():
            account = safecall(self.session.get(Account, UUID(userid)), "Account", "account_id", userid)
            lobby = Lobby(name=form.name, limit=LOBBY_LIMIT, created_at=datetime.now(), created_by=account.account_id)
            save_and_refresh(self.session, lobby)
        return ModificationResult[UUID](lobby.lobby_id)
    
    def add_player(self, lobby_id:UUID, player_id:UUID):
        with self.session.begin():
            lobby = safecall(self.session.get(Lobby, lobby_id), "Lobby", "lobby_id", lobby_id)
            if len(lobby.players) == lobby.limit:raise AppBusinessException("Lobby is full.")

            account = safecall(self.session.get(Account, player_id), "Account", "player_id", player_id)
            if account in lobby.players:raise AppBusinessException("Player is already in Lobby.")

            lobby.players.append(account)
            save_and_refresh(self.session, lobby)

    def remove_player(self, lobby_id:UUID, player_id:UUID):
        with self.session.begin():
            lobby = safecall(self.session.get(Lobby, lobby_id), "Lobby", "lobby_id", lobby_id)
            account = safecall(self.session.get(Account, player_id), "Account", "player_id", player_id)
            if account not in lobby.players:raise AppBusinessException("Player is not in the Lobby.")
            lobby.players.remove(account)
            save_and_refresh(lobby)

    def add_players(self, lobby_id:UUID, player_ids:list[UUID]):
        with self.session.begin():
            lobby = safecall(self.session.get(Lobby, lobby_id), "Lobby", "lobby_id", lobby_id)
            players:list[Account] = []
            for player_id in player_ids:
                account = safecall(self.session.get(Account, player_id), "Account", "player_id", player_id)
                players.append(account)
            lobby.players = players
            save_and_refresh(self.session, lobby)
    