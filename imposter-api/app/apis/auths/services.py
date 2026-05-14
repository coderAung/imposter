from datetime import datetime
from uuid import UUID

from app.apis.base_service import BaseService
from configs.auth import hash_password, jwt_encode, verify_password
from data.database import safecall, save_and_refresh
from utilities.exceptions import AppBusinessException
from app.inputs import SignInForm, SignUpForm
from sqlmodel import select

from data.models import Account, AccountPassword
from app.outputs import ModificationResult

class SignUpService(BaseService):

    def sign_up(self, form:SignUpForm) -> ModificationResult[UUID]:
        with self.session.begin():
            if self.session.exec(select(Account).where(Account.email == form.email)).first() is not None:
                raise AppBusinessException("Invalid email.")
            username = form.email.split("@")[0]
            account = Account(name=form.name, 
                              email=form.email, 
                              username=username, 
                              account_type=Account.AccountType.E,
                              created_at=datetime.now())
            save_and_refresh(self.session, account)
            password = AccountPassword(account_id=account.account_id, password=hash_password(form.password), updated_at=datetime.now())
            save_and_refresh(self.session, password, commit=True)
        return ModificationResult[UUID](account.account_id)

class SignInService(BaseService):

    def sign_in(self, form:SignInForm) -> str:
        with self.session.begin():
            account = safecall(self.session.exec(select(Account).where(Account.email == form.email)).first(), "Account", "email", form.email)
            password = safecall(self.session.get(AccountPassword, account.account_id), "AccountPassword", "id", account.account_id)
            if not verify_password(form.password, password.password):
                raise AppBusinessException("Wrong password.")
        return jwt_encode({"account_id": str(account.account_id), "email":account.email, "role": "player"})


class GoogleSignInService:
    pass