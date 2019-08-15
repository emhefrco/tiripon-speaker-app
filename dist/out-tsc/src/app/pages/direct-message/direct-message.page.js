import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
var DirectMessagePage = /** @class */ (function () {
    function DirectMessagePage(navController) {
        this.navController = navController;
    }
    DirectMessagePage.prototype.ngOnInit = function () {
    };
    DirectMessagePage = tslib_1.__decorate([
        Component({
            selector: 'app-direct-message',
            templateUrl: './direct-message.page.html',
            styleUrls: ['./direct-message.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController])
    ], DirectMessagePage);
    return DirectMessagePage;
}());
export { DirectMessagePage };
//# sourceMappingURL=direct-message.page.js.map