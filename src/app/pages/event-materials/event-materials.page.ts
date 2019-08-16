import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { File, Entry, FileEntry } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { ActionSheetController } from '@ionic/angular';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

@Component({
  selector: 'app-event-materials',
  templateUrl: './event-materials.page.html',
  styleUrls: ['./event-materials.page.scss'],
})
export class EventMaterialsPage implements OnInit {
  event         : any;
  eventMaterials: any;
  //private baseUrl       : string = 'http://www.sandbox.baldpuppiessolutions.com/';
  baseUrl       : string = 'https://www.tiripon.net/';
  imagesDir     : string = 'assets/dashboard/images/speaker/material/images/';
  documentsDir  : string = 'assets/dashboard/images/speaker/material/documents/';
  videosDir     : string = 'assets/dashboard/images/speaker/material/videos/';
  controller    : string = 'Android_Api_Speaker/';
  // private baseUrl: string = 'https://www.tiripon.net/';
  loading;
  skeletonItems : any    =  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  uploadedFile;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private alertController   : AlertController,
    private loadingController : LoadingController,
    private navController     : NavController,
    private file: File,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private fileOpener: FileOpener,
    private fileTransfer: FileTransfer,
    public actionSheetController: ActionSheetController 
  ) { } 

  ngOnInit() { 
    this.getEvent().then(event => { 
      this.event = event;
      //alert(JSON.stringify(event));
      this.getEventMaterials(event);
    });
  }

  getEvent(): Promise<any> { 
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

  getEventMaterials(event: any): void { 

    this.apiService.getEventMaterials(event).then(eventMaterials => {
      //alert(JSON.stringify(eventMaterials));
      if (this.doesEventHaveMaterials(eventMaterials)) { 
        this.eventMaterials = eventMaterials;  
      } else {
        this.eventMaterials = []; 
      } 
    });      

  }  

  doesEventHaveMaterials(eventMaterials) { 
    const numberOfMaterials = eventMaterials.length;

    if (numberOfMaterials > 0) { 
      return true;
    } else {
      return false;
    }
  }

  async presentLoading(message) {
    let options = {
      message: message
    }

    this.loading = await this.loadingController.create(options);

    await this.loading.present();  
  }  

  async dismissLoading() { 
    await this.loading.dismiss(); 
  } 

  downloadFile(file, directory) {

    return new Promise((resolve, reject) => {
      const fileTransfer: FileTransferObject = this.fileTransfer.create();
   
      fileTransfer.download(file.url, directory).then((entry) => {
        //alert(JSON.stringify(entry));
        resolve(entry);
      }, (error) => {
        reject(error);
      });       
    }); 
  }  

  onDownloadFile(material): void {

    const url = this.getMaterialUrl(material); 
    const targetDir = this.file.externalRootDirectory + 'Download/' + material.title;

    // alert(targetDir); 
 
    material.url = url + material.filename; 

    this.presentLoading('Downloading file...').then(() => {

      this.downloadFile(material, targetDir).then((entry : any) => { 
        
        this.dismissLoading().then(async() => {

          const alert = await this.alertController.create({
            header          : 'Download', 
            message         : 'File has been downloaded.',
            backdropDismiss : false,
            buttons         : ['Ok'] 
          });

          await alert.present(); 
        }); 
      });
    });

  }

  getFileInformation(filePath: any) {
    return new Promise((resolve, reject) => {
      this.file.resolveLocalFilesystemUrl(filePath).then(entry => {
      (<FileEntry>entry).file(file => { 
        resolve(file);
      });
      }, error => { 
        reject(error);
      });
    });
  }  

  onChooseFile() {    

    // const imageUrl = 'https://www.tiripon.net/assets/dashboard/images/speaker/material/documents/tiripon_f4cbfe1e18f291371fc0a9bd9a4f6924.jpg';
    // const url = 'https://tiripon.net/Android_Api_Speaker/upload_material';
    const url = this.baseUrl + this.controller + 'upload_material';
    const fileReader = new FileReader();
    
    this.fileChooser.open().then(uri => {

      this.presentLoading('Uploading file.').then(() => {

        this.filePath.resolveNativePath(uri).then(resolvedNativePath => {
          
          this.file.resolveLocalFilesystemUrl(resolvedNativePath).then(() => {
            
            this.getFileInformation(resolvedNativePath).then((file: any) => {
              //alert(JSON.stringify(event));
              //alert(JSON.stringify(file)); return;
              this.apiService.uploadFile(this.event, file).then((uploadedFile: any) => { 
                //alert(JSON.stringify(uploadedFile));
                this.uploadedFile = uploadedFile;
                this.dismissLoading().then(async() => {
                  const alert = await this.alertController.create({
                    header    : 'Upload', 
                    message   : 'File has been uploaded.',
                    backdropDismiss: false,
                    buttons   : [
                      {
                        text: 'Ok',
                        handler: () => {
                          this.addNewFile(this.uploadedFile);
                          alert.dismiss();
                        }
                      }
                    ]

                  });

                  await alert.present(); 
                });
                  //alert('Done!');
                    //alert(JSON.stringify(uploadedFile)); 
                

              }); 
            }); 
          })
        })
      }); 
    }); 
  }   

  addNewFile(file) {  
    //alert(JSON.stringify(file));
    this.eventMaterials.unshift({
      title     : file.client_name, 
      extension : file.extension, 
      size      : file.size,
      filename  : file.file_name 
    }); 
  }  

  async presentAlert(message) {
    const alert = await this.alertController.create({ 
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.addNewFile(this.uploadedFile);
          }
        }
      ]
    });

    await alert.present();
  }  

  isImage(material) {
    if (
      material.extension === 'jpg' ||
      material.extension === 'jpeg' ||
      material.extension === 'png'
      ) {
      return true;
    }
  } 

  isPDF(material) {
    if (material.extension === 'pdf') {
      return true;
    }
  }  

  isMP4(material) { 
    if (material.extension === 'mp4') {
      return true;
    }
  }    

  isPPT(material) { 
    if (material.extension === 'ppt' || material.extension === 'pptx') {
      return true;
    }
  }   

  isWord(material) { 
    if (material.extension === 'doc' || material.extension === 'docx') {
      return true;
    }
  }    

  isVideo(material) {
    if (this.isMP4(material)) {
      return true;
    }      
  }

  isOtherFile(material) {
    if (
      !this.isImage(material) &&  
      !this.isVideo(material) &&
      !this.isDocument(material) 
      ) {
      return true;
    }
  }

  isDocument(material) {
    if (this.isPDF(material) || this.isPPT(material) || this.isWord(material)) {
      return true;
    }    
  }

  formatSize(bytes): any {
    //alert(bytes);
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) {
      return '0 Byte';
    } else {
      let i = Math.floor(Math.log(bytes) / Math.log(1024));
      return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];  
    }
  } 

  async presentActionSheet(material) {
    const actionSheet = await this.actionSheetController.create({
      header: material.title,
      buttons: [{
        text: 'View',
        role: 'destructive',
        icon: 'eye',
        handler: () => {
          this.onOpenFile(material);
        }
      }, {
        text: 'Download',
        role: 'destructive',
        icon: 'download',
        handler: () => {
          this.onDownloadFile(material);
        }
      }, {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          //this.onDownloadFile(material);
          alert('Add delete function');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  onOpenFile(material) {    

    const url = this.getMaterialUrl(material);
    const targetDir = this.file.dataDirectory + material.title;
 
    material.url = url + material.filename; 

    /* OPEN SAVED / CACHED FILE FROM DATA DIRECTORY */
    this.presentLoading('Opening file...').then(() => {

      this.file.checkFile(this.file.dataDirectory, material.title).then(response => { 

        this.getFileInformation(this.file.dataDirectory + material.title).then((info: any) => {
          
          this.dismissLoading().then(() => { 

            this.fileOpener.open(info.localURL, info.type);   
          });
        });
      /* DOWNLOAD AND SAVE / CACHED FILE TO DATA DIRECTORY */
      }, error => { 

        this.downloadFile(material, targetDir).then((entry: any) => { 

          this.getFileInformation(entry.nativeURL).then((info: any) => { 

            this.dismissLoading().then(() => { 

              this.fileOpener.open(info.localURL, info.type);   
            });
          });
        });
      }); 
    });

  }  

  getMaterialUrl(material) {
    if (this.isVideo(material)) {
      return this.baseUrl + this.videosDir;
    } else if (this.isImage(material)) {
      return this.baseUrl + this.imagesDir;
    } else if (this.isDocument(material)) {
      return this.baseUrl + this.documentsDir;
    }
  }
}
