from dataclasses import dataclass

from sqlalchemy import Select
from sqlmodel import col, or_

from data.models import Account


@dataclass
class ProfileSearch:
    keyword:str
    
    def where[S:Select](self, select:S) -> S:
        return select.where(or_(
            col(Account.username).like(f"%{self.keyword}"),
            col(Account.email).like(f"%{self.keyword}")
        ))
