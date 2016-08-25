import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { DialogService } from "../../Services/dialog-service";
import { ModalDialog } from "./dialog.component";

@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [ ModalDialog ],
  exports: [ ModalDialog ],
  providers: [ DialogService ]
})
export class DialogModule { }