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
        'data' : 'dataList',
        'individual' : 'individualList',
        'individual:id' : 'individualDetails',
        'chart' : 'showCharts',
        'user' : 'userList',
        'user/:id': 'userDetails',
        'agenda' : 'showAgenda'
    },

    initialize:function () {
        this.navMenu = new EP.view.NavigationMenu();
        $('.side-menu').html(this.navMenu.render().$el);
    },
    
    home: function() {
        this.navMenu.setActiveItem('home');
    },
    
    dataList: function() {
        this.navMenu.setActiveItem('data');
    },
    
    individualList: function() {
        this.navMenu.setActiveItem('individual');
    },
    
    individualDetails: function() {
        this.navMenu.setActiveItem('individual');
    },  
    
    showCharts: function() {
        this.navMenu.setActiveItem('chart');
    },
    
    userList: function() {
        this.navMenu.setActiveItem('user');
    },
    
    userDetails: function() {
        this.navMenu.setActiveItem('user');
    },
    
    showAgenda: function() {
        this.navMenu.setActiveItem('agenda');
    }
});
    