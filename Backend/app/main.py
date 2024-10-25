import uvicorn  # Fast ASGI (Asynchronous Server Gateway Interface) server implementation. It allows to run Python web applications that are built using frameworks such as FastAPI.
import Backend.app.config.app_config as config

app = config.app  # The FastAPI application object that will be run by the server

if __name__ == "__main__":
    # Start the server and run the application on http://localhost:8000
    uvicorn.run("Backend.app.main:app", host="localhost", port=8000, reload=True)