'use strict';

import Generator from '../generator';

describe('Generator View', function() {

  beforeEach(() => {
    this.generator = new Generator();
  });

  it('Should run a few assertions', () => {
    expect(this.generator);
  });

});
