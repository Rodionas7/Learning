import os
import dotenv
from Backend.utils.logger import logger
from typing import Optional
from sqlalchemy.engine import URL  # The URL for connecting to the database
from sqlalchemy import Engine, create_engine  # An Engine is the starting point of the SQLAlchemy application - it manages a pool of database connections and provides a high-level interface for executing SQL commands
from azure.keyvault.secrets import SecretClient
from azure.identity import DefaultAzureCredential
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
            self.server = self.get_database_credentials("DB-SERVER")
            self.database =  self.get_database_credentials("DB-DATABASE")
            self.username =  self.get_database_credentials("DB-USERNAME")
            self.password = self.get_database_credentials("DB-PASSWORD")


    def get_database_credentials(self, key: str) -> Optional[str]:
        """
            Fetching the database credentials from an Azure Key Vault
        """

        VAULT_URL = r"https://{...}.vault.azure.net/"
        credential = DefaultAzureCredential()

        try:
            client = SecretClient(vault_url=VAULT_URL, credential=credential)
            retrieved_secret = client.get_secret(key)
            return retrieved_secret.value

        except Exception as e:
            logger.error(f"Connection to SecretClient could not be established. Error: {e}")
            return os.getenv(key.upper())


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