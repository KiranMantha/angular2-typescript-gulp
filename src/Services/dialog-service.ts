import {Component, Injectable, ComponentResolver, ViewContainerRef} from '@angular/core';
import {ModalDialog} from "../Components/ModalDialog/dialog.component";
import { Observable }     from 'rxjs/Observable';
import * as _ from 'lodash';
@Injectable()

export class DialogService {
    public config = {
        viewContainer: ViewContainerRef,
        template: '',
        templateUrl: '',
        closeByDocument: true,
        classNameArray: [],
        component: Component
    };
    public callbackOnClose: any;
    private _dialog: any;

    constructor(private _componentResolver: ComponentResolver) {
    }

    public openDialog(): void {
        this._createComponent(ModalDialog, this.config.viewContainer)
            .subscribe(component => {
                this._dialog = component;
                this._dialog.instance.templateUrl = this.config.templateUrl;
                this._dialog.instance.template = this.config.template;
                this._dialog.instance.closeByDocument = this.config.closeByDocument;
                this._dialog.instance.classNameArray = this.config.classNameArray;
                this._dialog.instance.component = this.config.component;
                this._dialog.instance.openDialog();
            });
    }

    private _createComponent(_componentName: any, _viewContainer: any): Observable<Component> {
        return Observable.create(obs => {
            this._componentResolver.resolveComponent(_componentName).then(factory => {
                let _component = _viewContainer.createComponent(factory);
                _component.instance.componentRef = _component;
                obs.next(_component);
                obs.complete();
            });
        });
    }

    public closeDialog(): void {
        this._dialog.instance.closeDialog();
        if (_.isFunction(this.callbackOnClose)) {
            this.callbackOnClose();
        }
    }
}
