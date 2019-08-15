import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  event: any;
  baseUrl: string = 'https://www.tiripon.net/assets/event_image/landing/';
  // private baseUrl: string = '';

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getEvent().then(event => {
      this.event = event; 
    });
  }

  async getEvent() {
    return new Promise((resolve, reject) => { 
      this.route.queryParams.subscribe(params => {
        resolve(params);
      }, error => {
        reject(error);
      });
    });  
  }  

}
