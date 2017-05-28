var swiper;

$('.banner .button').on('click',function() {


    $('body').addClass('hide-overflow');
    $('.swiper-container').addClass('visible');

    swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        onDestroy: function() {
            $('body').removeClass('hide-overflow');
            $('.swiper-container').removeClass('visible');
        },
    });

    swiper.appendSlide([
        '<div class="swiper-slide"><div class="va-parent"><div class="va-child"><img src="./images/_placeholders/slider-1.jpg" /></div></div></div>',
        '<div class="swiper-slide"><div class="va-parent"><div class="va-child"><img src="./images/_placeholders/slider-1.jpg" /></div></div></div>'
    ]);

});

$('.banner .close').on('click',function() {
    swiper.destroy();
});