// Exact copy except import UserService from shared
import { Component }   from '@angular/core';

@Component({
  template: `
    <h2>Cars</h2>
    <router-outlet></router-outlet>
  `
})
export class CarComponent { }