# Oracle Autonomous Database Select AI Chatbot demo

![Oracle](https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white)
![Meta](https://img.shields.io/badge/Meta-%230467DF.svg?style=for-the-badge&logo=Meta&logoColor=white)
![Tauri](https://img.shields.io/badge/tauri-%2324C8DB.svg?style=for-the-badge&logo=tauri&logoColor=%23FFFFFF)

Implementacion de un chatbot (con Tauri y FastAPI) usando la feature de Select AI en Oracle Database 23ai

<p align="middle">
    <img src="./docs/preview_gif.gif" width="800px" />
<p>

## Tabla de contenidos

1. [Tabla de contenidos](#tabla-de-contenidos)
2. [Estructura de repositorio](#estructura-de-repositorio)
3. [Instrucciones](#instrucciones)

## Estructura de repositorio

El presente repositorio presenta la siguiente estructura.

```sh
├── README.md
├── docs
│   └── ... # <- Archivos de documentación
└── packages
    ├── adb-chatbot # <- Tauri Frontend
    ├── chatbot-server # <- FastAPI Server
    ├── oci-function-chatbot  # <- OCI Function Server
    └── oracle-setup  # <- SQL Scripts to setup Select AI (DBMS_CLOUD & DBMS_CLOUD_AI)
```

## Instrucciones

0. Prerrequisitos

- Instalar MS Build Tools con MSVC
- Instalar SDK del lenguaje Rust
- Instalar NodeJS (mínimo versión 20)

1. Preparación de Autonomous Database

Correr scripts en [oracle-setup](./packages/oracle-setup)

```sh
├── models # <= Carpeta de modelos de embeddings (opcional)
│   ├── README.md
│   └── all_MiniLM_L12_v2.onnx
├── scripts # <= Ejecutar scripts del 1 al 6.2 en la Autonomous Database (scripts de DCL y seed son opcionales)
│   ├── 1.ora_ai_create_cred_template.sql
│   ├── 2.ora_ai_create_profile.sql
│   ├── 3.1.ora_ai_profile_set.sql
│   ├── 3.2.ora_ai_verify.sql
│   ├── 3.3.ora_ai_test.sql
│   ├── 4.ora_ai_plsql_procedures.sql
│   ├── 5.ora_ai_test_procedures.sql
│   ├── 6.1.ora_ai_load_onnx_model.sql
│   ├── 6.2.ora_ai_onnx_test.sql
│   ├── __bancolima_user_create.sql
│   └── __seed_employees.sql
└── token
    └── ... # <= Carpeta de secrets (opcional)
```

2. Correr frontend

Iniciar el frontend con los siguientes comandos de npm.

```sh
# 1. Instalar dependencias
npm install

# 2. Correr el frontend en modo desarrollo
npm run tauri dev
```

3. Correr servidor (FastAPI)

Iniciar el servidor que llamará a Autonomous Database

```sh
# 1. Instalar dependencias
pip install -r requirements.txt # o si tienes Poetry: poetry install

# 2. Correr servidor
./fastapi-dev.sh
```

**Nota:**

4. Despliegue de OCI Function

[Resumen de despliegue de OCI Function](./packages/oci-function-chatbot/README.md)
