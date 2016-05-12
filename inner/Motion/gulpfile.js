var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    browserSync = require('browser-sync'),
    del = require('del'),
    csscomb = require('gulp-csscomb');

gulp.task('styles', function() {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(csscomb())
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream: true}))
    //.pipe(notify({ message: 'Styles task complete' }));
});    

gulp.task('scripts', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    //.pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img'))
    //.pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
    return del(['dist/css', 'dist/js', 'dist/img']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', ['sync', 'styles'], function() {
  gulp.watch('app/sass/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('app/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('app/images/**/*', ['images']);

  // Наблюдение за HTML файлами в корне проекта
  //gulp.watch('app/*.html', browserSync.reload); 

  //gulp.watch('dist/**/*.css', browserSync.reload); 

  // Наблюдение за JS файлами в папке js  
  //gulp.watch('app/scripts/**/*.js', browserSync.reload); 

  gulp.watch('dist/**', browserSync.reload);   

  // Create LiveReload server
  //livereload.listen();

  // Watch any files in dist/, reload on change
  //gulp.watch(['dist/**']).on('change', livereload.changed);

});

gulp.task('sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'dist' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

