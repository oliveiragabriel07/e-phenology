var Toast = function(o) {
    var msg = o.msg || '',
        showLoading = o.showLoading,
        closable = o.closable,
        timeout = o.timeout,
        toast;
    
    var close = function close() {
        toast.fadeOut('slow', function() {
            $('html').off('click.toast');
            $('#toast').remove();
        });
    };
    
    $('#toast').remove();
    
    toast = $('<div id="toast">').appendTo('body');
    if (showLoading) {
        toast.append($('<div>').addClass('toast-loading'));
    }
    toast.append($('<p>').html(msg).addClass('toast-message'));
    toast.css('margin-left', (-1) * toast.width() / 2);
    
    if (timeout) {
        setTimeout(close, timeout);
    }
    
    if (closable) {
        $('html').on('click.toast', close);
    }
    
    return {
        close: close
    };
};
