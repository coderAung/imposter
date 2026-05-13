from uuid import UUID, uuid4

from app.apis.base_service import BaseService
from app.inputs import LobbyForm
from app.outputs import LobbyDetail, LobbyListItem, ModificationResult, PlayerProfile
from data.database import safecall
from data.models import Lobby


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

    def create(self, form:LobbyForm) -> ModificationResult[UUID]:pass