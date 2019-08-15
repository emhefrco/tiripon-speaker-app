import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EventChatsPage } from './event-chats.page';
var routes = [
    {
        path: '',
        component: EventChatsPage
    }
];
var EventChatsPageModule = /** @class */ (function () {
    function EventChatsPageModule() {
    }
    EventChatsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EventChatsPage]
        })
    ], EventChatsPageModule);
    return EventChatsPageModule;
}());
export { EventChatsPageModule };
//# sourceMappingURL=event-chats.module.js.map