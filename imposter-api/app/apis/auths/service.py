from abc import ABC, abstractmethod

class SignUpService:

    def sign_up():pass

class SignInService(ABC):

    @abstractmethod
    def sign_in():pass

class AppSignInService(SignInService):
    pass

class GoogleSignInService(SignInService):
    pass