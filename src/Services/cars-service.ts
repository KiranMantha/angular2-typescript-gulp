import {Injectable} from "@angular/core";
import {CarModal} from "../Modals/car-modal";
@Injectable()

export class CarsService{
    public cars:Array<CarModal> = [];
}