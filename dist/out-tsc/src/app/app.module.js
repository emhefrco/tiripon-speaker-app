import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { HeaderColor } from '@ionic-native/header-color/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
//import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
//const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent
            ],
            entryComponents: [],
            imports: [
                BrowserModule,
                IonicModule.forRoot(),
                IonicStorageModule.forRoot(),
                AppRoutingModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
            ],
            providers: [
                StatusBar,
                SplashScreen,
                GooglePlus,
                File,
                FileChooser,
                FileOpener,
                FilePath,
                FileTransfer,
                GooglePlus,
                Facebook,
                HeaderColor,
                VideoPlayer,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map