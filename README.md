# Restaurant Finder API

## Descripción
La API de Restaurant Finder es una solución de backend diseñada para permitir a los usuarios buscar restaurantes cercanos basados en su ubicación actual. Esta API registra cada búsqueda como una transacción, permitiendo a los usuarios revisar su historial de búsquedas.

## Arquitectura
Este proyecto está construido usando Node.js y Express para el servidor backend, con MongoDB como base de datos para almacenar datos de usuarios y transacciones. Utiliza JWT para la autenticación de usuarios y la API de Google Places para obtener información sobre restaurantes cercanos.

## Tecnologías Utilizadas
- Node.js
- Express.js
- MongoDB
- Docker y Docker Compose
- JWT (JSON Web Tokens)
- Google Places API

## Cómo Correr el Proyecto
Para iniciar el proyecto, asegúrate de tener Docker y Docker Compose instalados en tu sistema. Luego sigue los siguientes pasos:

1. Clona el repositorio:
   ```bash
   git clone <link-to-repository>
   cd repo-directory
Construye y levanta los servicios usando Docker Compose:
```bash
  docker-compose up --build
```
## Cómo Probar la API
### Registro de Usuario
Para registrar un nuevo usuario, envía una petición POST a /api/register con el siguiente JSON:

```json
{
  "username": "nuevoUsuario",
  "password": "passwordSeguro123"
}
```
### Iniciar Sesión
Para iniciar sesión y recibir un token JWT, utiliza el siguiente JSON en una petición POST a /api/login:

```json
{
  "username": "nuevoUsuario",
  "password": "passwordSeguro123"
}
```
### Buscar Restaurantes
Para buscar restaurantes cercanos, asegúrate de incluir el token JWT en las cabeceras y envía una petición POST a /api/restaurants con el siguiente JSON:

```json
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "radius": 1000
}
```
### Ver Historial de Transacciones
Para ver el historial de búsquedas, envía una petición GET a /api/transactions incluyendo el token JWT en las cabeceras.
