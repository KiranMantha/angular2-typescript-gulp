
import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component, enableProdMode, ViewContainerRef, ComponentResolver} from "@angular/core";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {ROUTER_DIRECTIVES, provideRouter} from "@angular/router";
import {TodoListComponent} from "./components/Todos/todo-list.component";
import {TodoDetailsComponent} from "./components/Todos/todo-details.component";
import {TodoService} from "./Services/todo-service";
import {CarsService} from "./Services/cars-service";
import {AppRoutes} from "./Routes/Routes";

enableProdMode()
declare var $: any;

@Component({
    selector: "[app]",
    directives: [ROUTER_DIRECTIVES, TodoListComponent, TodoDetailsComponent],
    templateUrl: "_main.tpl.html"
})

class App {

}

bootstrap(App, [provideRouter(AppRoutes), TodoService, CarsService]).catch(err => console.error(err));