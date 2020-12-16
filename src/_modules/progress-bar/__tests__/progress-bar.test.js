'use strict';

import ProgressBar from '../progress-bar';

describe('ProgressBar View', function() {

  beforeEach(() => {
    this.progressBar = new ProgressBar();
  });

  it('Should run a few assertions', () => {
    expect(this.progressBar);
  });

});
