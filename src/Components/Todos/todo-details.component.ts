import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TodoService} from "../../Services/todo-service";
import {TodoModal} from "../../Modals/todo-modal";

@Component({
    selector: 'todo-details',
    templateUrl: 'Components/Todos/todo-details.tpl.html'
})

export class TodoDetailsComponent {
    todoModal: TodoModal;
    constructor(private route: ActivatedRoute, private todoService: TodoService) {

    }

    ngOnInit() {
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.todoModal = this.todoService.todos[Number(id) - 1];
            });
    }
}