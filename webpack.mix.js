const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.sass('resources/css/app.scss', 'public/css')
    .js('resources/js/app.js', 'public/js')
    .js('resources/js/mix/auth/login.js', 'public/js/auth')
    .js('resources/js/mix/absensi/absensi.js', 'public/js/absensi')
    .js('resources/js/mix/absensi/absensi-start.js', 'public/js/absensi');
