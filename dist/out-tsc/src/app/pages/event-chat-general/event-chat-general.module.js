import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EventChatGeneralPage } from './event-chat-general.page';
var routes = [
    {
        path: '',
        component: EventChatGeneralPage
    }
];
var EventChatGeneralPageModule = /** @class */ (function () {
    function EventChatGeneralPageModule() {
    }
    EventChatGeneralPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EventChatGeneralPage]
        })
    ], EventChatGeneralPageModule);
    return EventChatGeneralPageModule;
}());
export { EventChatGeneralPageModule };
//# sourceMappingURL=event-chat-general.module.js.map