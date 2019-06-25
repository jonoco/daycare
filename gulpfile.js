var 
  gulp      = require('gulp'),
  gutil     = require('gulp-util'),
  webserver = require('gulp-webserver'),
  minifyCSS = require('gulp-minify-css'),
  rename    = require('gulp-rename'),
  concat    = require('gulp-concat'),
  sass      = require('gulp-sass'),
  babel     = require('gulp-babel'),
  prefix    = require('gulp-autoprefixer'),
  jade      = require('gulp-jade'),
  sourcemaps= require('gulp-sourcemaps'),
  uglify    = require('gulp-uglify');

gulp.task('js', function(done) {
  gulp.src('src/js/main.js')
    .pipe(babel())
    //.pipe(uglify())
    //.pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'));

  done();
});

gulp.task('sass', function(done) {
  gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix())
    // .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./dist/css'));

  done();
});

gulp.task('jade', function(done) {
  gulp.src('src/views/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist'));

  done();
});

gulp.task('watch', function(done) {
  gulp.watch('src/sass/*.scss', gulp.series('sass')); 
  gulp.watch('src/js/*.js', gulp.series('js')); 
  gulp.watch('src/views/*.jade', gulp.series('jade'));

  done();
});

gulp.task('webserver', function(done) {
  gulp.src('./dist')
    .pipe(webserver({
      livereload: true,
      open: true
    }));

  done();
});

gulp.task('default', gulp.series(['watch', 'js', 'sass', 'jade', 'webserver']));
