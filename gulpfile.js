const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src("app/sass/*.sass")
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('serve', gulp.series('sass', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch("app/sass/*.sass", gulp.series('sass'));
    gulp.watch("app/*html").on("change", browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));