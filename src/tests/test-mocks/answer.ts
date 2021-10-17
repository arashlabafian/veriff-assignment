import { Results, SwitchAnswer, ResultsResponse } from '../../models';
import { AnswerCounterResult } from '../../utils';

export const OBJECT: Results = {
  aaa: SwitchAnswer.YES,
  bbb: SwitchAnswer.NO,
};

export const MOCK_OBJ_IMPERFECT: Results = {
  ...OBJECT,
  ccc: undefined,
};

export const CONVERTED_OBJECT: ResultsResponse = [
  { checkId: 'aaa', result: SwitchAnswer.YES },
  { checkId: 'bbb', result: SwitchAnswer.NO },
];

export const EMPTY_OBJECT: AnswerCounterResult = {
  yesCounter: 0,
  noCounter: 0,
};

export const OBJECT_WITH_VALUES: AnswerCounterResult = {
  yesCounter: 1,
  noCounter: 1,
};
