import {Component, ElementRef} from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'modal-dialog',
    templateUrl: 'Components/ModalDialog/modal-dialog.tpl.html'
})

export class ModalDialog {
    private elementRef: ElementRef;
    private _showDialog: boolean;
    private _closeByDocument: boolean;
    constructor(private _elementRef: ElementRef) {
        this.elementRef = _elementRef;
        this._showDialog = false;
        this._closeByDocument = true;
    }
    _openDialog() {
        jQuery(this.elementRef.nativeElement).parents('body').toggleClass('modal-dialog-open');
        this._showDialog = true;
    }
    _closeDialog(evt) {
        if (this._closeByDocument) {
            if (evt.target.classList.contains('modal-dialog') || evt.target.classList.contains('modal-dialog-close')) {
                this._close();
            }
        }
        else {
            if (evt.target.classList.contains('modal-dialog-close')) {
                this._close();
            }
        }
    }

    private _close() {
        jQuery(this.elementRef.nativeElement).parents('body').toggleClass('modal-dialog-open');
        this._showDialog = false;
    }
}