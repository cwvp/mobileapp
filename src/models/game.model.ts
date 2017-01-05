import { TeamModel } from './team.model';

/**
 * Model to represent a Game
 */
export class GameModel {

  private teams: Array<TeamModel> = [];
  constructor(teams: Array<TeamModel>) {
    /*this.setTeams(teams);*/
  }
  /**
   * Adds team objects to the points array

  setTeams(teams): void {
    teams.forEach(point => {
      this.teams.push(new PointModel(point.pointScore, point.pointType));
    });
  }*/

  getTeams(): TeamModel[] {
    return this.teams;
  }
}
