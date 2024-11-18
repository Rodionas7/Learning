from fastapi import APIRouter  # Allows to define and organise routes for an API
from Backend.app.routes.user import router as user_router

# A router is an object that is responsible for handling the routing and dispatching of incoming HTTP requests to the appropriate endpoint functions
router = APIRouter() 
router.include_router(
    router=user_router,  # The router object to be included in the application
    prefix="/users",  # The prefix or base path that will be added to all the routes. For example, if the route is defined as @router.get("/user") then the endpoint will be accessible at "api/users/user".
    tags=["users"]  # Tags help to group and organise routes (i.e. contain related endpoints)
)