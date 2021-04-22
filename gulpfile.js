const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");

gulp.task("sass", function () {
    return gulp
        .src("app/sass/*.sass")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task("sync", function () {
    browserSync.init({
        server: {
            baseDir: "./app",
        },
    });

    gulp.watch("app/sass/*.sass", gulp.series("sass"));
    gulp.watch("app/*html").on("change", browserSync.reload);
});

gulp.task("dev", gulp.series("sass", "sync"));
gulp.task("build", gulp.series("sass"));
