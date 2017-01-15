import { Component } from '@angular/core';
import { ScoringPage }  from '../scoring-page/scoring-page';
import { NavController } from 'ionic-angular';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Data]
})
export class HomePage {
  playevents: any;

  constructor(public navCtrl: NavController, public dataService: Data) {
    this.dataService.load().then((data) => {
      data.map((playevent) => {
        return playevent;
      });
      this.playevents = data;
    });
  }
  eventClicked(event) {
    this.navCtrl.push(ScoringPage, { data: event });
  }

}
