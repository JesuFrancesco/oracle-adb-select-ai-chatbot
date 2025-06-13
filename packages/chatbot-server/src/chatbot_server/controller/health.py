from fastapi.routing import APIRouter

router = APIRouter()


@router.get("/heartbeat")
async def health_check():
    """
    Health check endpoint to verify if the server is running.
    """
    return {"status": "ok"}
