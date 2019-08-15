import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { ApiService } from '../services/api.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var AuthService = /** @class */ (function () {
    function AuthService(apiService, facebook, googlePlus, navController, storage) {
        this.apiService = apiService;
        this.facebook = facebook;
        this.googlePlus = googlePlus;
        this.navController = navController;
        this.storage = storage;
    }
    AuthService.prototype.getFbUserAuth = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.facebook.login(['public_profile', 'email']).then(function (response) {
                var userId = response.authResponse.userID;
                _this.getFbUserDetails(userId).then(function (details) {
                    resolve(details);
                });
            })
                .catch(function (response) {
                reject(response);
            });
            _this.facebook.logEvent(_this.facebook.EVENTS.EVENT_NAME_ADDED_TO_CART);
        });
    };
    AuthService.prototype.getFbUserDetails = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var requestPath = '/' + userId + '/?fields=id,email,first_name,middle_name,last_name';
            var permissions = ['public_profile'];
            _this.facebook.api(requestPath, permissions).then(function (details) {
                resolve(details);
            });
        });
    };
    AuthService.prototype.logoutFacebookUserAuth = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.facebook.logout().then(function (result) {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    };
    AuthService.prototype.getGoogleUserAuth = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.googlePlus.login({}).then(function (response) {
                var data = {
                    id: response.userId,
                    email: response.email,
                    loginType: 'google'
                };
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    };
    AuthService.prototype.logoutGoogleUserAuth = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.googlePlus.logout().then(function (response) {
                var hasBeenLoggedOut = response === 'Logged user out';
                resolve(true);
            }, function (error) {
                alert(JSON.stringify(error));
            });
        }).catch(function (error) {
            alert(JSON.stringify(error));
        });
        return promise;
    };
    AuthService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService,
            Facebook,
            GooglePlus,
            NavController,
            Storage])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map