import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpdPage } from './opd';

@NgModule({
  declarations: [
    OpdPage,
  ],
  imports: [
    IonicPageModule.forChild(OpdPage),
  ],
  exports: [
    OpdPage
  ]
})
export class OpdPageModule {}
