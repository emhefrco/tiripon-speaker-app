import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { ApiService } from '../../services/api.service';
import { ActionSheetController, AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
var MaterialsPage = /** @class */ (function () {
    function MaterialsPage(file, fileChooser, filePath, fileOpener, fileTransfer, apiService, actionSheetController, alertController, loadingController, toastController, navController) {
        this.file = file;
        this.fileChooser = fileChooser;
        this.filePath = filePath;
        this.fileOpener = fileOpener;
        this.fileTransfer = fileTransfer;
        this.apiService = apiService;
        this.actionSheetController = actionSheetController;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.navController = navController;
        this.baseUrl = 'https://www.tiripon.net/assets/event_image/landing/';
        this.skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8];
        this.counter = 3;
    }
    MaterialsPage.prototype.ngOnInit = function () {
        this.getEvents();
    };
    MaterialsPage.prototype.addNewFile = function (file) {
        //alert(JSON.stringify(file)); 
        var url = 'https://www.tiripon.net/assets/dashboard/images/speaker/material/documents/' + file.file_name;
        this.material = {
            databaseId: this.counter,
            fileName: file.client_name,
            size: 594,
            fileExtension: 'pdf',
            url: url
        };
    };
    MaterialsPage.prototype.getEvents = function () {
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
    MaterialsPage.prototype.hasEvents = function (events) {
        var numberOfEvents = events.length;
        if (numberOfEvents >= 1) {
            return true;
        }
        else {
            return false;
        }
    };
    MaterialsPage.prototype.navigateToEventMaterialsPage = function (event) {
        var parameters = {
            queryParams: event
        };
        //alert(JSON.stringify(event));
        this.navController.navigateForward(['/event-materials'], parameters);
    };
    MaterialsPage = tslib_1.__decorate([
        Component({
            selector: 'app-materials',
            templateUrl: './materials.page.html',
            styleUrls: ['./materials.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [File,
            FileChooser,
            FilePath,
            FileOpener,
            FileTransfer,
            ApiService,
            ActionSheetController,
            AlertController,
            LoadingController,
            ToastController,
            NavController])
    ], MaterialsPage);
    return MaterialsPage;
}());
export { MaterialsPage };
//# sourceMappingURL=materials.page.js.map