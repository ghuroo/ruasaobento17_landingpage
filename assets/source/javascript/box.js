box = {
    element: $('.box .item'),
    button:  $('.box .read-more'),

    switch: function(index) {
        return this.element.find('.quote').hasClass('opened') ? this.close() : this.open();
    },

    open: function() {
        this.button.addClass('up');
        this.button.removeClass('down');
        return this.element.find('.quote').addClass('opened');
    },
    
    close: function() {
        this.button.addClass('down');
        this.button.removeClass('up');
        return this.element.find('.quote').removeClass('opened');
    }
};

box.button.on('click', function() {
    box.element = $(this).parents('.item');
    box.switch();
});