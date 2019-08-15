import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EventPage } from './event.page';
var routes = [
    {
        path: '',
        component: EventPage
    }
];
var EventPageModule = /** @class */ (function () {
    function EventPageModule() {
    }
    EventPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EventPage]
        })
    ], EventPageModule);
    return EventPageModule;
}());
export { EventPageModule };
//# sourceMappingURL=event.module.js.map