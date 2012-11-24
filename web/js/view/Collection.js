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
        '<div class="span3">',
            '<div class="image-wrapper">',
                // '<input type="file" />',
                '<img class="image" src="<%= EP.EMPTY_PIC %>" />',
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
        values.remark = values.remark || ' ';
        return values;
    }
    
});

EP.view.Collection.Table = GridView.extend({
	
    initialize: function() {
		this.editing = null;
		this.columns = [
			{ index: 'date', title: 'Data', width: '10%', renderer: this.dateRenderer },
			{ index: 'place', title: 'Local (transecto)', width: '15%', renderer: this.placeRenderer },
            { index: 'individual', title: 'Individuo', width: '25%', renderer: this.individualRenderer },
            { index: 'flowerBud', title: 'Botão', width: '8%' },
            { index: 'anthesis', title: 'Antese', width: '8%' },
            { index: 'ripe', title: 'Imaturo', width: '8%' },
            { index: 'unripe', title: 'Maduro', width: '8%' },
            { index: 'budding', title: 'Brotamento', width: '10%' },
            { index: 'fall', title: 'Queda', width: '8%' }
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
		
		model.fetch({
		    url: '../collection/index/id/' + model.get('id'),
		    success: function() {
                self.editing = new EP.view.Collection.Table.EditItem({
                    model: model,
                    view: view
                });
                
                view.isEditing = true; 
                view.$el.after($('<tr>')
                    .addClass('details')
                    .html($('<td>')
                        .attr('colspan', self.columns.length)
                        .html(self.editing.render().$el)
                    )
                );
		    }
		});
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
    },
    
    placeRenderer: function(v, m) {
        return v + ' (' + m.get('transect') + ')';
    }
});

EP.view.Collection.Table.EditItem = Backbone.View.extend({
	tagName: 'div',
	
	className: 'details-wrapper span12',
	
	sectionTpl: _.template([
	    '<p class="form-section2">',
            '<span class="color">',
            '<span class="title"><%= title %></span>',
            '<span class="subtitle"><%= subtitle || "" %></span>',
        '</p>'
    ].join('')),
	
	template: _.template([
	    '<form class="form-details span12">',
            '<div class="form-section2">',
                '<span class="color" />',
                '<p class="title"><%= individual + " - " + species%></p>',
                '<p class="subtitle"><%= date.toString("dd/MM/yyyy") %></p>',
            '</div>',
            	    
            '<div class="span4">',
                '<div class="image-wrapper">',
                    // '<input type="file" />',
                    '<img class="image" src="<%= image || EP.EMPTY_PIC %>"/>',
                '</div>',
            '</div>',
		
            '<div class="span8">',
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
            '</div>',
            
            '<div class="control-group form-column span8" style="margin-top: 5px;">',
                '<div class="controls">',
                    '<textarea rows="2" placeholder="Observações" id="remark" name="remark" class="input-block-level"><%= remark %></textarea>',
                '</div>',
            '</div>',
            
			'<div class="clearfix"></div>',
			'<div class="form-actions span12">',
				'<button type="submit" id="save" class="btn btn-primary" style="margin-right: 8px;">Salvar</button>',
				'<button type="button" id="cancel" class="btn">Cancelar</button>',
			'</div>',
		'</form>',
		
		'<div class="span12">',
            '<div class="form-section2">',
                '<span class="color" />',
                '<p class="title">Evolução</p>',
                '<p class="subtitle">Dados por indivíduo</p>',
            '</div>',
            '<div class="phenophase-chart"></div>',
		'</div>'
	].join('')),
	
	events: {
		'click #save' : 'onBtnSaveClick',
		'click #cancel' : 'onBtnCancelClick',
		'blur form.form-details input': 'preValidate'
	},
	
	initialize: function(cfg) {
	    var self = this;
		this.view = cfg.view;
	},
	
	render: function() {
	    var self = this;
	    
	    Backbone.Validation.bind(this);
	    
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.hide();
		
		this.$form = this.$('form');
		this.$chartCt = this.$('.phenophase-chart');
		
		setTimeout(function() {
		    self.open();
		}, 10);
		
		return this;
	},
	
// listeners
    afterShow: function() {
        this.buildChart();
    },
    
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
    buildChart: function() {
        var data = this.model.get('graphic');
        
        Highcharts.setOptions({
            lang: {
                months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
            }
        });
        
        this.chart = new Highcharts.Chart({
            chart : {
                renderTo : this.$chartCt[0],
                borderRadius: 3,
                height: 300,
                type : 'line'
            },
            legend: {
                align: 'right',
                layout: 'vertical',
                verticalAlign: 'middle',
                itemStyle: {
                    paddingBottom: '10px'
                }
            },
            credits: {
                enabled: false
            },
            title : {
                text : 'Evolução das fenofases'
            },
            xAxis : {
                type: 'datetime'
            },
            yAxis : {
                title : {
                    text : 'Valor'
                }
            },
            series : [{
                name : 'Botão',
                data : data.flowerBudList
            }, {
                name : 'Antese',
                data : data.anthesisList
            },{
                name : 'Maduro',
                data : data.ripeList
            }, {
                name : 'Imaturo',
                data : data.unripeList
            },{
                name : 'Brotamento',
                data : data.buddingList
            }, {
                name : 'Queda',
                data : data.fallList
            }]
        });        
    },
    
	getValues: function() {
        var valuesArray = this.$form.serializeArray(),
            values = {};
            
        _.each(valuesArray, function(v) {
            values[v.name] = v.value;
        });
        
        values.remark = values.remark || ' ';
        return values;
	},
	
	open: function() {
	    var self = this;
		this.$el.slideDown('fast', $.proxy(this.afterShow, this));
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
		remark : ' ',
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
	
	parseSeries: function(series) {
	    var k, s, i, d, point;
	    
	    for (k in series) {
	        if (series.hasOwnProperty(k)) {
	            s = series[k];
	            for (i=0; i<s.length; i++) {
	                point = s[i];
	                d = Date.parseExact(point[0], 'yyyy-MM-dd HH:mm:ss');
	                
	                point[0] = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
	                point[1] = parseInt(point[1], 10);
	            }
	        }
	    }
	    
	    return series;
	},
    
    parse: function(response) {
		if (response.success) {
			return {};
		}
		
		response.remark = response.remark === ' ' ? '' : response.remark; 
		response.date = Date.parseExact(response.date, 'yyyy-MM-dd HH:mm:ss');
		if (response.graphic) {
		    response.graphic = this.parseSeries(response.graphic);
		}
		
        return response;
    }
});

EP.collection.Collection = PaginatedCollection.extend({
	url: '../collection/search',
    model: EP.model.Collection
});

