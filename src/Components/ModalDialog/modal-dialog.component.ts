import {Component} from '@angular/core';

@Component({
    selector: 'modal-dialog',
    templateUrl: 'Components/ModalDialog/modal-dialog.tpl.html'
})

export class ModalDialog {
    constructor() {

    }
    _openDialog() {
        alert('open method called');
    }
    _closeDialog() {
        alert('close method called');
    }
}