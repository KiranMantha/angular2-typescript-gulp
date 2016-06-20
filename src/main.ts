
import {bootstrap} from "angular2/platform/browser";
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {TodoListComponent} from "./components/Todos/todo-list.component";
import {TodoService} from "./Services/todo-service";

@Component({
    selector: "app",
    directives: [ROUTER_DIRECTIVES, TodoListComponent],
    templateUrl: "_main.tpl.html"
})

class App {

}

bootstrap(App, [TodoService]).catch(err => console.error(err));