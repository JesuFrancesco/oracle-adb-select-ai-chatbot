import os
from database import get_oracle_connection
from log import database_logger


def ask_database(prompt: str, mode: str) -> str:
    """
    Prompts database and returns a response.
    """
    database_logger.info("Conectando a la base de datos")
    pool = get_oracle_connection()

    with pool.acquire() as connection:
        with connection.cursor() as cursor:
            database_logger.info("Prompt proporcionado (%s)...", prompt)

            cursor.execute(
                """
                BEGIN
                    DBMS_CLOUD_AI.SET_PROFILE(:profile);
                END;
            """,
                {"profile": os.getenv("ORACLE_PROFILE")},
            )
            database_logger.info("Perfil de AI NARRATE configurado.")

            database_logger.info("Ejecutando SELECT AI:")

            # cursor.execute("SELECT AI NARRATE :prompt;", {"prompt": prompt}) # not supported with Select AI

            safe_prompt = prompt.replace("'", "''")
            
            database_logger.info("SELECT AI %s '%s'", mode, safe_prompt)
            sql = f"SELECT AI {mode} '{safe_prompt}'"
            cursor.execute(sql)

            response = ""
            metadata = []

            if mode != "SQL":
                lob = cursor.fetchone()[0]
                response = lob.read() if lob is not None and hasattr(lob, "read") else lob
            else:
                columns = [desc[0] for desc in cursor.description]
                rows = cursor.fetchall()
                def read_lob(val):
                    return val.read() if hasattr(val, "read") else val
                metadata = [tuple(read_lob(col) for col in row) for row in rows]
                metadata = [columns, *metadata]

            database_logger.info("AI NARRATE completado, resultado obtenido.")
            database_logger.info("Resultado: %s", response)
            database_logger.info("Metadata: %s", metadata)

            return response, metadata
