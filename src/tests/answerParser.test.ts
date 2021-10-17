import { answerConverter } from '../utils';
import {
  OBJECT,
  MOCK_OBJ_IMPERFECT,
  CONVERTED_OBJECT,
} from './test-mocks/answer';

describe('Pars answers', () => {
  it('should return array with correct length and correct values for imperfect object', () => {
    expect(answerConverter(MOCK_OBJ_IMPERFECT).length).toBe(2);
    expect(answerConverter(MOCK_OBJ_IMPERFECT)).toEqual(CONVERTED_OBJECT);
  });
  it('should return empty array for empty object', () => {
    expect(answerConverter({})).toEqual([]);
  });
  it('should return array with same length and correct values for filled object', () => {
    expect(answerConverter(OBJECT).length).toBe(2);
    expect(answerConverter(OBJECT)).toEqual(CONVERTED_OBJECT);
  });
});
