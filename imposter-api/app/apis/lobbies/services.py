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

    def detail(self, lobby_id:UUID) -> LobbyDetail:
        lobby = safecall(self.session.get(Lobby, lobby_id), "Lobby", "lobby_id", str(lobby_id))
        return LobbyDetail(
            lobby_id=lobby.lobby_id,
            name=lobby.name,
            created_at=lobby.created_at,
            players=[PlayerProfile(player_id=p.account_id, name=p.name, username=p.username, profile=p.profile_photo) for p in lobby.players]
        )
    
    def lobbies(self, userid:str) -> list[LobbyListItem]:
        account = safecall(self.session.get(Account, UUID(userid)), "Account", "account_id", userid)
        return [LobbyListItem(lobby_id=lobby.lobby_id, name=lobby.name, players=len(lobby.players)) for lobby in account.lobbies]
    
    def update(self, form:LobbyForm, lobby_id:UUID, userid:str) -> ModificationResult[UUID]:
        try:
            lobby = safecall(self.session.get(Lobby, lobby_id), "Lobby", "lobby_id", lobby_id)
            if lobby.created_by != UUID(userid):
                raise AppBusinessException(f"User with id : {userid} cannot update lobby.")
            lobby.name = form.name
            save_and_refresh(self.session, lobby, commit=True)
            return ModificationResult[UUID](lobby_id)
        except Exception as e:
            self.session.rollback()
            print(e)
            raise e

    def create(self, form:LobbyForm, userid:str) -> ModificationResult[UUID]:
        try:
            account = safecall(self.session.get(Account, UUID(userid)), "Account", "account_id", userid)
            lobby = Lobby(name=form.name, limit=LOBBY_LIMIT, is_playing=False, created_at=datetime.now(), created_by=account.account_id)
            save_and_refresh(self.session, lobby)
            lobby.players = [account]
            save_and_refresh(self.session, lobby, commit=True)
            return ModificationResult[UUID](lobby.lobby_id)
        except Exception as e:
            self.session.rollback()
            print(e)
            raise e
    
    def add_player(self, lobby_id:UUID, player_id:UUID) -> ModificationResult[UUID]:
        try:
            lobby = safecall(self.session.get(Lobby, lobby_id), "Lobby", "lobby_id", lobby_id)
            if len(lobby.players) == lobby.limit:raise AppBusinessException("Lobby is full.")

            account = safecall(self.session.get(Account, player_id), "Account", "player_id", player_id)
            if account in lobby.players:raise AppBusinessException("Player is already in Lobby.")

            lobby.players.append(account)
            save_and_refresh(self.session, lobby, commit=True)
            return ModificationResult[UUID](lobby.lobby_id)
        except Exception as e:
            self.session.rollback()
            print(e)
            raise e

    def remove_player(self, lobby_id:UUID, player_id:UUID):
        try:
            lobby = safecall(self.session.get(Lobby, lobby_id), "Lobby", "lobby_id", lobby_id)
            account = safecall(self.session.get(Account, player_id), "Account", "player_id", player_id)
            if account not in lobby.players:raise AppBusinessException("Player is not in the Lobby.")
            lobby.players.remove(account)
            save_and_refresh(self.session, lobby, commit=True)
            return ModificationResult[UUID](player_id)
        except Exception as e:
            self.session.rollback()
            print(e)
            raise e

    def add_players(self, lobby_id:UUID, player_ids:list[UUID]):
        try:
            lobby = safecall(self.session.get(Lobby, lobby_id), "Lobby", "lobby_id", lobby_id)
            players:list[Account] = []
            for player_id in player_ids:
                account = safecall(self.session.get(Account, player_id), "Account", "player_id", player_id)
                players.append(account)
            lobby.players = players
            save_and_refresh(self.session, lobby, commit=True)
        except Exception as e:
            self.session.rollback()
            print(e)
            raise e
