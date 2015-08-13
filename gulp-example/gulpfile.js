// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var rimraf = require('gulp-rimraf');
var rev = require('gulp-rev');
var stylus = require('gulp-stylus');
var browserify = require('gulp-browserify');

var path = require('path');
var $ = require('gulp-load-plugins')();


gulp.task('clean', function() {
  gulp.src('./dist/*', { read: false })
      .pipe(rimraf({ force: true }));
});

gulp.task('assets', ['scripts', 'styles'], function() {


});

gulp.task('bundle', ['assets'], function() {
  var target = gulp.src('./assets/html/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./dist/*.js', './dist/*.css']);

  var options =
  {
    read:false,
    ignorePath: 'dist',
    addRootSlash: false
  };
  target.pipe(inject(sources,options))
      .pipe(gulp.dest('./dist'));
});

// Compile Our Sass
gulp.task('styles', function () {
  return gulp.src('./assets/styles/*.styl')
      .pipe(stylus())
      .pipe(concat('main.css'))
      .pipe(rev())
      .pipe(gulp.dest('./dist')
  );
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('./assets/scripts/main.js')
      .pipe(browserify())
      .pipe(rev())
      .pipe(gulp.dest('./dist')
  );
});


gulp.task('build', ['bundle'], function() {});

gulp.task('refresh', ['clean'], function() {
  gulp.start('build')
})

// fire up the connect middleware to plug into the server
gulp.task('connect', ['build'], function () {
  var connect = require('connect');
  var app = connect()
      .use(require('connect-livereload')({ port: 35729 }))
      .use(require('connect-modrewrite')([
        '!(\\..+)$ / [L]',
      ]))
      .use(connect.static('dist'))
      .use(connect.directory('dist'));

  require('http').createServer(app)
      .listen(9000)
      .on('listening', function () {
        console.log('Started connect web server on http://localhost:9000');
      });
});

// start the server
gulp.task('serve', ['connect'], function () {
  require('opn')('http://localhost:9000');
});

gulp.task('watch', ['connect', 'serve'], function () {
  var server = $.livereload();
  // watch for changes
  gulp.watch([
    'dist/*'
  ]).on('change', function (file) {
    console.log(file.path + " changed");
    server.changed(file.path);
  });

  gulp.watch('assets/html/*', ['refresh']);
  gulp.watch('assets/styles/*', ['refresh']);
  gulp.watch('assets/scripts/*', ['refresh']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('watch');
});