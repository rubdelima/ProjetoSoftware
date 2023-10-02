from fastapi import APIRouter
from src.api import login
from src.api import user
from src.api import requirements

api_router = APIRouter()

api_router.include_router(
    login.router, prefix='/login', tags=['login']
)
api_router.include_router(
    user.router, prefix='/users', tags=['users']
)
api_router.include_router(
    requirements.router, prefix='/requirements', tags=['requirements']
)