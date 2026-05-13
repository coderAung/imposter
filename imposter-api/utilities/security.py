from dataclasses import dataclass
from functools import wraps
from typing import Any, Callable
import inspect

class SecurityException(Exception):

    def __init__(self, message:str):
        super().__init__(message)
        self.message = message

@dataclass(frozen=True)
class LoginUser:
    userid:str
    username:str
    password:str
    role:str

class SecurityConfiguration:

    def __init__(self, login_user:Callable[..., LoginUser]):
        self._login_user = login_user
    
    def login(self, func:Callable[..., Any]=None, *, permit_roles:list[str]=None):
        def decorator(func:Callable[..., Any]):
            sig = inspect.signature(func)
            login_user_param = inspect.Parameter(
                name="login_user",
                kind=inspect.Parameter.POSITIONAL_OR_KEYWORD,
                default=self._login_user(),
                annotation=LoginUser)
            
            @wraps(func)
            def wrapper(*args, **kwargs):
                login_user:LoginUser = kwargs.get("login_user", None)
                kwargs.pop("login_user")
                if login_user is None:
                    raise SecurityException("Unauthenticated.")
                if permit_roles is not None and login_user.role not in permit_roles:
                    raise SecurityException("Forbidden Access.")

                return func(*args, **kwargs)
            
            wrapper.__signature__ = sig.replace(parameters=[*sig.parameters.values(), login_user_param])
            return wrapper
        if permit_roles is None and func is not None:
            return decorator(func=func)
        else:return decorator
