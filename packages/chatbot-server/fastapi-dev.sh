#!/bin/bash
source .venv/bin/activate
export PYTHONPATH=$(pwd)/src/chatbot_server:$PYTHONPATH
uvicorn src.chatbot_server.main:app --port 8000 --reload