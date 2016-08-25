import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { GridModule } from '../GridView/index';
import { CarsService } from "../../Services/cars-service";
import { CarComponent } from "./car.component";
import { CarListComponent } from "./cars-list.component";
import { CarDetailsComponent } from "./car-detail.component";
import { routing } from './car-routes';

@NgModule({
  imports: [
    FormsModule, 
    CommonModule, 
    routing
  ],
  declarations: [ 
    CarComponent, 
    CarListComponent, 
    CarDetailsComponent 
  ],
  providers: [ CarsService ]
})
export class CarsModule { }