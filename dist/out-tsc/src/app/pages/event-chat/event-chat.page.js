import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import { ApiService } from '../../services/api.service';
var EventChatPage = /** @class */ (function () {
    function EventChatPage(apiService) {
        var _this = this;
        this.apiService = apiService;
        this.chatType = 'general';
        this.messages = [];
        this.participants = [];
        this.groupChatMessages = [];
        this.socket = io('https://tiripon.herokuapp.com:443');
        this.socket.on('connect', function () {
            //alert('connected from server');
        });
        this.socket.on('new message', function (newMessage) {
            if (_this.previousMessage !== newMessage.msg) {
                _this.messages.push(newMessage.msg);
                _this.previousMessage = '';
            }
        });
        //alert(JSON.stringify(this.socket));
    }
    EventChatPage.prototype.ngOnInit = function () {
        this.getParticipants();
        this.getGroupChatMessages();
        // this.socket.on('new message', function(data) {
        //   alert(1);
        // });
    };
    EventChatPage.prototype.sendMessage = function () {
        var emptyMessage = '';
        this.previousMessage = this.message;
        //alert(this.message);
        this.socket.emit('send message', this.message);
        this.messages.push(this.message);
        this.message = emptyMessage;
    };
    EventChatPage.prototype.segmentChanged = function (ev) {
        // alert(JSON.stringify(this.chatType));
    };
    EventChatPage.prototype.getParticipants = function () {
        var _this = this;
        //this.presentLoading('').then(() => {
        this.apiService.getParticipants().then(function (participants) {
            if (_this.hasParticipants(participants)) {
                //alert(1);
                _this.participants = participants;
            }
            else {
                //alert(2);
                _this.participants = [];
            }
        });
        //}); 
    };
    EventChatPage.prototype.hasParticipants = function (participants) {
        var numberOfParticipants = participants.length;
        if (numberOfParticipants >= 1) {
            return true;
        }
        else {
            return false;
        }
    };
    EventChatPage.prototype.getGroupChatMessages = function () {
        var _this = this;
        this.apiService.getGroupChatMessages().then(function (groupChatMessages) {
            if (_this.hasParticipants(groupChatMessages)) {
                //alert(1);
                _this.groupChatMessages = groupChatMessages;
                //alert(JSON.stringify(this.groupChatMessages));
            }
            else {
                //alert(2);
                _this.groupChatMessages = [];
            }
        });
    };
    EventChatPage.prototype.navigateToDirectMessagePage = function (participant) {
        var parameters = {
            queryParams: participant
        };
        //alert(JSON.stringify(event));
        this.navController.navigateForward(['/direct-message'], parameters);
    };
    EventChatPage = tslib_1.__decorate([
        Component({
            selector: 'app-event-chat',
            templateUrl: './event-chat.page.html',
            styleUrls: ['./event-chat.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService])
    ], EventChatPage);
    return EventChatPage;
}());
export { EventChatPage };
//# sourceMappingURL=event-chat.page.js.map