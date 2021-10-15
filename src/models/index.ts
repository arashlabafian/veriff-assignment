export interface Section {
  id: string;
  priority: number;
  description: string;
}

export type Results = Record<string, SwitchAnswer | undefined>;

export type ResultsResponse = {
  checkId: string;
  result: SwitchAnswer;
}[];

export interface AnswerCounterResult {
  yesCounter: number;
  noCounter: number;
}

export enum SwitchAnswer {
  YES = 'yes',
  NO = 'no',
}
