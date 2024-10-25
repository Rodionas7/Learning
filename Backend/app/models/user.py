from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, Float, String, Boolean
from sqlalchemy.dialects.mssql import DATETIMEOFFSET, DATE

SQLBaseModel = declarative_base()

class UserDataModel(SQLBaseModel):
    __tablename__ = "users"  # The exact name of the database table
    id = Column(type_=Integer, primary_key=True, index=True)
    name = Column(type_=String, nullable=False)
    age = Column(type_=Integer, nullable=False) 
    email = Column(type_=String, nullable=False, unique=True)
    birthday = Column(type_=DATE, nullable=False)
    datetime = Column(type_=DATETIMEOFFSET(0), nullable=True)
    
# `Column` parameters:
# type_: The data type of the column (e.g. Integer, String, DateTime, ...)
# primary_key (PK): Indicates if this column is a primary key (True or False). NULL values are not allowed.
# autoincrement: Determines if values should be automatically incremented (usually in the PK column)
# foreign_key: Establishes a foreign key relationship (`ForeignKey("<other_table.column_name>"))
# index: Creates an index on this column (True or False), which can improve query performance for columns that are frequently searched
# unique: Determines if the column must contain unique values (True) or not (False). NULL values are allowed by default.
# nullable: Determines if the column allows for NULL values (True) or not (False).
# default: Specifies a default value thats' assigned at the application level (if none is specified)
# server_default: Specifies a default value that’s assigned at the database level (if none is specified)
