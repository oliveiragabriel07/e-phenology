/*jslint nomen: true, plusplus: true, regexp: true, sloppy: true, vars: true, white: true, devel: true, maxlen: 150 */
/*global Backbone, EP*/

var GridView = Backbone.View.extend({
	/**
	 * @config: columns
	 * [{
	 *		title: {String},
	 *		index: {String},
	 *		sortable: {Boolean},
	 *		width: {String}
	 * }]
	 */
	columns: [],
	
	/*
	 * @config
	 */
	collection: undefined,
	
	infoText: '{0} - {1} de {2}',
	
	striped: false,
	
	bordered: false,
	
	condensed: false,
	
	hover: false,
	
	template: _.template([
		'<div class="row">',
			'<div class="info"></div>',
			'<div class="page-size">',
				'<label>Resultados por pagina</label>',
				'<select class="input-mini" name="pageSize">',
					'<% _.each(pageSizeOptions, function(opt) { %>',
						'<option value="<%= opt %>" <%= (opt === pageSize) ? "selected" : "" %> ><%= opt.toString() %></option>',
					'<% }); %>',
				'</select>',
			'</div>',
		'</div>',
		'<table class="table<%= tableCls %>">',
			'<thead></thead>',
			'<tbody></tbody>',
		'</table>',
		'<div class="row">',
			'<div class="pagination pagination-centered"></div>',
		'</div>'
	].join('')),
	
	tagName: 'div',
	
	className: 'form-inline table-wrapper',
	
	events: {
		'change select[name="pageSize"]': 'onPageSizeChange',
		'click th': 'onHeaderClick'
	},
	
	initialize: function() {
		if (!this.collection) {
			throw new Error('GridView - undefined collection');
		}
		
		if (!this.columns) {
			throw new Error('GridView - undefined columns config');
		}
		
		// setup pagination
		this.pages = new GridView.Pagination({model: this.collection.meta});
		
		// bind collection
		this.collection.on('reset', this.refresh, this);
		this.collection.on('add', this.refresh, this);
		this.pages.on('pageclick', this.onPageClick, this);
		
		this.tableCls = (this.striped ? ' table-striped' : '')
			+ (this.bordered ? ' table-bordered' : '')
			+ (this.condensed ? ' table-condensed' : '')
			+ (this.hover ? ' table-hover' : '');
	},
	
	render: function() {
		this.rows = [];
		
		this.$el.html(this.template({
			tableCls: this.tableCls,
			pageSizeOptions: this.collection.meta.get('pageSizeOptions'),
			pageSize: this.collection.meta.get('pageSize')
		}));
		
		this.$info = this.$('.info');
		this.$tHead = this.$('thead');
		this.$tBody = this.$('tbody');

		this.$('.pagination').html(this.pages.render().$el);
		this.renderHeader();		
		this.refresh();
		
		return this;
	},
	
	renderHeader: function() {
		var markup = $('<tr>'),
			sortField = this.collection.meta.get('sortField'),
			sortDir = this.collection.meta.get('sortDir'),
			el;
			
		_.each(this.columns, function(columnCfg) {
			el = $('<th>')
				.text(columnCfg.title || '')
				.addClass((columnCfg.sortable === false) ? '' : 
					(columnCfg.index === sortField) ? ('sorting_' + sortDir).toLowerCase() : 'sorting')
				.width(columnCfg.width || '');
			
			markup.append(el);
		});
		
		this.$tHead.html(markup);
	},	
	
	infoRender: function(start, end, total) {
		return $.format(this.infoText, start, end, total);
	},	
	
	/*
	 * render data rows
	 */
    
	refresh: function() {
		var self = this,
			meta = this.collection.meta,
			total = meta.get('total'),
			start = meta.get('start'),
			length = meta.get('length'),
			end, numPages, item;
		
		// update rows
		this.removeRows();
		this.collection.each(function(model) {
			item = new GridView.Item({
				columns: self.columns,
				model: model,
				tooltip: self.rowTip,
				grid: self
			});
			item.on('click', self.onItemClick, self);
			self.$tBody.append(item.render().$el);
			self.rows.push(item);
		});
		
		// update info
		this.$info.text(this.infoRender(
			(start + 1).toString(),
			Math.min((start + length), total).toString(),
			total
		));
		
		// update pagination
		this.pages.refresh();
		
		// update sorting
		this.renderHeader();
	},
	
	removeRows: function() {
		_.each(this.rows, function(item) {
			item.off();
			item.remove();
		});
		
		this.rows = [];
	},
	
// listeners
	onItemClick: function() {},
	
	onPageSizeChange: function(e) {
		var select = $(e.target),
			meta = this.collection.meta;
		
		meta.set({
			start: 0,
			length: parseInt(select.val(), 10)
		});
		this.collection.getPaginated();
	},
	
	onHeaderClick: function(e) {
		var $el = $(e.target),
			dir = $el.hasClass('sorting_desc') ? 'asc' : 'desc',
			meta = this.collection.meta,
			field = this.columns[$el.index()].index;
		
		meta.set({
			sortField: field,
			sortDir: dir
		});
		this.collection.getPaginated();
	},
	
	onPageClick: function(toPage) {
		var meta = this.collection.meta,
			length = meta.get('length'),
			start = (toPage - 1) * length;
		
		meta.set('start', start);
		this.collection.getPaginated();
	}
});

