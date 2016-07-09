import {Component, Injectable, ComponentResolver, ViewContainerRef, ViewChild, OnInit} from '@angular/core';
import {ModalDialog} from "../Components/ModalDialog/dialog.component";
import * as _ from 'lodash';
@Injectable()

export class DialogService {
    public config = {
        viewContainer: ViewContainerRef,
        template: '',
        templateUrl: '',
        closeByDocument: true,
        classNameArray: []
    };
    public callbackOnClose: any;
    private _dialog: any;
    constructor(private _componentResolver: ComponentResolver) {
    }

    public openDialog(): void {
        this._componentResolver.resolveComponent(ModalDialog).then(factory => {
            this._dialog = this.config.viewContainer.createComponent(factory);
            this._dialog.instance.componentRef = this._dialog;
            this._dialog.instance.templateUrl = this.config.templateUrl;
            this._dialog.instance.template = this.config.template;
            this._dialog.instance.closeByDocument = this.config.closeByDocument;
            this._dialog.instance.classNameArray = this.config.classNameArray;
            this._dialog.instance.openDialog();
        });
    }

    public closeDialog(): void {
        this._dialog.instance.closeDialog();
        if (_.isFunction(this.callbackOnClose)) {
            this.callbackOnClose();
        }
    }
}
