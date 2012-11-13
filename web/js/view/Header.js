/*global Backbone, MPG, JST, $*/
(function() {
    'use strict';
    
    EP.view.Header = Backbone.View.extend({
        template: _.template([
                '<h1 class="logo"><a href="#" title="e-phenology">e-phenology</a></h1>',
                '<ul class="pull-right action-bar">',
                    '<li class="dropdown">',
                        '<a href="#" class="btn dropdown-toggle" data-toggle="dropdown">',
                            '<%= name %>',
                            '<span class="caret"></span>',
                        '</a>',
                        
                        '<ul class="dropdown-menu pull-right" role="menu">',
                            '<li><a tabindex="-1" href="#">perfil (em breve)</a></li>',
                            '<li><a tabindex="-1" href="/login/logout">sair</a></li>',
                        '</ul>',
                    '</li>',
                '</ul>'
        ].join('')),
        
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
        
    });    
}());
