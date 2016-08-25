import {NgModule} from '@angular/core';
import {GridView} from './grid-view.component';
import {KeysPipe} from "../../Pipes/keys.pipe";

@NgModule({
    declarations: [
        GridView,
        KeysPipe
    ],
    exports: [GridView]
})
export class GridModule {}