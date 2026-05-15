from uuid import UUID

from sqlmodel import col, or_, select

from app.apis.base_service import BaseService
from app.outputs import Profile, ProfileListItem
from app.searches import ProfileSearch
from data.database import safecall
from data.models import Account


class ProfileService(BaseService):

    def search(self, search:ProfileSearch, userid:str) -> list[ProfileListItem]:
        # statement = select(Account).where(or_(
        #     col(Account.username).like(f"%{self.keyword}"),
        #     col(Account.email).like(f"%{self.keyword}")
        # ))
        statement = search.where(select(Account)).where(Account.account_id != UUID(userid))
        result = self.session.exec(statement)


    def profile(self, userid:str) -> Profile:
        account = safecall(self.session.get(Account, UUID(userid)), "Account", "account_id", userid)
        statement = Profile.select().where(Account.account_id == account.account_id)
        result = self.session.exec(statement).one()
        [lobbies, followers, followings] = result
        return Profile(
            account_id=account.account_id,
            username=account.username,
            name=account.name,
            email=account.email,
            profile_photo=account.profile_photo,
            lobbies=lobbies,
            followers=followers,
            followings=followings,
        )
