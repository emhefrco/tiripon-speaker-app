import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public baseUrl    : string;
  public controller : string; 

  constructor() {
    //this.baseUrl    = 'https://www.tiripon.net/';
    this.baseUrl    = 'http://www.sandbox.baldpuppiessolutions.com/';
    this.controller = 'Android_Api_Speaker/'; 
  } 
}
