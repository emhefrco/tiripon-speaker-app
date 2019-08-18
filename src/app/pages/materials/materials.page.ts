import { Component, OnInit } from '@angular/core';
import { File, Entry, FileEntry } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { ApiService } from '../../services/api.service';
import { ActionSheetController, AlertController, LoadingController, ToastController, NavController } from '@ionic/angular'; 
import { Material } from '../../models/material';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.page.html',
  styleUrls: ['./materials.page.scss'],
})
export class MaterialsPage implements OnInit {    
  fileTransferObject: FileTransferObject;
  loading: any;
  materials: Material[];
  events: any[];
  baseUrl: string = 'https://www.tiripon.net/assets/event_image/landing/';
  skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor(
    private file                 : File,
    private fileChooser          : FileChooser,
    private filePath             : FilePath,
    private fileOpener           : FileOpener,
    private fileTransfer         : FileTransfer,
    private apiService           : ApiService,
    private actionSheetController: ActionSheetController,
    private alertController      : AlertController,
    private loadingController    : LoadingController,
    private toastController      : ToastController,
    private navController        : NavController
  ) { }

  ngOnInit() { 
    this.getEvents();
  } 

  counter: number = 3;
 
  material: any;

  addNewFile(file: any): void {
    //alert(JSON.stringify(file)); 

    const url = 'https://www.tiripon.net/assets/dashboard/images/speaker/material/documents/' + file.file_name;

    this.material = {
      databaseId: this.counter,
      fileName: file.client_name,
      size: 594,
      fileExtension: 'pdf',
      url: url 
    }; 
  }  

  getEvents(): void {   
    this.apiService.getEvents().then(events => { 
      if (this.hasEvents(events)) { 
        //alert(JSON.stringify(events));
        this.events = events;   
      } else { 
        this.events = []; 
      } 
    }); 
  } 

  hasEvents(events: any): boolean {  
    const numberOfEvents: number = events.length; 

    if (numberOfEvents >= 1) {
      return true;
    } else {
      return false;
    }
  }

  navigateToEventMaterialsPage(event: any): void { 
    const parameters: NavigationExtras = {
      queryParams: event
    };  

    //alert(JSON.stringify(event));

    this.navController.navigateForward(['/event-materials'], parameters);
  } 

}
