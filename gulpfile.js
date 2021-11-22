const { src, dest, watch, series } = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function copyHtml() {
    return src('src/*.html')
        .pipe(dest('dist'));
}

function copyFonts() {
    return src('src/assets/fonts/*.ttf')
        .pipe(dest('dist/assets/fonts'));
}

function buildStyles() {
    return src('src/assets/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('dist/assets/css'))
        .pipe(browserSync.stream());
};

function jsBundle() {
    return src('src/assets/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser({
            toplevel: true
        }))
        .pipe(concat('index.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('dist/assets/js'));
}

function optimizeImg() {
    return src('src/assets/images/*')
        .pipe(imagemin())
        .pipe(dest('dist/assets/images'));
}

function watchTask() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
    watch('src/*.html', copyHtml).on('change', browserSync.reload);
    watch('src/assets/fonts/*.ttf', copyFonts);
    watch('src/assets/scss/*.scss', buildStyles);
    watch('src/assets/js/*.js', jsBundle).on('change', browserSync.reload);
}

exports.default = series(
    copyHtml,
    copyFonts,
    buildStyles,
    jsBundle,
    optimizeImg,
    watchTask
);