# Aurora-frontent

Es un proyecto de Angular v12 que contiene todas las características necesarias para hacer una página web dedicada o empresarial, según las necesidades de tu cliente.
Es de código abierto y no requiere ningún tipo de atribución.

## Características

- **JWT:** Utilice JWT para mantener la sesión del usuario y tener una conexión segura con el servidor. Por defecto se envía el token a las "allowedUrls" de environment.
- **Encriptación:** Gracias a `secureStorage` puedes encriptar los datos que se guardan en `localStorage` de manera sencilla. Observe la lista de funciones para ver cómo funciona.
- **Control de roles:** Están resueltas las configuraciones para utilizar roles de usuario en los componentes. Consulte la documentación sobre Roles de Usuario.
- **Class Validators:** Con la librería `class-validators` nos hacemos con una amplia gama de validaciones que podemos utilizar de manera sencilla en las condiciones de nuestra app.
- **Material Angular:** He incluído Material Angular para que los desarrollos puedan tener un look and feel más universal.
- **Helpers:** Son servicios que pueden ayudarte a tener a la mano opciones o configuraciones que podrías necesitar en tu sitio, como cambiar el título del documento y metadata, mostrar notificaciones de tipo `Toast/SnackBar` o `Modal/Dialog` de manera sencilla, entre otras funciones.
- **Funciones globales:** Las encontramos en `functions.service.ts`. Aquí puedes encontrar cosas que utilizarás para llevarte bien con el proyecto, como `showSpinner` y `hideSpinner` que te permiten mostrar una pantalla de _Cargango_, o `setOnLocal`, `getFromLocal` y `removeFromLocal` que son una forma de gestionar el localStorage encriptado.
- **Entornos:** Es totalmente necesario para un proyecto, aquí ponemos toda esa configuración inicial que necesitamos para que todo funcione bien. Para que algo sea mantenible y escalable es necesario que podamos configurar entornos. Yo utilizo `development` y `production` para los proyectos simples, que ya los trae por defecto el Angular, sin embargo he puesto un tercero que se llama `qas` para los proyectos que requieran utilizarlo.
- **Optimizaciones:** Angular 12 trae algunas configuraciones por defecto que relentizan la compilación tanto con `ng serve` como con `ng build`. Hemos puesto algunas configuraciones para disminuír estos tiempos.

## Development server

Con `ng serve` puedes desplegar la web de manera local en el entorno de desarrollo. Si requieres ejecutarlo con la configuración del entorno de producción, puedes usar `ng serve --prod` y pra QAS `ng serve --configuration qas`.

## Arquitectura del proyecto

Algo en lo que nos hemos esforzado es en tener un claro manejo del sistema de archivos del proyecto. Por eso lo hemos dejado explicado aquí:

- `app` -> Ruta principal de proyecto
  - `core` -> Estos son los "esenciales" del framework. Aquí va la configuración y servicios globales como los helpers.
  - `modules` -> Aquí es donde se crean los módulos. Cada uno debe tener su propio enrutador
    - `auth` -> Aquí está la configuración referente a la autenticación de los usuarios. No se deben crear módulos aquí de ser posible.
    - `admin` -> Aquí están el resto de módulos de la aplicación, como cartera, movilidad y superusuario.
      - `layout` -> Estos son los componentes de layout del modulo 'admin'
      - `modules` -> Aquí se deben añadir los nuevos módulos, debajo un ejemplo de módulo
        - `cartera` -> Ejemplo de módulo
          - `modules` -> Módulos hijos siguen la misma estructura de modulo padre
          - `components` -> En caso de que el módulo no requiera módulos hijos, puede crear los componentes aquí. De lo contrario debe crear la carpeta components dentro de la carpeta del módulo.
          - `services` -> En caso de que el módulo no requiera módulos hijos, puede crear los servicios aquí. De lo contrario debe crear la carpeta services dentro de la carpeta del módulo.
          - `models` -> En caso de que el módulo no requiera módulos hijos, puede crear los modelos o clases aquí. De lo contrario debe crear la carpeta models dentro de la carpeta del módulo.
          - `cartera.module.ts` -> Módulo principal de esta ruta
          - `cartera-routing.module.ts` -> Rutas del módulo
        - `admin.module.ts` -> Módulo principal de esta ruta. Aquí se deben importar todos los sub-modulos
        - `admin-routing.module.ts` -> Rutas del módulo. Aquí se deben establecer las rutas a los submodulos.
  - `views` -> Aquí se almacenan vistas generales de la aplicación, como layouts, componentes de ayuda (dialogs, spinners, datatables, etc) y similares
    - `layout` -> Aquí se almacenan los componentes layouts de los modulos principales `admin`, `auth` y cualquier otro que requieras, como _`public`_, que no viene incluído en esta versión.
  - `app.module.ts` -> Módulo inicial del proyecto. ADVERTENCIA: Los módulos nuevos deben importarse en el módulo 'admin'.
  - `app.routing.ts` -> Aquí se establecen las rutas iniciales. ADVERTENCIA: Los módulos nuevos deben tener sus rutas en el módulo 'admin'. Este está reservado para los módulos de primer nivel como `auth` y `admin`.
