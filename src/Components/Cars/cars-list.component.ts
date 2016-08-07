import {Component, Inject, ComponentResolver, ViewContainerRef, NgZone} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {CarsService} from "../../Services/cars-service";
import {DialogService} from "../../Services/dialog-service";
import {CarModal} from "../../Modals/car-modal";
import {CarDetailsComponent} from "./car-detail.component";
import {GridView} from "../GridView/grid-view.component";

@Component({
  selector: '[cars-list]',
  templateUrl: 'Components/cars/cars-list.tpl.html',
  directives: [CarDetailsComponent, GridView]
})

export class CarListComponent {
  private _carModal = new CarModal();
  private gvOptions: any;
  constructor(
    @Inject(CarsService) private _carsService,
    @Inject(DialogService) private _dialogService,
    private _viewContainer: ViewContainerRef,
    private zone: NgZone
  ) {
  }

  private _showModal(modal: CarModal) {
    this._carsService.selectedCar = modal;
    this._dialogService.config.viewContainer = this._viewContainer;
    this._dialogService.config.classNameArray = ['ng-dialog', 'car'];
    this._dialogService.config.closeByDocument = false;
    this._dialogService.config.component = CarDetailsComponent;
    this._dialogService.openDialog();
  }

  private _newCar(): void {
    this._showModal(new CarModal());
  }

  private _editCar(evt) {
    this._showModal(evt.modal);
  }

  private _deleteCar(evt) {
    this._carsService.deleteCar(evt.modal.id);
  }

  ngOnInit() {
    this._carsService.$cars.subscribe(updatedCars => {
      this.zone.run(() => {
        this.gvOptions = {
          data: updatedCars,
          showActions: true,
          actionsToShow: ['EDIT', 'DELETE'],
          columnDefs: [
            { displayName: 'Id', fieldName: 'id' },
            { displayName: 'Car Name', fieldName: 'name' },
            { displayName: 'Car Type', fieldName: 'type' },
            { displayName: 'Car Company', fieldName: 'company' }
          ]
        };
      });
    });
  }
}
