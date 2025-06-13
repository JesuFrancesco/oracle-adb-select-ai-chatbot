from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRouter

from controller.chat import router as chat_router
from controller.health import router as health_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(chat_router, prefix="/chat", tags=["chat"])
api_router.include_router(health_router, prefix="/health", tags=["health"])

app.include_router(api_router)

__all__ = ["app"]
