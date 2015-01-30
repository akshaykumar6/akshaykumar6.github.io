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
    'text!templates/base/BaseTpl.tpl'
], function($, _, Backbone, BaseTpl) {
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
            return this;
        }
    });

    return BaseView;
});