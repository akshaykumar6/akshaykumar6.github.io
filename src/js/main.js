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
        }
    },
    paths: {
        jquery: '../com/vendor/jquery/dist/jquery',
        backbone: '../com/vendor/backbone/backbone',
        underscore: '../com/vendor/underscore/underscore',
        text: '../com/vendor/text/text'
    }
});

require([
    'jquery',
    'underscore',
    'backbone',
    'routers/AppRouter'
], function($, _, Backbone, AppRouter) {

    $(document).ready(function() {

        window.app = new AppRouter();
        Backbone.history.start();

    });

});