import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 
import { Material } from '../models/material';
import { Storage } from '@ionic/storage';
import { ConfigService } from '../services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl    : string; 
  controller : string;  

  constructor(
    private httpClient    : HttpClient,     
    private storage       : Storage,
    private configService : ConfigService
  ) {
    this.baseUrl    = this.configService.baseUrl;
    this.controller = this.configService.controller;
  } 

  uploadFile(event, file) {  

    const promise = new Promise((resolve, reject) => {

      const url = this.baseUrl + this.controller + 'upload_material'; 
      const fileReader = new FileReader(); 

      fileReader.onloadend = () => {

        const blobFile = new Blob([fileReader.result], {type: file.type}); 
        const formData = new FormData(); 

        formData.append('event_id', event.event_id);
        formData.append('user_id', event.user_id);
        formData.append('title', file.name);
        formData.append('description', 'Description of file.'); 
        formData.append('filename', file.name);
        formData.append('filetype', file.type); 
        formData.append('size', file.size); 
        formData.append('file', blobFile, file.name); 

        this.httpClient.post(url, formData).subscribe(response => {  
          resolve(response);
        }, error => {
          reject(error);
        }); 
      };

      fileReader.readAsArrayBuffer(file); 
    });

    return promise;
  }

  public getMaterials(): any {

    const promise = new Promise((resolve, reject) => { 
      const url = this.baseUrl + this.controller + 'get_materials';

      this.httpClient.get(url).subscribe(materials => { 
        resolve(materials);
      });
    });   

    return promise;

  }

  public getUser(credentials) {

    const promise = new Promise((resolve, reject) => { 
      const url = this.baseUrl + this.controller + 'get_tiripon_user';

      const params = new FormData();
      params.append('email', credentials.email);
      params.append('password', credentials.password); 

      this.httpClient.post(url, params).subscribe(response => {  
        resolve(response);
      }, error => {
        alert(JSON.stringify(error));
      });

    }); 

    return promise;

  } 
 
  public getTiriponUserAccount(data): Promise<any> {  

    return new Promise((resolve, reject) => {
      const isFacebookLogin = data.loginType === 'facebook';
      const isGoogleLogin = data.loginType === 'google';
      const isNormalLogin = data.loginType === 'normal'; 
      let url: string = this.baseUrl + this.controller;

      let params = new FormData(); 
      params.append('email', data.email);

      if (isFacebookLogin) {  
        params.append('facebook_oauth_id', data.id);
        url += 'get_facebook_user_oauth';
      } else if (isGoogleLogin) { 
        params.append('google_oauth_id', data.id);
        url += 'get_google_user_oauth';
      } else { 
        url += 'get_tiripon_user';
        params.append('password', data.password); 
      }
  
      this.httpClient.post(url, params).subscribe(response => {   
        resolve(response);  
      }, error => {
        alert(JSON.stringify(error));
      });
    }); 

  }      

  public getEvents(): Promise<any> { 
    
    const promise = new Promise((resolve, reject) => {  
      const url: string = this.baseUrl + this.controller + 'get_designations';

      this.storage.get('user').then(user => { 
        const params = new FormData();  
        params.append('user_id', user.user_id);

        this.httpClient.post(url, params).subscribe(response => {    
          resolve(response);
        }, error => { 
          reject(error)
        });
      });   
    });

    return promise;

  }   

  public getGroupChatMessages(): Promise<any> { 
    
    const promise = new Promise((resolve, reject) => {  
      
      const url: string = 'http://www.sandbox.baldpuppiessolutions.com/Android_Api/read_all_chat_message'; 

        this.httpClient.get(url).subscribe(response => {    
          //alert(response);
          resolve(response);
        }, error => { 
          reject(error)
        }); 
    });

    return promise;
  }  

  public getParticipants(): Promise<any> { 
    
    const promise = new Promise((resolve, reject) => {  
      
      const url: string = this.baseUrl + this.controller + 'get_event_particpants'; 

        this.httpClient.get(url).subscribe(response => {    
           //alert(response);
          resolve(response);
        }, error => { 
          reject(error)
        }); 
    });

    return promise;
  }     
  
  public getEventMaterials(event: any): Promise<any> {   

    const promise = new Promise((resolve, reject) => { 
      const url: string = this.baseUrl + this.controller + 'get_materials';

      const params = new FormData();
      params.append('event_id', event.event_id);
      params.append('user_id', event.user_id);

      this.httpClient.post(url, params).subscribe(materials => {  
        resolve(materials);
      }, error => {
        alert(JSON.stringify(error));
        reject(error);
      });
    });  

    return promise;

  }  

  public deleteMaterial(material: any): Promise<any> {   
    //alert(JSON.stringify(material)); return;
    const promise = new Promise((resolve, reject) => { 
      const url: string = this.baseUrl + this.controller + 'delete_material';

      const params = new FormData();
      params.append('user_id', material.user_id);
      params.append('material_id', material.material_id);
      params.append('event_id', material.event_id);

      this.httpClient.post(url, params).subscribe(response => {  
        //alert(JSON.stringify(response));
        resolve(response);
      }, error => {
        alert(JSON.stringify(error));
        reject(error);
      });
    });  

    return promise;

  }    

}
