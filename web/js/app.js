/*
 * EP namespace
 */

var EP = {};

EP.view = {};
EP.model = {};
EP.collection = {};
EP.BLANK_IMAGE = '../web/img/blank.gif';
EP.emptyFn = function() {};
EP.PagesBugger = (function(size) {
	var buff = {
		size: 0
	};
	
	var discart = function discart() {
		var r, k, i = size;
		
		for (k in buff) {
			if (buff.hasOwnProperty(k)) {
				if (buff[k][1] <= i) {
					r = k;
					i = buff[k][1];
				}
			}
		}
		
		delete buff[k];
	}
	
	return {
		add: function(key, value) {
			if (!buff.hasOwnProperty(key)) {
				buff.size++;
			}
			
			if (buff.size > size) {
				discart();
			}
			
			buff[key] = [value, size];
		},
		
		get: function(key) {
			if (!buff[key]) {
				return;
			}
			
			var k;
			for (k in buff) {
				if (buff.hasOwnProperty(k)) {
					buff[k][1]--;
				}
			}
			
			buff[key][1] = size;
			
			return buff[key][0];
		}
	}
}(10));

EP.AppRouter = Backbone.Router.extend({
    routes:{
        '': 'home',
        'collection' : 'collectionList',
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
    
    collectionList: function() {
        // activate menu
        this.navMenu.setActiveItem('data');
        
		var collectionView = new EP.view.Collection();
        this.mainEl.html(collectionView.render().$el);
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
    