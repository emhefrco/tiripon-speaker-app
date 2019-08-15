import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 

import { HttpClientModule } from '@angular/common/http'; 
import { File, Entry, FileEntry } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { IonicStorageModule } from '@ionic/storage'; 
import { HeaderColor } from '@ionic-native/header-color/ngx'; 

//import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
//const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

import { FileUploadModalComponent } from './components/file-upload-modal/file-upload-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadModalComponent
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
    //SocketIoModule.forRoot(config)
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent, FileUploadModalComponent]
})
export class AppModule {}
