# [React Native ](https://reactnative.dev/) and [Expo](https://expo.dev/)

<a aria-label="contributors graph" href="https://github.com/Angel07fco/proyecto-jireh/settings/access"><img alt="contributors graph" src="https://img.shields.io/github/contributors/primer/react.svg"></a> <a aria-label="last commit" href="https://github.com/Angel07fco/proyecto-jireh/commits/master/"><img alt="last commit" src="https://img.shields.io/github/last-commit/primer/react.svg"></a>

<p align="center">
  <img alt="Primer logo" width="300px" src="https://res.cloudinary.com/dl8odylct/image/upload/v1706761818/jireh_dphsph.jpg">
</p>

# Aplicación móvil [Clinica Veterinaria JIREH](https://jireh.vercel.app/)

## Objetivo y alcance del proyecto

Objetivo: Desarrollar una aplicación móvil para la clínica veterinaria JIREH, que permita a los usuarios gestionar sus citas veterinarias, acceder a los servicios y mantenerse en contacto con el equipo veterinario.

Alcance: Los módulos principales incluirán:

    - Autenticación (registro/login).
    - Gestión de citas (crear, modificar, cancelar).
    - Perfil de usuario.
    - Servicios veterinarios.
    - Veterinarios y horarios disponibles.
    - Notificaciones push (para recordatorios de citas y otros avisos).

## Equipo de trabajo y sus roles

    - Desarrollador Mobile Frontend: Responsable de la implementación de la interfaz y la experiencia de usuario en la aplicación móvil.
    - Desarrollador Backend: Responsable de las APIs y la integración con la base de datos.
    - QA/Tester: Se encargará de las pruebas automatizadas, unitarias y de aceptación.
    - Coach XP (Líder de Proyecto): Supervisará la implementación de prácticas XP como desarrollo dirigido por pruebas (TDD), integración continua y refactorización constante.

## Plazos y Entrega del proyecto

Plazo total: 3 meses de desarrollo

Entregas:

    - Primer mes: Desarrollo y diseño de wireframes
    - Segundo mes: Desarrollo de funcionalidades esenciales como el registro/login, perfil y gestión de citas, implementación de servicios, veterinarios, mascotas, horarios y agendar una cita.
    - Tercer mes: Integración final, ajustes y despliegue.

## Riesgos y las medidas para mitigarlos

Riesgo: Dificultad en la implementación de notificaciones push en múltiples plataformas.

    Medida:
    Aplicar desarrollo iterativo y obtener retroalimentación constante para solucionar problemas tempranamente.

Riesgo: Incompatibilidad entre versiones de la aplicación en dispositivos móviles.

    Medida: Usar integración continua y pruebas frecuentes en múltiples dispositivos.

## Metodología de desarrollo ágil

    Se ha seleccionado Extreme Programming (XP) como metodología de desarrollo. Esta metodología enfatiza la calidad del software y la capacidad de adaptación a cambios, utilizando prácticas como:

    - Desarrollo dirigido por pruebas (TDD): Cada funcionalidad se desarrolla con pruebas que garantizan su correcto funcionamiento.
    - Programación en parejas: Dos desarrolladores trabajan juntos en un solo código para mejorar la calidad.
    - Integración continua: Se hacen pequeños cambios que se integran rápidamente para mantener un software siempre funcional.
    - Refactorización continua: Mejorar el código de manera constante para hacerlo más eficiente y fácil de mantener.
    - Releases cortos: Se entregan pequeñas funcionalidades frecuentemente para obtener retroalimentación continua del cliente.

## Estrategia de Versionamiento

    Git Flow es adecuado para proyectos con ciclos de desarrollo que incluyen múltiples versiones en paralelo, así como lanzamientos planificados y correcciones de errores rápidas. Esta estrategia ofrece una estructura clara para gestionar ramas, facilitando el desarrollo, las pruebas, y el despliegue en diferentes entornos.

## Pasos para la creación, revisión y fusión de ramas

