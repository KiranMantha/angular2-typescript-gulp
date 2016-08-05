import {Component, Inject} from '@angular/core';
import {CarsService} from "../../Services/cars-service";
import {CarModal} from "../../Modals/car-modal";

@Component({
    selector: '[car-details]',
    templateUrl: 'Components/Cars/car.tpl.html'
})

export class CarDetailsComponent {
    private _carModal: CarModal;
    constructor(
        @Inject(CarsService) private _carsService
    ) {

    }

    private _saveCar(): void {
        this._carsService.addCar(this._carModal);
        this._carModal = new CarModal();
    }

    ngOnInit() {
        this._carModal = this._carsService.selectedCar;
    }
}