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
    'fullpage',
    'nprogress', 
    'views/base/BaseView',
    'models/base/BaseModel',
    ], function($, _, Backbone, fullpage, NProgress, BaseView, BaseModel) {

        var AppRouter = Backbone.Router.extend({

            initialize: function() {
                NProgress.set(0.4);
                $(window).resize(_.bind(function(){
                    // Reload page on resize
                    // window.location.href = window.location.origin + window.location.pathname;
                    this.redesign();
                },this));
            },

            routes: {
                '': 'initApp',
                'home': 'initApp',
                'about': 'initApp',
                'projects': 'initApp',
                'interests': 'initApp',
                'contact': 'initApp'
            },

            initApp: function() {

                if (!this.baseView) {
                    this.baseView = new BaseView({
                        model: new BaseModel()
                    });

                    $('#root').html(this.baseView.render().$el);

                    this.redesign();

                    NProgress.done();
                }

            },

            redesign: function (){
                
                var width = parseInt($(window).width()); 
                
                if (width>=768) {
                    console.log()
                    $('.wrapper').fullpage({
                        anchors: ['home', 'about', 'projects',  'interests', 'contact'],
                        menu: '.section-menu',
                        scrollingSpeed: 1000
                    });

                    if (Backbone.history.fragment != '') {
                        $.fn.fullpage.moveTo(Backbone.history.fragment, 0);
                    }

                    this.isFullPage = 1; 
                }
                else{
                    if (typeof this.isFullPage != 'undefined' && this.isFullPage == 1) {
                        $.fn.fullpage.destroy('all');
                    }
                }

            }
        });

return AppRouter;
});