import {Component, Inject, ComponentResolver, ViewContainerRef} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ModalDialog} from "../ModalDialog/modal-dialog.component";
import {TodoService} from "../../Services/todo-service";
import {DialogService} from "../../Services/dialog-service";
import {TodoModal} from "../../Modals/todo-modal";

@Component({
  selector: 'todo-list',
  directives: [ROUTER_DIRECTIVES, ModalDialog],
  templateUrl: 'Components/Todos/todo-list.tpl.html',
  providers: [DialogService]
})

export class TodoListComponent {
  constructor(
    @Inject(TodoService) public todoService,
    @Inject(DialogService) public dialogService,
    private _viewContainer: ViewContainerRef
  ) {

  }
  todoModel = new TodoModal();
  saveTodo = function () {
    this.todoModel.id = this.todoService.todos.length + 1;
    this.todoService.todos.push(this.todoModel);
    this.todoModel = new TodoModal();
  }

  open() {    
    this.dialogService.config.viewContainer = this._viewContainer;
    this.dialogService.config.closeByDocument = false;
    this.dialogService.config.templateUrl = "Components/Todos/todo-details.tpl.html";
    this.dialogService.openDialog();
  }
}
