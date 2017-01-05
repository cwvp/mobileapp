/**
 * Model to represent a Point
 */
export class PointModel {

  pointScore: number;
  pointType: string;
  isClicked: boolean;

  constructor(pointScore, pointType) {
    this.setPointScore(pointScore);
    this.setPointType(pointType);
  }

  setPointScore(pointScore): void {
    this.pointScore = pointScore;
  }

  getPointScore(): number {
    return this.pointScore;
  }

  setPointType(pointType: string): void {
    this.pointType = pointType;
  }

  getPointType(): string {
    return this.pointType;
  }
  getIsClickedFromType(): boolean {
    if (this.getPointType() === 'INITIAL' || this.getPointType() === 'CLICKED' || this.getPointType() === 'SIDEOUT') {
      return true;
    } else {
      return false;
    }
  }
}
