import {Component, Inject, ComponentResolver, ViewContainerRef, ApplicationRef} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {CarsService} from "../../Services/cars-service";
import {DialogService} from "../../Services/dialog-service";
import {CarModal} from "../../Modals/car-modal";
import {CarDetailsComponent} from "./car-detail.component";

@Component({
  selector: '[cars-list]',
  templateUrl: 'Components/cars/cars-list.tpl.html',
  providers: [DialogService, CarsService]
})

export class CarListComponent {
  private _carModal = new CarModal();
  private cars: any;
  constructor(
    @Inject(CarsService) private _carsService,
    @Inject(DialogService) private _dialogService,
    private _viewContainer: ViewContainerRef,
    private _applicationRef: ApplicationRef
  ) {
  }


  refreashCarsList() {
    this._carsService.$cars.subscribe(updatedCars => {
      this.cars = updatedCars;
    });
  }

  refreashCarsList();

  private _newCar(): void {
    this._carsService.selectedCar = new CarModal();
    this._dialogService.config.viewContainer = this._viewContainer;
    this._dialogService.config.classNameArray = ['ng-dialog', 'car'];
    this._dialogService.config.closeByDocument = false;
    this._dialogService.config.component = CarDetailsComponent;
    this._dialogService.config.callBackComponent = this;
    this._dialogService.callbackOnClose = 'refreashCarsList';
    this._dialogService.openDialog();
  }

  ngOnInit() {
    this._carsService.$cars.subscribe(updatedCars => {
      this.cars = updatedCars;
    });
  }
}
