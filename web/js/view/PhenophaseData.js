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
    
    enhanceElements: function() {
        var self = this;
        
        this.$el.dataTable({
            sDom: "<'row'l>t<'row'<'span4'i><'span8'p>>",
            sWrapper: 'dataTables_wrapper form-inline',
            sPaginationType: "bootstrap",
            bServerSide: true,
            fnServerData: function(sSource, aoData, fnCallback, oSettings) {
                self.collection.getPaginated(aoData, fnCallback);
            },
            aoColumns: [
                { "mData": "id", 'sTitle': 'Id' },
                { "mData": "date", 'sTitle': 'Data' },
                { "mData": "individualId", 'sTitle': 'Individuo' },
                { "mData": "phenophaseId", 'sTitle': 'Phenophase' },
                { "mData": "value", 'sTitle': 'Valor' }
            ],
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
    }
});

EP.model.PhenophaseData = Backbone.Model.extend({
    
});

EP.collection.PhenophaseData = Backbone.Collection.extend({
    url: '../phenophase/search',
    
    model: EP.model.PhenophaseData,
    
    parse: function(response) {
        return response;
    },
    
    getPaginated: function(params, callback) {
        $.ajax({
            url: this.url,
            method: 'GET',
            dataType: 'json',
            success: function(result) {
                callback({
                    iTotalDisplayRecords: 2,
                    aaData: result
                 });
            }
        });
    }
});
