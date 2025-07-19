# oci-function-chatbot

Esta es la implementación de un endpoint que consulte la base de datos con Select AI
usando OCI Functions.

## Requisitos

Para poder levantar un servicio de function se requiere lo siguiente.

- Tener instalado un motor de contenerización (e.g. Docker, Podman, ...)
- OCI CLI SDK (configurado con Auth Token)
- Crear un repositorio de contenedores en Oracle Container Registry
- Fn CLI SDK (configurado con container registry)
- Crear una VCN + subred pública con Internet Gateway
- Crear una policy de acceso a fn-invocation
- Crear una API Gateway o Load Balancer accesible desde internet que permita llamar a la función

Luego de ello se puede crear un Application dentro de OCI Functions (sea de arquitectura GENERIC_X86_ARM o equivalente)
y seguir las indicaciones de configuración para el CLI de Fn

## Comando de despliegue

```sh
fn -v deploy --app <application-name>
```
