import {Component, DynamicComponentLoader, ElementRef, ComponentRef, ApplicationRef, Injector} from '@angular/core';
import { HTTP_PROVIDERS, Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import * as _ from 'lodash';

declare var jQuery: any;

@Component({
    selector: 'ng-dialog',
    providers: [HTTP_PROVIDERS],
    templateUrl: 'Components/ModalDialog/dialog.tpl.html'
})

export class ModalDialog {
    private _elementRef: ElementRef;
    private _content: string;
    private _classArray: Array<string> = [];

    public closeByDocument: boolean;
    public template: string = '';
    public templateUrl: string = '';
    public classNameArray: Array<string> = [];
    public component: Component;

    constructor(private _ElementRef: ElementRef,
        private _http: Http,
        private dcl: DynamicComponentLoader,
        private injector: Injector,
        private appRef: ApplicationRef
    ) {
        this._elementRef = _ElementRef;
    }

    public openDialog(): void {
        jQuery(this._elementRef.nativeElement).parents('body').toggleClass('ng-dialog-open');
        if (this.templateUrl !== '') {
            this._loadTemplate(this.templateUrl).subscribe(content => { 
                jQuery(this._elementRef.nativeElement).find('.ng-dialog-content')[0].innerHTML = content;
            });
        } else if (this.component) {
            this._loadComponent(this.component);
        } else {
            this._content = this.template;
        }
        if (this.classNameArray.length > 0) {
            this._classArray = _.uniq(_.concat('ng-dialog', this.classNameArray));
        } else {
            this._classArray = ['ng-dialog'];
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
        this.componentRef.destroy();
    }

    private _loadComponent(component): void {
        this.dcl.loadAsRoot(this.component, '.ng-dialog-content', this.injector).then(componentref => {
            this.appRef._loadComponent(componentref);
        });
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