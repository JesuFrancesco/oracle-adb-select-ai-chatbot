import io
import json
import logging
import traceback as tb
from fdk import response

from adb_chat import ask_database
from log import root_logger

def handler(ctx, data: io.BytesIO=None):
    try:
        body = json.loads(data.getvalue())

        prompt = body.get("prompt", None)
        mode = body.get("mode", "narrate")

        mode = mode.upper().replace(" ", "")

        if mode not in ["NARRATE", "CHAT", "SQL", "SHOWSQL"]:
            return response.Response(
                ctx, response_data=json.dumps(
                    {"response": "Invalid mode", "ok": False}),
                headers={"Content-Type": "application/json"},
                status_code=400
            )

        if not prompt:
            return response.Response(
                ctx, response_data=json.dumps(
                    {"response": "Key 'prompt' missing", "ok": False}),
                headers={"Content-Type": "application/json"},
                status_code=400
            )

        root_logger.info("Calling ADB with prompt: %s and mode: %s", prompt, mode)

        answer, metadata = ask_database(prompt, mode)
        return response.Response(
            ctx, response_data=json.dumps(
                {"response": answer, "metadata": metadata, "ok": True},
                default=str,
            ),
            headers={"Content-Type": "application/json"}
        )
    except (Exception, ValueError) as ex:
        root_logger.error('Algo salió mal: ' + str(ex))
        tb.print_exc()

        return response.Response(
            ctx, response_data=json.dumps(
                {"message": "Algo salió mal."}),
            headers={"Content-Type": "application/json"},
            status_code=500,
        )

