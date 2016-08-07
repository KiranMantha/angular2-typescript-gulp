import {Injectable} from "@angular/core";
import {CarModal} from "../Modals/car-modal";
import {BehaviorSubject} from "rxjs/Rx";
import * as _ from 'lodash';

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
        } else {
            _.assign(_.filter(this._dataStore.cars, { 'id': car.id}), car);
        }
        this._cars.next(this._dataStore.cars);
    }

    deleteCar(id: number) {
        _.remove(this._dataStore.cars, ['id', id]);
        this._cars.next(this._dataStore.cars);
    }
}