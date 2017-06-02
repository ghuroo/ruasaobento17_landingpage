// banner swiper
var bannerSwiper;
function addBannerSlider() {
    $('body').addClass('hide-overflow');
    $('.banner .swiper-container').addClass('visible');

    bannerSwiper = new Swiper('.banner .swiper-container', {
        pagination: '.banner .swiper-pagination',
        paginationClickable: true,
        nextButton: '.banner .swiper-button-next',
        prevButton: '.banner .swiper-button-prev',
        onDestroy: function() {
            $('body').removeClass('hide-overflow');
            $('.banner .swiper-container').removeClass('visible');
        },
    });

    bannerSwiper.removeAllSlides();

    bannerSwiper.appendSlide([
        '<div class="swiper-slide"><div class="va-parent"><div class="va-child"><img src="./images/_placeholders/slider-1.jpg" /></div></div></div>',
        '<div class="swiper-slide"><div class="va-parent"><div class="va-child"><img src="./images/_placeholders/slider-1.jpg" /></div></div></div>'
    ]);
}

$('.banner .button').on('click', function() { addBannerSlider(); });
$('.banner .close').on('click', function() { bannerSwiper.destroy(); });

// tours swiper
var tourSwiper;
function addTourSwiper() {
    $('.tours .swiper-container').addClass('visible');

    tourSwiper = new Swiper('.tours .swiper-container', {
        pagination: '.tours .swiper-pagination',
        paginationClickable: true,
        // autoHeight: true,
        slidesPerView: 'auto',
        spaceBetween: 5,
        centeredSlides: true,
        nextButton: '.tours .swiper-button-next',
        prevButton: '.tours .swiper-button-prev',
        onDestroy: function() {
            $('.tours .swiper-container').removeClass('visible');
        },
    });

    tourSwiper.removeAllSlides();

    tourSwiper.appendSlide([
        '<div class="swiper-slide">'+$('.tours .item').eq(0).html()+'</div>',
        '<div class="swiper-slide">'+$('.tours .item').eq(0).html()+'</div>'
    ]);
}

addTourSwiper();
$('.tours .close').on('click', function() { tourSwiper.destroy(); });