FROM python:3.11-slim

WORKDIR /app

COPY . .

ENV PYTHONPATH="${PYTHONPATH}:/app/src/chatbot_server"

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "src.chatbot_server.main:app", "--host", "0.0.0.0", "--port", "8000"]
