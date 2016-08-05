import {Injectable} from "@angular/core";
import {CarModal} from "../Modals/car-modal";
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class CarsService {
    private _cars = new BehaviorSubject<CarModal[]>([]);
    public $cars = this._cars.asObservable();
    public selectedCar: CarModal;
    private _dataStore: {
        cars: CarModal[]
    } = { cars: [] };

    addCar(car: CarModal) {
        if (car.id === 0) {
            car.id = this._dataStore.cars.length + 1;
            this._dataStore.cars.push(car);
        }
        this._cars.next(this._dataStore.cars);
    }
}