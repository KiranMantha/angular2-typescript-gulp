import {TodoListComponent} from "../components/Todos/todo-list.component";
import {TodoDetailsComponent} from "../components/Todos/todo-details.component";

export const AppRoutes = [
    { path: '', component: TodoListComponent, name: 'Todos', useAsDefault: true },
    { path: 'todo/details/:id', component: TodoDetailsComponent, name: 'TodoDetailsComponent' }
];