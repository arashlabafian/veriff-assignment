import {
  EMPTY_OBJECT,
  OBJECT,
  MOCK_OBJ_IMPERFECT,
  OBJECT_WITH_VALUES,
} from './test-mocks/answer';
import { answerCounter } from '../utils';

describe('Counting answer', () => {
  it('should return 0 for an empty object', () => {
    expect(answerCounter({})).toEqual(EMPTY_OBJECT);
  });

  it('should return correct value', () => {
    expect(answerCounter(OBJECT)).toEqual(OBJECT_WITH_VALUES);
  });

  it('should return correct value for falsy object', () => {
    expect(answerCounter(MOCK_OBJ_IMPERFECT)).toEqual(OBJECT_WITH_VALUES);
  });
});
