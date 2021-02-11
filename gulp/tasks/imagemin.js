'use strict';

import path from 'path';
import gulpif from 'gulp-if';
import pngquant from 'imagemin-pngquant';
import mozjpeg from 'imagemin-mozjpeg'
import gulp from 'gulp';
import {plugins, args, config, taskTarget, browserSync} from '../utils';

let dirs = config.directories;
let dest = path.join(taskTarget, dirs.images.replace(/^_/, ''));

// Imagemin
gulp.task('imagemin', () => {
  return gulp
    .src('**/*.{jpg,jpeg,gif,svg,png}', {
      cwd: path.join(dirs.source, dirs.images)
    })
    .pipe(plugins.changed(dest))
    .pipe(
      gulpif(
        args.production,
        plugins.imagemin(
          [
            plugins.imagemin.gifsicle({interlaced: true}),
            plugins.imagemin.optipng({optimizationLevel: 7}),
            plugins.imagemin.svgo({
              plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
              ]
            }),
            mozjpeg({quality: 75, progressive: true}),
            pngquant({speed: 10}),

          ], {
            verbose: true
          }
        )
      )
    )
    .pipe(gulp.dest(dest));
});
