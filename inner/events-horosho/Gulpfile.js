var gulp = require('gulp'),
	less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	clean = require('gulp-clean'),
	watch = require('gulp-watch'),
	jade = require('gulp-jade'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
	newer = require('gulp-newer'),
	pngquant = require('imagemin-pngquant'),
	LessPluginAutoPrefix = require('less-plugin-autoprefix'),

	autoprefix = new LessPluginAutoPrefix({browsers: ["> 5%"]}),

	src = {
		css: '_src/less/**/*',
		less: '_src/less/style.less',
		js: '_src/js',
		img: '_src/img/**/*',
        jadePages: '_src/jade/pages/*.jade',
        jadeBlocks: '_src/jade/blocks/*.jade',
        jadeDataJson: './_src/jade/data.json'
    },
    dataJson = require(src.jadeDataJson);

gulp.task('less', function () {
    return gulp.src(src.less)
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('build/css'));
});

gulp.task('minCss', function () {
    return gulp.src('build/css/style.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('build/css'));
});

gulp.task('js', function() {
    return gulp.src(src.js)
        .pipe(newer('js/main.js'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/js'))
});

gulp.task('minJs', function() {
    return gulp.src('build/js/main.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('imagemin', function () {
    return gulp.src(src.img)
        .pipe(newer('build/img'))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build/img'));
});

gulp.task('jade', function() {
    gulp.src(src.jadePages)
        .pipe(jade({
            locals: dataJson,
            pretty: '\t'
        }))
        .pipe(gulp.dest('build/tpl'));

    gulp.src(src.jadeBlocks)
        .pipe(jade({
            locals: dataJson,
            pretty: '\t'
        }))
        .pipe(gulp.dest('build/tpl/blocks'));
});

gulp.task('clean', function() {
    return gulp.src(['build/css', 'build/img'], {read: false})
        .pipe(clean());
});

gulp.task('default', /*['clean'],*/ function(){
    gulp.start('jade', 'js', 'less', 'imagemin');
    gulp.watch(src.js, ['js']);
    gulp.watch(src.css, ['less']);
    gulp.watch(src.less, ['less']);
    gulp.watch([src.jadeBlocks, src.jadePages, src.jadeDataJson], ['jade']);
    gulp.watch(src.img, ['imagemin']);
});