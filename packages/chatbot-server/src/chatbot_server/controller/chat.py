import traceback
from fastapi import HTTPException
from fastapi.routing import APIRouter
from pydantic import BaseModel

from log import chat_logger
from service.chat import ask_database

router = APIRouter()


class PromptBody(BaseModel):
    prompt: str


@router.post("/answer")
async def get_chat(req: PromptBody):
    """
    Endpoint to get chat information.
    """

    prompt = req.prompt

    try:
        chat_logger.info(f"prompt={prompt}")

        if not prompt:
            raise HTTPException(status_code=400, detail="Prompt cannot be empty")

        return {"response": ask_database(prompt), "ok": True}

    except Exception as e:
        chat_logger.error(f"exception_type={type(e)}")
        traceback.print_exc()
        message = "Algo salio mal: " + str(e)

        raise HTTPException(status_code=500, detail=str(message))
