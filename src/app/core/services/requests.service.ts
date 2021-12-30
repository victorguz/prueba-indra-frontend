import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { getBasicError, getErrorMessage, getToken } from "./functions.service";
import { BasicResponse } from "../models/basic-response.model";
import { isIn } from "class-validator";

@Injectable({
  providedIn: "root",
})
export class RequestsService {

  constructor(private _http: HttpClient) { }


  async makeRequest(_domain: string = "", _url: { value: string; method: string; contentType: string; }, _params: any = undefined, _headers: any = undefined): Promise<BasicResponse> {
    if (_url.value) {
      _url.method = _url.method.toUpperCase()
      if (isIn(_url.method, [RequestMethod.PATCH, RequestMethod.POST, RequestMethod.PUT])) {
        if (_url.contentType == "application/x-www-form-urlencoded") {
          return await this.postLikeFormUrlEncoded(`${_domain}${_url.value}`, _params, _headers, RequestMethod[_url.method])
        } else {
          return await this.postLikeJSON(`${_domain}${_url.value}`, _params, _headers, RequestMethod[_url.method])
        }
      } else if (_url.method == RequestMethod.GET) {
        return await this.get(`${_domain}${_url.value}`, _params, _headers)
      } else {
        return await this.delete(`${_domain}${_url.value}`, _params, _headers)
      }
    } else {
      return new BasicResponse(false, "No se puede hacer el request a una url vacía")
    }
  }

  async get(_url: string, _params: any = {}, _headers: any = undefined): Promise<BasicResponse> {
    try {
      if (_url) {
        let paramsUrl = "";
        _headers = new HttpHeaders(_headers)
        // Recorremos los parametros para convertirlos a parametros de url
        for (const key in _params) {
          if (Object.prototype.hasOwnProperty.call(_params, key)) {
            const value = _params[key];
            paramsUrl += `${key}=${value}&`;
          }
        }
        const result = await this._http.get(`${_url}?${paramsUrl.toString()}`, {
          headers: _headers
        }).toPromise()
        return new BasicResponse(true, "Request success", result)
      } else {
        return new BasicResponse(false, "No se puede hacer el request a una url vacía");
      }
    } catch (error) {
      return new BasicResponse(false, getErrorMessage(error), undefined, getBasicError(error))
    }
  }

  async delete(_url: string, _params: any = {}, _headers: any = undefined): Promise<BasicResponse> {
    try {
      if (_url) {
        let paramsUrl = "";
        _headers = new HttpHeaders(_headers)
        // Recorremos los parametros para convertirlos a parametros de url
        for (const key in _params) {
          if (Object.prototype.hasOwnProperty.call(_params, key)) {
            const value = _params[key];
            paramsUrl += `${key}=${value}&`;
          }
        }
        const result = await this._http.delete(`${_url}?${paramsUrl.toString()}`, {
          headers: _headers
        }).toPromise()
        return new BasicResponse(true, "Request success", result)
      } else {
        return new BasicResponse(false, "No se puede hacer el request a una url vacía");
      }
    } catch (error) {
      return new BasicResponse(false, getErrorMessage(error), undefined, getBasicError(error))
    }
  }

  async postLikeFormUrlEncoded(_url: string, _params: any, _headers: any = undefined, method: RequestMethod.POST | RequestMethod.PATCH | RequestMethod.PUT = RequestMethod.POST): Promise<BasicResponse> {
    try {
      if (_url) {
        const paramsUrlEncoded = new URLSearchParams();
        if (_headers) {
          _headers["Content-Type"] = "application/x-www-form-urlencoded"
        } else {
          _headers = { "Content-Type": "application/x-www-form-urlencoded" }
        }
        // _headers["api_key"] = environment.api_key;
        _headers = new HttpHeaders(_headers)
        for (const key in _params) {
          if (Object.prototype.hasOwnProperty.call(_params, key)) {
            const element = _params[key];
            paramsUrlEncoded.append(key, element)
          }
        }
        let result: any
        switch (method) {
          case RequestMethod.POST: result = await this._http.post(_url, paramsUrlEncoded.toString(), { headers: _headers }).toPromise(); break;
          case RequestMethod.PATCH: result = await this._http.patch(_url, paramsUrlEncoded.toString(), { headers: _headers }).toPromise(); break;
          case RequestMethod.PUT: result = await this._http.put(_url, paramsUrlEncoded.toString(), { headers: _headers }).toPromise(); break;
        }
        return new BasicResponse(true, "Request success", result)
      } else {
        return new BasicResponse(false, "No se puede hacer el request a una url vacía");
      }
    } catch (error) {
      return new BasicResponse(false, getErrorMessage(error), undefined, getBasicError(error))
    }
  }

  async postLikeJSON(_url: string, _params: any, _headers: any = undefined, method: RequestMethod.POST | RequestMethod.PATCH | RequestMethod.PUT = RequestMethod.POST): Promise<BasicResponse> {
    try {
      if (_url) {
        if (_headers) {
          _headers["Content-Type"] = "application/json"
        } else {
          _headers = { "Content-Type": "application/json" }
        }
        // _headers["api_key"] = environment.api_key;
        _headers = new HttpHeaders(_headers)
        let result: any
        switch (method) {
          case RequestMethod.POST: result = await this._http.post(_url, _params, { headers: _headers }).toPromise(); break;
          case RequestMethod.PATCH: result = await this._http.patch(_url, _params, { headers: _headers }).toPromise(); break;
          case RequestMethod.PUT: result = await this._http.put(_url, _params, { headers: _headers }).toPromise(); break;
        }
        return new BasicResponse(true, "Request success", result)
      } else {
        return new BasicResponse(false, "No se puede hacer el request a una url vacía");
      }
    } catch (error) {
      return new BasicResponse(false, getErrorMessage(error), undefined, getBasicError(error))
    }
  }

}


export enum RequestMethod {
  GET = "GET", POST = "POST", PUT = "PUT", PATCH = "PATCH", DELETE = "DELETE"
}
