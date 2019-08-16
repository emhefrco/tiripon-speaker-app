import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';  
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  user: any;
  constructor(
    private alertController : AlertController,
    private facebook        : Facebook,
    private menuController  : MenuController,
    private navController   : NavController,
    private storage         : Storage,
    private authService     : AuthService 
  ) { }

  ngOnInit() { 
    this.storage.get('user').then(user => {
      // alert(JSON.stringify(user));
      this.user = user;
    })
  }

  async closeMenu() {
    await this.menuController.close();
    console.log(1);  
  } 

  logoutFacebookAccount() { 
    /*alert(JSON.stringify(this.facebook));
      this.facebook.logout().then(result => {
        alert(JSON.stringify(this.facebook));
        alert(result); 
      }, error => {
        alert(error); 
      }); */
  }

  async logout() {
    this.storage.get('loginType').then(loginType => {
      //alert(loginType);
      if (loginType === 'facebook') {
        //alert('f');
        this.authService.logoutFacebookUserAuth();
      } else if (loginType === 'google') {
        //alert('g');
        this.authService.logoutAuthGoogleUser();
      } else if (loginType === 'normal') {
        //alert('n');
      } else {
        alert('Invalid!');
      }
      this.storage.clear();

      this.menuController.close();
      this.navController.navigateForward(['/login']);
    });
    
    
    
  }

  async showConfirmLogout() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Do you want to logout your Tiripon account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Logout',
          cssClass: 'secondary',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

}
