import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
var EventsPage = /** @class */ (function () {
    function EventsPage(apiService, alertController, loadingController, navController) {
        this.apiService = apiService;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.navController = navController;
        this.events = undefined;
        this.baseUrl = 'https://www.tiripon.net/assets/event_image/landing/';
        this.skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }
    EventsPage.prototype.ngOnInit = function () {
        this.getEvents();
    };
    EventsPage.prototype.getEvents = function () {
        var _this = this;
        //this.presentLoading('').then(() => {
        this.apiService.getEvents().then(function (events) {
            if (_this.hasEvents(events)) {
                //alert(1);
                _this.events = events;
                _this.dismissLoading();
                //alert(JSON.stringify(this.events));
            }
            else {
                //alert(2);
                _this.events = [];
                _this.dismissLoading();
            }
        });
        //}); 
    };
    EventsPage.prototype.hasEvents = function (events) {
        var numberOfEvents = events.length;
        if (numberOfEvents >= 1) {
            return true;
        }
        else {
            return false;
        }
    };
    EventsPage.prototype.presentLoading = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = {
                            message: message
                        };
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create(options)];
                    case 1:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventsPage.prototype.dismissLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loading.dismiss()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventsPage.prototype.navigateToEventPage = function (event) {
        var parameters = {
            queryParams: event
        };
        //alert(JSON.stringify(event));
        this.navController.navigateForward(['/event'], parameters);
    };
    EventsPage = tslib_1.__decorate([
        Component({
            selector: 'app-events',
            templateUrl: './events.page.html',
            styleUrls: ['./events.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService,
            AlertController,
            LoadingController,
            NavController])
    ], EventsPage);
    return EventsPage;
}());
export { EventsPage };
//# sourceMappingURL=events.page.js.map