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

$(window).on('orientationchange', function() {
    if (bannerSwiper) {
        bannerSwiper.destroy(true, true);
        addBannerSlider(window.banners[0], bannerSwiper.activeIndex);
    }
});

$('.banner .button').on('click', function() { addBannerSlider(window.banners[0]); });
$('.banner .close').on('click', function() { bannerSwiper.destroy(true, true); });

// // tours swiper
// var tourSwiper;
// function addTourSwiper(tourGuides) {
//     $('.tours .swiper-container').addClass('visible');

//     tourSwiper = new Swiper('.tours .swiper-container', {
//         pagination: '.tours .swiper-pagination',
//         paginationClickable: true,
//         // autoHeight: true,
//         // slidesPerView: 'auto',
//         // spaceBetween: 0,
//         centeredSlides: true,
//         nextButton: '.tours .swiper-button-next',
//         prevButton: '.tours .swiper-button-prev',
//         onDestroy: function() {
//             $('.tours .swiper-container').removeClass('visible');
//         },
//     });

//     tourSwiper.removeAllSlides();

//     for (var i=0; i<tourGuides.length; i++) {
//         tourSwiper.appendSlide([
//             '<div class="swiper-slide box"><div class="item">'+$('.tours .item').eq(i).html()+'</div></div>',
//         ]);
//     }
// }

// addTourSwiper(window.tourGuides);

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