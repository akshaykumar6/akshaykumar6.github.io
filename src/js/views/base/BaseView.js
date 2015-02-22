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
    'views/header/HeaderView',
    'text!templates/base/BaseTpl.tpl'
], function($, _, Backbone, HeaderView, BaseTpl) {
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
        }
    });

    return BaseView;
});