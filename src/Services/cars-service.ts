import {Observable, Injectable} from "@angular/core";
import {CarModal} from "../Modals/car-modal";
import {Subject} from "rxjs/Rx";

@Injectable()
export class CarsService {
    private _cars: Subject<CarModal[]>;
    public selectedCar: CarModal;
    private _dataStore: {
        cars: CarModal[]
    };
    constructor() {
        this._cars = <Subject<CarModal[]>>new Subject();
        this.selectedCar = new CarModal();
        this._dataStore = { cars: [] };
    }
    get $cars() {
        return this._cars.asObservable();
    }

    addCar(car: CarModal) {
        if (car.id === 0) {
            car.id = this._dataStore.cars.length + 1;
            this._dataStore.cars.push(car);
        }
        this._cars.next(this._dataStore.cars);
    }
}