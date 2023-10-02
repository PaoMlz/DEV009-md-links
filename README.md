# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Instalación](#3-instalación)
* [4. Guía de uso](#4-guia-de-uso)
* [5. Implementación](#5-Implementación)
* [6. Planificacion y Organización del proyecto](#6-planificación-y-organización-del-proyecto)

***

 ![Markdown](..//DEV009-md-links/img/MKD.png)

## 1. Preámbulo

Para comenzar con este proyecto, es importante tener claros algunos conceptos fundamentales, comenzando por el Markdown.
 

El Markdown es como un "lenguaje de estilos" que facilita la organización y presentación de texto de manera clara y sencilla. Fue diseñado para ser fácil de escribir y entender sin necesidad de procesamiento adicional. Aunque fue concebido por John Gruber y Aaron Swartz, su uso se ha popularizado enormemente, convirtiéndose en la preferencia de desarrolladores, escritores y usuarios de la web en general.

Mediante el uso de símbolos como asteriscos (*) o almohadillas (#), este lenguaje permite aplicar estilos como negritas, listas o encabezados. Esto resulta en textos bien organizados y legibles, especialmente en plataformas como GitHub, foros y blogs, que son compatibles con Markdown.

Debido a su simplicidad y flexibilidad, el Markdown se ha convertido en una herramienta esencial para la creación y edición de documentos, especialmente en entornos colaborativos y en el desarrollo de proyectos de software.

A continuación, abordamos Node.js.

Node.js, también conocido como Node, es una plataforma que habilita la ejecución de JavaScript en el servidor. A diferencia de JavaScript en el navegador, que se enfoca en interactuar con los usuarios en las páginas web, Node se utiliza para llevar a cabo tareas en el lado del servidor, como trabajar con archivos, conectarse a bases de datos y construir aplicaciones web completas. Esto lo convierte en una herramienta indispensable para el desarrollo de aplicaciones web sólidas y escalables.

## 2. Resumen del proyecto


Este proyecto se centró en el desarrollo de una librería en Node.js diseñada para analizar enlaces en archivos Markdown. Esta librería estuvo disponible como un módulo en GitHub, permitiendo a otros usuarios instalarla en sus propios proyectos. También se ofreció como una interfaz de línea de comandos (CLI) que se pudo utilizar directamente desde la terminal.

El proyecto se enfocó en la construcción de una librería que interactuó con los archivos del sistema y un script ejecutable que hizo uso de Node.js. Esto involucró tareas como leer archivos, realizar consultas a través de la red y trabajar con procesos.

La librería se instaló sin problemas a través de npm, y ofreció tanto una parte ejecutable como una interfaz para su uso programático. Era como obtener una herramienta versátil con dos formas de interactuar: una para ejecutar comandos y otra para integrarla directamente en el código.

El proyecto se dividió en hitos, que representaron etapas para alcanzar los objetivos establecidos. Cada hito marcó un avance en el desarrollo de la librería.

Durante el proceso de desarrollo, se llevaron a cabo pruebas exhaustivas que abarcaron diversos escenarios. Esto incluyó la evaluación de archivos Markdown individuales, así como la exploración de directorios y subdirectorios para analizar enlaces en profundidad.

Uno de los objetivos fundamentales del proyecto era brindar flexibilidad a los usuarios. Para lograr esto, se implementaron opciones como 'validate' y 'stat'. La opción 'validate' permitía verificar la validez de cada enlace, asegurando que estuvieran activos y apuntando a URLs funcionales. Por otro lado, la opción 'stat' proporcionaba valiosa información estadística sobre los enlaces, incluyendo el número de enlaces únicos y totales, así como la cantidad de enlaces rotos.

Además, se diseñó el sistema para que fuera posible combinar ambas opciones, 'stat' y 'validate', en una sola ejecución. Esto proporcionaba un informe completo que abarcaba todas las estadísticas relevantes sobre los enlaces, incluyendo los totales, únicos y rotos. Esta funcionalidad resultó ser una herramienta valiosa para los usuarios que necesitaban un análisis detallado de sus archivos Markdown.

Por ultimo, cuando se trataba de pruebas, no queríamos quedarnos cortos. Así que nos pusimos el objetivo de cubrir al menos el 70% de los aspectos clave: statements, functions, líneas y bifurcaciones. Y para hacerlo, me apoye en el confiable Jest.

## 3. Intalación 

Para comenzar a utilizar esta potente herramienta de análisis de enlaces en archivos Markdown, es necesario seguir unos sencillos pasos de instalación.

#### Paso 1: Abre tu terminal y asegúrate de tener Node.js y npm instalados en tu sistema. Puedes descargarlos desde el sitio oficial de Node.js.

#### Paso 2: Una vez tengas Node.js y npm configurados, estás listo para instalar la librería. Utiliza el siguiente comando en tu terminal:

npm install PaoMlz/DEV009-md-links

Ejemplo 

![Ejemplo-install](../DEV009-md-links/img/comando%20install.jpg)

#### Paso 3: ¡Listo! Ahora tienes la librería instalada y lista para ser utilizada en tus proyectos.

## 4. Guía de uso

La librería de análisis de enlaces en archivos Markdown es una herramienta versátil y poderosa que te ayudará a gestionar y comprender los enlaces dentro de tus documentos Markdown. A continuación, te mostramos cómo utilizarla:

1. Uso Básico

Para analizar un archivo Markdown simple, ejecuta el siguiente comando en tu terminal:

md-links [la ruta del archivo que quieras evaluar]

Ejemplo

![Ejemplo-analizar-archivo](../DEV009-md-links/img/prueba%20mdlinks%201.jpg)

Esto proporcionará una lista de todos los enlaces encontrados en el archivo especificado.

2. Análisis de Directorios

Si deseas analizar todos los archivos Markdown dentro de un directorio y sus subdirectorios, simplemente proporciona la ruta al directorio en lugar de un archivo individual:

md-links [La ruta del directorio o subdirectorio que quieras analizar]

Ejemplo analisis directorio 

![Directorio](../DEV009-md-links/img/directorio.jpg)

3. Opciones Adicionales

Puedes personalizar el análisis utilizando las siguientes opciones:

--validate: Verifica la validez de los enlaces y muestra el estado de cada uno (activo o roto).

![Validate](../DEV009-md-links/img/validate%20y%20stats.jpg)

--stat: Genera estadísticas sobre los enlaces, incluyendo el total y los únicos.

![Stats](../DEV009-md-links/img/stats.jpg)

--validate --stat: Combina ambas opciones para obtener estadísticas detalladas sobre los enlaces, incluyendo los totales, únicos y rotos.

Ejemplo de uso con opciones:

md-links [La ruta a evaluar] --validate o --stats (Pueden ser ambas)

![Ambas](../DEV009-md-links/img/validate%20y%20stats.jpg)

4. Resultados

Una vez que ejecutes el comando, la librería generará un informe con los resultados de acuerdo a tus opciones seleccionadas.

## 5. Implementación 

A lo largo de cada etapa de desarrollo, se enfocó en la creación de funciones puras y la función global mdlinks para garantizar un análisis preciso de los enlaces en archivos Markdown. Estas funciones fueron meticulosamente probadas utilizando Jest y se emplearon mocks junto con Axios para simular una variedad de escenarios.

*Funciones Puras y Función Global mdlinks:*

Se diseñaron y desarrollaron funciones puras en data.js para garantizar una manipulación confiable de los datos, mientras que la función global mdlinks en mdlinks.js se encargó de orquestar el proceso de análisis.

*Pruebas Exhaustivas y Validación:*
Se ejecutaron pruebas completas en cada fase de desarrollo para confirmar que las funciones puras y mdlinks operaban correctamente en diversas situaciones, incluyendo archivos Markdown individuales, así como directorios y subdirectorios completos.

*Simulación de Ambientes con Mocks y Axios:*
Se emplearon mocks y Axios para reproducir con precisión los ambientes en los que se desplegaría la librería. Esto permitió abordar una amplia gama de situaciones de prueba, asegurando una cobertura exhaustiva de los casos de uso.

A continuación, se presentan los diagramas de flujo que sirvieron como guía visual durante la implementación de cada hito del proyecto. Estos diagramas proporcionaron una referencia clara para la extracción de enlaces, validación y generación de estadísticas, así como la interacción con la interfaz de línea de comandos.


Hito 1
![Hito-1](../DEV009-md-links/img/Hito%201.png)

Hito 2
![Hito-2](../DEV009-md-links/img/HITO%202.png)

Hito 3
![Hito-3](../DEV009-md-links/img/Hito%203.png)

Hito 4
![Hito-4](../DEV009-md-links/img/Md-links.png)

Hito 5
![Hito-5](../DEV009-md-links/img/Hito%205.png)

Digrama global
![Diagrama-Global](../DEV009-md-links/img/Diagrama%20global.png)

![Test](../DEV009-md-links/img/test.jpg)

## 6. Planificación y organización del proyecto.

Investigación y Comprensión (Inicio del Proyecto):

Se comenzó con la lectura detallada de la documentación oficial, estableciendo así una base sólida para comprender los requisitos del proyecto.
Se llevaron a cabo reuniones con compañeros para discutir y asegurar una comprensión precisa de las tareas asignadas.

*Hito 1 - Extracción de Enlaces:*

[✓] Instalación de las dependencias necesarias para el desarrollo.

[✓] Creación del archivo cli.js y index.js (estableciendo así la base para la función global mdlinks) y las funciones puras en data.js.

[✓] Configuración inicial del archivo README para asegurar una comprensión clara de los objetivos y funcionalidades.

*Hito 2 - Validación de Enlaces:*

[✓] Implementación de la funcionalidad de validación de enlaces.

[✓] Integración de pruebas unitarias específicas para la validación de enlaces.

*Hito 3 - Estadísticas de Enlaces:*

[✓] Elaboración de un diagrama de flujo dedicado a las estadísticas de enlaces, proporcionando una guía visual para la implementación.

[✓] Desarrollo de la funcionalidad para generar estadísticas de enlaces.

[✓] Integración de pruebas unitarias específicas para las estadísticas de enlaces.

*Hito 4 - Interfaz de Línea de Comandos (CLI):*

[✓] Desarrollo de la interfaz de línea de comandos que permitiera a los usuarios interactuar con la librería desde la terminal.

[✓] Integración de pruebas unitarias específicas para la interfaz de línea de comandos.

*Hito 5 - Documentación y Pruebas Finales:*

[✓] Revisión y actualización exhaustiva de la documentación para garantizar claridad y coherencia.

[✓] Ejecución de pruebas finales y corrección de posibles errores o fallos.

[✓] Preparación para la presentación final del proyecto.

Cada hito fue precedido por la creación de un diagrama de flujo específico, proporcionando una guía visual crucial para la implementación de las funcionalidades correspondientes.
