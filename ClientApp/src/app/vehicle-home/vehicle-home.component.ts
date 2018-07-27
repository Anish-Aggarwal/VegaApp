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

  // filter: {
  //   sortBy: string,
  //   isSortAscending: boolean
  // } = {
  //   isSortAscending: false,
  //     sortBy: 'make'
  //   };
  filter: any = {pageSize:3};
  columns = [
    { title: 'Id' },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: '' }
  ];
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

  sortByName(columnName) {
    console.log(this.filter.sortBy);
    if (this.filter.sortBy === columnName) {
      console.log(1);
      // this.filter.sortBy = columnName;
      this.filter.isSortAscending = !this.filter.isSortAscending;
    }
    else {
      console.log(2);
      this.filter.sortBy = columnName;
      this.filter.isSortAscending = true;
    }
    this.populateVehicles();
  }

  onPageChanged(page){
    this.filter.page = page;
    this.populateVehicles();
  }

}
