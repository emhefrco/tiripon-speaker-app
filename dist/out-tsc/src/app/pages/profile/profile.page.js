import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Storage } from '@ionic/storage';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(apiService, storage) {
        this.apiService = apiService;
        this.storage = storage;
        this.profileType = 'personal';
    }
    ProfilePage.prototype.ngOnInit = function () {
        var _this = this;
        this.profileType = 'personal';
        this.storage.get('user').then(function (user) {
            _this.user = user;
            alert(JSON.stringify(user));
        });
    };
    ProfilePage.prototype.updateProfile = function () {
    };
    ProfilePage.prototype.updatePassword = function () {
    };
    ProfilePage.prototype.hasGender = function (gender) {
        var isMale = gender === 'Male';
        var isFemale = gender === 'Female';
        var isPreferredNotToSay = gender === 'Prefer not to say';
        if (isMale || isFemale || isPreferredNotToSay) {
            return true;
        }
        else {
            return false;
        }
    };
    ProfilePage = tslib_1.__decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.page.html',
            styleUrls: ['./profile.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService,
            Storage])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map