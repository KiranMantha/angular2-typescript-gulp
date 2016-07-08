import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TodoService} from "../../Services/todo-service";
import {TodoModal} from "../../Modals/todo-modal";

@Component({
    selector: 'todo-details',
    templateUrl: 'Components/Todos/todo-details.tpl.html'
})

export class TodoDetailsComponent {
    private _todoModal: TodoModal;
    constructor(private _route: ActivatedRoute, private _todoService: TodoService) {

    }

    ngOnInit() {
        this._route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this._todoModal = this._todoService.todos[Number(id) - 1];
            });
    }
}