import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'; 
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  events: any[] = undefined;
  baseUrl: string = 'https://www.tiripon.net/assets/event_image/landing/';
  loading: any;
  skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private apiService        : ApiService,
    private alertController   : AlertController,
    private loadingController : LoadingController,
    private navController     : NavController
  ) { }

  ngOnInit() {
    this.getEvents(); 
  }

  getEvents(): any {  
    //this.presentLoading('').then(() => {
      this.apiService.getEvents().then(events => {
        if (this.hasEvents(events)) {
          //alert(1);
          this.events = events; 
          //alert(JSON.stringify(this.events));
        } else {
          //alert(2);
          this.events = []; 
        } 
      });
    //}); 
  } 

  hasEvents(events): boolean {  
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
