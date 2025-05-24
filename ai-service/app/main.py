 # app/main.py
 from fastapi import FastAPI
 from ai_service.app.api import routes as api_routes # Modified import
 
 app = FastAPI()
 
 app.include_router(api_routes.router, prefix="/api") # Include the router with a prefix
 
 # TODO: Include routers from api package
 @app.get("/")
 async def root():
     return {"message": "AI Service is running. TODO: implement endpoints"}