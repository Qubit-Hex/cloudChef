'use strict'

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


// declare all bundles we will creating for our whole application 



mix.js('resources/js/app.js', 'public/js/app.js').react().sass('resources/sass/app.scss', 'public/css/app.css');