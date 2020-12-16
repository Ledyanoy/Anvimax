'use strict';

import ResultList from '../result-list';

describe('ResultList View', function() {

  beforeEach(() => {
    this.resultList = new ResultList();
  });

  it('Should run a few assertions', () => {
    expect(this.resultList);
  });

});
