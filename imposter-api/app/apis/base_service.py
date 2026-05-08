from abc import ABC

from sqlmodel import Session


class BaseService(ABC):

    def __init__(self, session:Session):
        super().__init__()
        self.session = session