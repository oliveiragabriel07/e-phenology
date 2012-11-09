EP.model.NavigationItem = Backbone.Model.extend({
    defaults : {
        icon: '',
        text: '',
        tag: '',
        active: false
    }
});

EP.collection.NavigationMenu = Backbone.Collection.extend({
   model: EP.model.NavigationItem 
});

EP.view.NavigationMenu = Backbone.View.extend({
    
    tagName: 'ul',
    
    className: 'nav nav-list',
    
    initialize: function() {
        this.collection = new EP.collection.NavigationMenu([
            {icon: 'icon-home', href:'#', text: 'Inicio', tag: 'home', active: false},
            {icon: 'icon-list-alt', href:'#data', text: 'Dados de coletas', tag: 'data', active: false},
            {icon: 'icon-leaf', href:'#individual', text: 'Individuos', tag: 'individual', active: false},
            {icon: 'icon-align-right', href:'#chart', text: 'Graficos', tag: 'chart', active: false},
            {icon: 'icon-user', href:'#user', text: 'Usuarios', tag: 'user', active: false},
            {icon: 'icon-calendar', href:'#agenda', text: 'Agenda', tag: 'agenda', active: false}
        ]);
    },
    
    render: function() {
        var el = this.$el;
        
        this.collection.each(function(model) {
            el.append((new EP.view.NavigationMenuItem({model: model})).render().$el);
        });
        
        return this;  
    },

// other methods
    setActiveItem: function(tag) {
        // clear selected item        
        var selected = this.collection.detect(function(model) {
           return model.get('active') === true; 
        });
        
        if (selected && selected.get('tag') === tag) {
            return;
        }
        selected && selected.set('active', false);
        
        // select new item
        selected = this.collection.find(function(model) {
           return model.get('tag') === tag; 
        });
        
        selected.set('active', true);
    }
});

EP.view.NavigationMenuItem = Backbone.View.extend({
    
    tagName: 'li',
    
    template: _.template('<a href="<%= href %>"><i class="<%= icon + (active ? " icon-white" : "")%>"></i> <%= text %> </a>'),
    
    initialize: function() {
        this.model.on('change:active', this.render, this);
    },
    
    render: function() {
        this.$el[this.model.get('active') ? 'addClass' : 'removeClass']('active');
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});