import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs'; 
import { NavigationExtras } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  events: any; 
  baseUrl: string = 'https://www.tiripon.net/assets/event_image/landing/';
  // private baseUrl: string = '';
  skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private apiService: ApiService, 
    private navController: NavController
  ) { }

  ngOnInit() {
    this.getEvents();
  }  

  // ionViewWillEnter() {
  //   this.getEvents();
  // }

  private getEvents(): any {   
      this.apiService.getEvents().then(events => {
        if (this.hasEvents(events)) { 
          //alert(JSON.stringify(events));
          this.events = events;  
        } else {  
          this.events = []; 
        } 
      }); 
  } 

  private hasEvents(events): boolean {  
    const numberOfEvents: number = events.length; 

    if (numberOfEvents >= 1) {
      return true;
    } else {
      return false;
    }
  }

  navigateToEventPage(event) {
    const parameters: NavigationExtras = {
      queryParams: event
    }; 

    //alert(JSON.stringify(event));

    this.navController.navigateForward(['/event'], parameters);
  }
}
