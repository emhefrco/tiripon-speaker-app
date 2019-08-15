import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
var ApiService = /** @class */ (function () {
    function ApiService(httpClient, storage) {
        this.httpClient = httpClient;
        this.storage = storage;
        //private baseUrl: string = 'https://www.tiripon.net/';
        this.baseUrl = 'http://www.sandbox.baldpuppiessolutions.com/';
        this.controller = 'Android_Api_Speaker/';
    }
    ApiService.prototype.uploadFile = function (event, file) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var url = _this.baseUrl + _this.controller + 'upload_material';
            var fileReader = new FileReader();
            fileReader.onloadend = function () {
                var blobFile = new Blob([fileReader.result], { type: file.type });
                var formData = new FormData();
                formData.append('event_id', event.event_id);
                formData.append('user_id', event.user_id);
                formData.append('title', file.name);
                formData.append('description', 'Description of file.');
                formData.append('filename', file.name);
                formData.append('filetype', file.type);
                formData.append('size', file.size);
                formData.append('file', blobFile, file.name);
                _this.httpClient.post(url, formData).subscribe(function (response) {
                    resolve(response);
                }, function (error) {
                    reject(error);
                });
            };
            fileReader.readAsArrayBuffer(file);
        });
        return promise;
    };
    ApiService.prototype.getMaterials = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var url = _this.baseUrl + _this.controller + 'get_materials';
            _this.httpClient.get(url).subscribe(function (materials) {
                resolve(materials);
            });
        });
        return promise;
    };
    ApiService.prototype.getUser = function (credentials) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var url = _this.baseUrl + _this.controller + 'get_tiripon_user';
            var params = new FormData();
            params.append('email', credentials.email);
            params.append('password', credentials.password);
            _this.httpClient.post(url, params).subscribe(function (response) {
                resolve(response);
            }, function (error) {
                alert(JSON.stringify(error));
            });
        });
        return promise;
    };
    ApiService.prototype.getTiriponUserAccount = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var isFacebookLogin = data.loginType === 'facebook';
            var isGoogleLogin = data.loginType === 'google';
            var isNormalLogin = data.loginType === 'normal';
            var url = _this.baseUrl + _this.controller;
            var params = new FormData();
            params.append('email', data.email);
            if (isFacebookLogin) {
                params.append('facebook_oauth_id', data.id);
                url += 'get_facebook_user_oauth';
            }
            else if (isGoogleLogin) {
                params.append('google_oauth_id', data.id);
                url += 'get_google_user_oauth';
            }
            else {
                url += 'get_tiripon_user';
                params.append('password', data.password);
            }
            _this.httpClient.post(url, params).subscribe(function (response) {
                resolve(response);
            }, function (error) {
                alert(JSON.stringify(error));
            });
        });
    };
    ApiService.prototype.getEvents = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var url = _this.baseUrl + _this.controller + 'get_designations';
            _this.storage.get('user').then(function (user) {
                var params = new FormData();
                params.append('user_id', user.user_id);
                _this.httpClient.post(url, params).subscribe(function (response) {
                    resolve(response);
                }, function (error) {
                    reject(error);
                });
            });
        });
        return promise;
    };
    ApiService.prototype.getGroupChatMessages = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var url = 'http://www.sandbox.baldpuppiessolutions.com/Android_Api/read_all_chat_message';
            _this.httpClient.get(url).subscribe(function (response) {
                //alert(response);
                resolve(response);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    };
    ApiService.prototype.getParticipants = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var url = _this.baseUrl + _this.controller + 'get_event_particpants';
            _this.httpClient.get(url).subscribe(function (response) {
                //alert(response);
                resolve(response);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    };
    ApiService.prototype.getEventMaterials = function (event) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var url = _this.baseUrl + _this.controller + 'get_materials';
            var params = new FormData();
            params.append('event_id', event.event_id);
            params.append('user_id', event.user_id);
            _this.httpClient.post(url, params).subscribe(function (materials) {
                resolve(materials);
            }, function (error) {
                alert(JSON.stringify(error));
                reject(error);
            });
        });
        return promise;
    };
    ApiService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Storage])
    ], ApiService);
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=api.service.js.map