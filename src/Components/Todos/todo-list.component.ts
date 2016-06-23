import {Component, Inject} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {TodoService} from "../../Services/todo-service";
import {TodoModal} from "../../Modals/todo-modal";

@Component({
  selector: 'todo-list',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'Components/Todos/todo-list.tpl.html'
})
export class TodoListComponent {
  constructor( @Inject(TodoService) public todoService) {

  }
  todoModel= new TodoModal();
  saveTodo = function () {
    this.todoModel.id = this.todoService.todos.length + 1; 
    this.todoService.todos.push(this.todoModel);
    this.todoModel= new TodoModal();
  }
}