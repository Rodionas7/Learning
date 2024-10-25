import pyodbc
from Backend.app.utils.logger import logger
from sqlalchemy import text, desc
from Backend.app.models.user import UserDataModel
from db_config import db_engine, db_session, db_connection_string


# SQLAlchemy - Using ORM
# SELECT
def get_user_orm(age):
    try:
        with db_session() as session:
            result = session.query(UserDataModel) \
                                    .filter(UserDataModel.age > age) \
                                    .order_by(desc(UserDataModel.age)) \
                                    .limit(5) \
                                    .all()
            if result:
                return [user.name for user in result]
            else:
                logger.warning("No data found")
                return None
    except:
        logger.exception("Error fetching user data")
        return None
    
result = get_user_orm(age=30)

# INSERT
def add_user_orm(name, age, email, birthday, datetime):
    try:
        with db_session() as session:  # This context manager handles the commit & rollback
            new_user = UserDataModel(name=name, age=age, email=email, birthday=birthday, datetime=datetime)  # Creating a new User object
            session.add(new_user)  # Adding the new user to the session
            return True
    except Exception:
        logger.exception("Error adding new user")
        return False
    
result = add_user_orm(name="John Doe", age=32, email="johndoe@example.com", birthday="1992-08-25", datetime="2024-10-24 14:30:00+00:00")

# UPDATE
def update_user_orm(user_id, new_name=None, new_age=None, new_email=None, new_birthday=None, new_datetime=None):
    try:
        with db_session() as session:
            user = session.query(UserDataModel).filter_by(id=user_id).first()  # Query the user by ID

            if not user:
                logger.warning(f"No user found with ID {user_id}")
                return False
            
            # Update the user's fields if new values are provided
            if new_name is not None:
                user.name = new_name
            if new_age is not None:
                user.age = new_age
            if new_email is not None:
                user.email = new_email
            if new_birthday is not None:
                user.birthday = new_birthday
            if new_datetime is not None:
                user.datetime = new_datetime
            
            return True
    except Exception:
        logger.exception("Error updating user")
        return False
    
result = update_user_orm(user_id=1, new_age=35)

# DELETE
def delete_user_orm(user_id):
    try:
        with db_session() as session:
            user = session.query(UserDataModel).filter_by(id=user_id).first()
            
            if not user:
                logger.warning(f"No user found with ID {user_id}")
                return False
            
            session.delete(user)  # Delete the user from the session
            return True
    except Exception:
        logger.exception("Error deleting user")
        return False

result = delete_user_orm(user_id=1)


# SQLAlchemy - Using SQL queries
# SELECT
def get_user_raw(age):
    sql_query = text("""
        SELECT name, email FROM users
        WHERE age > (:age)
        ORDER BY age DESC
        LIMIT 5;
    """)
    
    try:
        with db_engine.connect() as connection:
            result_execute = connection.execute(sql_query, age=age)
            result = result_execute.fetchall()
            
            if result:
                return [(user[0], user[1]) for user in result]
            else:
                logger.warning("No data found")
                return None
    except Exception:
        logger.exception("Error fetching user data")
        return None

result = get_user_raw(age=30)
    
# INSERT
def add_user_raw(name, age, email, birthday, datetime):
    sql_query = text("""
        INSERT INTO users (name, age, email, birthday, datetime)
        VALUES (:name, :age, :email, :birthday, :datetime)
    """)
    
    try:
        with db_engine.begin() as connection:  # This context manager (`begin``) handles the commit & rollback
            connection.execute(sql_query, name=name, age=age, email=email, birthday=birthday, datetime=datetime)
            return True
    except Exception:
        logger.exception("Error adding new user")
        return False
    
result = add_user_raw(name="Jane Doe", age=28, email="jane.doe@example.com", birthday="1996-03-05", datetime="2024-10-23 14:30:00")

# UPDATE
def update_user_raw(user_id, new_name=None, new_age=None, new_email=None, new_birthday=None, new_datetime=None):
    sql_query = text("""
        UPDATE users
        SET 
            name = COALESCE(:new_name, name),
            age = COALESCE(:new_age, age),
            email = COALESCE(:new_email, email),
            birthday = COALESCE(:new_birthday, birthday),
            datetime = COALESCE(:new_datetime, datetime)
        WHERE id = :user_id
    """)
    
    try:
        with db_engine.begin() as connection:
            result = connection.execute(sql_query, user_id=user_id, new_name=new_name, new_age=new_age, new_email=new_email, new_birthday=new_birthday, new_datetime=new_datetime)
            
            if result.rowcount > 0:  # This checks if the row has been updated
                return True
            else:
                logger.warning(f"No user found with ID {user_id}")
                return False
    except Exception:
        logger.exception("Error updating user")
        return False
    
result = update_user_raw(user_id=1, new_name="Jane Smith", new_age=29)

# DELETE
def delete_user_raw(user_id):
    sql_query = text("""
        DELETE FROM users
        WHERE id = :user_id
    """)
    
    try:
        with db_engine.begin() as connection:
            result = connection.execute(sql_query, user_id=user_id)
            
            if result.rowcount > 0:
                return True
            else:
                logger.warning(f"No user found with ID {user_id}")
                return False
    except Exception:
        logger.exception("Error deleting user")
        return False

result = delete_user_raw(user_id=1)


# pyODBC
# SELECT
def get_user(age):
    sql_query = """
        SELECT name, email FROM users
        WHERE age > ?
        ORDER BY age DESC
        LIMIT 5;
    """
    try:
        with pyodbc.connect(db_connection_string) as connection:
            with connection.cursor() as cursor:
                result_execute = cursor.execute(sql_query, age)
                result = result_execute.fetchall()
                
                if result:
                    return [(user[0], user[1]) for user in result]
                else:
                    logger.warning("No data found")
                    return None
    except Exception:
        logger.exception("Error fetching user data")
        return None
    
result = get_user(age=30)

# INSERT
def add_user(name, age, email, birthday, datetime):
    sql_query = """
        INSERT INTO users (name, age, email, birthday, datetime)
        VALUES (?, ?, ?, ?, ?);
    """
    try:
        with pyodbc.connect(db_connection_string) as connection:
            with connection.cursor() as cursor:
                cursor.execute(sql_query, name, age, email, birthday, datetime)
                connection.commit()  # Note that in insert/update/delete operation we need to commit the changes 
                return True
    except Exception as e:
        logger.exception("Error adding new user")
        return False

# Example call
add_user("John Doe", 25, "john@example.com", "1998-06-25", "2023-10-23 14:00:00")