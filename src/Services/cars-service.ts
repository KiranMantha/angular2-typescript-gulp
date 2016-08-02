import {Injectable} from "@angular/core";
import {TodoModal} from "../Modals/todo-modal";
@Injectable()

export class CarsService{
    public cars:Array<TodoModal> = [];
}