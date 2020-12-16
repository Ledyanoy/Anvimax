'use strict';

import Categories from '../categories';

describe('Categories View', function() {

  beforeEach(() => {
    this.categories = new Categories();
  });

  it('Should run a few assertions', () => {
    expect(this.categories);
  });

});
