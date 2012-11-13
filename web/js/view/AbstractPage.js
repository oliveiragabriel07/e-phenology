EP.view.AbstractPage = Backbone.View.extend({
    className: 'page-view',
    
    tagName: 'div',
    
    title: '',
    
    pageTpl: _.template([
        '<h3><%= title %></h3>',
        '<div class="body"></div>'
    ].join('')),
    
    render: function() {
        this.$el.html(this.pageTpl({
            title: this.title
        }));
        
        this.$body = this.$('.body');
        
        return this;
    }
});
