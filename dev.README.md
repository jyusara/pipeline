# shopimax-apiv2

## Requisitos

1. **Instalar dependencias**:
    ```bash
    yarn install
    ```

2. **Validar que Docker esté instalado**:
    Asegúrate de tener Docker instalado y en funcionamiento. Puedes verificarlo ejecutando:
    ```bash
    docker --version
    docker-compose --version
    ```
    Verificar que la versión de docker compose sea v2.26.1 ++

3. **Levantar el proyecto**:
    Ejecuta el siguiente comando para levantar los servicios con Docker Compose:
    ```bash
    yarn dev:up
    ```

4. **Verificar los logs**:
    Espera a que los servicios de Docker Compose se levanten y luego ejecuta:
    ```bash
    docker logs -f --tail 100 shopimax-apiv2
    ```

Esto te permitirá ver los últimos 100 registros y seguir los logs en tiempo real.