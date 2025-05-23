 # app/main.py
 from fastapi import FastAPI
 
 app = FastAPI()
 
 # TODO: Include routers from api package
 @app.get("/")
 async def root():
     return {"message": "AI Service is running. TODO: implement endpoints"}