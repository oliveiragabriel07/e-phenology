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
        this.filters = new EP.view.Collection.Filters({collection: this.collection});
	},
	
    render: function() {
        EP.view.AbstractPage.prototype.render.apply(this, arguments);
        
        this.$body.empty();
        this.$body.append(this.filters.render().$el);
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
            },
            beforeClose: function() {
                form.off();
                $('#save', this.wrap).off();
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

EP.view.Collection.Filters = Backbone.View.extend({
    className: 'row filters',
    
    tagName: 'div',
    
    initialize: function() {
        var FilterModel = Backbone.Model.extend({
            defaults: {
                selected: false,
                type: 'select'
            },
            
            renderValue: function() {
				var type = this.get('type'),
					text;

				if (type === 'select') {
		            text = this.get('label');
		        } else if (type === 'text') {
		            text = $.format(this.get('text'), this.get('value').replace(/.*#/, ''));
		        } else if (type === 'period') {
					var period = this.get('value').replace(/.*\#/, '').split(';');
				
					period[0] = Date.parseExact(period[0], 'yyyy-M-d');
					period[1] = Date.parseExact(period[1], 'yyyy-M-d');
					
					text =  period[0].toString('dd/MM/yyyy') + ' - ' + period[1].toString('dd/MM/yyyy');
				}
           
				return text;
            }
        });
        
        var FilterCollection = Backbone.Collection.extend({
            model: FilterModel
        });
        
        var placeCollection = new FilterCollection([{
            value: 'ANY',
            label: 'Qualquer local',
            selected: true
        },{
            value: 'EAST_BORDER',
            label: 'Borda Leste'
        },{
            value: 'SOUTH_BORDER',
            label: 'Borda Sul'
        }]);
        placeCollection.name = 'place';
        
        var transectCollection = new FilterCollection([{
            value: 'ANY',
            label: 'Todos os transectos',
            selected: true
        },{
            type: 'divider'
        },{
            value: 'TYPE#',
            label: 'Inserir transecto',
            text: 'Transecto: {0}',
            type: 'text'
        }]);
        transectCollection.name = 'transect';
        
        var individualCollection = new FilterCollection([{
            value: 'ANY',
            label: 'Todos os indivíduos',
            selected: true
        },{
            type: 'divider'
        },{
            value: 'TYPE#',
            label: 'Inserir Indivíduo',
            text: 'Indivíduo: {0}',
            type: 'text'
        }]);
        individualCollection.name = 'individual';
        
        var periodCollection = new FilterCollection([{
            value: 'ANY',
            label: 'Em qualquer data',
            selected: true
        },{
            value: 'LAST_MONTH#PERIOD#',
            label: 'Último mês'
        },{
            value: 'LAST_TRHEE_MONTHS#PERIOD#',
            label: 'Últimos 3 meses'
        },{
            value: 'LAST_YEAR#PERIOD#',
            label: 'Último ano'
        },{
            type: 'divider'
        },{
            value: 'PERIOD#',
            label: 'Período',
            type: 'period'
        }]);
        
        periodCollection.name = 'period';
        
        this.filters = {};
        this.filters.place = new EP.view.Collection.BasicFilterItem({
            collection: placeCollection
        });
        
        this.filters.transect = new EP.view.Collection.BasicFilterItem({
            collection: transectCollection
        });
        
        this.filters.individual = new EP.view.Collection.BasicFilterItem({
            collection: individualCollection
        });
        
        this.filters.period = new EP.view.Collection.BasicFilterItem({
            collection: periodCollection
        });
        
        var self = this;
        _.each(this.filters, function(f) {
            f.collection.on('change', self.onFiltersChange, self);
        });
    },
    
    render: function() {
        var markup = $('<ul class="nav nav-pills pull-left">');
        
        _.each(this.filters, function(f) {
            markup.append(f.render().$el);
        });
        
        this.$el.html(markup);
        return this;
    },
    
// listeners
    onFiltersChange: function(model) {
        if(!model.get('selected')) {
            return;
        }
        
        var meta = this.collection.meta,
            filters = meta.get('filters'),
            value = model.get('value');


		if (/PERIOD#/.test(value)) {
			filters[model.collection.name] = this.getPeriod(value.replace(/.*\#/, ''));
		} else {
			filters[model.collection.name] = value.replace(/.*\#/, '');
		}
		
        meta.set('filters', filters);
        meta.set('start', 0);
        this.collection.getPaginated();
   },
    
    getPeriod: function(date) {
    	var dateEnd = new Date().clearTime();
			dateIni = dateEnd.clone();
			
		if (/LAST_MONTH/.test(date)) {
			dateIni.addMonths(-1);
		} else if (/LAST_TRHEE_MONTHS/.test(date)) {
			dateIni.addMonths(-3);
		} else if (/LAST_YEAR/.test(date)) {
			dateIni.addYears(-1);
		} else {
			return date;
		}
		
		return [dateIni.toString('yyyy-MM-dd'), dateEnd.toString('yyyy-MM-dd')].join(';');
    }
        
    
});

EP.view.Collection.BasicFilterItem = Backbone.View.extend({
    template: [
        '<a class="dropdown-toggle text" data-toggle="dropdown" href="#"></a>',
        '<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu"></ul>'
    ].join(''),
    
    textTpl: _.template('<%= text %> <b class="caret"></b>'),
    
    selectTpl: _.template([
        '<li class="<%= selected ? "selected" : ""%>">',
            '<a tabindex="-1" href="#" data-action="filter" data-value="<%= value %>" data-type="<%= type %>"><%= label %></a>',
        '</li>'
    ].join('')),
    
    formTpl: _.template([
        '<li class="<%= selected ? "selected" : ""%>">',
            '<form style="padding: 3px 20px; margin:0">',
                '<div class="input-append">',
                    '<input type="text" placeholder="<%= label %>"name="<%= name %>" id="<%= name %>" class="input-medium" />',
                    '<button class="btn" data-action="filter" type="submit" data-value="<%= value %>" data-type="<%= type %>">Ir</button>',
                '</div>',
            '</form>',
        '</li>'       
    ].join('')),
    
    tagName: 'li',
    
    className: 'dropdown',
    
    events: {
        'click *[data-action="filter"]': 'onFilterClick'
    },
    
    initialize: function(cfg) {
        this.name = this.collection.name;
        this.selected = this.collection.find(function(model) {
            return model.get('selected');
        });
    },
    
    render: function() {
        var selected, self = this;
        
        this.$el.html(this.template);
        
        this.$el.addClass('filter-' + this.name);
        this.$text = this.$('a.text');
        this.$menu = this.$('ul.dropdown-menu');
        
        this.updateText();
        
        this.collection.each(function(model) {
            var type = model.get('type'),
                el;
            
            if (type === 'divider') {
                el = $('<li class="divider"></li>');
                self.$menu.append(el);
            } else if (type === 'select' || type === 'period') {
                el = $(self.selectTpl(model.toJSON()));
                self.$menu.append(el);
            } else if (type === 'text') {
                el = $(self.formTpl(_.extend({}, {name: self.name}, model.toJSON())));
                self.$menu.append(el);
            }
            
            self.onItemRender(el, model);
        });
        
        return this;
    },
    
    updateText: function() {
        this.$text.html(this.textTpl({text: this.selected.renderValue()}));
    },
    
    refresh: function(el) {
        this.$('li').removeClass('selected');
        el.closest('li').addClass('selected');
        this.updateText();       
    },
    
// listeners
    onFilterClick: function(e) {
        e.preventDefault();
        
        var el = $(e.target),
            value = el.attr('data-value'),
            type = el.attr('data-type'),
            method = 'on' + type.charAt(0).toUpperCase() + type.slice(1) + 'Click',
            model;
        
        model = this.collection.find(function(m) {
            return m.get('value') && m.get('value').replace(/\#.*/, '') === value.replace(/\#.*/, '');
        });
        
        this[method](model, el);
    },
    
    onItemRender: function() {},
    
    onTextClick: function(model, el) {
        var form = el.closest('form'),
            menu = el.closest('.dropdown'),
            field = form.find('input[name="' + model.collection.name + '"]'),
            value = field.val();
        
        if (!model.changedAttributes({value: value})) {
            return;
        }
        
        menu.removeClass('open');
        model.set({
           value: 'TYPE#' + value,
           selected: true 
        });
        this.selected.set('selected', false);
        this.selected = model;
        
        this.refresh(el);
    },
    
    onPeriodClick: function(model, el) {
		var win = new EP.view.Collection.PeriodWindow(),
			self = this;
			
		var onGoClick = function onGoClick(value, modal) {
			$.fancybox.close();
			model.set({
	           value: 'PERIOD#' + value.dateBegin + ';' + value.dateEnd,
	           selected: true
			});
	        self.selected.set('selected', false);
	        self.selected = model;
	        self.refresh(el);
		};
		
		win.on('go', onGoClick);
		
        $.fancybox({
            content: win.render().$el,
            autoSize: false,
            height: 'auto',
            width: '400',
            tpl: {
                wrap: [
                  '<div class="fancybox-wrap" tabIndex="-1">',
                      '<form>',
                          '<div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div>',
                      '</form>',
                  '</div>'
              ].join('')
            },
            beforeShow: function() {
                this.title = [
	                '<div class="form-actions">',
			            '<button type="submit" id="go" class="btn btn-primary" style="margin-right: 8px;">Ir</button>',
			        '</div>'
		        ].join('');
            },
            afterShow: function() {
                $('#go', this.wrap).on('click', $.proxy(win.onBtnGoClick, win));
            },
            beforeClose: function() {
                win.off();
                $('#go', this.wrap).off();
            },
            helpers : {
                title : {
                    type: 'inside'
                }
            }
        });
    },
    
    onSelectClick: function(model, el) {
        if (model === this.selected) {
            return;
        }
        
        this.selected.set('selected', false);
        model.set('selected', true);
        this.selected = model;
        
        this.refresh(el);
    }
});

EP.view.Collection.PeriodWindow = Backbone.View.extend({
	
	template: _.template([
		'<h3>Período</h3>',
        '<div class="control-group">',
			'<label>Início</label>',
            '<div class="controls control-composite controls-row">',
                '<div class="span1" style="margin-right: 5px;">',
                    '<span class="hint">Dia</span>',
                    '<select id="dayBegin" name="dayBegin" class="input-block-level">',
                        '<% _.each(days, function(d) { %>',
                            '<option value="<%= d %>" ><%= d.toString() %></option>',
                        '<% })%>',                
                    '</select>',
                '</div>',
                '<div class="span1" style="margin-right: 5px;">',
                    '<span class="hint">Mês</span>',
                    '<select id="monthBegin" name="monthBegin" class="input-block-level">',
                        '<% _.each(months, function(m) { %>',
                            '<option value="<%= m %>" ><%= m.toString() %></option>',
                        '<% })%>',
                    '</select>',
                '</div>',
                '<div class="span1">',
                    '<span class="hint">Ano</span>',                
                    '<select id="yearBegin" name="yearBegin" class="input-block-level">',
                        '<% _.each(years, function(y) { %>',
                            '<option value="<%= y %>" <%= (y === today.getFullYear() - 1) ? "selected" : "" %>><%= y.toString() %></option>',
                        '<% })%>',
                    '</select>',
                '</div>',
            '</div>',
		
		'<div class="control-group">',            
            '<label>Fim</label>',
            '<div class="controls control-composite controls-row">',
                '<div class="span1" style="margin-right: 5px;">',
                    '<span class="hint">Dia</span>',
                    '<select id="dayEnd" name="dayEnd" class="input-block-level">',
                        '<% _.each(days, function(d) { %>',
                            '<option value="<%= d %>" <%= (d === today.getDate()) ? "selected" : "" %> ><%= d.toString() %></option>',
                        '<% })%>',                
                    '</select>',
                '</div>',
                '<div class="span1" style="margin-right: 5px;">',
                    '<span class="hint">Mês</span>',
                    '<select id="monthEnd" name="monthEnd" class="input-block-level">',
                        '<% _.each(months, function(m) { %>',
                            '<option value="<%= m %>" <%= (m === today.getMonth() + 1) ? "selected" : "" %> ><%= m.toString() %></option>',
                        '<% })%>',
                    '</select>',
                '</div>',
                '<div class="span1">',
                    '<span class="hint">Ano</span>',                
                    '<select id="yearEnd" name="yearEnd" class="input-block-level">',
                        '<% _.each(years, function(y) { %>',
                            '<option value="<%= y %>" <%= (y === today.getFullYear()) ? "selected" : "" %> ><%= y.toString() %></option>',
                        '<% })%>',
                    '</select>',
                '</div>',
            '</div>',            
        '</div>'
    ].join('')),
    
    render: function() {
		// Backbone.Validation.bind(this);
        
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
        
        this.$el.html(this.template(data));
        
        return this;
    },

// listeners
    onBtnGoClick: function(e) {
		e.preventDefault();
		var values = this.getValues();
		
		// TODO validate
		this.trigger('go', values, this);
    },
    
// other methods
    getValues: function() {
        var form = this.$el.closest('form'),
            valuesArray = form.serializeArray(),
            data = {}, values = {};
            
        _.each(valuesArray, function(v) {
            data[v.name] = v.value;
        });
        
        values.dateBegin = $.format('{0}-{1}-{2}', data.yearBegin, data.monthBegin, data.dayBegin);
        values.dateEnd = $.format('{0}-{1}-{2}', data.yearEnd, data.monthEnd, data.dayEnd);
        return values;
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
