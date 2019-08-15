import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NavController } from '@ionic/angular';
var HomePage = /** @class */ (function () {
    function HomePage(apiService, navController) {
        this.apiService = apiService;
        this.navController = navController;
        this.baseUrl = 'https://www.tiripon.net/assets/event_image/landing/';
        this.skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }
    HomePage.prototype.ngOnInit = function () {
        this.getEvents();
    };
    // ionViewWillEnter() {
    //   this.getEvents();
    // }
    HomePage.prototype.getEvents = function () {
        var _this = this;
        this.apiService.getEvents().then(function (events) {
            if (_this.hasEvents(events)) {
                //alert(JSON.stringify(events));
                _this.events = events;
            }
            else {
                _this.events = [];
            }
        });
    };
    HomePage.prototype.hasEvents = function (events) {
        var numberOfEvents = events.length;
        if (numberOfEvents >= 1) {
            return true;
        }
        else {
            return false;
        }
    };
    HomePage.prototype.navigateToEventPage = function (event) {
        var parameters = {
            queryParams: event
        };
        //alert(JSON.stringify(event));
        this.navController.navigateForward(['/event'], parameters);
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService,
            NavController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map