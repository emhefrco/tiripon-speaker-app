import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { ApiService } from '../../services/api.service';
import { NavigationExtras } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-event-chat',
  templateUrl: './event-chat.page.html',
  styleUrls: ['./event-chat.page.scss'],
})
export class EventChatPage implements OnInit {
  socket: any;
  chatType: string = 'general';
  message: string;
  messages: any = [];
  previousMessage: any;
  participants: any = [];
  groupChatMessages: any = [];

  constructor(private apiService: ApiService, private navController: NavController) {
    this.socket = io('https://tiripon.herokuapp.com:443');
    this.socket.on('connect',() => {
      //alert('connected from server');
    });
    this.socket.on('new message', newMessage => {   
      if (this.previousMessage !== newMessage.msg) {
        this.messages.push(newMessage.msg);  
        this.previousMessage = '';
      }   
    });
    //alert(JSON.stringify(this.socket));
  }

  ngOnInit() {
    this.getParticipants();
    this.getGroupChatMessages();
    // this.socket.on('new message', function(data) {
    //   alert(1);
    // });
  }

  private sendMessage(): void {
    const emptyMessage = '';
    this.previousMessage = this.message;
    //alert(this.message);
    this.socket.emit('send message', this.message); 
    this.messages.push(this.message); 
    this.message = emptyMessage; 
  }

  segmentChanged(ev: any) {
    // alert(JSON.stringify(this.chatType));
  } 

  getParticipants(): any {  
    //this.presentLoading('').then(() => {
      this.apiService.getParticipants().then(participants => { 
        if (this.hasParticipants(participants)) {
          //alert(1);
          this.participants = participants;  
        } else {
          //alert(2);
          this.participants = []; 
        } 
      });
    //}); 
  } 

  private hasParticipants(participants): boolean {  
    const numberOfParticipants: number = participants.length; 

    if (numberOfParticipants >= 1) {
      return true;
    } else {
      return false;
    }
  }  

  getGroupChatMessages() {
      this.apiService.getGroupChatMessages().then(groupChatMessages => { 
        if (this.hasParticipants(groupChatMessages)) {
          //alert(1);
          this.groupChatMessages = groupChatMessages; 
          //alert(JSON.stringify(this.groupChatMessages));
        } else {
          //alert(2);
          this.groupChatMessages = []; 
        } 
      });    
  }

  navigateToDirectMessagePage(participant) { 
    const parameters: NavigationExtras = {
      queryParams: participant
    }; 

    //alert(JSON.stringify(event));

    this.navController.navigateForward(['/direct-message'], parameters); 
  }
}
