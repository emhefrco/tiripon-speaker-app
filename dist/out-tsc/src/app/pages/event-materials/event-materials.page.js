import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { ActionSheetController } from '@ionic/angular';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
var EventMaterialsPage = /** @class */ (function () {
    function EventMaterialsPage(route, apiService, alertController, loadingController, navController, file, fileChooser, filePath, fileOpener, fileTransfer, actionSheetController, videoPlayer) {
        this.route = route;
        this.apiService = apiService;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.navController = navController;
        this.file = file;
        this.fileChooser = fileChooser;
        this.filePath = filePath;
        this.fileOpener = fileOpener;
        this.fileTransfer = fileTransfer;
        this.actionSheetController = actionSheetController;
        this.videoPlayer = videoPlayer;
        this.baseUrl = 'http://www.sandbox.baldpuppiessolutions.com/';
        this.imageFolder = 'assets/dashboard/images/speaker/material/images/';
        this.controller = 'Android_Api_Speaker/';
        this.skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }
    EventMaterialsPage.prototype.click = function () {
        alert(1);
    };
    EventMaterialsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.getEvent().then(function (event) {
            _this.event = event;
            //alert(JSON.stringify(event));
            _this.getEventMaterials(event);
        });
    };
    EventMaterialsPage.prototype.getEvent = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.route.queryParams.subscribe(function (event) {
                resolve(event);
            }, function (error) {
                reject(error);
            });
        }).catch(function () {
            alert('Error in getting event!');
        });
        return promise;
    };
    EventMaterialsPage.prototype.getEventMaterials = function (event) {
        var _this = this;
        this.apiService.getEventMaterials(event).then(function (eventMaterials) {
            //alert(JSON.stringify(eventMaterials));
            if (_this.doesEventHaveMaterials(eventMaterials)) {
                _this.eventMaterials = eventMaterials;
            }
            else {
                _this.eventMaterials = [];
            }
        });
    };
    EventMaterialsPage.prototype.doesEventHaveMaterials = function (eventMaterials) {
        var numberOfMaterials = eventMaterials.length;
        if (numberOfMaterials > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    EventMaterialsPage.prototype.presentLoading = function (message) {
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
    EventMaterialsPage.prototype.dismissLoading = function () {
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
    EventMaterialsPage.prototype.downloadFile = function (file) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var fileTransfer = _this.fileTransfer.create();
            fileTransfer.download(file.url, _this.file.dataDirectory + file.filename).then(function (entry) {
                resolve(entry);
            }, function (error) {
                reject(error);
            });
        });
    };
    EventMaterialsPage.prototype.getFileInformation = function (filePath) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.file.resolveLocalFilesystemUrl(filePath).then(function (entry) {
                entry.file(function (file) {
                    resolve(file);
                });
            }, function (error) {
                reject(error);
            });
        });
    };
    EventMaterialsPage.prototype.onChooseFile = function () {
        var _this = this;
        // const imageUrl = 'https://www.tiripon.net/assets/dashboard/images/speaker/material/documents/tiripon_f4cbfe1e18f291371fc0a9bd9a4f6924.jpg';
        // const url = 'https://tiripon.net/Android_Api_Speaker/upload_material';
        var url = this.baseUrl + this.controller + 'upload_material';
        var fileReader = new FileReader();
        this.fileChooser.open().then(function (uri) {
            _this.presentLoading('Uploading file.').then(function () {
                _this.filePath.resolveNativePath(uri).then(function (resolvedNativePath) {
                    _this.file.resolveLocalFilesystemUrl(resolvedNativePath).then(function () {
                        _this.getFileInformation(resolvedNativePath).then(function (file) {
                            //alert(JSON.stringify(event));
                            //alert(JSON.stringify(file)); return;
                            _this.apiService.uploadFile(_this.event, file).then(function (uploadedFile) {
                                //alert(JSON.stringify(uploadedFile));
                                _this.uploadedFile = uploadedFile;
                                _this.dismissLoading();
                                //alert('Done!');
                                //alert(JSON.stringify(uploadedFile));
                                _this.presentAlert('File has been uploaded.');
                            });
                        });
                    });
                });
            });
        });
    };
    EventMaterialsPage.prototype.addNewFile = function (file) {
        //alert(JSON.stringify(file));
        this.eventMaterials.unshift({
            title: file.client_name,
            extension: file.extension,
            size: file.size,
            filename: file.file_name
        });
    };
    EventMaterialsPage.prototype.presentAlert = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: message,
                            buttons: [
                                {
                                    text: 'Ok',
                                    handler: function () {
                                        _this.addNewFile(_this.uploadedFile);
                                    }
                                }
                            ]
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
    EventMaterialsPage.prototype.isImage = function (material) {
        if (material.extension === 'jpg' ||
            material.extension === 'jpeg' ||
            material.extension === 'png') {
            return true;
        }
    };
    EventMaterialsPage.prototype.isPDF = function (material) {
        if (material.extension === 'pdf') {
            return true;
        }
    };
    EventMaterialsPage.prototype.isMP4 = function (material) {
        if (material.extension === 'mp4') {
            return true;
        }
    };
    EventMaterialsPage.prototype.isPPT = function (material) {
        if (material.extension === 'ppt' || material.extension === 'pptx') {
            return true;
        }
    };
    EventMaterialsPage.prototype.isVideo = function (material) {
        if (this.isMP4(material)) {
            return true;
        }
    };
    EventMaterialsPage.prototype.isOtherFile = function (material) {
        if (!this.isImage(material) &&
            !this.isPDF(material) &&
            !this.isMP4(material) &&
            !this.isPPT(material)) {
            return true;
        }
    };
    EventMaterialsPage.prototype.isDocument = function (material) {
        if (this.isPDF(material) || this.isPPT(material)) {
            return true;
        }
    };
    EventMaterialsPage.prototype.formatSize = function (bytes) {
        //alert(bytes);
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) {
            return '0 Byte';
        }
        else {
            var i = Math.floor(Math.log(bytes) / Math.log(1024));
            return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
        }
    };
    EventMaterialsPage.prototype.presentActionSheet = function (title) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: title,
                            buttons: [{
                                    text: 'View',
                                    role: 'destructive',
                                    icon: 'eye',
                                    handler: function () {
                                        console.log('Delete clicked');
                                    }
                                }, {
                                    text: 'Download',
                                    role: 'destructive',
                                    icon: 'download',
                                    handler: function () {
                                        console.log('Delete clicked');
                                    }
                                }, {
                                    text: 'Delete',
                                    role: 'destructive',
                                    icon: 'trash',
                                    handler: function () {
                                        console.log('Delete clicked');
                                    }
                                }, {
                                    text: 'Cancel',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EventMaterialsPage.prototype.onOpenFile = function (material) {
        var _this = this;
        var url;
        if (this.isVideo(material)) {
            url = 'https://www.sandbox.baldpuppiessolutions.com/assets/dashboard/images/speaker/material/videos/';
        }
        else if (this.isImage(material)) {
            url = 'https://www.sandbox.baldpuppiessolutions.com/assets/dashboard/images/speaker/material/images/';
        }
        else if (this.isDocument(material)) {
            url = 'https://www.sandbox.baldpuppiessolutions.com/assets/dashboard/images/speaker/material/documents/';
        }
        var file = material;
        file.url = url + material.filename;
        //alert(JSON.stringify(file));
        this.presentLoading('Opening file...').then(function () {
            // this.file.checkFile(this.file.dataDirectory, file.title).then(response => {
            //   alert('check file');
            //     this.getFileInformation(this.file.dataDirectory + file.title).then((info:any) => {
            //       //alert(JSON.stringify(info));
            //       this.dismissLoading().then(() => { 
            //         this.fileOpener.open(info.localURL, info.type)
            //           .then(() => console.log('File is opened'))
            //           .catch(e => console.log('Error opening file', e));
            //         });   
            //       });
            //     })
            // }, error => {  
            // alert('download file');
            _this.downloadFile(file).then(function (entry) {
                _this.getFileInformation(entry.nativeURL).then(function (info) {
                    //alert(JSON.stringify(info));
                    _this.dismissLoading().then(function () {
                        _this.fileOpener.open(info.localURL, info.type)
                            .then(function () { return console.log('File is opened'); })
                            .catch(function (e) { return console.log(JSON.stringify(e)); });
                    });
                });
            });
        });
        // this.dismissLoading();
        // this.downloadFile(file).then((entry : any) => {
        //   //alert(JSON.stringify(entry));
        //     this.getFileInformation(entry.nativeURL).then((info:any) => {
        //       //alert(JSON.stringify(info));
        //       this.dismissLoading().then(() => { 
        //         this.fileOpener.open(info.localURL, info.type)
        //           .then(() => console.log('File is opened'))
        //           .catch(e => console.log('Error opening file', e));
        //         });   
        //       });
        //     })
    };
    EventMaterialsPage = tslib_1.__decorate([
        Component({
            selector: 'app-event-materials',
            templateUrl: './event-materials.page.html',
            styleUrls: ['./event-materials.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            ApiService,
            AlertController,
            LoadingController,
            NavController,
            File,
            FileChooser,
            FilePath,
            FileOpener,
            FileTransfer,
            ActionSheetController,
            VideoPlayer])
    ], EventMaterialsPage);
    return EventMaterialsPage;
}());
export { EventMaterialsPage };
//# sourceMappingURL=event-materials.page.js.map