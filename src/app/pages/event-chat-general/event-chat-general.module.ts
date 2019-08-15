import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventChatGeneralPage } from './event-chat-general.page';

const routes: Routes = [
  {
    path: '',
    component: EventChatGeneralPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventChatGeneralPage]
})
export class EventChatGeneralPageModule {}
