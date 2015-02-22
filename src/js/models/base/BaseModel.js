/**
 * @author: Akshay Sharma
 * @since: 31/01/2015@01:08:15
 * @file: BaseModel.js
 *
 *
 **/

/**
 * FILE DESCRIPTION
 *
 **/

define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    'use strict';

    var BaseModel = Backbone.Model.extend({
        urlRoot: '',

        initialize: function() {},

        defaults: {},

        validate: function(attrs, options) {},

        parse: function(response, options) {
            return response;
        }
    });

    return BaseModel;
});