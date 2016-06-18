import {Injectable} from "angular2/core";
import {TodoModal} from "../Modals/todo-modal";
@Injectable()

export class TodoService{
    todos:Array<TodoModal> = [];
}