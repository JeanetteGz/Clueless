from bson.objectid import ObjectId
from pydantic import BaseModel
from typing import List


class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: ObjectId | str) -> ObjectId:
        if value:
            try:
                ObjectId(value)
            except:
                raise ValueError(f"Not a valid object id: {value}")
        return value


class SessionOut(BaseModel):
    jti: str
    account_id: str


class AccountIn(BaseModel):
    email: str
    password: str
    first: str
    last: str


class Account(AccountIn):
    id: PydanticObjectId
    # roles: List[str]


class AccountOut(BaseModel):
    id: str
    email: str
    first: str
    last: str
    # roles: List[str]


"""

class SessionOut(BaseModel):
    jti: str
    account_id: str


class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str


class Account(AccountIn):
    id: PydanticObjectId
    roles: List[str]


class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str
    roles: List[str]
"""