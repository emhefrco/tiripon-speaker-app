import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'; 
import { Storage } from '@ionic/storage'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileType: string;
  user: any;

  constructor(
    private apiService        : ApiService,
    private storage           : Storage,
  ) {
    this.profileType = 'personal';
  }

  ngOnInit() {
    this.profileType = 'personal';
    this.storage.get('user').then(user => {
      this.user = user;
      // alert(JSON.stringify(user));
    });
  }

  updateProfile(): void {
      
  } 

  updatePassword(): void {

  }

  hasGender(gender): boolean { 
    const isMale              = gender === 'Male';
    const isFemale            = gender === 'Female';  
    const isPreferredNotToSay = gender === 'Prefer not to say';  

    if (isMale || isFemale || isPreferredNotToSay) {
      return true;
    } else {
      return false;
    }
  }
 

}
