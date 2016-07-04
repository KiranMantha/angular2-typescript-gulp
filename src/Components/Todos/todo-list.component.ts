import {Component, Inject, ComponentResolver, ViewContainerRef, ViewChild, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ModalDialog} from "../ModalDialog/modal-dialog.component";
import {TodoService} from "../../Services/todo-service";
import {TodoModal} from "../../Modals/todo-modal";

@Component({
  selector: 'todo-list',
  directives: [ROUTER_DIRECTIVES, ModalDialog],
  templateUrl: 'Components/Todos/todo-list.tpl.html'
})

export class TodoListComponent {
  constructor(
    @Inject(TodoService) public todoService,
    private componentResolver: ComponentResolver,
    private vc: ViewContainerRef
  ) {

  }
  todoModel = new TodoModal();
  saveTodo = function () {
    this.todoModel.id = this.todoService.todos.length + 1;
    this.todoService.todos.push(this.todoModel);
    this.todoModel = new TodoModal();
  }

  open() {
    this.componentResolver.resolveComponent(ModalDialog).then(factory => {
      let dialog = this.vc.createComponent(factory);      
      dialog.instance.templateUrl = "Components/Todos/todo-details.tpl.html";
      dialog.instance.closeByDocument = true;
      dialog.instance._openDialog();
    });
  }
}
