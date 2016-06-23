import {Injectable} from "@angular/core";
import {TodoModal} from "../Modals/todo-modal";
@Injectable()

export class TodoService{
    todos:Array<TodoModal> = [];
}