/**
 * Model to represent a Player
 */
export class PlayerModel {

  playerName: string;
  playerId: number = 0;
  serving: boolean = false;
  firstServing: boolean = false;
  disabled: boolean = false;

  constructor(playerName, playerId, serving, firstServing, disabled) {
    this.setPlayerName(playerName);
    this.setPlayerId(playerId);
    this.setServing(serving);
    this.setFirstServing(firstServing);
    this.setDisabled(disabled);
  }

  setPlayerName(playerName): void {
    this.playerName = playerName;
  }

  getPlayerName(): string {
    return this.playerName;
  }

  setServing(serving): void {
    this.serving = serving;
  }
  isServing(): boolean {
    return this.serving;
  }
  setPlayerId(playerId): void {
    this.playerId = playerId;
  }

  getPlayerId(): number {
    return this.playerId;
  }
  setFirstServing(firstServing): void {
    this.firstServing = firstServing;
  }
  isFirstServing(): boolean {
    return this.firstServing;
  }
  setDisabled(disabled): void {
    this.disabled = disabled;
  }
  isDisabled(): boolean {
    return this.disabled;
  }
}
