 # app/main.py
 from fastapi import FastAPI
 from fastapi.responses import JSONResponse
 from ai_service.app.api import routes as api_routes # Modified import
 
 app = FastAPI()
 
 app.include_router(api_routes.router, prefix="/api") # Include the router with a prefix
 
 @app.get("/healthz")
 async def health_check():
     return JSONResponse(content={"status": "ok"}, status_code=200)
 
 @app.get("/")
 async def root():
     return {"message": "AI Service is running."}