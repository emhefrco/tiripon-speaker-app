import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MaterialsPage } from './materials.page';
var routes = [
    {
        path: '',
        component: MaterialsPage
    }
];
var MaterialsPageModule = /** @class */ (function () {
    function MaterialsPageModule() {
    }
    MaterialsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MaterialsPage]
        })
    ], MaterialsPageModule);
    return MaterialsPageModule;
}());
export { MaterialsPageModule };
//# sourceMappingURL=materials.module.js.map