var gulp = require('gulp')
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var spritesmith = require("gulp.spritesmith");
var gulpif = require("gulp-if");
var browserSync = require('browser-sync')
var reload = browserSync.reload;

function plumberError(error) {
    console.log(error.toString())
    this.emit('end')
}


/*
| SPRITESMITH tasks
|--------------------------------------------------------------------------
*/
gulp.task('spritesmith', function () {
    return gulp.src('./frontend/spritesmith/*.png')
        .pipe(spritesmith({
            imgName: 'spritesheet.png',
            cssName: '_tools.spritesheet.scss',
            imgPath: '../images/spritesheet.png',
            cssTemplate: 'node_modules/gulp.spritesmith/docs/handlebarsInheritance.scss.handlebars'
        }))
        .pipe(gulpif('spritesheet.png', gulp.dest('./dist/images/')))
        .pipe(gulpif('_tools.spritesheet.scss', gulp.dest('./frontend/sass/tools/')))
})

/*
| JS tasks
|--------------------------------------------------------------------------
*/
gulp.task('js-code', function() {
    return gulp.src('./frontend/js/*.js')
        .pipe(gulp.dest('./dist/js/'));
})

gulp.task('js-watch', function() {
    gulp.watch('./frontend/js/*.js', ['js-code', reload])
})

gulp.task('js', ['js-code', 'js-watch'])

/*
| PUG tasks
|--------------------------------------------------------------------------
*/
gulp.task('pug-code', function() {
    gulp.src('./frontend/pug/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream())
});

gulp.task('pug-watch', function() {
    gulp.watch('./frontend/pug/**/*.pug', ['pug-code', reload])
})

gulp.task('pug', ['pug-code', 'pug-watch'])

/*
| CSS tasks
|--------------------------------------------------------------------------
*/
gulp.task('sass-code', function() {
    return gulp.src('./frontend/sass/**/*.scss')
        .pipe(plumber({
            errorHandler: plumberError
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions']
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
});

gulp.task('sass-watch', function() {
    gulp.watch('./frontend/sass/**/*.scss', ['sass-code', reload])
})

gulp.task('sass', ['sass-code', 'sass-watch'])

/*
| Other tasks
|--------------------------------------------------------------------------
*/

gulp.task('serve', ['js', 'sass', 'pug'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    })
})
