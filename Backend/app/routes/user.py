from fastapi import APIRouter, Depends, Security, HTTPException
from Backend.app.utils.logger import logger
from Backend.app.models.user import UserDataModel
from Backend.app.dto.user import UserDTO
from Backend.app.config.db_config import db_session
from Backend.app.config.ad_config import azure_scheme
from sqlalchemy.orm import Session

router = APIRouter()

def connect_db():
    db = db_session()  # Open a new session
    try:
        yield db
    finally:
        db.close()  # Close the session
        

@router.get(path="/user", dependencies=Security(dependency=azure_scheme, scopes=["User.Read"]), response_model=UserDTO)
# Example request: https://localhost/api/users/user?user_id=3
async def get_users_by_age(user_age: int, session: Session = Depends(connect_db)):  # This is the "request handler"/endpoint function
    try:
        result = session.query(UserDataModel).filter(UserDataModel.age > user_age).order_by(UserDataModel.age).all()
        # Note: `session.query` is synchronous so `await` is not needed
        
        if result:
            return [user.name for user in result]
        else:
            logger.warning("No data found")
            raise HTTPException(status_code=404, detail="No users found")
    except Exception as e:
        logger.exception(f"Error fetching user data: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")