import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactNewPage } from './contact-new';

@NgModule({
  declarations: [
    ContactNewPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactNewPage),
  ],
  exports: [
    ContactNewPage
  ]
})
export class ContactNewPageModule {}
