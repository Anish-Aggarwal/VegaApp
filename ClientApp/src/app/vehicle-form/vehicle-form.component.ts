import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs/observable/forkJoin'
import * as _ from 'underscore'

import { MakeService } from '../services/make.service';
import { FeatureService } from '../services/feature.service';
import { VehicleService } from '../services/vehicle.service';
import { ToastyService } from '../../../node_modules/ng2-toasty';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { Vehicle, SaveVehicle } from '../models/vehicle';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  features: any[];
  models = [];
  vehicle: SaveVehicle = {
    id: 0,
    modelId: 0,
    makeId: 0,
    isRegistered: false,
    contact: {
      email: '',
      name: '',
      phone: ''
    },
    features: []
  };
  makes: any[];
  sources = [this.makeService.getMakes(), this.featureService.getFeatures()];
  constructor(
    private makeService: MakeService,
    private featureService: FeatureService,
    private vehicleService: VehicleService,
    private toastyservice: ToastyService,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.params.subscribe(p => {
      this.vehicle.id = +p['id'] || 0;
    });
  }

  ngOnInit() {

    if (this.vehicle.id) {
      this.sources.push(this.vehicleService.getVehicle(this.vehicle.id))
    }

    forkJoin(this.sources).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];
      if (this.vehicle.id) {
        this.setVehicle(data[2] as Object);
        this.populateModels();
      }
    }, err => {
      if (err.status == 404) {
        this.router.navigate(['/']);
      }
    });
  }

  private setVehicle(v) {
    let vy = v as Vehicle;
    this.vehicle.id = vy.id;
    this.vehicle.contact = vy.contact;
    this.vehicle.isRegistered = vy.isRegistered;
    this.vehicle.makeId = vy.make.id;
    this.vehicle.modelId = vy.model.id;
    this.vehicle.features = _.pluck(vy.features, 'id');
  }

  private populateModels() {
    var selectedmake = this.makes.find(x => x.id == this.vehicle.makeId);
    this.models = selectedmake ? selectedmake.models : [];
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  onToggleCheck(id, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(id);
    } else {
      var index = this.vehicle.features.indexOf(id);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    var result$ = (this.vehicle.id) ?
     this.vehicleService.updateVehicle(this.vehicle) :
      this.vehicleService.createVehicle(this.vehicle); 
    result$.subscribe(vehicle => {
      this.toastyservice.success({
        title: 'Success', 
        msg: 'Data was sucessfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
      this.router.navigate(['/vehicles/', vehicle.id])
    });
    }

}
