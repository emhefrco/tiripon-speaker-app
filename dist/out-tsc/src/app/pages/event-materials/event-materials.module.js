import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EventMaterialsPage } from './event-materials.page';
var routes = [
    {
        path: '',
        component: EventMaterialsPage
    }
];
var EventMaterialsPageModule = /** @class */ (function () {
    function EventMaterialsPageModule() {
    }
    EventMaterialsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EventMaterialsPage]
        })
    ], EventMaterialsPageModule);
    return EventMaterialsPageModule;
}());
export { EventMaterialsPageModule };
//# sourceMappingURL=event-materials.module.js.map