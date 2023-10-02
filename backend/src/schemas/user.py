from pydantic import BaseModel

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class User(BaseModel):
    email: str
    senha: str
    nome : str
    tipo : str
    setor : str

class UserDB(User):
    id : int

class UserPublic(BaseModel):
    email: str
    nome : str
    tipo : str

class UserList(BaseModel):
    users : list[User]

