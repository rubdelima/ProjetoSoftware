from pydantic import BaseModel

class Messages(BaseModel):
    emissor_id : int
    message : str
    data : str

class Requirement(BaseModel):
    id :int
    student_id :int
    accountable_id :int | None
    title : str
    tipo : str
    setor : str
    status : str
    messages: list[Messages]

class NewRequirement(BaseModel):
    student_id : int
    title : str
    tipo : str
    message : str

class RequirementList(BaseModel):
    list_of_requirements : list[Requirement]