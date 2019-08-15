import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { ApiService } from '../../services/api.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/auth.service';
var LoginPage = /** @class */ (function () {
    function LoginPage(alertController, apiService, facebook, googlePlus, loadingController, navController, platform, formBuilder, storage, authService) {
        this.alertController = alertController;
        this.apiService = apiService;
        this.facebook = facebook;
        this.googlePlus = googlePlus;
        this.loadingController = loadingController;
        this.navController = navController;
        this.platform = platform;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.authService = authService;
        this.email = 'dropchase1@gmail.com';
        this.password = 'Salesletter123Salesletter123';
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        //this.setTextboxesToEmpty();
    };
    LoginPage.prototype.presentAlert = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: options.header,
                            message: options.message,
                            buttons: ['OK']
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
    LoginPage.prototype.displayPage = function (name) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.navController.navigateForward('/' + name)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.presentLoading = function (message) {
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
    LoginPage.prototype.dismissLoading = function () {
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
    LoginPage.prototype.setTextboxesToEmpty = function () {
        this.email = '';
        this.password = '';
    };
    LoginPage.prototype.loginWithFacebook = function () {
        var _this = this;
        this.authService.getFbUserAuth().then(function (response) {
            _this.presentLoading('Logging in to your account.').then(function () {
                response.loginType = 'facebook';
                _this.apiService.getTiriponUserAccount(response).then(function (user) {
                    if (_this.doesUserExists(user)) {
                        _this.storage.set('hasLoggedIn', true).then(function () {
                            _this.storage.set('loginType', 'facebook').then(function () {
                                _this.storage.set('user', user[0]).then(function () {
                                    _this.dismissLoading().then(function () {
                                        _this.navController.navigateForward('/home');
                                    });
                                });
                            });
                        });
                    }
                    else {
                        var options = {
                            header: 'Facebook Login',
                            message: 'We could not find a <strong>Tiripon account</strong> associated with this Facebook ' +
                                'login. Please register an account.'
                        };
                        _this.presentAlert(options).then(function () {
                            _this.setTextboxesToEmpty();
                        });
                    }
                    _this.dismissLoading();
                    // this.logoutFacebookAccount();
                });
                _this.dismissLoading();
            });
        });
        // //this.platform.ready().then(() => {
        // // this.logoutFacebookAccount(); return;
        //   this.facebook.login(['public_profile', 'email']).then((response: FacebookLoginResponse) => { 
        //     alert(JSON.stringify(response));
        //     const userId = response.authResponse.userID;
        //     this.presentLoading('Logging into your account.').then(() => {
        //       this.getFacebookUser(userId).then(facebookUser => {
        //         alert(JSON.stringify(facebookUser));
        //         this.apiService.getTiriponUserAccount(facebookUser).then(user => { 
        //           alert(JSON.stringify(user));
        //           if (this.doesUserExists(user)) { 
        //             user = user[0];
        //             this.storage.set('user', user);
        //             this.storage.get('user').then(user => {
        //               //alert(JSON.stringify(user)); 
        //               this.storage.set('isLogin', true).then(() => {
        //                 this.displayPage('home');
        //               });  
        //             }); 
        //           } else {
        //             const options = {
        //               header: 'Facebook Login',
        //               message: 'We could not find a <strong>Tiripon account</strong> associated with this Facebook ' +
        //             'login. Please register an account.'
        //             }
        //             this.presentAlert(options).then(() => {
        //               this.setTextboxesToEmpty();
        //             });
        //           }
        //           this.dismissLoading();
        //           // this.logoutFacebookAccount();
        //         }); 
        //       });           
        //     }); 
        //     })
        //     .catch(response => { 
        //       // let wasFacebookLoginCancelled = response.errorCode === '4201' && response.errorMessage === 'User cancelled dialog';
        //       // if (wasFacebookLoginCancelled) {
        //       //   alert(response);
        //       // }
        //     });
        //   this.facebook.logEvent(this.facebook.EVENTS.EVENT_NAME_ADDED_TO_CART);
        // //});   
    };
    LoginPage.prototype.loginWithGoogle = function () {
        var _this = this;
        this.authService.getGoogleUserAuth().then(function (authUser) {
            //alert(authUser);
            _this.presentLoading('Logging into your account').then(function () {
                _this.apiService.getTiriponUserAccount(authUser).then(function (user) {
                    if (_this.doesUserExists(user)) {
                        _this.storage.set('hasLoggedIn', true).then(function () {
                            _this.storage.set('loginType', 'google').then(function () {
                                _this.storage.set('user', user[0]).then(function () {
                                    _this.dismissLoading().then(function () {
                                        _this.navController.navigateForward('/home');
                                    });
                                });
                            });
                        });
                    }
                    else {
                        var options_1 = {
                            header: 'Google Login',
                            message: 'We could not find a <strong>Tiripon account</strong> associated with this Google ' +
                                'login. Please register an account.'
                        };
                        _this.dismissLoading().then(function () {
                            _this.presentAlert(options_1).then(function () {
                                _this.setTextboxesToEmpty();
                            });
                        });
                    }
                });
            });
        }).catch(function (error) {
            if (_this.hasBeenCancelled(error)) {
                //
            }
            else {
                alert(JSON.stringify(error));
            }
        });
    };
    LoginPage.prototype.hasBeenCancelled = function (error) {
        if (error === 12501) {
            return true;
        }
        else {
            return false;
        }
    };
    LoginPage.prototype.setLoggedInUserStorage = function () {
    };
    LoginPage.prototype.logoutWithGoogle = function () {
        var _this = this;
        this.authService.logoutGoogleUserAuth().then(function (hasBeenLoggedOut) {
            if (hasBeenLoggedOut) {
                _this.navController.navigateForward('/home');
            }
        });
    };
    LoginPage.prototype.hasNoInputs = function () {
        if (this.email === '' || this.password === '') {
            return true;
        }
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var isEmailEmpty = this.email === '';
        var isPasswordEmpty = this.password === '';
        /*if (isEmailEmpty) {
          //alert(1);
          return;
        } */
        var credentials = {
            email: this.email,
            password: this.password,
            loginType: 'normal'
        };
        this.presentLoading('Logging into your account...');
        // const credentials = {
        //   email: 'salesletter123@gmail.com',
        //   password: 'Salesletter123Salesletter123'
        // }
        this.apiService.getTiriponUserAccount(credentials).then(function (user) {
            if (_this.doesUserExists(user)) {
                _this.storage.set('hasLoggedIn', true).then(function () {
                    _this.storage.set('loginType', 'normal').then(function () {
                        _this.storage.set('user', user[0]).then(function () {
                            _this.dismissLoading().then(function () {
                                _this.navController.navigateForward('/home');
                            });
                        });
                    });
                });
            }
            else {
                _this.dismissLoading().then(function () {
                    var options = {
                        header: 'Login',
                        message: 'Incorrect username and password.'
                    };
                    _this.presentAlert(options).then(function () {
                        _this.setTextboxesToEmpty();
                    });
                });
            }
        });
    };
    LoginPage.prototype.functionName = function () {
        alert(1);
    };
    LoginPage.prototype.doesUserExists = function (user) {
        if (user.length === 1) {
            return true;
        }
        else {
            return false;
        }
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            ApiService,
            Facebook,
            GooglePlus,
            LoadingController,
            NavController,
            Platform,
            FormBuilder,
            Storage,
            AuthService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map