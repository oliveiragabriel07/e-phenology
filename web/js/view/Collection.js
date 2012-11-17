/*jslint nomen: true, plusplus: true, regexp: true, sloppy: true, vars: true, white: true, devel: true, maxlen: 150 */
/*global Backbone, EP*/
EP.view.Collection = EP.view.AbstractPage.extend({
    title: 'Dados de coletas',
    
    render: function() {
        EP.view.AbstractPage.prototype.render.apply(this, arguments);
        
        this.table = new EP.view.Collection.Table();
        this.$body.html(this.table.render().$el);
        // this.table.enhanceElements();
        
        return this;
    }
    
});

EP.view.Collection.Table = GridView.extend({
	
    initialize: function() {
		this.editing = null;
		this.collection = new EP.collection.Collection(undefined, {
			metaData: {
				sortField: 'date',
				sortDir: 'desc'
			}
		});
		this.collection.getPaginated();
		
		this.columns = [
			{ index: 'date', title: 'Data', width: '13%', renderer: this.dateRenderer },
            { index: 'individual', title: 'Individuo', width: '25%' },
            { index: 'flowerBud', title: 'Botão', width: '10%' },
            { index: 'anthesis', title: 'Antese', width: '10%' },
            { index: 'ripe', title: 'Imaturo', width: '10%' },
            { index: 'unripe', title: 'Maduro', width: '10%' },
            { index: 'budding', title: 'Brotamento', width: '12%' },
            { index: 'fall', title: 'Queda', width: '10%' }
        ];
        this.hover = true;
        this.rowTip = 'Clique para editar';
        
		GridView.prototype.initialize.apply(this, arguments);
    },
    
    onItemClick: function(view, model) {
		var self = this,
			itemEl;
		
		if (this.editing) {
			this.editing.$el.slideUp('slow', function() {
				$('tr.details', self.$tBody).remove();
			});
		}
		
		if (this.editing && this.editing.view === view) {
			this.editing = null;
			return;
		}
		
		this.editing = new EP.view.Collection.Table.ItemEdit({ model: model});
		this.editing.view = view;
		
		itemEl = this.editing.render().$el;
		
		view.$el.after($('<tr>')
			.addClass('details')
			.html($('<td>')
				.attr('colspan', this.columns.length)
				.html(itemEl)
			)
		);
		
		itemEl.slideDown();
    },
    
	onMetaChange: function() {
		$('tr.details', this.$tBody).remove();
		this.editing = null;
		this.collection.getPaginated();
	},
	
    dateRenderer: function(v) {
        return v.toString('dd/MM/yyyy');
    }
});

EP.view.Collection.Table.ItemEdit = Backbone.View.extend({
	tagName: 'div',
	
	className: 'details-wrapper',
	
	render: function() {
		this.$el.html('Detalhes do item ' + this.model.get('id'));
		this.$el
			.css('display', 'none')
			.css('padding', 20)
			.css('background-color', '#aaaaaa');
			
		return this;
	}
});

EP.model.MetaData = Backbone.Model.extend({
    defaults: {
        start: 0,
        length: 10,
        total: 0,
        sortField: '',
        sortDir: '',
        pageSizeOptions: [10, 25, 50, 100]
    }
});

var PaginatedCollection = Backbone.Collection.extend({
    parse: function(response) {
        this.meta.set('total', response.totalRows);
        return response.data;
    },
    
    initialize: function(models, options) {
		metaData = options.metaData || {};
        this.meta = new EP.model.MetaData(metaData);
    },
    
    getPaginated: function(options) {
        options = options ? _.clone(options) : {};
        options.parse = true;

        var collection = this;
        var success = options.success;
        options.success = function(resp, status, xhr) {
            collection.reset(collection.parse(resp, xhr), options);
            collection.total = collection.size();
            if (success) {
                success(collection, resp);                
            }
        };
        options.error = Backbone.wrapError(options.error, collection, options);
        
        // Default JSON-request options.
        var params = {
            url: this.url,
            type: 'GET',
            dataType: 'json',
            data: this.meta.toJSON()
        };
        
        return $.ajax(_.extend(params, options));
    }
});

EP.model.Collection = Backbone.Model.extend({
    
    parse: function(response) {
        response.individual = response.individualId + ' - ' + response.species;
        response.date = Date.parse(response.date);
        return response;
    }
});

EP.collection.Collection = PaginatedCollection.extend({
	    url: '../phenophase/search',
    
    model: EP.model.Collection
});