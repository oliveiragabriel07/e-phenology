/*global MPG */
EP.model.User = Backbone.Model.extend({
    defaults : {
        id : '',
        name : '',
        username : '',
        password : '',
        status : ''
    },

    validation : {
        username : [{
            required : true,
            msg : 'Digite seu email'
        },{
            pattern: 'email',
            msg : 'Digite um email válido'
        }],

        password : {
            required : true,
            msg : 'Digite sua senha'
        }
    },

    doLogin : function() {
        var self = this;
        
        $.ajax({
            type : 'POST',
            data : {
                username: this.get('username'),
                password: this.get('password')
            },
            url : '../login/doLogin',
            dataType : 'json',
            error: function() {
                // TODO show connection error
            },
            success : function(data) {
                if (data.success) {
                    window.location = '/';
                } else {
                    self.trigger('failure', data.message);
                }
            }
        });
    }
}); 