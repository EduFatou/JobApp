# JobApp

JobApp es una aplicación diseñada para buscar y gestionar anuncios de proyectos freelance de todo el mundo, permitiendo a usuarios encontrar proyectos freelance de varios portales e interactuar con los anuncios, guardarlos como favoritos y redirigir a sus portales originales, y administradores crear y editar anuncios, y usuarios.

## Estructura de Carpetas

La aplicación sigue una estructura organizada para facilitar el mantenimiento y escalabilidad:

- **config:** Contiene archivos de configuración para bases de datos MongoDB y PostgreSQL.
- **controllers:** Controladores que manejan la lógica de las solicitudes HTTP.
  - `users.controllers.js`: Operaciones CRUD para usuarios.
  - `web.controllers.js`: Vistas y operaciones web.
- **middlewares:** Middlewares para el registro de solicitudes.
- **models:** Define modelos de datos para la aplicación.
  - `favorites.models.js`: Modelo para favoritos.
  - `jobs.models.js`: Modelo para anuncios.
  - `users.models.js`: Modelo para usuarios.
- **public:** Archivos estáticos como CSS y JS.
- **queries:** Consultas SQL para favoritos y usuarios.
- **routes:** Define las rutas de la aplicación.
  - `favorites.routes.js`: Rutas para favoritos.
  - `jobs.routes.js`: Rutas para anuncios.
  - `users.routes.js`: Rutas para usuarios.
  - `web.routes.js`: Rutas web.
- **services:** Contiene servicios que encapsulan la lógica de negocio, como `jobs.services.js`.
- **utils:** Utilidades como `scraper.js`.
- **validators:** Validadores para diferentes entidades como favoritos, anuncios y usuarios.
- **views:** Vistas en formato Pug para páginas de la aplicación.

### Archivos en carpeta raíz

- `index.js`: Archivo principal de la aplicación.
- `.env`: Archivo de configuración de variables de entorno.
- `jsdoc.json`: Configuración para generación de documentación con JSDoc.
- `package.json`: Archivos de configuración de npm.
- `queries.sql`: Archivo con consultas SQL.
- `readme.md`: Documentación del proyecto.

## Funcionalidades Principales

- **Gestión de Usuarios:**
  - Registro, inicio de sesión y gestión de perfiles de usuario.

- **Gestión de anuncios:**
  - Creación, edición y eliminación de ofertas de trabajo.
  - Búsqueda y filtrado de anuncios por habilidades.

- **Gestión de Favoritos:**
  - Usuarios pueden marcar y gestionar favoritos de anuncios.

- **Web Scraping:**
  - Actualización de la base de datos con nuevas ofertas de trabajo mediante scraping.

## Configuración y Uso

1. **Instalación de Dependencias:**
   ```bash
   npm install
2. **Variables de Entorno:**
    - Crea un archivo .env en el directorio raíz y configura las variables necesarias como PORT, DB_URL, etc.
3. **Ejecución:**
    ```bash
    npm start
4. **Documentación:**
    - Para generar la documentación utilizando JSDoc:
    ```bash
    npm run docs

## Contribución
Si deseas contribuir a este proyecto, por favor sigue los estándares de código y envía tus pull requests.
## Autores

## Licencia