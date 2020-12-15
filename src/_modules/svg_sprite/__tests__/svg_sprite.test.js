'use strict';

import SvgSprite from '../svg_sprite';

describe('SvgSprite View', function() {

  beforeEach(() => {
    this.svgSprite = new SvgSprite();
  });

  it('Should run a few assertions', () => {
    expect(this.svgSprite);
  });

});
