from Backend.app.utils.logger import logger
from fastapi import APIRouter
from Backend.app.models.user import UserDataModel
from Backend.app.dto.user import UserDTO
from Backend.app.utils.db_config import db_session 

router = APIRouter()

@router.get(path="/user/{user_id}", response_model=UserDTO)
# Example request: https://localhost/api/users/user?user_id=3
async def get_user(user_id):  # This is the "request handler"/endpoint function
    try:
        with db_session() as session:
            result = session.query(UserDataModel).filter(UserDataModel.id == user_id)
            
            if result:
                return [user.name for user in result]
            else:
                logger.warning("No data found")
                return None
    except:
        logger.exception("Error fetching user data")
        return None