import os
from database import get_oracle_connection
from log import database_logger


def ask_database(prompt: str) -> str:
    """
    Prompts database and returns a response.
    """
    database_logger.info("Conectando a la base de datos Oracle ADB para AI NARRATE...")
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

            database_logger.info("Ejecutando AI NARRATE...")

            # cursor.execute("SELECT AI NARRATE :prompt;", {"prompt": prompt})

            safe_prompt = prompt.replace("'", "''")
            sql = f"SELECT AI NARRATE '{safe_prompt}' FROM DUAL"
            cursor.execute(sql)

            lob = cursor.fetchone()[0]
            result = lob.read() if lob is not None else ""

            database_logger.info("AI NARRATE completado, resultado obtenido.")
            database_logger.info("Resultado: %s", result)

            return result
