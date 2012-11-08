EP.view.LoginView = Backbone.View.extend({
    events : {
        'click #signInBtn' : 'onSignInBtnClick',
        'submit form': 'onSignInBtnClick'
    },
    
    initialize: function() {
        this.model = new EP.model.User();
        this.render();
    },
    
    render : function() {
        Backbone.Validation.bind(this);
        this.$el = $('body');
        this.$('input[name="username"]').focus();
        
        return this;
    },
    
// listeners
    onSignInBtnClick: function(e) {
        e.preventDefault();
        
        var data = {
            username: this.$('input[name="username"]').val(),
            password: this.$('input[name="password"]').val()
        }
        
        if (!this.model.set(data)) {
            return;
        }
        
        this.model.doLogin();
    }
}); 