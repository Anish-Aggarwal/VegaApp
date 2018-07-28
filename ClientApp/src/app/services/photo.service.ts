import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable()
export class PhotoService {

  constructor(private httpclient: HttpClient) { }

  uploadPhotoforVehicle(vehicleId, file) {
    var formData = new FormData();
    formData.append('file', file);
    return this.httpclient.post(`/api/vehicles/${vehicleId}/photos`, formData);
  }
}
