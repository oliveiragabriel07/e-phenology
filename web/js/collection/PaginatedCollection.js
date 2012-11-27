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
        
        var toast = new Toast({
            msg: 'Carregando...',
            showLoading: true
        });
        
        options.complete = toast.close;
        return $.ajax(_.extend(params, options));
    }
});