
import {bootstrap} from "angular2/platform/browser";
import {Component} from "angular2/core";
import { TodoList } from "./components/Todos/todo-list";
import {TodoService} from "./Services/todo-service";

@Component({
    selector: "app",
    directives: [TodoList],
    templateUrl: "_main.tpl.html"
})

class App {

}

bootstrap(App,[TodoService]);