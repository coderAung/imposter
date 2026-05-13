import os

from dotenv import load_dotenv

load_dotenv()
SECURITY_KEY = os.getenv("SECURITY_KEY")
ALGO = os.getenv("ALGO")
LOBBY_LIMIT = os.getenv("LOBBY_LIMIT")