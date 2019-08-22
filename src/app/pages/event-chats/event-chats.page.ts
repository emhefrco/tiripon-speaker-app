import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-event-chats',
  templateUrl: './event-chats.page.html',
  styleUrls: ['./event-chats.page.scss'],
})
export class EventChatsPage implements OnInit {
  events: any = [];
  baseUrl: string = 'https://www.tiripon.net/assets/event_image/landing/';
  //https://www.tiripon.net/assets/event_image/landing/

  constructor(private apiService: ApiService,     private navController     : NavController) { }

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

  async navigateToEventPage(event) {
    const parameters: NavigationExtras = {
      queryParams: event
    }; 

    //alert(JSON.stringify(event));

    await this.navController.navigateForward(['/event-chat'], parameters);
  }

}
