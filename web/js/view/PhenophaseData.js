EP.view.PhenophaseData = EP.view.AbstractPage.extend({
    title: 'Dados de coletas',
    
    render: function() {
        EP.view.AbstractPage.prototype.render.apply(this, arguments);
        
        this.table = new EP.view.PhenophaseData.Table();
        this.$body.html(this.table.render().$el);
        this.table.enhanceElements();
        
        return this;
    }
    
});

EP.view.PhenophaseData.Table = Backbone.View.extend({
    className: 'table',
    
    tagName: 'table',
    
    initialize: function() {
        this.collection = new EP.collection.PhenophaseData();
    },
    
    buildSearchParams: function(dataArray) {
        var params = {},
            columns = [],
            colsReg = /mDataProp/,
            startReg = /iDisplayStart/,
            lengthReg = /iDisplayLength/,
            sortFieldReg = /iSortCol/,
            sortDirReg = /sSortDir/;

        _.each(dataArray, function(data) {
            if (colsReg.test(data.name)) {
                columns.push(data.value);
            }
            
            else if (startReg.test(data.name)) {
                params.start = data.value;
            }
            
            else if(lengthReg.test(data.name)) {
                params.length = data.value;
            }
            
            else if(sortFieldReg.test(data.name)) {
                params.sortField = data.value;
            }
            
            else if (sortDirReg.test(data.name)) {
                params.sortDir = data.value;
            }
        });
        
        params.sortField = columns[params.sortField];
        
        return params;
    },
    
    enhanceElements: function() {
        var self = this;
        
        this.$el.dataTable({
            sDom: "<'row'il>t<'row'p'>>",
            sWrapper: 'dataTables_wrapper form-inline',
            sPaginationType: "bootstrap",
            bServerSide: true,
            bAutoWidth: false,
            fnServerData: function(sSource, aoData, fnCallback, oSettings) {
                // set params
                var metaData = self.buildSearchParams(aoData),
                    collection = self.collection,
                    meta = collection.meta;
                
                if (!meta.changedAttributes(metaData)) {
                    return;
                }
                
                meta.set(metaData);                
                collection.getPaginated({
                    success: function(collection) {
                        fnCallback({
                            iTotalDisplayRecords: collection.total,
                            aaData: collection.toJSON()
                        });
                    }
                });
            },
            aoColumns: [
                { mData: "individual", sTitle: 'Individuo', sWidth: '40%' },
                { mData: "date", mRender: self.dateRenderer, sTitle: 'Data', sWidth: '20%' },
                { mData: "phenophase", sTitle: 'Phenophase', sWidth: '20%' },
                { mData: "value", sTitle: 'Valor', sWidth: '20%' },
                { mData: "id", bVisible: false }
            ],
            aaSorting: [[1,'desc']],
            oLanguage: {
                sLengthMenu: '_MENU_ Resultados por pagina',
                sInfo: '_START_ - _END_ de _TOTAL_',
                sInfoEmpty: 'Nenhum resultado encontrado',
                sInfoFiltered: '',
                oPaginate: {
                    sNext: 'Proxima',
                    sPrevious: 'Anterior'
                }
            }
        });
    },
    
    dateRenderer: function(value) {
        return value.toString('dd/MM/yyyy');
    }
});

EP.model.MetaData = Backbone.Model.extend({
    defaults: {
        start: '',
        length: '',
        sortField: '',
        sortDir: ''
    }
});

EP.model.PhenophaseData = Backbone.Model.extend({
    
    parse: function(response) {
        response.individual = response.individualId + ' - ' + response.species;
        response.date = Date.parse(response.date);
        return response;
    }
});

EP.collection.PhenophaseData = Backbone.Collection.extend({
    url: '../phenophase/search',
    
    model: EP.model.PhenophaseData,
    
    parse: function(response) {
        this.total = response.total;
        return response;
    },
    
    total: '',
    
    initialize: function() {
        this.meta = new EP.model.MetaData();
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
