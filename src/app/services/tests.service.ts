import { Injectable } from '@angular/core';
import { BasicResponse } from 'src/app/core/models/basic-response.model';
import { getCurrentUser } from 'src/app/core/services/functions.service';
import { RequestsService } from 'src/app/core/services/requests.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  constructor(private readonly requestsService: RequestsService) { }

  async findAll(where?: object): Promise<BasicResponse> {
    const result = this.requestsService.makeRequest(environment.domain, environment.apis.multiplicaciones.all, where)
    return result
  }

  async create(value: object): Promise<BasicResponse> {
    const result = this.requestsService.makeRequest(environment.domain, environment.apis.multiplicaciones.create, value)
    return result
  }

}
