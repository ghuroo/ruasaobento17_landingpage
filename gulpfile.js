var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var sass_path = {
    source: './assets/source/sass/main.scss',
    destination: './assets/public/css',
    output: 'main.min.css'
};

var js_path = {
    source: [
        // vendor
        './assets/source/js/vendor/jquery.min.js',
    ],
    destination: './assets/public/js',
    output: 'main.min.js'
};

gulp.task('sass', function () {
    return gulp.src(sass_path.source)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat(sass_path.output))
    .pipe(gulp.dest(sass_path.destination))
    .pipe(reload({ stream: true }));
});

gulp.task('js', function() {
    return gulp.src(js_path.source)
    .pipe(concat(js_path.output))
    // .pipe(uglify())
    .pipe(gulp.dest(js_path.destination))
    .pipe(reload({ stream: true }));
});

gulp.task('default', ['sass', 'js'], function() {
    browserSync({
        proxy: 'localhost:3004'
    });

    gulp.watch('./assets/source/sass/**/*.scss', ['sass']);
    gulp.watch('./assets/source/js/**/*.js', ['js']);
    gulp.watch('./templates/**/*.pug').on('change', browserSync.reload);
});
