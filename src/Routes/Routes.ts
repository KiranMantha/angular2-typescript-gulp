
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: 'todos', loadChildren: 'scripts/components/Todos/index' },
  { path: 'cars', loadChildren: 'scripts/components/Cars/index' }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);