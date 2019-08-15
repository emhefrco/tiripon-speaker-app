import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
var EventPage = /** @class */ (function () {
    function EventPage(route) {
        this.route = route;
        this.baseUrl = 'https://www.tiripon.net/assets/event_image/landing/';
    }
    EventPage.prototype.ngOnInit = function () {
        var _this = this;
        this.getEvent().then(function (event) {
            _this.event = event;
        });
    };
    EventPage.prototype.getEvent = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.route.queryParams.subscribe(function (params) {
                            resolve(params);
                        }, function (error) {
                            reject(error);
                        });
                    })];
            });
        });
    };
    EventPage = tslib_1.__decorate([
        Component({
            selector: 'app-event',
            templateUrl: './event.page.html',
            styleUrls: ['./event.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute])
    ], EventPage);
    return EventPage;
}());
export { EventPage };
//# sourceMappingURL=event.page.js.map