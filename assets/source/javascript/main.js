// var mySwiper = new Swiper ('.swiper-container', {
//     // Optional parameters
//     direction: 'vertical',
//     loop: true,
    
//     // If we need pagination
//     pagination: '.swiper-pagination',
    
//     // Navigation arrows
//     nextButton: '.swiper-button-next',
//     prevButton: '.swiper-button-prev',
    
//     // And if we need scrollbar
//     scrollbar: '.swiper-scrollbar',
// });

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

});

$('.banner .close').on('click',function() {
    swiper.destroy();
});