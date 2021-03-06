import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class MakeService {

  constructor(private httpclient:HttpClient) { }

  getMakes(){
    return this.httpclient.get<any[]>("./api/makes");
  }

}
