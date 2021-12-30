
export const environment = {
  production: true,
  name: "Production",
  version: "2021.0",// "2021.0",//No cambiar a menos que se cree un nuevo proyecto
  api_key: "asdsdadua7ds78daiidsai6",
  secret_key: "asdsdadua7ds78daiidsai6",
  jwt_key: "asdsdadua7ds78daiidsai6",
  app_key: "asdsdadua7ds78daiidsai6",

  adminRoute: "admin",
  authRoute: "auth",
  domain: "https://cgo8ch5rv8.execute-api.us-west-2.amazonaws.com/dev/",
  encryptLocalStorage: false,
  //urls basicas necesarias para el buen funcionamiento del framework
  apis: {
    multiplicaciones: {
      create: { value: "test", method: "POST", contentType: "application/json" },
      all: { value: "test", method: "GET", contentType: "application/json" },
    },
  },
  /**
   * Dominios (dominio.com) a los que se enviará el token en el header de la petición.
   * Utilizar solo en caso que el dominio sea distinto del actual, ya que es allowed por defecto.
   */
  allowedDomains: ["https://cgo8ch5rv8.execute-api.us-west-2.amazonaws.com/dev/"],
  /**
   * Rutas en las que no se tendrá en cuenta el envío del token.
   * Pueden ser del mismo dominio.
   */
  disallowedRoutes: [],
  //Constants
  COOKIE_USER: "user_info", //nombre de la cookie donde se almacena la informacion del usuario
  COOKIE_USERK: "jsfb_assff", //nombre de la cookie donde se almacena la informacion del usuario
  COOKIE_USER_SESSIONS: "jsfb_NMassff", //nombre de la cookie donde se almacena la informacion del usuario
  MAX_USER_SESSIONS: "max_jsfb_NMassff", //nombre de la cookie donde se almacena la informacion del usuario
  COOKIE_TOKEN: "token", //nombre de la cookie donde se almacena el token de la sesión
  LOCAL_DEFAULT_COMPANY: "default_company", //empresa seleccionada por el usuario
  LOCAL_COMPANIES: "user_companies",//empresas a las que tiene acceso el usuario
  LOCAL_ENDPOINTS: "endpoints", //nombre de la cookie donde se almacenan los endpoints
  LOCAL_MODULES: "modules",
  LOCAL_MODULE_OPTIONS: "module_options",
  LOCAL_CURRENT_MODULE: "current_module",
  LOCAL_ROLES: "roles",
  LOCAL_RECENT_MODULES: "recent_modules",
  LOCAL_LAST_URL: "last_url",
  MESSAGES_DURATION: 5000, //Duracion de los mensajes de snackbar
};
