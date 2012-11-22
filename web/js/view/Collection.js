/*jslint nomen: true, plusplus: true, regexp: true, sloppy: true, vars: true, white: true, devel: true, maxlen: 150 */
/*global Backbone, EP*/
EP.view.Collection = EP.view.AbstractPage.extend({
    title: 'Dados de coletas',
    
	barTpl: [
		'<div class="row">',
			'<div class="btn-group">',
				'<button id="new" class="btn"><i rel="tooltip" title="Novo registro" class="icon-plus"></i></button>',
				'<button id="import" class="btn"><i rel="tooltip" title="Importar planilha" class="icon-import"></i></button>',
				'<button id="download" class="btn"><i rel="tooltip" title="Exportar planilha" class="icon-download-alt"></i></button>',
			'</div>',
		'</div>'
	].join(''),
	
	events: {
		'click #new' : 'onBtnNewClick'
	},
	
	initialize: function() {
        this.collection = new EP.collection.Collection(undefined, {
            metaData: {
                sortField: 'date',
                sortDir: 'desc'
            }
        });
        
        this.collection.getPaginated();
        this.table = new EP.view.Collection.Table({collection: this.collection});	    
	},
	
    render: function() {
        EP.view.AbstractPage.prototype.render.apply(this, arguments);
        
        this.$body.empty();
        this.$body.append(this.barTpl);
        this.$body.append(this.table.render().$el);
        $('*[rel="tooltip"]', this.$el).tooltip();
        
        return this;
    },

// listeners
	onBtnNewClick: function(e) {
        var btn = $(e.target),
            self = this, form;
		
		btn.tooltip('hide');
		
		form = new EP.view.Collection.FormNew();
		form.on('add', this.onAddModel, this);
		
		$.fancybox({
		    content: form.render().$el,
		    modal: true,
		    autoSize: false,
		    height: 'auto',
		    width: '500',
		    tpl: {
		        wrap: [
		          '<div class="fancybox-wrap span7" tabIndex="-1">',
		              '<form>',
		                  '<div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div>',
	                  '</form>',
                  '</div>'
              ].join('')
		    },
		    beforeShow: function() {
		        this.title = form.buttonsTpl;
		    },
            afterShow: function() {
                $('#save', this.wrap).on('click', form.onBtnSaveClick);
                $('#cancel', this.wrap).on('click', form.onBtnCancelClick);
            },
            beforeClose: function() {
                form.off();
                $('#save', this.wrap).off();
                $('#cancel', this.wrap).off();
            },
            helpers : {
                title : {
                    type: 'inside'
                }
            }
		});
	},
	
	onAddModel: function(m) {
	    this.collection.meta.set('start', 0);
	    this.collection.getPaginated();
	    $.fancybox.close();
	}
});