- `environments` -> Aquí se ponen las variables de entorno. Entiendase como variable de entorno a cualquier dato necesario para que el cliente se ejecute, y además, también se ubicarán en este lugar las constantes y variables globales del sistema.
  - `environment.ts` -> Variables de entorno con los valores de desarrollo
  - `environment.prod.ts` -> Las mismas variables de entorno de desarrollo, pero con los valores de producción.
  - `environment.prod.ts` -> Las mismas variables de entorno de desarrollo, pero con los valores de qas.
- `assets` -> Aquí se ubican todos los archivos estáticos de la aplicación, los cuales se subirán al servidor. ADVERTENCIA: En aras de que el proyecto sea lo más liviano posible, no añadir nada en esta carpeta, mucho menos imágenes. Si se requiere hacer referencia a un asset, hagalo a traves de una URL.

## Generar componentes, modulos y servicios:

Debemos tener claro que todos los nuevos módulos, componentes y servicios tienen su ruta inicial en el módulo `admin`, por lo cual la ruta inicial sería `modules/admin`. A partir de ahí generar la ruta segun el objeto que queremos generar.
**ADVERTENCIA:** Se recomienda **siempre usar un módulo** cuando se trata de un **_nuevo acceso_** en el **menu principal**. Se puede crear componentes como rutas del módulo, pero si una función requiere más de un componente, debería crearse un sub-módulo.
Ejemplo:

- **Para crear un módulo** debemos anteponer siempre `modules/admin/module` y utilizar la bandera `--routing` para que se genere el routing.module: `ng g m modules/admin/module/[nombre-del-modulo] --routing`
  - **En el caso de un sub-módulo** debemos anteponer siempre `modules/admin/module/[nombre-del-modulo-padre]/modules/[nombre-del-modulo-hijo]` y utilizar la bandera `--routing` para que se genere el routing.module: `ng g m modules/admin/module/[nombre-del-modulo-padre]/modules/[nombre-del-modulo-hijo] --routing` y así sucesivamente.
- **Para crear un componente** que no requiere ningun modulo, debemos anteponer siempre `modules/admin/components` y utilizar la bandera `--skip-tests=true` para que no genere archivos de tests.spec: `ng g c modules/admin/components/[nombre-del-componente] --skip-tests=true`
  - **En el caso de un componente dentro del módulo** debemos anteponer siempre `modules/admin/module/[nombre-del-modulo-padre]/components/[nombre-del-componente]` y utilizar la bandera `--skip-tests=true` para que no genere archivos de tests.spec: `ng g c modules/admin/module/[nombre-del-modulo-padre]/components/[nombre-del-componente] --skip-tests`.
- **Para crear un servicio** que no requiere ningun modulo, debemos anteponer siempre `modules/admin/components` y utilizar la bandera `--skip-tests=true` para que no genere archivos de tests.spec: `ng g s modules/admin/services/[nombre-del-servicio] --skip-tests=true`
  - **En el caso de un servicio dentro del módulo** debemos anteponer siempre `modules/admin/module/[nombre-del-modulo-padre]/services/[nombre-del-servicio]` y utilizar la bandera `--skip-tests=true` para que no genere archivos de tests.spec: `ng g c modules/admin/module/[nombre-del-modulo-padre]/services/[nombre-del-servicio] --skip-tests`.

## Build

Recomendamos utilizar siempre una estructura DevOps que te permita mantener una mejora y entrega continua. Existen herramientas como **Firebase** de Google, pero recomendamos usar **Amplify** de AWS, que te permite hacer tus propios Pipelines con GitHub.

## Help, Contact & Colaboration

Si algo en el proyecto está fallando, déjame un ISSUE.
Si quieres contactarme, búscame en LinkedIn como Victor Guzmán Berrío.

Para colaborar símplemente haz tu fork y únete cuando creas necesario. O comunicate conmigo.

- Explica tus cambios y usa código limpio para hacerlos parte.
