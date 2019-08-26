import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import * as io from 'socket.io-client';
import { ApiService } from '../../services/api.service';
import { NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config/config.service';

@Component({
  selector: 'app-event-chat',
  templateUrl: './event-chat.page.html',
  styleUrls: ['./event-chat.page.scss'],
})
export class EventChatPage implements OnInit {
  socket            : any;
  chatType          : string;
  groupChatMessageText  : string;
  messages          : any[];
  previousMessage   : any;
  participants      : any = [];
  groupChatMessages : any = [];
  user              : any;
  event             : any;
  baseUrl           : string; 
  profilePicDir     : string;
  skeletonItems     : number[];

  @ViewChild('content') private content: any;
 
  constructor(
    private apiService    : ApiService, 
    private navController : NavController,
    private ngZone        : NgZone,
    private storage       : Storage,
    private route         : ActivatedRoute,
    private configService : ConfigService
  ) {
    this.chatType          = 'general';
    this.groupChatMessages = []; 
    this.groupChatMessageText = '';
    this.baseUrl           = this.configService.baseUrl;

    this.profilePicDir     = this.baseUrl + 'assets/profile-picture/';
    //alert(JSON.stringify(this.profilePicDir));
    this.skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    this.getUser();
    this.getEvent();
  }

  ngOnInit() {  

    // this.socket = io('https://tiripon.herokuapp.com:443');
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () => {
      alert('connected from the server.');
    }); 

    this.socket.emit('join group chat', {
      'designation_id': this.event.designation_id
    });

    this.socket.on('get group chat messages', groupChatMessages => {
      //alert(JSON.stringify(groupChatMessages));
      this.ngZone.run(() => { 
        this.groupChatMessages = groupChatMessages;
        setTimeout(() => { 
          this.content.scrollToBottom(300); 
        });
      });
      //alert(JSON.stringify(this.groupChatMessages));
    });

    this.socket.on('get saved group chat message', groupChatMessage => {
      // alert(JSON.stringify(groupChatMessage));
      groupChatMessage.firstname = this.user.firstname;
      groupChatMessage.lastname = this.user.lastname;
      groupChatMessage.profile_path = this.user.profile_path;
      //alert(JSON.stringify(groupChatMessage));
      this.ngZone.run(() => {  
        this.groupChatMessages.push(groupChatMessage);
        setTimeout(() => { 
          this.content.scrollToBottom(300); 
        });
      });
    });

    // // alert(1);
    // this.socket.on('new message', newMessage => {   
    //   if (this.previousMessage !== newMessage.msg) {
    //     this.messages.push(newMessage.msg);  
    //     this.previousMessage = '';
    //   }   
    // });

    // this.participants = [];
    // // this.getParticipants();
    // //this.getGroupChatMessages();
    // // this.socket.on('new message', function(data) {
    // //   alert(1);
    // // }); 
  }

  getUser() {  
    this.storage.get('user').then(user => {
      this.user = user;
      // alert(JSON.stringify(this.user));
    }); 
  }   


  getEvent() {  
    this.route.queryParams.subscribe(event => {  
      this.event = event;
      alert(JSON.stringify(this.event));
    });   
  }  


  sendGroupChatMessage(): void { 
    
    const groupChatMessage : object = {
      'event_id'       : this.event.event_id,
      'user_id'        : this.user.user_id,
      'designation_id' : this.event.designation_id,
      'message'        : this.groupChatMessageText
    }

    this.socket.emit('send group chat message', groupChatMessage);  
    this.groupChatMessageText = '';
    // this.previousMessage = this.groupChatMessage;
    // //alert(this.message);
    // // this.socket.emit('send message', this.message); 
    // this.groupChatMessages.push({
    //   'message': 
    // }}); 
    // this.groupChatMessage = empty; 
    // this.ngZone.run(() => { 
    //   setTimeout(() => {
    //     this.content.scrollToBottom(300); 
    //   });
    // });
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
        } 
      });
    //}); 
  } 

  hasParticipants(participants): boolean {  
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
          //console.log(JSON.stringify(this.groupChatMessages));
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

  hasUserProfilePic(profilePath) { 
    //alert(profilePath)
    if (profilePath !== null) {
      // alert(1);
      return true;
    } else {
      // alert(2);
      return false;
    }
  }
}
