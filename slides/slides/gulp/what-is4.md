Huge ecosystem of plugins

It is code not configuration

    gulp.task('scripts', function() {
      return gulp.src('./assets/scripts/main.js')
          .pipe(browserify())
          .pipe(rev())
          .pipe(gulp.dest('./dist')
      );
    });
