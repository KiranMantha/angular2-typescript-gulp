import {Component, Inject} from 'angular2/core';
import {TodoService} from "../../Services/todo-service";
import {TodoModal} from "../../Modals/todo-modal";

@Component({
  selector: 'todo-list',
  templateUrl: 'Components/Todos/todo-list.tpl.html'
})
export class TodoListComponent {
  constructor( @Inject(TodoService) public todoService) {

  }
  todoModel= new TodoModal();
  saveTodo = function () {
    this.todoService.todos.push(this.todoModel);
    this.todoModel= new TodoModal();
  }
}