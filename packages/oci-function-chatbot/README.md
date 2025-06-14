# oci-function-chatbot

Esta es la implementación de un endpoint que consulte la base de datos con Select AI
usando OCI Functions.

## Nota ⚠️

Para poder levantar un servicio de function es necesario el uso de:

- Docker, Podman, ...
- OCI CLI SDK (configurado)
- Fn CLI SDK
- Crear un repositorio de contenedores en Oracle Container Registry
- Crear una vcn + subred pública con Internet Gateway
- Crear una policy de acceso a fn-invocation
- Crear una API Gateway o Load Balancer que permita llamar a la función

Luego de ello se puede crear un Application dentro de OCI Functions (sea de arquitectura GENERIC_X86_ARM o equivalente)
y seguir las indicaciones de configuración para el CLI de Fn

## Comando de despliegue

```sh
fn -v deploy --app <application-name>
```
