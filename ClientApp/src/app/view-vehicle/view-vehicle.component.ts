import { ToastyService } from 'ng2-toasty';

import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { PhotoService } from '../services/photo.service';

@Component({
  templateUrl: 'view-vehicle.component.html'
})
export class ViewVehicleComponent implements OnInit {
  vehicle: any;
  isActive: boolean;
  vehicleId: number;
  @ViewChild('inputfile') inputFile: ElementRef;
  private fragment: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toasty: ToastyService,
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    private ngZone: NgZone) {


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
  }

  onClick() {
    try {
      console.log(this.fragment);
      this.showActiveTab();
    }
    catch (e) { }
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
      resp => console.log(resp)
    );
  }
} 