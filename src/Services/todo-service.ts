import {Injectable} from "@angular/core";
import {TodoModal} from "../Modals/todo-modal";
@Injectable()

export class TodoService{
    public todos:Array<TodoModal> = [];
}