/**
 * @author: Akshay Sharma
 * @since: 31/01/2015@01:00:10
 * @file: AppRouter.js
 *
 **/


/**
 * Application routes are registered here
 **/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/base/BaseView',
    'models/base/BaseModel',
], function($, _, Backbone, BaseView, BaseModel) {

    var AppRouter = Backbone.Router.extend({

        initialize: function() {

            // _.bindAll(this,'');

        },

        routes: {
            '': 'initApp'
        },

        initApp: function() {

            this.baseView = new BaseView({
                model: new BaseModel()
            });

            $('#root').html(this.baseView.render().$el);
        }
    });

    return AppRouter;
});