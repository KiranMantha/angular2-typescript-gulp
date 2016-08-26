import { NgModule } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { TodoService } from "../../Services/todo-service";
import { TodoComponent } from "./todo.component";
import { TodoListComponent } from "./todo-list.component";
import { TodoDetailsComponent } from "./todo-details.component";
import { routing } from './todo-routes';

@NgModule({
    imports: [ 
        CommonModule,
        FormsModule,
        routing 
    ],
    declarations: [ 
        TodoComponent, 
        TodoListComponent, 
        TodoDetailsComponent 
    ],
    providers: [ TodoService ]
})
export class TodoModule { }