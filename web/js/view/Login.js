EP.view.LoginView = Backbone.View.extend({
    events : {
        'click #signInBtn' : 'onSignInBtnClick',
        'blur input': 'preValidate',
        'submit form': 'onSignInBtnClick'
    },
    
    initialize: function() {
        this.model = new EP.model.User();
        this.model.on('failure', this.onLoginFailure, this);
        
        this.render();
    },
    
    render : function() {
        Backbone.Validation.bind(this);
        this.$el = $('body');
        this.$('input[name="username"]').focus();
        
        return this;
    },
    
// listeners
    preValidate: function(e) {
        var target = $(e.target),
            opt = Backbone.Validation.callbacks,
            name = target.attr('name'),
            error;
            
            error = this.model.preValidate(name, target.val(), true);
            
            if (error) {
                opt.invalid(this, name, error, 'name');
            } else {
                opt.valid(this, name, 'name');   
            }
    },
    
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
    },
    
    onLoginFailure: function(msg) {
        this.$('#error-box')
            .slideDown()
            .find('.message')
            .html(msg);
    }
}); 