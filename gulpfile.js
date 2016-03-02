var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence'),
    paths = {
        styles: {
            src: 'source/scss/**/*.scss',
            dest: 'www/css'
        },
        scripts: {
            src: 'source/js/**/*.js',
            dest: 'www/js'
        },
        images: {
            src: 'source/images/**/*.+(png|jpg|jpeg|gif|svg)',
            dest: 'www/images'
        },
        html: {
            src: 'source/**/*.html',
            dest: 'www/**/*.html'
        },
        fonts: {
            src: 'source/fonts/**/*',
            dest: 'www/fonts/**/*'
        },
        src: "source/",
        dest: "www/"
    };


// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'source'
        }
    })
})

// Sass
gulp.task('styles', function() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts.src)
        .pipe(jshint())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(paths.scripts.dest))
});

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function() {

    return gulp.src(paths.html.src)
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest(paths.dest));
});

// Copying html 
gulp.task('html', function() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
})

// Optimizing Images 
gulp.task('images', function() {
    return gulp.src(paths.images.src)
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true,
        })))
        .pipe(gulp.dest(paths.images.dest))
});

// Copying fonts 
gulp.task('fonts', function() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
})

// Cleaning 
gulp.task('clean', function() {
    return del.sync(paths.dest).then(function(cb) {
        return cache.clearAll(cb);
    });
})

gulp.task('clean:dest', function() {
    return del.sync([paths.dest + '/**/*', !(paths.dest + '/images'), !(paths.dest + '/images/**/*')]);
});

// Watchers
gulp.task('watch', function() {
    gulp.watch(paths.styles.src, ['styles']);
    gulp.watch(paths.html.src, browserSync.reload);
    gulp.watch(paths.scripts.src, browserSync.reload);
})

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
    runSequence(['styles', 'browserSync', 'watch'],
        callback
    )
})

gulp.task('build', function(callback) {
    runSequence(
        'clean:dest', ['sass', 'useref', 'images', 'fonts'],
        callback
    )
})
