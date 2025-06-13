# chatbot-server

## Iniciar server

```sh
./fastapi-dev.sh
```

## Crear y ejecutar imagen

```sh
# 1. Crear imagen
docker build -t jesufrancesco/gestdb-fastapi-server:latest .

# 2. Levantar container
docker run \
    -p8000:8000 \
    -e ORACLE_USER=str \
    -e ORACLE_PASSWORD=str \
    -e ORACLE_DSN=str \
    -e ORACLE_PROFILE=str \
    jesufrancesco/gestdb-fastapi-server
```
