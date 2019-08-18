import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'; 
import { Storage } from '@ionic/storage'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileType : string;
  user        : any;
  address     : any;
  company     : any;

  constructor(
    private apiService : ApiService,
    private storage    : Storage,
  ) {
    this.profileType = 'personal';
  }

  ngOnInit() {
    this.profileType = 'personal';
    this.storage.get('user').then(user => {
      this.user = user;
      alert(JSON.stringify(user));
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

  hasCompleteAddress() : boolean {
    const hasStreet   : boolean = this.user.street   !== null;
    const hasCity     : boolean = this.user.city     !== null; 
    const hasProvince : boolean = this.user.province !== null; 
    const hasZipcode  : boolean = this.user.zipcode  !== null; 
    const hasCountry  : boolean = this.user.country  !== null;

    if (
      hasStreet   &&
      hasCity     &&
      hasProvince &&  
      hasZipcode  &&
      hasCountry 
    ) {
      return true;
    } else {
      return false;
    } 
  }  

  hasCompanyName() : boolean {
    return this.user.company_name !== null ? true : false;  
  }    

  hasCompanyAddress() : boolean {
    return this.user.company_address !== null ? true : false; 
  }     

  hasCompanyTIN() : boolean {
    return this.user.tax_identification_number !== null ? true : false; 
  }   

  hasCompanyVAT() : boolean {
    return this.user.vat_register === '1' ? true : false; 
  }     
}
