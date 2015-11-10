var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
     browserSync = require('browser-sync').create(),
       minifyCss = require('gulp-minify-css');
          reload = browserSync.reload;

// Autoprefixing  

gulp.task('autoprefixer', function () {
    return gulp.src('css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'], 
            cascade: true
        }))
        .pipe(gulp.dest('css')).on('change', browserSync.reload);

});

// MinifyCSS

gulp.task('minify', function() {
  return gulp.src('css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

// Server

gulp.task('serve', function () {

    browserSync.init(['css/*.css', 'js/*.js', '*.html'], {
        server: {
            baseDir: "./"
        }
    });

});

// Watch

gulp.task('watch', function() {
  gulp.watch(['*.html']).on('change', browserSync.reload);
  gulp.watch(['css/*.css'], ['autoprefixer']).on('change', browserSync.reload);
  gulp.watch(['js/*.js']).on('change', browserSync.reload);
});

// Default

gulp.task('default', ['minify', 'serve', 'watch']);