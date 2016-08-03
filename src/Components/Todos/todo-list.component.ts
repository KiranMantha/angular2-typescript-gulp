import {Component, Inject, ComponentResolver, ViewContainerRef} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {TodoService} from "../../Services/todo-service";
import {DialogService} from "../../Services/dialog-service";
import {TodoModal} from "../../Modals/todo-modal";
import {TodoDetailsComponent} from "./todo-details.component";

import {CarListComponent} from "../Cars/cars-list.component";

@Component({
  selector: 'todo-list',
  directives: [ROUTER_DIRECTIVES, CarListComponent],
  templateUrl: 'Components/Todos/todo-list.tpl.html',
  providers: [DialogService]
})

export class TodoListComponent {
  constructor(
    @Inject(TodoService) private _todoService,
    @Inject(DialogService) private _dialogService,
    private _viewContainer: ViewContainerRef
  ) {

  }
  private _todoModel = new TodoModal();
  private _saveTodo(): void {
    this._todoModel.id = this._todoService.todos.length + 1;
    this._todoService.todos.push(this._todoModel);
    this._todoModel = new TodoModal();
  }

  private _open(): void {
    this._dialogService.config.viewContainer = this._viewContainer;
    this._dialogService.config.classNameArray = ['ng-dialog', 'test'];
    //this._dialogService.config.closeByDocument = false;
    this._dialogService.config.component = TodoDetailsComponent;
    //this._dialogService.config.templateUrl = "Components/Todos/todo-details.tpl.html";
    this._dialogService.openDialog();
    this._dialogService.callbackOnClose = function () { alert('CAlled on dialog close'); }
  }
}
