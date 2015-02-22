/**
 * @author: Akshay Sharma
 * @since: 31/01/2015@01:08:15
 * @file: BaseCollection.js
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
    'backbone',
    'models/base/BaseModel'
], function($, _, Backbone, BaseModel) {
    'use strict';

    var BaseCollection = Backbone.Collection.extend({
        model: BaseModel,

        url: ''
    });

    return BaseCollection;
});