import { Component,  } from '@angular/core';

import { Platform, NavController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx'; 
import { Storage } from '@ionic/storage';  

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private navController: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private loadingController: LoadingController 
  ) {
    //this.storage.set('isLogin', true);
    //this.storage.clear();
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      this.splashScreen.hide(); 
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('black');

      await this.getLoginStatus().then(hasLoggedIn => {
        //alert(isLogin);
        if (hasLoggedIn) {
          //alert(1);
          this.navController.navigateForward('/event-chats');
        } else {
          //alert(1);
          this.navController.navigateForward('/login');
        }
      }); 
    });
  }

  getLoginStatus() {
    return new Promise((resolve, reject) => {
      this.storage.get('hasLoggedIn').then((hasLoggedIn) => {
        resolve(hasLoggedIn);
      }, error => {
        reject(error);
      });
    });
  } 
}
