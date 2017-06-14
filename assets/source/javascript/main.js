// banner swiper
var bannerSwiper;
function addBannerSlider(banner, activeIndex) {
    $('body').addClass('hide-overflow');
    $('.banner .swiper-container').addClass('visible');

    bannerSwiper = new Swiper('.banner .swiper-container', {
        pagination: '.banner .swiper-pagination',
        paginationClickable: true,
        autoHeight: true,
        nextButton: '.banner .swiper-button-next',
        prevButton: '.banner .swiper-button-prev',
        onDestroy: function() {
            $('body').removeClass('hide-overflow');
            $('.banner .swiper-container').removeClass('visible');
        }
    });

    bannerSwiper.removeAllSlides();

    for (var i=0; i<banner.images.length; i++) {
        bannerSwiper.appendSlide([
            '<div class="swiper-slide"><div class="va-parent"><div class="va-child"><img src="'+banner.images[i].url+'" /></div></div></div>',
        ]);
    }

    if (activeIndex) bannerSwiper.slideTo(activeIndex);
}

function destroyBannerSwiper() {
    bannerSwiper.destroy(true, true);
    bannerSwiper = undefined;

    return;
}

// about swiper
var aboutSwiper1;
$('.apartment .picture.one .swiper-container').addClass('visible');

aboutSwiper1 = new Swiper('.apartment .picture.one .swiper-container', {
    pagination: '.apartment .picture.one .swiper-pagination',
    paginationClickable: true,
    autoHeight: true,
    centeredSlides: true,
    nextButton: '.apartment .picture.one .swiper-button-next',
    prevButton: '.apartment .picture.one .swiper-button-prev',
    onDestroy: function() {
        $('.apartment .picture.one .swiper-container').removeClass('visible');
    },
});

// about swiper
var aboutSwiper2;
$('.apartment .picture.two .swiper-container').addClass('visible');

aboutSwiper2 = new Swiper('.apartment .picture.two .swiper-container', {
    pagination: '.apartment .picture.two .swiper-pagination',
    paginationClickable: true,
    autoHeight: true,
    centeredSlides: true,
    nextButton: '.apartment .picture.two .swiper-button-next',
    prevButton: '.apartment .picture.two .swiper-button-prev',
    onDestroy: function() {
        $('.apartment .picture.two .swiper-container').removeClass('visible');
    },
});

window.resizing = false;
function resizeBannerSwiper() {
    if (!bannerSwiper || window.resizing) return false;

    window.resizing = true;

    var index = bannerSwiper.activeIndex;

    setTimeout(function() {    
        destroyBannerSwiper();
        addBannerSlider(window.banners[0], index);

        window.resizing = false;
        return true;
    }, 1);
}

$(document).ready(function () {

    $('.apartment .picture.one .swiper-container').addClass('visible');
    $('.apartment .picture.two .swiper-container').addClass('visible');

    $(window).on('orientationchange', function() { resizeBannerSwiper(); });
    $(window).on('resize', function() { resizeBannerSwiper(); });

    $('.banner .button').on('click', function() { addBannerSlider(window.banners[0]); });
    $('.banner .close').on('click', function() { destroyBannerSwiper(); });

});