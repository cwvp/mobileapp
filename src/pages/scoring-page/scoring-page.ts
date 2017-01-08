import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { PopupPage } from '../popup-page/popup-page';
import { PointModel } from '../../models/point.model';
import { TeamModel } from '../../models/team.model';
import { PlayerModel } from '../../models/player.model';
import { SummaryModel } from '../../models/summary.model';

@Component({
  selector: 'page-scoring',
  templateUrl: 'scoring-page.html'
})
export class ScoringPage {
  points: number[];
  teams: TeamModel[] = [];
  teamPoints: PointModel[] = [];
  summary: SummaryModel[]=[];

  team1: TeamModel;
  team2: TeamModel;

  isPlayerDisabled: boolean;
  isSideOutDisabled: boolean;
  isUndoDisabled: boolean;
  isFinishGameDisabled: boolean;
  isFirstTimeForDoubles: boolean = false;
  nowServing:number;

  eventType: string;
  maxPointPerGame: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.eventType = this.navParams.get('eventType');
    this.maxPointPerGame = this.navParams.get('maxPointPerGame');
    this.isFinishGameDisabled = true;
    this.isUndoDisabled=true;
    this.isSideOutDisabled = true;
    this.isPlayerDisabled = true;
    this.points = [];
    this.teamPoints = [];
    this.teams = [];
    this.nowServing=2;
    for (let k: number = 1; k <= this.maxPointPerGame; k++) {
      this.points[k - 1] = k;
      let teamPoint = new PointModel(k, "INITIAL");
      this.teamPoints.push(teamPoint);
    }
    /* Setting team,players and initial points */
    this.team1 = new TeamModel(((this.eventType.toUpperCase() === 'SINGLES') ? [new PlayerModel("Player 1", "team1", false, false, true)] : [new PlayerModel("Player 1A", "player1A", false, false, true), new PlayerModel("Player 1B", "player1B", false, false, true)]), this.teamPoints, 0, false);
    this.team2 = new TeamModel(((this.eventType.toUpperCase() === 'SINGLES') ? [new PlayerModel("Player 2", "team2", false, false, true)] : [new PlayerModel("Player 2A", "player2A", false, false, true), new PlayerModel("Player 2B", "player2B", false, false, true)]), this.teamPoints, 0, false);
    this.teams.push(this.team1);
    this.teams.push(this.team2);
  }
  captureScore(point, $event) {
    if (($event.currentTarget.id == 1 && this.team1.isServing())
      || ($event.currentTarget.id == 2 && this.team2.isServing())) {
      (this.team1.isServing() ? this.team1.getPoints() : this.team2.getPoints()).forEach(teamPoint => {
        if (teamPoint.getPointScore() === point)
          teamPoint.setPointType("CLICKED");
      });
      /* Showing Finish Game after the last point is clicked */
      if (point == this.maxPointPerGame) {
        this.isFinishGameDisabled = false;
      }
      /* Setting current score */
      if ($event.currentTarget.id == 1) {
        this.team1.setScore(point);
      }
      if ($event.currentTarget.id == 2) {
        this.team2.setScore(point);
      }
    }
    /* Setting summary */
    this.summary.push(new SummaryModel(1,'captureScore',[this.team1,this.team2]));
  }
  servingClick($event) {
    /* This is to temporarily enable serving for both teams(on first click)
        before the following logic takes care of setting correct server
    if (this.team1.isServing() && this.team2.isServing()) {
      this.team1.setServing(false);
      this.team2.setServing(false);
    }*/
    /* Capture starting Server ID */
    /*this.sideOutLabel = "Side Out";*/
    if(this.nowServing===1){
      this.nowServing=2;
    }else{
      /*if(this.team1.isServing())
        this.team1.getPlayers().forEach(
          player=> player.setDisabled(true)
        );
      else
        this.team2.getPlayers().forEach(
        player=> player.setDisabled(true)
      );*/
      this.nowServing=1;
    }
    
    switch ($event.currentTarget.id) {
      case 'team1':
        this.team1.setFirstServing(true);
        this.team1.setServing(true);
        break;
      case 'team2':
        this.team2.setFirstServing(true);
        this.team2.setServing(true);
        break;
      case 'player1A':
        this.team1.getPlayers()[0].setServing(true);
        this.team1.setServing(true);
        /*this.team1.getPlayers()[1].setDisabled(true);*/
        /* Very first click after start Game*/
        if (!this.isFirstServingChoosenForDoubles()) {
          this.isFirstTimeForDoubles = true;
          this.team1.getPlayers()[0].setFirstServing(true);
          this.team1.setFirstServing(true);
        } if (!this.team1.getPlayers()[0].isFirstServing()
          && !this.team1.getPlayers()[1].isFirstServing()) {
          this.team1.getPlayers()[0].setFirstServing(true);
          this.isSideOutDisabled = false;
          this.isUndoDisabled=false;
          /* Enabling current team/player score board */
          this.team1.getPoints().forEach(teamPoint => {
            teamPoint.setPointType("AVAILABLE");
          });
        }
        break;
      case 'player1B':
        this.team1.getPlayers()[1].setServing(true);
        this.team1.setServing(true);
      /*  this.team1.getPlayers()[0].setDisabled(true);*/
        /* Very first click after start Game*/
        if (!this.isFirstServingChoosenForDoubles()) {
          this.isFirstTimeForDoubles = true;
          this.team1.getPlayers()[1].setFirstServing(true);
          this.team1.setFirstServing(true);
        } if (!this.team1.getPlayers()[0].isFirstServing()
          && !this.team1.getPlayers()[1].isFirstServing()) {
          this.team1.getPlayers()[1].setFirstServing(true);
          this.isSideOutDisabled = false;
          this.isUndoDisabled=false;
          /* Enabling current team/player score board */
          this.team1.getPoints().forEach(teamPoint => {
            teamPoint.setPointType("AVAILABLE");
          });
        }
        break;
      case 'player2A':
        this.team2.getPlayers()[0].setServing(true);
        this.team2.setServing(true);
      /*  this.team2.getPlayers()[1].setDisabled(true);*/
        /* Very first click after start Game*/
        if (!this.isFirstServingChoosenForDoubles()) {
          this.isFirstTimeForDoubles = true;
          this.team2.getPlayers()[0].setFirstServing(true);
          this.team2.setFirstServing(true);
        } if (!this.team2.getPlayers()[0].isFirstServing()
          && !this.team2.getPlayers()[1].isFirstServing()) {
          this.team2.getPlayers()[0].setFirstServing(true);
          this.isSideOutDisabled = false;
          this.isUndoDisabled=false;
          /* Enabling current team/player score board */
          this.team2.getPoints().forEach(teamPoint => {
            teamPoint.setPointType("AVAILABLE");
          });
        }
        break;
      case 'player2B':
        this.team2.getPlayers()[1].setServing(true);
        this.team2.setServing(true);
      /*  this.team2.getPlayers()[0].setDisabled(true);*/
        /* Very first click after start Game*/
        if (!this.isFirstServingChoosenForDoubles()) {
          this.isFirstTimeForDoubles = true;
          this.team2.getPlayers()[1].setFirstServing(true);
          this.team2.setFirstServing(true);
        } if (!this.team2.getPlayers()[0].isFirstServing()
          && !this.team2.getPlayers()[1].isFirstServing()) {
          this.team2.getPlayers()[1].setFirstServing(true);
          this.isSideOutDisabled = false;
          this.isUndoDisabled=false;
          /* Enabling current team/player score board */
          this.team2.getPoints().forEach(teamPoint => {
            teamPoint.setPointType("AVAILABLE");
          });
        }
        break;
    }

    /* Disabling server selection for Singles after first Server is choosen */
    if (this.eventType.toUpperCase() === 'SINGLES') {
      this.isSideOutDisabled = false;
      this.isUndoDisabled=false;
      this.isPlayerDisabled = true;
      /* Disabling server selection for Doubles is controlled inside the html itself */
      /* Enabling current team/player score board */
      (($event.currentTarget.id === "team1") ? this.team1.getPoints() : this.team2.getPoints())
        .forEach(teamPoint => {
          teamPoint.setPointType("AVAILABLE");
        });
    } else {
      if (this.team1.isServing())
        this.team2.getPlayers().forEach(player => {
          player.setDisabled(true);
        });
      if (this.team2.isServing())
        this.team1.getPlayers().forEach(player => {
          player.setDisabled(true);
        });
      /* Only for first time server click on Doubles */
      if (this.isFirstTimeForDoubles) {
        this.nowServing=2;
        this.isSideOutDisabled = false;
        this.isUndoDisabled=false;
        (($event.currentTarget.id.indexOf("player1") > -1) ? this.team1.getPoints() : this.team2.getPoints())
          .forEach(teamPoint => {
            teamPoint.setPointType("AVAILABLE");
          });
        /*Disabling serve for second player on "game first" serving  team*/
        (($event.currentTarget.id.indexOf("player1") > -1) ? this.team1.getPlayers(): this.team2.getPlayers())
            .forEach(player => {
              if(!player.isServing())
                player.setDisabled(true);
            });
        this.isFirstTimeForDoubles = false;
      }
    }
  }
  sideOut() {
  /*  if (this.sideOutLabel === "Change Player Serve") {
      /* Switching player serve within team
      if (this.team1.isServing()) {
        this.team1.getPlayers().forEach(player => {
          if (player.isServing()) {
            player.setDisabled(true);
            player.setServing(false);
          }
          else
            player.setServing(true);
        })
      } else {
        this.team2.getPlayers().forEach(player => {
          if (player.isServing()) {
            player.setDisabled(true);
            player.setServing(false);
          }
          else
            player.setServing(true);
        })
      }
    } else {*/
      if (this.team1.isServing()) {
        /* Switching serves on side out */
        this.team2.setServing(true);
        if (this.eventType.toUpperCase() === 'DOUBLES') {
          /* Forcing to choose first server on other team */
          if (!this.team2.getPlayers()[0].isFirstServing() &&
            !this.team2.getPlayers()[1].isFirstServing()) {
            this.isSideOutDisabled = true;
            this.isUndoDisabled=true;
            /* Disabling other server score board till they choose first server */
            this.team2.getPoints().forEach(teamPoint => {
              teamPoint.setPointType("INITIAL")
            })
          } else {
            /* Enabling other server score board based on current score for Doubles*/
            this.team2.getPoints().forEach(teamPoint => {
              if (teamPoint.getPointScore() > this.team2.getScore()) {
                teamPoint.setPointType("AVAILABLE")
              }
            })
          }
          /* Disabling current team serving */
          this.team1.getPlayers().forEach(player => {
            player.setDisabled(true);
          });
          this.team2.getPlayers().forEach(player => {
            player.setDisabled(false);
          });
          /* this.isTeam1Disabled = true;
          this.isTeam2Disabled = false; */
          /* Disabling highlight on current team serving */
          this.team1.getPlayers().forEach(player => {
            player.setServing(false);
          })
          /* Highlighting first server on sideOut
          this.team2.getPlayers().forEach(player => {
            if (player.isFirstServing())
              player.setServing(true);
          })*/
        }
        this.team1.setServing(false);
        /* Marking side out score and disabling current server scoreboard*/
        this.team1.getPoints().forEach(teamPoint => {
          if (teamPoint.getPointScore() === this.team1.getScore())
            teamPoint.setPointType("SIDEOUT");
          else if (teamPoint.getPointType() !== "CLICKED" && teamPoint.getPointType() !== "SIDEOUT")
            teamPoint.setPointType("INITIAL");
        })
        /* Enabling other server score board based on current score for Singles*/
        if (this.eventType.toUpperCase() === 'SINGLES') {
          this.team2.getPoints().forEach(teamPoint => {
            if (teamPoint.getPointScore() > this.team2.getScore()) {
              teamPoint.setPointType("AVAILABLE")
            }
          })
        }
      } else {
        /* Switching serves on side out */
        this.team1.setServing(true);
        this.team2.setServing(false);
        if (this.eventType.toUpperCase() === 'DOUBLES') {
          /* Forcing to choose first server on other team */
          if (!this.team1.getPlayers()[0].isFirstServing() &&
            !this.team1.getPlayers()[1].isFirstServing()) {
            this.isSideOutDisabled = true;
            this.isUndoDisabled=true;
            /* Disabling other server score board till they choose first server */
            this.team1.getPoints().forEach(teamPoint => {
              teamPoint.setPointType("INITIAL")
            })
          } else {
            /* Enabling other server score board based on current score for Doubles*/
            this.team1.getPoints().forEach(teamPoint => {
              if (teamPoint.getPointScore() > this.team1.getScore()) {
                teamPoint.setPointType("AVAILABLE")
              }
            })
          }
          /* Disabling current team serving */
          /*  this.isTeam2Disabled = true;
            this.isTeam1Disabled = false;*/
          this.team2.getPlayers().forEach(player => {
            player.setDisabled(true);
          });
          this.team1.getPlayers().forEach(player => {
            player.setDisabled(false);
          });
          /* Disabling highlight on current team serving */
          this.team2.getPlayers().forEach(player => {
            player.setServing(false);
          })
          /* Highlighting first server on sideOut
          this.team1.getPlayers().forEach(player => {
            if (player.isFirstServing())
              player.setServing(true);
          })*/
        }
        /* Marking side out score and disabling current server scoreboard */
        this.team2.getPoints().forEach(teamPoint => {
          if (teamPoint.getPointScore() === this.team2.getScore())
            teamPoint.setPointType("SIDEOUT");
          else if (teamPoint.getPointType() !== "CLICKED" && teamPoint.getPointType() !== "SIDEOUT")
            teamPoint.setPointType("INITIAL");
        })
        /* Enabling other server score board based on current score */
        if (this.eventType.toUpperCase() === 'SINGLES') {
          this.team1.getPoints().forEach(teamPoint => {
            if (teamPoint.getPointScore() > this.team1.getScore())
              teamPoint.setPointType("AVAILABLE")
          })
        }
      }
  }
  undo(){

  }
  startGame() {

    let addModal = this.modalCtrl.create(PopupPage);
    addModal.present();


    /* Disabling player serves before selecting first server */
    this.isPlayerDisabled = false;
    /*  this.isTeam1Disabled = false;
      this.isTeam2Disabled = false; */
    this.team1.getPlayers().forEach(player => {
      player.setDisabled(false);
    });
    this.team2.getPlayers().forEach(player => {
      player.setDisabled(false);
    });

    /* Setting summary */
    this.summary.push(new SummaryModel(1,'startGame',[this.team1,this.team2]));

  }
  isFirstServingChoosenForDoubles(): boolean {
    if (!this.team1.getPlayers()[0].isFirstServing()
      && !this.team1.getPlayers()[1].isFirstServing()
      && !this.team2.getPlayers()[0].isFirstServing()
      && !this.team2.getPlayers()[1].isFirstServing())
      return false;
    else
      return true;
  }
}
