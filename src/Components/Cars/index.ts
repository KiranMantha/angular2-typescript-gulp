import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { GridModule } from '../GridView/index';
import { CarsService } from "../../Services/cars-service";
import { CarComponent } from "./car.component";
import { CarListComponent } from "./cars-list.component";
import { CarDetailsComponent } from "./car-detail.component";
import { routing } from './car-routes';
import { GridModule } from '../GridView/index';
import {DialogModule} from '../ModalDialog/index';

/*
Dont declare a component if it is going to dynamically created. 
All the dynamically created components will come under AppModule scope.
If Declared, code will throw error saying that the component is refered twice in CarsModule and AppModule.
*/

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    routing,
    GridModule,
    DialogModule
  ],
  declarations: [
    CarComponent,
    CarListComponent
  ],
  providers: [CarsService]
})
export class CarsModule { }