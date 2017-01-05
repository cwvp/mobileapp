import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
  Generated class for the PopupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-popup-page',
  templateUrl: 'popup-page.html'
})
export class PopupPage {

  constructor(public navCtrl: NavController, public view: ViewController) {}
  
  startScoring(){
     this.view.dismiss();
  }
  close(){
    this.view.dismiss();
  }
}
