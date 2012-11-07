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
        username : {
            required : true,
            msg : 'Digite seu email'
        },

        password : {
            required : true,
            msg : 'Digite sua senha'
        }
    },

    doLogin : function() {
        $.ajax({
            type : 'POST',
            data : {
                username: this.get('username'),
                password: this.get('password')
            },
            url : '../login/doLogin',
            dataType : 'json',
            success : function(data) {
                if (data.success) {
                    window.location = '/';
                }
            }
        });
    }
}); 