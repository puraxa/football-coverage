var gulp = require('gulp');
var uglify = require('gulp-uglify-es').default;
var htmlMinify = require('gulp-html-minifier2');
var cleancss = require('gulp-clean-css');


gulp.task('uglify',async function (){
    gulp.src('app/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('htmlMinify', async function(){
    gulp.src('app/**/*.html')
        .pipe(htmlMinify({collapseWhitespace: true}))
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

gulp.task('default', gulp.parallel(['uglify', 'htmlMinify', 'cleancss', 'move']));
