import {Component, Inject, ComponentResolver, ViewContainerRef} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {CarsService} from "../../Services/cars-service";
import {DialogService} from "../../Services/dialog-service";
import {CarModal} from "../../Modals/car-modal";

@Component({
  selector: 'cars-list',
  templateUrl: 'Components/cars/cars-list.tpl.html',
  providers: [DialogService, CarsService]
})

export class CarListComponent {
  constructor(
    @Inject(CarsService) private _carsService,
    @Inject(DialogService) private _dialogService,
    private _viewContainer: ViewContainerRef
  ) {

  }
  private _carModal = new CarModal();
  private _saveCar(): void {
    this._carModal.id = this._carsService.cars.length + 1;
    this._carsService.cars.push(this._carModal);
    this._carModal = new CarModal();
  }

  private _open(): void {
    this._dialogService.config.viewContainer = this._viewContainer;
    this._dialogService.config.classNameArray = ['ng-dialog', 'test'];
    this._dialogService.config.closeByDocument = false;
    this._dialogService.config.templateUrl = "Components/Todos/todo-details.tpl.html";
    this._dialogService.openDialog();
  }
}

@Component({
  selector: 'car',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'Components/cars/car.tpl.html',
  providers: [DialogService]
})

export class CarComponent {
  constructor() {

  }
  private _carModal = new CarModal();
}
