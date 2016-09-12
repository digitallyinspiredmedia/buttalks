var gulp = require('gulp'), // init
     // uglify = require('gulp-uglify'), // min - js
      uglifycss = require('gulp-uglifycss'), // min - css
      less = require('gulp-less'), // less - css
      plumber = require('gulp-plumber'), // plumber - error log
      concat = require('gulp-concat'), // concat - connect all file into one
      sourcemaps = require('gulp-sourcemaps'), // sourcemaps generater
      autoprefixer = require('gulp-autoprefixer'), // add pre-fix for all browser [  look on versions  and  implementation ]
      browserSync = require('browser-sync'),
      critical = require('critical');

// browser-sync task for starting the server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

     // //watch files
     //  var files = [
     //  './index.php'
     //  ];
     //  //initialize browsersync
     //  browserSync.init(files, {
     //  //browsersync with a php server
     //  proxy: "127.0.0.1/kavinraj/",
     //  notify: true
     //  });
});

gulp.task('css',function(){
  gulp.src('css/*.css')
  .pipe(sourcemaps.init())
  .pipe(uglifycss({
      "uglyComments": true
  }))
  .pipe(autoprefixer({
     browsers: ['last 2 versions'],
     cascade: false
  }))
  .pipe(plumber())
  .pipe(concat('all.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.reload({stream: true})); // prompts a reload after compilation
    console.log('Uglify CSS fucked from MANUAL ');
});

gulp.task('watch', ['browser-sync', 'css'], function(){
   console.log('Browser Sync fucked off MANUAL RELOAD');
  gulp.watch("css/*.css", ['css']);
  //gulp.watch("js/*.js" , ['uglify']);
  gulp.watch("*.html").on('change', browserSync.reload);
  // Other watchers
});

gulp.task('critical', function (cb) {
    critical.generate({
        inline: true,
        base: '.',
        src: 'index.html',
        dest: 'index-critical.php',
        minify: true,
        width: 320,
        height: 480
    });
});

gulp.task('default', ['watch'],function(){
  console.log('FUCK OFF KAVINRAJ');
});
