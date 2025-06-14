import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

root_logger = logging.getLogger("root_logger")
database_logger = logging.getLogger("db_logger")
