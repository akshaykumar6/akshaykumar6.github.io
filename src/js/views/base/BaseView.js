/**
 * @author: Akshay Sharma
 * @since: 31/01/2015@01:00:10
 * @file: BaseView.js
 *
 **/

/**
 * FILE DESCRIPTION
 *
 **/

define([
    'jquery',
    'underscore',
    'backbone',
    'github',
    'views/header/HeaderView',
    'text!templates/base/BaseTpl.tpl'
], function($, _, Backbone, Github, HeaderView, BaseTpl) {
    'use strict';

    var BaseView = Backbone.View.extend({
        template: _.template(BaseTpl),

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function(options) {
            this.vars = options;
            _.bindAll(this, 'render');
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            this.headerView = new HeaderView();
            this.$('.header-cnt').html(this.headerView.render().$el);
            
            return this;
        },

        renderGithubWidgets: function () {
            var a = ['b','5','9','d','3','d','7','c','5','2','6'], b = ['f','c','6','6','6','a','6','2','2',], c = ['4','e','b','4','9','6','b','5','2','6',], d= ['8','9','e','0','d','3','d','5','b','3']; var str = a.join('') + b.join('') + c.join('') + d.join(''); Github.userActivity({
              username: "akshaykumar6",
              OAuth: str,
              selector: ".github-profile"
            });

            Github.repoProfile({
              username: 'akshaykumar6',
              OAuth: str,
              reponame: 'github-js',
              selector: '.repo-1-profile'
            });

            Github.repoProfile({
              username: 'akshaykumar6',
              OAuth: str,
              reponame: 'akshaykumar6.github.io',
              selector: '.repo-2-profile'
            });
        }
    });

    return BaseView;
});