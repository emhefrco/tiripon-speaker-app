import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EventsPage } from './events.page';
var routes = [
    {
        path: '',
        component: EventsPage
    }
];
var EventsPageModule = /** @class */ (function () {
    function EventsPageModule() {
    }
    EventsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EventsPage]
        })
    ], EventsPageModule);
    return EventsPageModule;
}());
export { EventsPageModule };
//# sourceMappingURL=events.module.js.map