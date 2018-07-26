import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle, KeyValuePairResource } from '../models/vehicle';
import { MakeService } from '../services/make.service';

@Component({
  selector: 'app-vehicle-home',
  templateUrl: './vehicle-home.component.html',
  styleUrls: ['./vehicle-home.component.css']
})
export class VehicleHomeComponent implements OnInit {

  filter: any = {};
  vehicles: Vehicle[];
  allvehicles: Vehicle[];
  makes: KeyValuePairResource[];
  constructor(private vehicleService: VehicleService,
    private makeService: MakeService) { }

  ngOnInit() {
    this.makeService.getMakes().subscribe(resp => {
      this.makes = resp;
    });
    this.populateVehicles();
  }

  onFilterChange() {

    this.populateVehicles();

  }

  populateVehicles() {
    this.vehicleService.getVehicles(this.filter).subscribe(resp => {
      this.vehicles = resp;
    });
  }

  onResetClick() {
    this.filter = {};
    this.onFilterChange();
  }

}
