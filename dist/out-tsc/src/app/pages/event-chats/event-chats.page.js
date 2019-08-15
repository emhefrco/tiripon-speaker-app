import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NavController } from '@ionic/angular';
var EventChatsPage = /** @class */ (function () {
    function EventChatsPage(apiService, navController) {
        this.apiService = apiService;
        this.navController = navController;
        this.events = [];
        this.baseUrl = 'https://www.tiripon.net/assets/event_image/landing/';
    }
    EventChatsPage.prototype.ngOnInit = function () {
        this.getEvents();
    };
    EventChatsPage.prototype.getEvents = function () {
        var _this = this;
        //this.presentLoading('').then(() => {
        this.apiService.getEvents().then(function (events) {
            if (_this.hasEvents(events)) {
                //alert(1);
                _this.events = events;
                //alert(JSON.stringify(this.events));
            }
            else {
                //alert(2);
                _this.events = [];
            }
        });
        //}); 
    };
    EventChatsPage.prototype.hasEvents = function (events) {
        var numberOfEvents = events.length;
        if (numberOfEvents >= 1) {
            return true;
        }
        else {
            return false;
        }
    };
    EventChatsPage.prototype.navigateToEventPage = function (event) {
        var parameters = {
            queryParams: event
        };
        //alert(JSON.stringify(event));
        this.navController.navigateForward(['/event-chat'], parameters);
    };
    EventChatsPage = tslib_1.__decorate([
        Component({
            selector: 'app-event-chats',
            templateUrl: './event-chats.page.html',
            styleUrls: ['./event-chats.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService, NavController])
    ], EventChatsPage);
    return EventChatsPage;
}());
export { EventChatsPage };
//# sourceMappingURL=event-chats.page.js.map