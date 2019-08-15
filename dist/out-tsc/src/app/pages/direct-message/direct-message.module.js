import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DirectMessagePage } from './direct-message.page';
var routes = [
    {
        path: '',
        component: DirectMessagePage
    }
];
var DirectMessagePageModule = /** @class */ (function () {
    function DirectMessagePageModule() {
    }
    DirectMessagePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [DirectMessagePage]
        })
    ], DirectMessagePageModule);
    return DirectMessagePageModule;
}());
export { DirectMessagePageModule };
//# sourceMappingURL=direct-message.module.js.map