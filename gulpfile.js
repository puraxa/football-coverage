var gulp = require('gulp');
var uglify = require('gulp-uglify-es').default;
var htmlMinify = require('gulp-html-minifier2');
var cleancss = require('gulp-clean-css');
var builder = require('gulp-module-builder');
var replace = require('gulp-replace');


gulp.task('htmlMinify', async function(){
    gulp.src('app/**/*.html')
        .pipe(htmlMinify({collapseWhitespace: true}))
        .pipe(replace(/type="module"/gi,""))
        .pipe(gulp.dest('dist'));
});

gulp.task('cleancss', async function(){
    gulp.src('app/**/*.css')
        .pipe(cleancss())
        .pipe(gulp.dest('dist'));
});

gulp.task('move', async function(){
    gulp.src('app/*.png')
        .pipe(gulp.dest('dist'));
})

gulp.task('build', async function(){
    gulp.src('./modules.json')
        .pipe(builder())
        .pipe(replace(/.*\b(import|export {|window).*|export /gi,""))
        .pipe(gulp.dest('dist/scripts'))
})

gulp.task('default', gulp.parallel(['htmlMinify', 'cleancss', 'move', 'build']));
