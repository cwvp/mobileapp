/**
 * Model to represent a Game
 */
export class TimeOutModel {

  private timeOutId:number=0;
  private startTime:string;
  private disabled:boolean;
  constructor(timeOutId, startTime, disabled) {
    this.setTimeOutId(timeOutId);
    this.setStartTime(startTime);
    this.setDisabled(disabled);
  }
  setStartTime(startTime): void {
    this.startTime = startTime;
  }

  getStartTime(): string {
    return this.startTime;
  }

  setDisabled(disabled): void {
    this.disabled = disabled;
  }
  isDisabled(): boolean {
    return this.disabled;
  }
  setTimeOutId(timeOutId): void {
    this.timeOutId = timeOutId;
  }

  getTimeOutId(): number {
    return this.timeOutId;
  }
}
