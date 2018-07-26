import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VehicleService {

  constructor(private httpClient: HttpClient) { }

  createVehicle(vehicle) {
    return this.httpClient.post("/api/vehicles", vehicle);
  }

  getVehicle(id){
    return this.httpClient.get<any[]>("/api/vehicles/"+id);
  }

  updateVehicle(vehicle){
    return this.httpClient.put("/api/vehicles/"+vehicle.id,vehicle);
  }

  deleteVehicle(id){
    return this.httpClient.delete("/api/vehicles/"+id);
  }
}
