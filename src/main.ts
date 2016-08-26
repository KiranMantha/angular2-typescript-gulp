import {NgModule, Component, enableProdMode} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {routing, appRoutingProviders} from "./Routes/Routes";;
import {TodoModule} from './components/Todos/index';
import {CarsModule} from './components/Cars/index';

enableProdMode()
let $: any;

@Component({
    selector: "[app]",
    templateUrl: "_main.tpl.html"
})

class App { }

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        TodoModule,
        CarsModule
    ],
    declarations: [App],
    bootstrap: [App]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);