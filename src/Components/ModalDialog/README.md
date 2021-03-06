##Introduction:

Dialog is developed on the reference of ng-dialog in angular v1. It comprises of a template,component and service.

####methods
```bash
dialog.openDialog()

dialog.closeDialog()
```

####Options:

```bash
dialog.config = {
    viewContainer: ViewContainerRef,
    template: string,
    templateUrl: string,
    closeByDocument: boolean,
    classNameArray: Array<string>,
    component: Component
}

dialog.callbackOnClose: function name
```

#####viewContainer
This represents the DOM container in which the dialog markup is dynamically injected. This is a required parameter.

#####template
This represents the inline markup which is fed to dialog body

```bash
example: dialog.config.template = "<h3>Dynamic Text</h3>"
```

#####templateUrl
This represents the path of the html file. The markup inside this path is dynamically loaded in the dialog body.

```bash
example: dialog.config.templateUrl = "test.html"
```
#####component
This represents the component which is to be dynamically loaded in the dialog body.

```bash
example: dialog.config.component = your-component-name;
```

#####closeByDocument
This accepts a boolean value which control the closing of dialog when clicked outside the dialog body.

```bash
example: dialog.config.closeByDocument = false //default true
```

#####classNameArray
This allows to add custom classes in addition of default class 'ng-dialog' to modal dialog.

```bash
example: dialog.config.classNameArray = ['your-class-1','your-class-2']
```

#####callbackOnClose
This allows to execute any function after dialog closed. You can only avail this option when you want to close dialog on button click by calling ```dialog.closeDialog()```. 

```bash
example: dialog.callbackOnClose = your-function-name
```

####Usage:

Dialog can be consumed by DialogService. This can be done as below:

```javascript
import {Component, Inject, ComponentResolver, ViewContainerRef} from '@angular/core';
import {DialogService} from "<--dialog-service-path-->";

@component({
    providers: [DialogService]
})

export class yourClass {
    constructor(@Inject(DialogService) public _dialogService:DialogService,private _viewContainer: ViewContainerRef){

    }

    yourmethod-to-call-dialog(){
        this._dialogService.config.viewContainer = this._viewContainer; //Required. won't work if not passed.        
        this._dialogService.config.templateUrl = "your-template-url";
        this._dialogService.config.classNameArray = ['ng-dialog', 'test'];
        this._dialogService.config.closeByDocument = false;
        this._dialogService.config.component = DetailsComponent;
        this._dialogService.config.templateUrl = "Components/Todos/todo-details.tpl.html";
        this._dialogService.callbackOnClose = function () { alert('Called on dialog close'); }
        this._dialogService.openDialog();
    }
}
```