GridView.Item = Backbone.View.extend({
	tagName: 'tr',
	
	events: {
		'click': 'onClick'
	},
	
	initialize: function(cfg) {
		this.columns = cfg.columns;
		this.grid = cfg.grid;
		this.tooltip = cfg.tooltip;
		
		this.model.on('change', this.render, this);
	},
	
	render: function() {
		var self = this,
			m = this.model,
			text, renderer;
			
		this.$el.empty();
			
		_.each(this.columns, function(c) {
			renderer = c.renderer || self.defaultRenderer;
			text = renderer.call(self.grid, m.get(c.index), m, self);
			self.$el.append($('<td>').text(text));
		});
		
		if (this.tooltip) {
			this.$el.tooltip({
				title: this.tooltip,
				placement: 'bottom' 
			});
		}
		
		return this;
	},
	
	defaultRenderer: function(v, model, view) {
		return v;
	},
	
	onClick: function() {
		this.trigger('click', this, this.model);
	}
});

GridView.Pagination = Backbone.View.extend({
	tagName: 'ul',
	
	events: {
		'click li' : 'onPageClick'
	},
	
	initialize: function() {
		this.model.on('change:total', this.render, this);
		this.model.on('change:length', this.render, this);
	},
	
	render: function() {
		this.refresh();
		return this;
	},
	
	refresh: function() {
		var markup = $([]),
			total = this.model.get('total'),
			start = this.model.get('start'),
			length = this.model.get('length'),
			num = Math.ceil(total / length),
			active = Math.floor(start / length) + 1,
			i;
		
		this.activePage = active;
		if (total > 0) {
			markup = markup.add(
				$('<li>')
					.addClass('prev')
					.addClass(active === 1 ? 'disabled' : '')
					.append('<a href="#">&laquo;</a>')
			);
			
			for (i=1; i<=num; i++) {
				markup = markup.add(
					$('<li>')
						.addClass(i === active ? 'active' : '')
						.append('<a href="#">' + i.toString() + '</a>')
					);
			}
			
			markup = markup.add(
				$('<li>')
					.addClass('next')
					.addClass(active === num ? 'disabled' : '')
					.append('<a href="#">&raquo;</a>')
				);
			
			this.$el.html(markup);
		}
	},
	
// listeners
	onPageClick: function(e) {
		e.preventDefault();
		var $li = $(e.target).closest('li'),
			$link = $li.find('a'),
			toPage;
		
		if ($li.hasClass('disabled') || $li.hasClass('active')) {
			return;
		}
		
		if ($li.hasClass('prev')) {
			toPage = this.activePage - 1;
		} else if ($li.hasClass('next')) {
			toPage = this.activePage + 1;
		} else {
			toPage = parseInt($link.html(), 10);
		}
			
		if (!this.trigger('pageclick', toPage, this)){
			return;
		}
	}
	
});
