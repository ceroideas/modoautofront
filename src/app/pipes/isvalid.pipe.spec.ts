import { IsvalidPipe } from './isvalid.pipe';

describe('IsvalidPipe', () => {
  it('create an instance', () => {
    const pipe = new IsvalidPipe();
    expect(pipe).toBeTruthy();
  });
});
