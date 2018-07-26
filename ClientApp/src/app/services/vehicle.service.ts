import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../models/vehicle';

@Injectable()
export class VehicleService {
  private readonly apiEndPoint = "/api/vehicles";

  constructor(private httpClient: HttpClient) { }

  createVehicle(vehicle) {
    return this.httpClient.post(this.apiEndPoint, vehicle);
  }

  getVehicle(id) {
    return this.httpClient.get<any[]>(this.apiEndPoint+"/" + id);
  }

  updateVehicle(vehicle) {
    return this.httpClient.put(this.apiEndPoint+"/" + vehicle.id, vehicle);
  }

  deleteVehicle(id) {
    return this.httpClient.delete(this.apiEndPoint+"/" + id);
  }

  getVehicles(filter) {
    return this.httpClient.get<Vehicle[]>(this.apiEndPoint + "?" + this.toQueryObject(filter));
  }

  private toQueryObject(filter) {
    var encodedkeyvalues= [];
    for (const key in filter) {
      if (filter.hasOwnProperty(key)) {
        var value = encodeURIComponent(key) + "=" + encodeURIComponent(filter[key]);
        encodedkeyvalues.push(value);
      }
    }
    return encodedkeyvalues.join("&");
  }
}
