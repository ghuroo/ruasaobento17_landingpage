function scroll(element) {
    // On-page links
    if (
        location.pathname.replace(/^\//, '') == element.pathname.replace(/^\//, '') &&
        location.hostname == element.hostname
    ) {
        // Figure out element to scroll to
        var target = $(element.hash);
        target = target.length ? target : $('[name=' + element.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 120
            }, 1000, function () {
                // Callback after animation
                // Must change focus!
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) { // Checking if the target was focused
                    return false;
                } else {
                    $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                }
            });
        }
    }
}

var Arrayzer = {
    array: [],
    filter: function(element) {
        this.array.length = 0;
        for (var i = 0; i < element.length; i++) this.array.push(element.eq(i));
        return this.array;
    }
};

var gh = {};

gh.fade = {
    previous: null,
    current: null,
    speed: 0.2,
    interval: 0.1,
    delay: 0.3
};

gh.fade.in = function(_el) {
    this.previous = _el;
    var array = Arrayzer.filter(_el.find(".fadein"));
    fade = new TimelineMax({
        repeat: 0,
        yoyo: false,
        delay: 0
    });
    fade.staggerTo(array, this.speed, {
        opacity: 1,
        y: "0px"
    }, this.interval, this.delay);
};

gh.fade.out = function() {
    if (this.previous) {
        var array = Arrayzer.filter(this.previous.find(".fadein"));
        fade = new TimelineMax({
            repeat: 0,
            yoyo: false,
            delay: 0
        });
        fade.staggerTo(array, this.speed, {
            opacity: 0,
            y: "-5px"
        }, this.interval, this.delay);
    }
};

$(document).ready(function () {
    $('#header ul li>a').click(function (event) {
        scroll(this);
    });

    $(".waypoint").waypoint(function (direction) {
        var index = $(this.element).data('index');
        var anchor = $(this.element).find('> a');

        if (direction == "down") {
            console.log('Waypoint: ' + anchor.attr('name'));
            gh.fade.out();
            gh.fade.in($(this.element));
            $('#header ul li>a').removeClass('active');
            $('#header ul li>a[data-index="' + index + '"]').addClass('active');
        }
    }, {
        offset: "50%"
    });

    $(".waypoint").waypoint(function (direction) {
        var index = $(this.element).data('index');

        if (direction == "up") {
            gh.fade.out();
            gh.fade.in($(this.element));
            $('#header ul li>a').removeClass('active');
            $('#header ul li>a[data-index="' + index + '"]').addClass('active');
        }
    }, {
        offset: "-70%"
    });

    var dimensions = {
        width: $('#flipbook-wrapper').width(),
        height: ($('#flipbook-wrapper').width() * 417)/1120
    };

    $("#flipbook .flip").turn({
        width: dimensions.width,
        height: dimensions.height,
        autoCenter: false
    });
});

$('.content-script button').on('click', function() {
    var index = $(this).data('flipbook');
    var flipbook = $('.flipbook[data='+index+']');

    flipbook.removeClass('hidden');
});