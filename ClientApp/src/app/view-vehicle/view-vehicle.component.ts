import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { PhotoService } from '../services/photo.service';
import { HttpEventType } from '../../../node_modules/@angular/common/http';

@Component({
  templateUrl: 'view-vehicle.component.html'
})
export class ViewVehicleComponent implements OnInit {
  vehicle: any;
  isActive: boolean;
  vehicleId: number;
  @ViewChild('inputfile') inputFile: ElementRef;
  private fragment: string;
  photos: any[];
  loaded: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private photoService: PhotoService) {


    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    });

  }

  ngOnInit() {
    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        });

    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
      this.showActiveTab();
    });

    this.photoService.getPhotos(this.vehicleId).subscribe(photos => {
      this.photos = photos;
    });
  }

  showActiveTab() {
    if (this.fragment === "basic") {
      this.isActive = true;
    } else { this.isActive = false; }
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.deleteVehicle(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }
  onUpload() {
    var inputFileElement: HTMLInputElement = this.inputFile.nativeElement;

    this.photoService.uploadPhotoforVehicle(this.vehicleId, inputFileElement.files[0]).subscribe(
      resp => {
        if(resp.type===HttpEventType.UploadProgress){
          this.loaded = Math.round(100 * resp.loaded / resp.total);
        }
        if(resp.type===HttpEventType.Response){
          this.photos.push(resp.body)
        }
      }
    );
  }
} 