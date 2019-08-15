import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.page.html',
  styleUrls: ['./direct-message.page.scss'],
})
export class DirectMessagePage implements OnInit {

  constructor(     private navController     : NavController, private route: ActivatedRoute) { }
  participant;
  ngOnInit() {
    this.getEvent().then(participant => {
      this.participant = participant;
    });
  }

  private getEvent(): Promise<any> { 
    const promise = new Promise((resolve, reject) => {
      this.route.queryParams.subscribe(event => {  
        resolve(event)
      }, error => {
        reject(error);
      }); 
    }).catch(() => {
      alert('Error in getting event!');
    });

    return promise;
  } 

}
