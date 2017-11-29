const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const vueify = require("vueify");
const connect = require('gulp-connect');

gulp.task("sass", () => {
    return gulp
        .src("./app/assets/scss/**/*.scss")
        .pipe(sass({
            outputStyle: "compressed"
        }).on("error", sass.logError))
        .pipe(concat("styles.css"))
        .pipe(gulp.dest("./dist/css"));
});

gulp.task("babel-browserify-develop", () => {
    // browserify({
    //         entries: "./app/serviceWorkers/sw.js",
    //         debug: true
    //     })
    //     .transform(babelify)
    //     .bundle()
    //     .pipe(source("sw.js"))
    //     .pipe(buffer())
    //     .pipe(gulp.dest("./dist/js"));

    return browserify({
            entries: "./app/main.js",
            debug: true
        })
        .transform(vueify)
        .transform(babelify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(buffer())
        .pipe(gulp.dest("./dist/js"));
});

gulp.task("babel-browserify-prod", () => {
    // browserify({
    //         entries: "./app/serviceWorkers/sw.js",
    //         debug: false
    //     })
    //     .transform(babelify)
    //     .bundle()
    //     .pipe(source("sw.js"))
    //     .pipe(buffer())
    //     .pipe(uglify())
    //     .pipe(gulp.dest("./dist/js"));
    return browserify({
            entries: "./app/main.js",
            debug: false
        })
        .transform(vueify)
        .transform(babelify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"));
});

gulp.task("copy-files", () => {
    gulp.src("./app/index.html").pipe(gulp.dest("./dist/"));
    gulp.src("./app/assets/img/*").pipe(gulp.dest("./dist/img"));
    gulp.src("./node_modules/vuetify/dist/vuetify.min.css").pipe(gulp.dest("./dist/css"));
    gulp.src("./app/serviceWorkers/*").pipe(gulp.dest("./dist"));
    return gulp.src("./app/manifest.webmanifest").pipe(gulp.dest("./dist"));
});

gulp.task("run", ["build"], () => {
    connect.reload();
    connect.server({
        root: 'dist',
        livereload: true,
        port: 8000
    });
});

gulp.task("watch", () => {
    gulp.watch(
        ["./app/assets/scss/**/*.scss", "./app/**/*.js", "./app/**/*.vue", "./app/**/*.html"], ["build", "copy-files", "run"]
    );
});

gulp.task("build", ["sass", "babel-browserify-develop", "copy-files"]);

gulp.task("deploy", ["sass", "babel-browserify-prod", "copy-files"]);

gulp.task("default", ["build", "run", "watch"]);