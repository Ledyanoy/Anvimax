'use strict';

import ShareLinks from '../share-links';

describe('ShareLinks View', function() {

  beforeEach(() => {
    this.shareLinks = new ShareLinks();
  });

  it('Should run a few assertions', () => {
    expect(this.shareLinks);
  });

});
