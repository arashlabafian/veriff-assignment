import { Results, SwitchAnswer, ResultsResponse } from '../models';

export interface AnswerCounterResult {
  yesCounter: number;
  noCounter: number;
}
export const answerConverter = (data: Results): ResultsResponse => {
  const response: ResultsResponse = Object.keys(data)
    .filter((key) => data[key] !== undefined)
    .map((key) => ({ checkId: key, result: data[key] as SwitchAnswer }));
  return response;
};

export const answerCounter = (answers: Results): AnswerCounterResult => {
  let yesCounter = 0;
  let noCounter = 0;
  const values = Object.values(answers);
  const filteredValues = values.filter((item) => item !== undefined);
  filteredValues.forEach((val) => {
    if (val === SwitchAnswer.NO) noCounter++;
    if (val === SwitchAnswer.YES) yesCounter++;
  });
  return { yesCounter, noCounter };
};
