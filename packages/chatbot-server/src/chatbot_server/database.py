import dotenv
import os
import oracledb
from log import database_logger

dotenv.load_dotenv()

_connection_pool = None


def get_oracle_connection():
    """
    Returns a singleton Oracle connection pool.
    """
    global _connection_pool
    if _connection_pool is None:
        try:
            database_logger.info("Creando pool de conexión a Oracle ADB...")
            _connection_pool = oracledb.create_pool(
                user=os.getenv("ORACLE_USER"),
                password=os.getenv("ORACLE_PASSWORD"),
                dsn=os.getenv("ORACLE_DSN"),
                min=1,
                max=5,
                increment=1,
            )
        except oracledb.DatabaseError as e:
            database_logger.error(f"Database connection error: {e}")
            raise
    return _connection_pool
