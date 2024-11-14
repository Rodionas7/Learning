import os
import dotenv
from Backend.app.utils.logger import logger
from Backend.app.utils.get_credentials import get_vault_secret
from sqlalchemy.engine import URL  # The URL for connecting to the database
from sqlalchemy import Engine, create_engine  # An Engine is the starting point of the SQLAlchemy application - it manages a pool of database connections and provides a high-level interface for executing SQL commands
from sqlalchemy.orm import Session, sessionmaker # A Session is an instance of database interaction - each session object manages its own database connection


class DBConfig():
    def __init__(self):
        if os.path.exists(".env"):  # Local development
            dotenv.load_dotenv(".env")  
            self.server = os.getenv("server")
            self.database = os.getenv("database") 
            self.username = os.getenv("username")
            self.password = os.getenv("password")
        else:  # Production
            self.server = get_vault_secret("DB-SERVER")
            self.database =  get_vault_secret("DB-NAME")
            self.username =  get_vault_secret("DB-USERNAME")
            self.password = get_vault_secret("DB-PASSWORD")


    def get_url(self) -> URL:
        """
            Creating the database URL
        """
        
        CONNECTION_URL = URL.create(
            "mssql+pyodbc",
            host=self.server,
            database=self.database,
            username=self.username,
            password=self.password,
            query={"driver": "ODBC Driver 17 for SQL Server"},
        )
        
        return CONNECTION_URL
    
    
    def get_engine(self) -> Engine:
        """
            Creating the database engine
        """

        return create_engine(self.get_url())


    def get_session(self) -> Session:
        """
            Creating a database session
        """
        
        try:
            session = sessionmaker(bind=self.get_engine())()            
            return session
        except Exception as e:
            logger.exception("Error: ", e, stack_info=True)
            
    
    # Used for pyODBC
    def get_connection_string(self) -> str:
        return f"DRIVER={{SQL Server}};SERVER={self.server};DATABASE={self.database};UID={self.username};PWD={self.password}"


db_config = DBConfig()
db_engine = db_config.get_engine()
db_session = sessionmaker(autocommit=False, autoflush=True, bind=db_engine)
db_connection_string = db_config.get_connection_string()  # For pyODBC