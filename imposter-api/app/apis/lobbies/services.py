from uuid import UUID

from app.apis.base_service import BaseService
from app.inputs import LobbyForm
from app.outputs import LobbyDetail, LobbyListItem, ModificationResult


class LobbyService(BaseService):

    def items() -> list[LobbyListItem]:pass

    def detail(id:UUID) -> LobbyDetail:pass

    def create(form:LobbyForm) -> ModificationResult[UUID]:pass