EP.view.Collection.FormNew = Backbone.View.extend({
    template: _.template([
        '<h3>Novo registro</h3>',
        '<div class="span3" style="margin-right: 20px;">',
            '<div class="image-wrapper">',
                // '<input type="file" />',
                '<img class="image" />',
                '',
            '</div>',
        '</div>',
        
        '<div class="control-group span3">',
            '<div class="controls">',
                '<input type="text" placeholder="Indivíduo" id="individual" name="individual" class="input-block-level" />',
            '</div>',
        '</div>',
        
        '<div class="control-group span3">',
            '<div class="controls control-composite controls-row">',
                '<div class="span1" style="margin-right: 5px;">',
                    '<span class="hint">Dia</span>',
                    '<select id="day" name="day" class="input-block-level">',
                        '<% _.each(days, function(d) { %>',
                            '<option value="<%= d %>" <%= (d === today.getDate()) ? "selected" : "" %> ><%= d.toString() %></option>',
                        '<% })%>',                
                    '</select>',
                '</div>',
                '<div class="span1" style="margin-right: 5px;">',
                    '<span class="hint">Mês</span>',
                    '<select id="month" name="month" class="input-block-level">',
                        '<% _.each(months, function(m) { %>',
                            '<option value="<%= m %>" <%= (m === today.getMonth() + 1) ? "selected" : "" %> ><%= m.toString() %></option>',
                        '<% })%>',
                    '</select>',
                '</div>',
                '<div class="span1">',
                    '<span class="hint">Ano</span>',                
                    '<select id="year" name="year" class="input-block-level">',
                        '<% _.each(years, function(y) { %>',
                            '<option value="<%= y %>" <%= (y === today.getFullYear()) ? "selected" : "" %> ><%= y.toString() %></option>',
                        '<% })%>',
                    '</select>',
                '</div>',
            '</div>',
        '</div>',
        
        '<div class="control-group span3">',
            '<div class="controls">',
                '<textarea rows="3" placeholder="Observações" id="remark" name="remark" data-error-style="tooltip" class="input-block-level"></textarea>',
            '</div>',
        '</div>',
        '<div class="clearfix"></div>',
        
        '<div>',
            '<p class="form-section">Fenofases</p>',
            '<div class="span2">',
                '<div class="control-group">',
                    '<label class="control-label" for="flowerBud">Botao</label>',
                    '<div class="controls">',
                        '<input type="text" id="flowerBud" name="flowerBud" data-error-style="tooltip" class="input-block-level" value="<%= flowerBud %>" />',
                    '</div>',
                '</div>',
                '<div class="control-group">',
                    '<label class="control-label" for="anthesis">Antese</label>',
                    '<div class="controls">',
                        '<input type="text" id="anthesis" name="anthesis" data-error-style="tooltip" class="input-block-level" value="<%= anthesis %>" />',
                    '</div>',
                '</div>',
            '</div>',
            '<div class="span2">',
                '<div class="control-group">',
                    '<label class="control-label" for="unripe">Imaturo</label>',
                    '<div class="controls">',
                        '<input type="text" id="unripe" name="unripe" data-error-style="tooltip" class="input-block-level" value="<%= unripe %>" />',
                    '</div>',
                '</div>',
                '<div class="control-group">',
                    '<label class="control-label" for="ripe">Maduro</label>',
                    '<div class="controls">',
                        '<input type="text" id="ripe" name="ripe" data-error-style="tooltip" class="input-block-level" value="<%= ripe %>" />',
                    '</div>',
                '</div>',
            '</div>',
            '<div class="span2">',
                '<div class="control-group">',
                    '<label class="control-label" for="budding">Brotamento</label>',
                    '<div class="controls">',
                        '<input type="text" id="budding" name="budding" data-error-style="tooltip" data-tooltip-position="left" class="input-block-level" value="<%= budding %>" />',
                    '</div>',
                '</div>',
                '<div class="control-group">',
                    '<label class="control-label" for="fall">Queda</label>',
                    '<div class="controls">',
                        '<input type="text" id="fall" name="fall" data-error-style="tooltip" data-tooltip-position="left" class="input-block-level" value="<%= fall %>" />',
                    '</div>',
                '</div>',                                   
            '</div>',
        '</div>',
    ].join('')),
    
    buttonsTpl: [
       '<div class="form-actions">',
            '<button type="submit" id="save" class="btn btn-primary" style="margin-right: 8px;">Salvar</button>',
            '<button type="button" id="cancel" class="btn">Cancelar</button>',
        '</div>'
    ].join(''),
    
    className: 'form-register',
    
    events: {
        'blur input': 'preValidate'  
    },
    
    initialize: function() {
        _.bindAll(this, 'onBtnSaveClick', 'onBtnCancelClick');
        this.model = new EP.model.Collection();
    },
    
    render: function() {
        Backbone.Validation.bind(this);
        
        var today = new Date(),
            data = {}, i;
        
        data.today = today;
        data.years = [];
        data.months = [];
        data.days = [];
            
        for (i = 0; i < 10; i++) {
            data.years.push(today.getFullYear() - i);
        }
        
        for (i = 1; i <= 12; i++) {
            data.months.push(i);
        }
        
        for (i = 1; i <= 31; i++) {
            data.days.push(i);
        }
        
        data = _.extend(data, this.model.toJSON());
        this.$el.html(this.template(data));
        
        return this;
    },
    
// listeners
    onBtnSaveClick: function(e) {
        e.preventDefault();
        var self = this,
            values = this.getValues();
            
        var options = {
            wait: true,
            success: function(model, response) {
                self.trigger('add', this.model, this);
            }
        };
        
        // checks for changes
        if (!this.model.changedAttributes(values)) {
            return;
        }
        
        // validates and saves model
        if (!this.model.save(values, options)){
            return;
        }
    },
    
    onBtnCancelClick: function(e) {
        $.fancybox.close();
    },
    
// other methods
    preValidate: function(e) {
        var target = $(e.target),
            opt = Backbone.Validation.callbacks,
            error;
        
        error = this.model.preValidate(target.attr('name'), target.val(), true);
        
        if (error) {
            opt.invalid(this, target.attr('name'), error, 'name');
        } else {
            opt.valid(this, target.attr('name'), 'name');
        }
        
        return error;
    },
    
    getValues: function() {
        var form = this.$el.closest('form'),
            valuesArray = form.serializeArray(),
            values = {};
            
        _.each(valuesArray, function(v) {
            values[v.name] = v.value;
        });
        
        values.date = $.format('{0}-{1}-{2}', values.year, values.month, values.day);
        return values;
    }
    
});