Git Flow:

    Rama principal (main):
      - Contiene el código que ya ha sido lanzado a producción.

    Rama de desarrollo (develop):
      - Donde se integran todas las nuevas características para la próxima versión.

    Ramas de características (feature):
      - Se crean a partir de develop para desarrollar una nueva funcionalidad o módulo. Ejemplo: feature/login, feature/mascotas.
      - Se fusionan de vuelta en develop tras pasar las revisiones de código y las pruebas.

    Ramas de lanzamientos (release):
      - Una vez que se ha finalizado el desarrollo de todas las características para una versión, se crea una rama release desde develop.
      - Aquí se hacen pequeños ajustes y correcciones antes del despliegue final.
      - Se fusiona en main y develop tras el lanzamiento.

    Ramas de hotfix (hotfix):
      - Para solucionar rápidamente errores críticos en producción, se crean desde main.
      - Se fusionan tanto en main como en develop después de resolver el problema.

    Proceso de Revisión y Fusión:
      - Cada rama se somete a un proceso de revisión de código mediante pull requests antes de ser fusionada.
      - Las pruebas automatizadas (y manuales) se ejecutan en las ramas de características y lanzamientos antes de integrarlas.

## Estrategia de Despliegue

Canary Deployment:

    Se ha elegido Canary Deployment debido a su capacidad para realizar despliegues graduales. Esta estrategia reduce el riesgo en producción, permitiendo que una nueva versión del software sea desplegada primero para una pequeña parte de los usuarios, antes de desplegarla completamente.

## Implementación de Integración Continua (CI)con Jenkins

Pipeline de Jenkins para Git Flow

    - Checkout: Obtención del código de la rama activa.
    - Build: Compilación del proyecto (por ejemplo, con npm install y npm run build).
    - Test: Ejecución de pruebas unitarias y de integración.
    - Canary Deployment: Despliegue gradual de la versión en producción.

## Entornos (desarrollo, staging, producción)

Desarrollo (Development):

    - Este es el entorno donde se trabaja de manera continua en nuevas características y funcionalidades.
    - Se realizan pruebas iniciales y se integran cambios de las ramas feature/* de Git Flow.
    - Jenkins ejecuta automáticamente pipelines que validan el código mediante pruebas unitarias antes de integrarse en la rama develop.

Staging:

    - El entorno staging es una réplica del entorno de producción, donde se validan los cambios antes del despliegue final.
    - Aquí se realizan pruebas de integración y pruebas manuales adicionales para asegurar que todo funcione correctamente antes de fusionar los cambios en la rama release/*.
    - Jenkins también ejecuta pipelines para construir el código, correr pruebas y preparar el despliegue final en producción.

Producción (Production):

    - Este es el entorno en vivo donde la aplicación está disponible para los usuarios finales.
    - Utilizando la estrategia de Canary Deployment, los cambios se despliegan gradualmente para minimizar riesgos y monitorear el comportamiento de la nueva versión antes de su despliegue completo.
    - Jenkins maneja el despliegue canario cuando la rama main recibe actualizaciones desde release/*.

## Tecnologías y herramientas

El proyecto se desarrollo utilizando las siguientes tecnologías y herramientas:

- [Emotion](https://emotion.sh/)
- [React native reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Socket.IO](https://socket.io/)
- [React Hook Form](https://react-hook-form.com/)
- [Expo](https://expo.dev/)
- [React Dropzone](https://react-dropzone.js.org/)
- [Lazy Loading](https://react.dev/reference/react/lazy)
- [Jest](https://jestjs.io/)
- [Docker](https://www.docker.com/)
- [Cloudinary](https://cloudinary.com/)

## Instalación

To install the project follow the steps below:

1. Clonar el repositorio:

```console
git clone https://github.com/Angel07fco/movil-jireh.git
```

2. Navegar al Directorio del Proyecto:

```console
cd movil-jireh
```

3. Instalar las dependencias del proyecto utilizando el gestor de paquetes de su elección:

Con npm:

```console
npm install
```

Con yarn:

```console
yarn install
```

5. Ejecutar el proyecto utilizando el gestor de paquetes de su elección:

Con npm:

```console
npm start
```

Con yarn:

```console
yarn start
```
