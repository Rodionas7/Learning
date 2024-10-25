from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # CORS (Cross-Origin Resource Sharing) is a mechanism that allows resources (e.g. APIs) on a web page to be requested from other domains
from Backend.app.routes import router as api_router


app = FastAPI(title="App name", description="App description", version="0.0.1")

# Set CORS-allowed origins: these are the URLs that are permitted to make requests to the application. These are the domains or URLs from which the frontend may be hosted.
origins = ["http://localhost:5173", "https://localhost:5173"]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # This allows requests from the specified origins to access the application's endpoints
    allow_credentials=True, # Enables support for sending credentials (e.g. cookies)
    allow_methods=["*"],    # Specifies the HTTP methods (e.g. GET, POST, PUT, DELETE) that are allowed in CORS requests - ["*"] allows all methods
    allow_headers=["*"],    # Specifies the HTTP headers that are allowed in CORS requests - ["*"] allows all headers
    # Headers/Responses in HTTP requests provide additional information about the request/response being sent/received
)

# The base router for the API. The URL for the endpoints will be of the form /api/...,
app.include_router(api_router, prefix="/api")

# Startup and shutdown the GHDServerHandler listener to send logs to the server
@app.on_event("startup")
async def server_start():  # Asynchronous function: allows other parts of the program to continue executing while the task is in progress
    handler.listener.start()
    await azure_scheme.openid_config.load_config()  # "await" pauses the function's execution and allows other tasks to run until this is finished


@app.on_event("shutdown")
async def server_start():
    handler.listener.stop()
    pass


