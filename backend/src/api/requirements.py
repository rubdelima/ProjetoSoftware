from fastapi import APIRouter, HTTPException
from src.db.db_mananger import Db_manager
from src.schemas.requirements import Requirement, Messages, NewRequirement, RequirementList
from src.api.user import search_user
from datetime import datetime

router = APIRouter()

database = Db_manager("http://localhost:4000")

def getRequirementId(user_id):
    rqs = database.get('requirements')
    cont = sum(1 for r in rqs if r['student_id'] == user_id)
    return (1000*user_id) + cont


@router.post(
    '/', status_code=201, response_model=Requirement, tags=['requirements']
)
async def create_requirement(nrq: NewRequirement):
    user = search_user(nrq.student_id ,database.get('users'))
    if user is None:
        raise HTTPException(status_code=404, detail='Houve um erro ao buscar o usuário')

    rq_id = getRequirementId(nrq.student_id)

    requirement = Requirement(id=rq_id,
                              student_id=nrq.student_id, accountable_id=None, title=nrq.title,
                              tipo=nrq.tipo, setor=user['setor'], status='não respondida',
                              messages=[ Messages(emissor_id=nrq.student_id, message=nrq.message, data=str(datetime.now()))]
                                )
    
    database.post('requirements', requirement.model_dump())

    return requirement


@router.get('/', status_code=200, response_model=RequirementList, tags=['requirements'])
async def get_requirement():
    return {'list_of_requirements': database.get('requirements')}

@router.get('/{user_id}/', status_code=200, response_model=RequirementList, tags=['requirements'])
async def get_requirement(user_id : int):
    return {'list_of_requirements': [i for i in database.get('requirements') if i['student_id'] == user_id]}

@router.post(
    '/messages/', status_code=201, response_model=Requirement, tags=['requirements']
)
async def put_mensagem(rq: Requirement, msg:  str):
    rq.status = 'respondida'
    rq.messages.append(Messages(emissor_id=rq.student_id, message=msg, data=str(datetime.now())))
    database.put('requirements',rq.id, rq.model_dump())
    return rq

@router.put(
    '/resolve/', status_code=201, response_model=Requirement, tags=['requirements']
)
async def put_mensagem(rq: Requirement):
    rq.status = 'finalizada'
    database.put('requirements',rq.id, rq.model_dump())
    return rq