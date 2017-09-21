// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var sass = require('gulp-sass');
// var rename = require('gulp-rename');
// var cmq = require('gulp-combine-media-queries');
// var minifyCSS = require('gulp-minify-css');

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

/*gulp.task('cmq', ['sass'], function () {
  gulp.src('css/screen.css')
    .pipe(cmq({
      log: true
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('minifyCSS', function() {
  gulp.src('build/*.css')
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(rename('screen.min.css'))
    .pipe(gulp.dest('css'));
});*/


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['sass']);
    //gulp.watch('css/*.css', ['cmq']);
    //gulp.watch('build/*.css', ['minifyCSS']);

});

// Default Task
//gulp.task('default', ['sass', 'cmq', 'minifyCSS', 'watch']);
gulp.task('default', ['sass', 'watch']);