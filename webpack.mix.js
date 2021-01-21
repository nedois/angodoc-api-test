const mix = require("laravel-mix");

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

mix.setPublicPath("public")
    .setResourceRoot("../") // Turns assets paths in css relative to css file
    .options({
        processCssUrls: false
    })
    .webpackConfig({
        resolve: {
            extensions: [".js", ".jsx"],
            alias: {
                "@dashboard": __dirname + "/resources/js/dashboard"
            }
        }
    })
    .react("resources/js/frontend/app.js", "js/frontend.js")
    .react("resources/js/dashboard/dashboard.js", "js/dashboard.js")
    .extract([
        // Extract packages from node_modules to vendor.js
        "jquery",
        "bootstrap",
        "popper.js",
        "axios",
        "sweetalert2",
        "lodash"
    ])
    .sass("resources/sass/frontend/app.scss", "css/frontend.css")
    .sourceMaps();

if (mix.inProduction()) {
    mix.version().options({
        // Optimize JS minification process
        terser: {
            cache: true,
            parallel: true,
            sourceMap: true
        }
    });
} else {
    // Uses inline source-maps on development
    mix.webpackConfig({
        devtool: "inline-source-map"
    });
}
