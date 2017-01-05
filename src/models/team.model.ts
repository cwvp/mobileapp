import { PointModel } from './point.model';
import { PlayerModel } from './player.model';

/**
 * Model to represent a Team
 */
export class TeamModel {

  private players: Array<PlayerModel> = [];
  private points: Array<PointModel> = [];
  private score: number = 0;
  private firstServing: boolean = false;
  private serving: boolean = false;
  constructor(players: Array<PlayerModel>, points: Array<PointModel>, score: number, firstServing: boolean) {
    this.setPoints(points);
    this.setPlayers(players);
    this.setScore(score);
    this.setFirstServing(firstServing);
  }
  /**
   * Adds point objects to the points array
   */
  setPoints(points): void {
    points.forEach(point => {
      this.points.push(new PointModel(point.pointScore, point.pointType));
    });
  }

  getPoints(): PointModel[] {
    return this.points;
  }
  /**
   * Adds player objects to the players array
   */
  setPlayers(players: Array<PlayerModel>): void {
    players.forEach(player => {
      this.players.push(new PlayerModel(player.playerName, player.playerId, player.serving, player.firstServing, player.disabled));
    });
  }

  getPlayers(): PlayerModel[] {
    return this.players;
  }
  setScore(score): void {
    this.score = score;
  }

  getScore(): number {
    return this.score;
  }
  setFirstServing(firstServing): void {
    this.firstServing = firstServing;
  }
  isFirstServing(): boolean {
    return this.firstServing;
  }
  setServing(serving): void {
    this.serving = serving;
  }
  isServing(): boolean {
    return this.serving;
  }
  isDisabledFromServing(): boolean {
    return !this.isServing();
  }
}
