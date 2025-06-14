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

        if not prompt:
            return response.Response(
                ctx, response_data=json.dumps(
                    {"response": "Key 'prompt' missing", "ok": False}),
                headers={"Content-Type": "application/json"},
                status_code=400
            )

        root_logger.info("Inside Python Hello World function")

        return response.Response(
            ctx, response_data=json.dumps(
                {"response": ask_database(prompt), "ok": True}),
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

