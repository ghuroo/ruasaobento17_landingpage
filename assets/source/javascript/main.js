// banner swiper
var bannerSwiper;
function addBannerSlider(banner) {
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

    for (var i=0; i<banner.image.length; i++) {
        bannerSwiper.appendSlide([
            '<div class="swiper-slide"><div class="va-parent"><div class="va-child"><img src="'+banner.image[i].url+'" /></div></div></div>',
        ]);
    }

}

$('.banner .button').on('click', function() { addBannerSlider(window.banners[0]); });
$('.banner .close').on('click', function() { bannerSwiper.destroy(); });

// tours swiper
var tourSwiper;
function addTourSwiper() {
    $('.tours .swiper-container').addClass('visible');

    tourSwiper = new Swiper('.tours .swiper-container', {
        pagination: '.tours .swiper-pagination',
        paginationClickable: true,
        autoHeight: true,
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
        '<div class="swiper-slide box"><div class="item">'+$('.tours .item').eq(0).html()+'</div></div>',
        '<div class="swiper-slide box"><div class="item">'+$('.tours .item').eq(1).html()+'</div></div>'
    ]);
}

addTourSwiper();
$('.tours .close').on('click', function() { tourSwiper.destroy(); });