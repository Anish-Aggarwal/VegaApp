import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';


@Injectable()
export class FeatureService {

  constructor(private httpClient:HttpClient) { }

  getFeatures(){
    return this.httpClient.get<any[]>("/api/features");
  }
}
