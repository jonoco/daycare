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

gulp.task('js', function() {
  gulp.src('src/js/main.js')
    .pipe(babel())
    //.pipe(uglify())
    //.pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function() {
  gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix())
    // .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('jade', function() {
  gulp.src('src/views/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/views/*.jade', ['jade']);
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'js', 'sass', 'jade', 'webserver']);
