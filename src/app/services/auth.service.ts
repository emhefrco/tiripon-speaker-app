import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { ApiService } from '../services/api.service';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService    : ApiService,
    private facebook      : Facebook,
    private googlePlus    : GooglePlus,
    private navController : NavController,
    private storage       : Storage
  ) { }

  public getFbUserAuth(): Promise<any> {

    return new Promise((resolve, reject) => { 
      this.facebook.login(['public_profile', 'email']).then((response: FacebookLoginResponse) => {
        const userId = response.authResponse.userID;

        this.getFbUserDetails(userId).then(details => {
          resolve(details) 
        });
      })
      .catch(response => {  
        reject(response); 
      });

      this.facebook.logEvent(this.facebook.EVENTS.EVENT_NAME_ADDED_TO_CART);

    });  
  }

  public getFbUserDetails(userId): Promise<any> {

    return new Promise((resolve, reject) => {
      const requestPath = '/' + userId + '/?fields=id,email,first_name,middle_name,last_name';
      const permissions = ['public_profile'];

      this.facebook.api(requestPath, permissions).then(details => { 
         resolve(details);
      }); 
    }); 

  }

  public logoutFacebookUserAuth() { 
    return new Promise((resolve, reject) => {
      this.facebook.logout().then(result => {
        resolve(result);
      }, error => {
        reject(error);
      });
    }); 
  }   

  public getGoogleUserAuth(): Promise<any> { 

    const promise = new Promise((resolve, reject) => {     

      this.googlePlus.login({}).then(response => {  
        const data: object = {
          id        : response.userId,
          email     : response.email,
          loginType : 'google'
        } 

        resolve(data);
     
      }, error => { 
        reject(error); 
      });    

    });

    return promise;

  }  

  public logoutAuthGoogleUser(): Promise<any> {

    const promise = new Promise((resolve, reject) => {  
      this.googlePlus.logout().then(response => {
        const hasBeenLoggedOut = response === 'Logged user out'; 
        resolve(true); 
      }, error => {
        alert(JSON.stringify(error));
        reject(false);
      });
    }).catch(error => { 
      alert(JSON.stringify(error));
    }); 

    return promise;
  } 

}
