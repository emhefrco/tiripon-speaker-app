import { Component,  } from '@angular/core';

import { Platform, NavController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx'; 
import { Storage } from '@ionic/storage'; 
import { HeaderColor } from '@ionic-native/header-color/ngx';

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
    private loadingController: LoadingController,
    private headerColor: HeaderColor
  ) {
    //this.storage.set('isLogin', true);
    //this.storage.clear();
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      this.splashScreen.hide();
      this.headerColor.tint('#ffffff');
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#333333');

      await this.getLoginStatus().then(hasLoggedIn => {
        //alert(isLogin);
        if (hasLoggedIn) {
          //alert(1);
          this.navController.navigateForward('/home');
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
