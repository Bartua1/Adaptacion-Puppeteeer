# Adaptación de Selenium a Puppeteer

Este proyecto es una guía para usuarios de Selenium que desean migrar a Puppeteer. También puede ser útil para usuarios de Playwright o BeautifulSoup que buscan una alternativa a sus herramientas actuales.

## Propósito

El propósito de este proyecto es proporcionar una introducción a Puppeteer y mostrar cómo se puede utilizar para realizar tareas similares a las que se realizan con Selenium, Playwright o BeautifulSoup.

## Contenido

Este proyecto contiene los siguientes recursos:

*   Ejemplos de código que muestran cómo realizar tareas comunes con Puppeteer. (Creo que analizar estas tareas te dará una base para migrar tus conocimientos de una herramienta a la otra).

## Uso

Para utilizar este proyecto, simplemente clone el repositorio y siga las instrucciones de la guía de migración.

## Guía de uso

1.  Clona el repositorio:

    ```bash
    git clone <URL del repositorio>
    cd puppeteer-test
    ```
2.  Instala las dependencias:

    ```bash
    npm install
    ```
3.  Configura las variables de entorno:

    Crea un archivo `.env` en la raíz del proyecto y define las variables `EMAIL` y `PASSWORD` con tus credenciales para Bartu Chat.

    ```
    EMAIL=tu_email@example.com
    PASSWORD=tu_contraseña
    ```
4.  Ejecuta los scripts:

    *   Para abrir una página web:

        ```bash
        node index.js
        ```

    *   Para capturar una captura de pantalla:

        ```bash
        node index.js
        ```

    *   Para extraer citas de una página web:

        ```bash
        node index.js
        ```

    *   Para emular un dispositivo móvil:

        ```bash
        node index.js
        ```

    *   Para interactuar con Bartu Chat:

        ```bash
        node index.js
        ```

5.  Asegúrate de incluir un archivo `.gitignore` en tu proyecto antes de hacer un fork o clonar el repositorio. Este archivo debe incluir `.env` y `node_modules` para evitar subir información sensible y archivos innecesarios al repositorio.

## Contribución

Las contribuciones a este proyecto son bienvenidas. Si tiene alguna sugerencia o mejora, no dude en enviar una solicitud de extracción.