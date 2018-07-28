import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '../../../node_modules/@angular/common/http';


@Injectable()
export class PhotoService {

  constructor(private httpclient: HttpClient) { }

  uploadPhotoforVehicle(vehicleId, file) {
    var formData = new FormData();
    formData.append('file', file);
    const httpRequest = new HttpRequest('POST',
      `/api/vehicles/${vehicleId}/photos`,
      formData, { reportProgress: true });

    return this.httpclient.request(httpRequest);
  }

  getPhotos(vehicleid) {
    return this.httpclient.get<any[]>(`/api/vehicles/${vehicleid}/photos`);
  }
}
