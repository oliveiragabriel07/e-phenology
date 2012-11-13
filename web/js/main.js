/*global EP, Backbone */
jQuery(function($) {
    'use strict';
    
    EP.app = new EP.AppRouter();
    Backbone.history.start();
}); 