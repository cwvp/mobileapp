import { TeamModel } from './team.model';
/**
 * Model to represent a Summary
 */
export class SummaryModel {

  summaryId: number =0;
  action: string='';
  teams: Array<TeamModel> = [];

  constructor(summaryId, action,teams) {
    this.setSummaryId(summaryId);
    this.setAction(action);
    this.setTeams(teams);
  }

  setSummaryId(summaryId): void {
    this.summaryId = summaryId;
  }

  getSummaryId(): number {
    return this.summaryId;
  }

  setAction(action: string): void {
    this.action = action;
  }

  getAction(): string {
    return this.action;
  }
  setTeams(teams): void {
    teams.forEach(team => {
      this.teams.push(new TeamModel(team.players,team.points,team.score,team.firstServing));
    });
  }
  getTeams(): TeamModel[] {
    return this.teams;
  }
}
