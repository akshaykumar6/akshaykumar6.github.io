/**
 * @author: Akshay Sharma
 *
 * @since: 31/01/2015 @ 00:20:52
 * @file: main.js
 *
 *
 **/

/**
 * FILE DESCRIPTION
 *
 **/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        fullpage: {
            deps: ['jquery'],
            exports: 'fullpage'
        },
        Github: {
            deps: ['underscore'],
            exports: 'Github'
        }
    },
    paths: {
        jquery: '../com/vendor/jquery/dist/jquery',
        backbone: '../com/vendor/backbone/backbone',
        underscore: '../com/vendor/underscore/underscore',
        text: '../com/vendor/text/text',
        bootstrap: '../com/vendor/bootstrap/dist/js/bootstrap.min',
        nprogress: '../com/vendor/nprogress/nprogress',
        fullpage: '../com/vendor/fullpage/jquery.fullPage.min',
        github: '../com/vendor/githubjs/dist/github.min'
    }
});

require([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'nprogress',
    'routers/AppRouter'
], function($, _, Backbone, Bootstrap, NProgress, AppRouter) {

    $(document).ready(function() {
        NProgress.set(0.0);     // Sorta same as .start()
        window.app = new AppRouter();
        Backbone.history.start();

    });

});