import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TodoService} from "../../Services/todo-service";
import {TodoModal} from "../../Modals/todo-modal";

@Component({
    selector: '[todo-details]',
    templateUrl: 'Components/Todos/todo-details.tpl.html'
})

export class TodoDetailsComponent {
    private _todoModal: TodoModal;
    constructor(private _route: ActivatedRoute, private _todoService: TodoService) {

    }

    ngOnInit() {
        if (this._route.snapshot.params['id']) {
            let id = parseInt(this._route.snapshot.params['id'], 10);
            this._todoModal = this._todoService.todos[id - 1];
        } else {
            this._todoModal = this._todoService.todos[1];
        }
    }
}