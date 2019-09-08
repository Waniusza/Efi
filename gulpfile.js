var gulp = require('gulp');
var gulpif = require('gulp-if');
var browerSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var del = require('del');
var uglify = require('gulp-uglify-es').default;

var useref = require('gulp-useref');


var config = {
    app: {
        base: './app',
        js: './app/assets/js/**/*.js',
        css: './app/assets/css/**/*.css',
        sass: './app/assets/sass/**/*.scss',
        data: ['./app/data/**/*.json']
    },
    dist: {
        base: './dist',
        data: './dist/data'
    }
}

gulp.task('clear', (done) => {
    del.sync(config.dist.base);
    done();
})

gulp.task('sass', (done) => {
    return gulp.src(config.app.sass)
        .pipe(sass())
        .pipe(gulp.dest(config.dist.base + "/css"))
        .pipe(browerSync.reload({
            stream: true
        }));
});

gulp.task('useref', () => {
    return gulp.src(config.app.base + '/index.html')
        .pipe(useref())
        .pipe(gulpif('*.css', cssnano()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest(config.dist.base));
});

gulp.task('moveData', () => {
    return gulp.src(config.app.data)
        .pipe(gulp.dest(config.dist.data));
})

gulp.task('watch', () => {
    gulp.watch(config.app.base + "/index.html", gulp.series("useref", "reload"));
    gulp.watch(config.app.css, gulp.series("useref", "reload"));
    gulp.watch(config.app.js, gulp.series("useref", "reload"));
    gulp.watch(config.app.data, gulp.series("moveData", "reload"));
})

gulp.task('serve', () => {
    browerSync.init({
        server: {
            baseDir: config.dist.base
        }
    })
})

gulp.task("reload", (done) => {
    browerSync.reload();
    done();
})

exports.dev = gulp.series("clear", gulp.parallel(["sass", "useref", "moveData"], "watch", "serve"));