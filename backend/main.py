from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from schemas.database import db_manager, init_database, cleanup_database

# Import routers
from routers import restaurants, tables, orders

app = FastAPI(
    title="Gus Food API",
    description="Restaurant management and ordering API",
    version="1.0.0"
)

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://frontend-production-c331.up.railway.app",  # Frontend URL
        "https://gus-production.up.railway.app",  # Backend URL
        "https://*.railway.app",  # Allow any Railway frontend domain
        "http://localhost:3000",  # Local development
        "http://localhost:5173",  # Vite dev server
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Debug middleware
@app.middleware("http")
async def log_requests(request, call_next):
    print(f"🔄 {request.method} {request.url}")
    try:
        response = await call_next(request)
        print(f"✅ {request.method} {request.url} -> {response.status_code}")
        return response
    except Exception as e:
        print(f"❌ {request.method} {request.url} -> ERROR: {e}")
        raise

# Include routers
app.include_router(restaurants.router)
app.include_router(tables.router)
app.include_router(orders.router)


class HealthResponse(BaseModel):
    status: str
    message: str
    database: str


@app.on_event("startup")
async def startup() -> None:
    try:
        await init_database()
        print("✅ Database initialized successfully")
    except Exception as e:
        print(f"❌ Database initialization failed: {e}")


@app.on_event("shutdown")
async def shutdown() -> None:
    await cleanup_database()


@app.get("/health", response_model=HealthResponse, status_code=200)
async def health_check() -> HealthResponse:
    db_healthy = await db_manager.health_check()
    return HealthResponse(
        status="healthy" if db_healthy else "degraded",
        message="Server is running successfully",
        database="connected" if db_healthy else "disconnected"
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)