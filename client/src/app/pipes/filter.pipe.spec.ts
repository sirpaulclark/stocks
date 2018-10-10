import { FilterPipe } from './filter.pipe';
import { options } from '../testing';

const aStrings = ['abcz', 'defz', 'ghix', 'jklx'];


describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should test string array', () => {
    let result = pipe.transform(aStrings, 'a');
    expect(result.length).toEqual(1);

    result = pipe.transform(aStrings, 'x');
    expect(result.length).toEqual(2);
  });

  it('should test option array', () => {
    let result = pipe.transform(options, 'a', 'option');
    expect(result.length).toEqual(3);

    result = pipe.transform(options, 'inc', 'option');
    expect(result.length).toEqual(2);

    result = pipe.transform(options, 'mno', 'option');
    expect(result.length).toEqual(1);
  });
});
