from sqlmodel import create_engine


engine = create_engine(url="sqlite:///app.db", echo=True)