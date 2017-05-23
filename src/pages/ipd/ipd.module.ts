import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IpdPage } from './ipd';

@NgModule({
  declarations: [
    IpdPage,
  ],
  imports: [
    IonicPageModule.forChild(IpdPage),
  ],
  exports: [
    IpdPage
  ]
})
export class IpdPageModule {}
