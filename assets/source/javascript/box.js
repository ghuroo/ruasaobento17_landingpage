box = {
    element: $('.box .item'),
    buttons:  $('.box .read-more'),
    button:  null,

    switch: function(index) {
        return this.element.find('.quote').hasClass('opened') ? this.close() : this.open();
    },

    open: function() {
        box.button.addClass('up');
        box.button.removeClass('down');
        this.element.find('.quote').addClass('opened');
        if (tourSwiper) tourSwiper.update(true);

        return true;
    },
    
    close: function() {
        box.button.addClass('down');
        box.button.removeClass('up');
        this.element.find('.quote').removeClass('opened');
        if (tourSwiper) tourSwiper.update(true);
        
        return true;
    }
};

box.buttons.on('click', function() {
    box.element = $(this).parents('.item');
    box.button = box.element.find('.read-more');
    box.switch();
});