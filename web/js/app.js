/*
 * EP namespace
 */

var EP = {};

EP.view = {};
EP.model = {};
EP.collection = {};
EP.BLANK_IMAGE = '../web/img/blank.gif';
EP.emptyFn = function() {};

EP.AppRouter = Backbone.Router.extend({
    routes:{
        '': 'home',
        'user' : 'userList',
        'user/:userId': 'userDetails'
    },

    initialize:function () {
    },
    
    home: function() {
    }
});
    