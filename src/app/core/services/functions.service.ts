import { HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { config } from "../default.config"
import { secureStorage } from "../secure.config";
import * as CryptoJS from 'crypto-js';
import { isEmpty, isNotEmpty, isNotEmptyObject, isObject, } from "class-validator";
import { User } from "src/app/core/models/users.model";

///////////////Funciones globales



/**
 * Analiza gramaticalmente el texto plano en formato csv, para luego retornar un arreglo de objetos
 * @param plainText Texto plano del archivo
 * @param separator Separador de las columnas
 * @param headers Si incluye encabezados
 */
export function parseCsvInfo(plainText: string, separator: ";" | "," = ";", headers: boolean = true): any[] {
  return []
}
/**
 * Se comparan las dos fechas para obtener el tiempo transcurrido o restante en formato 'time ago'
 * @param firstDate
 * @param secondDate
 * @returns
 */
export function timeAgo(firstDate: Date, secondDate: Date): string {
  return ""
}


/**{
 * }
 * Pone en mayusculas la inicial de cada palabra y en minusculas el resto de las letras en una cadena.
 * @param cad
 * @param split
 */
export function toTitleCase(cad: string, split: string = " ") {
  cad = cad.trim().toLocaleLowerCase()
  if (isNotEmpty(cad)) {
    let arr = cad.split(split);
    cad = "";
    arr.forEach(e => {
      if (e) {
        cad += e[0].toUpperCase() + e.substring(1) + " ";
      }
    });
  }
  return cad;
}

/**
* Pone en mayusculas la inicial de cada frase separandola por puntos (.)
* @param cad
*/
export function toPhraseCase(cad: string) {
  return toTitleCase(cad, ".");
}

/**
   * Obtiene la configuración con la clave 'name'
   * @param name Nombre de la configuración
   * @returns {any}
   */
export function getConfig(name: string) {

  //find config on database ad return it if it's found.
  //return ConfigService.getConfig(name)
  //else

  return config[name]
}

/**
 * Set the data on localStorage (secureStorage)
 * @param name item name
 * @param data item data
 */
export function setOnLocal(name: string, data: any) {
  if (!isNotEmpty(name)) {
    throw new Error("El nombre de la variable local no puede estar vacío");
  }
  secureStorage.setItem(name, data)
}
/**
 * Deletes item from localStorage (secureStorage)
 * @param name
 */
export function removeFromLocal(name: string) {
  if (!isNotEmpty(name)) {
    throw new Error("El nombre de la variable local no puede estar vacío");
  }
  secureStorage.removeItem(name)
}

/**
 * Gets the localStorage (secureStorage) string by name and parse it like JSON.
 * If it isn't an object, array or string, returns null.
 * @param name
 * @returns the object or array
 */
export function getFromLocal(name: string): any {
  const result = secureStorage.getItem(name)
  return result;
}

export function getToken(): string {
  const result = getFromLocal(environment.COOKIE_TOKEN)
  return result;
}

export function getCurrentUser(): User {
  const result = getFromLocal(environment.COOKIE_USER)
  if (isEmpty(result) || !isNotEmptyObject(result) || !isObject(result)) {
    throw new Error("Esta acción requiere que el usuario inicie sesión")
  }
  return result;
}
export function getBasicError(error: any, print: boolean = false): any {
  if (print) { console.error(error) }
  if (error instanceof Error) {
    return error
  }
  if (error instanceof HttpErrorResponse) {
    return error.error
  }
  return error
}
export function getErrorMessage(error: any, print: boolean = true): string {
  error = getBasicError(error)
  if (print) { console.error(error) }
  return error.message ? error.message : "Error en la petición"
}

export function hash256(key) {
  key = CryptoJS.SHA256(key);
  return key.toString();
}
export function hash512(key) {
  key = CryptoJS.SHA512(key);
  return key.toString();
}
export function encrypt(data) {
  data = CryptoJS.AES.encrypt(data, environment.secret_key);
  data = data.toString();
  return data;
}
export function decrypt(data) {
  data = CryptoJS.AES.decrypt(data, environment.secret_key);
  data = data.toString(CryptoJS.enc.Utf8);
  return data;
}
/**
 * Retorna una cadena solamente con numeros y letras
 * @param cad
 * @returns
 */
export function ignoreSpecialCharacters(cad: string, replacer: string = ""): string {
  return cad.trim().replaceAll(/[\W]/ig, replacer)
}

/**
 * Retorna una cadena solamente con numeros y letras
 * @param cad
 * @returns
 */
export function ignoreAllCharactersExceptLettersAndSpaces(cad: string, replacer: string = ""): string {
  return cad.trim().replaceAll(/[^a-zA-Z ]/ig, replacer)
}


/**
 * Obtiene el dominio de mueblesjamar para el entorno activo
 * @returns dominio de mueblesjamar para el entorno activo
 */
export function getDomain(): string {
  return environment.domain
}

/**
 * Convierte una fecha en el formato 'dd/mm/yyyy', ideal para oracle
 * @param fecha
 * @param sep separador de las variables de la fecha
 * @returns
 */
export function dateToStringDayMonthYear(fecha: Date, sep: string = "/") {
  return `${fecha.getDate()}${sep}${fecha.getMonth() + 1}${sep}${fecha.getFullYear()}`;
}

/**
 * Obtiene el api_key del entorno
 * @returns api_key del entorno
 */
export function getApiKey() {
  return environment.api_key
}

/**
 * Obtiene el dominio del cliente (básicamente el dominio de la url)
 * @returns el dominio del cliente
 */
export function getClientDomain() {
  return `${location.protocol}`
}

/**
 * Muestra un Spinner (loading) y muestra el mensaje especificado
 * @param message
 */
export function showSpinner(message: string = "Cargando...") {
  document.getElementById("aurora-spinner-container")?.removeAttribute("hidden")
  const spinnerMessage = document.getElementById("aurora-spinner-message")
  spinnerMessage ? spinnerMessage.innerHTML = message : ""
}


export function hideSpinner() {
  document.getElementById("aurora-spinner-container")?.setAttribute("hidden", "true")
}

/**
     * Evalúa si una cadena es una contraseña válida. Esta contraseña debe tener
     * por lo menos 8 dígitos, 3 de los 4 siguientes tipos de caracter:
     * minúsculas, mayúsculas, números, especiales
     * @param value cadena a evaluar
     */
export function isPassword(value: string): boolean {
  let regex = /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{8,}$/;
  if (value.match(regex) != null) {
    return true;
  }
  return false;
}
