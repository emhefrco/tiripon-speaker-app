import * as tslib_1 from "tslib";
import { Component, } from '@angular/core';
import { Platform, NavController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { HeaderColor } from '@ionic-native/header-color/ngx';
var AppComponent = /** @class */ (function () {
    function AppComponent(navController, platform, splashScreen, statusBar, storage, loadingController, headerColor) {
        this.navController = navController;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.storage = storage;
        this.loadingController = loadingController;
        this.headerColor = headerColor;
        //this.storage.set('isLogin', true);
        //this.storage.clear();
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.platform.ready().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.splashScreen.hide();
                                this.headerColor.tint('#ffffff');
                                this.statusBar.styleDefault();
                                this.statusBar.backgroundColorByHexString('#333333');
                                return [4 /*yield*/, this.getLoginStatus().then(function (hasLoggedIn) {
                                        //alert(isLogin);
                                        if (hasLoggedIn) {
                                            //alert(1);
                                            _this.navController.navigateForward('/event-chats');
                                        }
                                        else {
                                            //alert(1);
                                            _this.navController.navigateForward('/login');
                                        }
                                    })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    AppComponent.prototype.getLoginStatus = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('hasLoggedIn').then(function (hasLoggedIn) {
                resolve(hasLoggedIn);
            }, function (error) {
                reject(error);
            });
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            Platform,
            SplashScreen,
            StatusBar,
            Storage,
            LoadingController,
            HeaderColor])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map