EP.view.Collection.Table = GridView.extend({
	
    initialize: function() {
		this.editing = null;
		this.columns = [
			{ index: 'date', title: 'Data', width: '13%', renderer: this.dateRenderer },
            { index: 'individual', title: 'Individuo', width: '25%', renderer: this.individualRenderer },
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
		
		this.collection.on('beforeload', this.onBeforeLoad, this);
    },
    
    onItemClick: function(view, model) {
		var self = this;
		
		if (view.isEditing) {
			this.editing.close(true);
			this.editing = null;
			return;
		}
		
		if (this.editing) {
			this.editing.close(true);
		}
		
		this.editing = new EP.view.Collection.Table.EditItem({
			model: model,
			view: view
		});
		
		view.isEditing = true; 
		view.$el.after($('<tr>')
			.addClass('details')
			.html($('<td>')
				.attr('colspan', this.columns.length)
				.html(this.editing.render().$el)
			)
		);
		
		this.editing.open();
    },
    
	onBeforeLoad: function() {
		$('tr.details', this.$tBody).remove();
		this.editing = null;
	},
	
	individualRenderer: function(v, m) {
		return v + ' - ' + m.get('species');
	},
	
    dateRenderer: function(v) {
        return v.toString('dd/MM/yyyy');
    }
});

EP.view.Collection.Table.EditItem = Backbone.View.extend({
	tagName: 'div',
	
	className: 'details-wrapper span12', 
	
	template: _.template([
		'<div class="span4">',
		'</div>',
		'<form class="form-details span8">',
			'<div class="span4 form-column">',
				'<div class="control-group">',
					'<label class="control-label" for="flowerBud">Botao</label>',
					'<div class="controls">',
						'<input type="text" id="flowerBud" name="flowerBud" data-error-style="tooltip" class="input-block-level" value="<%= flowerBud %>" />',
					'</div>',
				'</div>',
				'<div class="control-group">',
					'<label class="control-label" for="anthesis">Antese</label>',
					'<div class="controls">',
						'<input type="text" id="anthesis" name="anthesis" data-error-style="tooltip" class="input-block-level" value="<%= anthesis %>" />',
					'</div>',
				'</div>',
			'</div>',
			'<div class="span4 form-column">',
				'<div class="control-group">',
					'<label class="control-label" for="unripe">Imaturo</label>',
					'<div class="controls">',
						'<input type="text" id="unripe" name="unripe" data-error-style="tooltip" class="input-block-level" value="<%= unripe %>" />',
					'</div>',
				'</div>',
				'<div class="control-group">',
					'<label class="control-label" for="ripe">Maduro</label>',
					'<div class="controls">',
						'<input type="text" id="ripe" name="ripe" data-error-style="tooltip" class="input-block-level" value="<%= ripe %>" />',
					'</div>',
				'</div>',
			'</div>',
			'<div class="span4 form-column">',
				'<div class="control-group">',
					'<label class="control-label" for="budding">Brotamento</label>',
					'<div class="controls">',
						'<input type="text" id="budding" name="budding" data-error-style="tooltip" data-tooltip-position="left" class="input-block-level" value="<%= budding %>" />',
					'</div>',
				'</div>',
				'<div class="control-group">',
					'<label class="control-label" for="fall">Queda</label>',
					'<div class="controls">',
						'<input type="text" id="fall" name="fall" data-error-style="tooltip" data-tooltip-position="left" class="input-block-level" value="<%= fall %>" />',
					'</div>',
				'</div>',									
			'</div>',
			'<div class="clearfix"></div>',
			'<div class="form-actions">',
				'<button type="submit" id="save" class="btn btn-primary" style="margin-right: 8px;">Salvar</button>',
				'<button type="button" id="cancel" class="btn">Cancelar</button>',
			'</div>',
		'</form>'
	].join('')),
	
	events: {
		'click #save' : 'onBtnSaveClick',
		'click #cancel' : 'onBtnCancelClick',
		'blur form.form-details input': 'preValidate'
	},
	
	initialize: function(cfg) {
		this.view = cfg.view;
	},
	
	render: function() {
		Backbone.Validation.bind(this);
		
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.hide();
		
		this.$form = this.$('form');
			
		return this;
	},
	
// listeners
	onBtnSaveClick: function(e) {
		e.preventDefault();
		
		var self = this,
			values = this.getValues();
		
		var options = {
			wait: true,
			success: function(model, response) {
				if (response.success) {
					alert('salvou!');
				}
			}
		};
		
		// checks for changes
		if (!this.model.changedAttributes(values)) {
			return;
		}
		
		// validates and saves model
		if (!this.model.save(values, options)){
			return;
		}
	},
	
	onBtnCancelClick: function() {
		this.close(true);
	},
	
	preValidate: function(e) {
		var target = $(e.target),
			opt = Backbone.Validation.callbacks,
			error;
		
		error = this.model.preValidate(target.attr('name'), target.val(), true);
		
		if (error) {
			opt.invalid(this, target.attr('name'), error, 'name');
		} else {
			opt.valid(this, target.attr('name'), 'name');
		}
		
		return error;
	},

// other methods
	getValues: function() {
		var fields = $('input', this.$form),
			self = this,
			values = {}, field;
		
		fields.each(function(i, o) {
			field = $(o);
			values[field.attr('name')] = field.val();
		});
		
		return values;
	},
	
	open: function() {
		this.$el.slideDown('fast');
		this.view.$el.addClass('active');
		this.view.$el.tooltip('disable');
	},
	
	close: function(destroy) {
		var self = this;
		
		this.$el.slideUp('fast', function() {
			if (destroy) {
				self.view.$el.removeClass('active');
				self.view.$el.tooltip('enable');
				self.view.isEditing = false;
				self.$el.parents('tr').remove();
			}
		});
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
        
        if (!this.trigger('beforeload', this, options)) {
            return;
        }
        
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
	url: '../collection',
	
	defaults: {
		individual : '',
		date : '',
		image : '',
		remark : '',
		flowerBud : 0,
		anthesis : 0,
		ripe : 0,
		unripe : 0,
		budding : 0,
		fall : 0
	},
	
	validation: {
	    individual: {
	        required: true
	    },
	    
		flowerBud: {
			range: [0, 100]
		},
		
		anthesis: {
			range: [0, 100]
		},

		ripe: {
			range: [0, 100]
		},
		
		unripe: {
			range: [0, 100]
		},
		
		budding: {
			range: [0, 100]
		},
		
		fall: {
			range: [0, 100]
		}
	},
    
    parse: function(response) {
		if (response.success) {
			return {};
		}
		
		response.date = Date.parse(response.date);
        return response;
    }
});

EP.collection.Collection = PaginatedCollection.extend({
	url: '../collection/search',
    model: EP.model.Collection
});

