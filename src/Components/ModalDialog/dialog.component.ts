import {Component, ElementRef} from '@angular/core';
import { HTTP_PROVIDERS, Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

declare var jQuery: any;

@Component({
    selector: 'ng-dialog',
    providers: [HTTP_PROVIDERS],
    templateUrl: 'Components/ModalDialog/modal-dialog.tpl.html'
})

export class ModalDialog {
    private _elementRef: ElementRef;
    private _showDialog: boolean;
    private _content: string;

    public closeByDocument: boolean;
    public template: string = '';
    public templateUrl: string = '';

    constructor(private _ElementRef: ElementRef, private _http: Http) {
        this._elementRef = _ElementRef;
        this._showDialog = false;
    }

    public openDialog(): void {
        jQuery(this._elementRef.nativeElement).parents('body').toggleClass('ng-dialog-open');
        this._showDialog = true;
        if (this.templateUrl !== '') {
            this._loadTemplate(this.templateUrl).subscribe(content => this._content = content);
        } else {
            this._content = this.template;
        }
    }
    public closeDialog(evt): void {
        if (this.closeByDocument) {
            if (evt.target.classList.contains('ng-dialog') || evt.target.classList.contains('ng-dialog-close')) {
                this._close();
            }
        }
        else {
            if (evt.target.classList.contains('ng-dialog-close')) {
                this._close();
            }
        }
    }

    private _close(): void {
        jQuery(this._elementRef.nativeElement).parents('body').toggleClass('ng-dialog-open');
        this._showDialog = false;
    }

    private _loadTemplate(tmpl): Observable<string> {
        return this._http.get(tmpl)
            .map(this._extractData)
    }

    private _extractData(res: Response): string {
        let body = res;
        return body.text() || '';
    }
}