import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EventChatPage } from './event-chat.page';
var routes = [
    {
        path: '',
        component: EventChatPage
    }
];
var EventChatPageModule = /** @class */ (function () {
    function EventChatPageModule() {
    }
    EventChatPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EventChatPage]
        })
    ], EventChatPageModule);
    return EventChatPageModule;
}());
export { EventChatPageModule };
//# sourceMappingURL=event-chat.module.js.map