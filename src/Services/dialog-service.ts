import {Component, Injectable, ComponentResolver, ViewContainerRef, ViewChild, OnInit} from '@angular/core';
import {ModalDialog} from "../Components/ModalDialog/dialog.component";
@Injectable()

export class DialogService {
    public config = {
        viewContainer: ViewContainerRef,
        template: '',
        templateUrl: '',
        closeByDocument: true,
        classNameArray: []
    };

    constructor(private _componentResolver: ComponentResolver) {
    }

    public openDialog(): void {
        this._componentResolver.resolveComponent(ModalDialog).then(factory => {
            let dialog = this.config.viewContainer.createComponent(factory);
            dialog.instance.templateUrl = this.config.templateUrl;
            dialog.instance.template = this.config.template;
            dialog.instance.closeByDocument = this.config.closeByDocument;
            dialog.instance.classNameArray = this.config.classNameArray;
            dialog.instance.openDialog();
        });
    }
}
