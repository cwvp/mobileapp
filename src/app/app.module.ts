import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ScoringPage } from '../pages/scoring-page/scoring-page';
import { PopupPage } from '../pages/popup-page/popup-page';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ScoringPage,
    PopupPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),FormsModule,BrowserModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ScoringPage,
    PopupPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
