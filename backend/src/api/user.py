from fastapi import APIRouter
from src.db.db_mananger import Db_manager
from src.schemas.user import User, UserList, UserPublic, UserDB


router = APIRouter()

database = Db_manager("http://localhost:4000")

def search_user(id: str, db: list): # função que procura um usuário na base de dados baseado no email
    for user in db:
        if user['id'] == id:
            return user
    return None

@router.post(
    '/', status_code=201, response_model=UserPublic, tags=['users']
)
def create_user(user: User):
    user_with_id = UserDB(**user.model_dump(), id=database.get_greatest_table_id('users') + 1)
    dumped_user = user_with_id.model_dump()
    database.post('users', dumped_user)

    return UserPublic(**user_with_id.model_dump())


@router.get('/', status_code=200, response_model=UserList, tags=['users'])
def read_user():
    return {'users': database.get('users')}
