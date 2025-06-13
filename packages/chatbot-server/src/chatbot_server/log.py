import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

chat_logger = logging.getLogger("chat_logger")
database_logger = logging.getLogger("db_logger")
