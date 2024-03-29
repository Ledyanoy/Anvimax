'use strict';

import gulp from 'gulp';
import glob from 'glob';
import { KarmaServer, args } from './gulp/utils';

// This will grab all js in the `gulp` directory
// in order to load all gulp tasks
glob.sync('./gulp/tasks/**/*.js').filter(function(file) {
  return (/\.(js)$/i).test(file);
}).map(function(file) {
  require(file);
});

// Build production-ready code
gulp.task('build', gulp.series(
  gulp.parallel(
    'copy',
    'imagemin',
    'svgSprite',
    'pug',
    'sass',
    'browserify'
  ),
  'rev'
));

// Server tasks with watch
gulp.task('serve', gulp.series(
  gulp.parallel(
    'imagemin',
    'copy',
    'svgSprite',
    'pug',
    'sass',
    'browserify',
    'browserSync',
    'watch'
  )
));

// Default task
gulp.task('default', gulp.series('clean', 'build'));

// Testing
gulp.task('test', gulp.series('eslint'));
