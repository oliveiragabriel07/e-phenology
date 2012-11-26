EP.model.MetaData = Backbone.Model.extend({
    defaults: {
        start: 0,
        length: 10,
        total: 0,
        sortField: '',
        sortDir: '',
        filters: {
            place: 'ANY',
            transect: 'ANY',
            individual: 'ANY',
            date: 'ANY'
        },
        pageSizeOptions: [10, 25, 50, 100]
    }
});