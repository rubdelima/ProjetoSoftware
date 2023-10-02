from typing import Annotated
from fastapi import Depends, APIRouter, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from src.schemas.user import TokenResponse
from src.db.db_mananger import Db_manager

db = Db_manager("http://localhost:4000")
router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def search_user(email: str, db: list):
    for user in db:
        if user['email'] == email:
            return user
    return None

async def get_logged_user(token: Annotated[str, Depends(oauth2_scheme)]):
    db_users = db.get("users")
    for user in db_users:
        if user['id'] == int(token):
            return user

@router.post( # rota para realizar o login de um usuário
        "/", status_code=200  , response_model=TokenResponse, tags=["login"]
) 
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db_user = db.get("users")
    user = search_user(form_data.username, db_user)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user['senha'] == form_data.password:
        return TokenResponse(access_token=str(user['id']), token_type="bearer")
    else:
        raise HTTPException(status_code=401, detail="Wrong password")

