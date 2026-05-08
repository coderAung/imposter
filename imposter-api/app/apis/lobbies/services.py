from uuid import UUID

from app.apis.base_service import BaseService
from app.outputs import LobbyDetail, LobbyListItem


class LobbyService(BaseService):

    def items() -> list[LobbyListItem]:pass

    def detail(id:UUID) -> LobbyDetail:pass