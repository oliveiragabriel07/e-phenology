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
        'individual/:id' : 'individualDetails',
        'chart' : 'showCharts',
        'user' : 'userList',
        'user/:id': 'userDetails',
        'agenda' : 'showAgenda'
    },

    initialize:function () {
        this.userModel = new EP.model.User(EP.BootstrapData);
        
        
        // get elements
        this.navEl = $('.side-menu');
        this.mainEl = $('.main-content');
        this.headerEl = $('.header');
        
        // setup app header
        this.header = new EP.view.Header({model: this.userModel});
        this.headerEl.html(this.header.render().$el);
        
        // setup navigation menu
        this.navMenu = new EP.view.NavigationMenu();
        this.navEl.html(this.navMenu.render().$el);
    },
    
    home: function() {
        this.navMenu.setActiveItem('home');
        
        var homeView = new EP.view.Home();
        this.mainEl.html(homeView.render().$el);
    },
    
    dataList: function() {
        // activate menu
        this.navMenu.setActiveItem('data');
        
        var phenophaseDataView = new EP.view.PhenophaseData();
        this.mainEl.html(phenophaseDataView.render().$el);
    },
    
    individualList: function() {
        this.navMenu.setActiveItem('individual');
        
        var individualView = new EP.view.Individual();
        this.mainEl.html(individualView.render().$el);
    },
    
    individualDetails: function() {
        this.navMenu.setActiveItem('individual');
    },  
    
    showCharts: function() {
        this.navMenu.setActiveItem('chart');
        
        var chartView = new EP.view.Chart();
        this.mainEl.html(chartView.render().$el);
    },
    
    userList: function() {
        this.navMenu.setActiveItem('user');
        
        var userView = new EP.view.User();
        this.mainEl.html(userView.render().$el);
    },
    
    userDetails: function() {
        this.navMenu.setActiveItem('user');
    },
    
    showAgenda: function() {
        this.navMenu.setActiveItem('agenda');
        
         var agendaView = new EP.view.Agenda();
        this.mainEl.html(agendaView.render().$el);       
    }
});
    