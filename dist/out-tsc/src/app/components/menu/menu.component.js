import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/auth.service';
var MenuComponent = /** @class */ (function () {
    function MenuComponent(alertController, facebook, menuController, navController, storage, authService) {
        this.alertController = alertController;
        this.facebook = facebook;
        this.menuController = menuController;
        this.navController = navController;
        this.storage = storage;
        this.authService = authService;
    }
    MenuComponent.prototype.ngOnInit = function () {
    };
    MenuComponent.prototype.closeMenu = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.menuController.close()];
                    case 1:
                        _a.sent();
                        console.log(1);
                        return [2 /*return*/];
                }
            });
        });
    };
    MenuComponent.prototype.logoutFacebookAccount = function () {
        /*alert(JSON.stringify(this.facebook));
          this.facebook.logout().then(result => {
            alert(JSON.stringify(this.facebook));
            alert(result);
          }, error => {
            alert(error);
          }); */
    };
    MenuComponent.prototype.logout = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.storage.get('loginType').then(function (loginType) {
                    //alert(loginType);
                    if (loginType === 'facebook') {
                        //alert('f');
                        _this.authService.logoutFacebookUserAuth();
                    }
                    else if (loginType === 'google') {
                        //alert('g');
                        _this.authService.logoutGoogleUserAuth();
                    }
                    else if (loginType === 'normal') {
                        //alert('n');
                    }
                    else {
                        alert('Invalid!');
                    }
                    _this.storage.clear();
                    _this.menuController.close();
                    _this.navController.navigateForward(['/login']);
                });
                return [2 /*return*/];
            });
        });
    };
    MenuComponent.prototype.showConfirmLogout = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Confirm Logout',
                            message: 'Do you want to logout your Tiripon account?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary'
                                }, {
                                    text: 'Logout',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        _this.logout();
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MenuComponent = tslib_1.__decorate([
        Component({
            selector: 'app-menu',
            templateUrl: './menu.component.html',
            styleUrls: ['./menu.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            Facebook,
            MenuController,
            NavController,
            Storage,
            AuthService])
    ], MenuComponent);
    return MenuComponent;
}());
export { MenuComponent };
//# sourceMappingURL=menu.component.js.map