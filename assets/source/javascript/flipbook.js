var turn = {
    ratio: 1.38,

    addBook: function(book) {

        var front = '<div class="hard"><img src="'+book.covers.front.url+'" /></div>',
            back = '<div class="hard"><img src="'+book.covers.back.url+'" /></div>';

        var pages = [];
        for (var index = 0; index < book.pages.length; index++) {
            if (index === 0 || index === book.pages.length) pages.push('<div class="hard"><img src="'+book.pages[index].url+'" /></div>');
            else pages.push('<img src="'+book.pages[index].url+'" />');
        }

        $(this.el).append(front);
        $(this.el).append(pages);
        $(this.el).append(back);
    },

    destroy: function() {
        $(turn.el).css('opacity', 0);
        $(this.el).turn("destroy");
        this.el = undefined;
    },

    init: function (book, pageIndex) {
        var me = this;

        // if older browser then don't run javascript
        if (document.addEventListener) {
            this.el = document.querySelector('#book');
            this.addBook(book);

            setTimeout(function() {
                me.resize();
                me.plugins(pageIndex);
            }, 300);

            // on window resize, update the plugin size
            window.addEventListener('resize', function (e) {
                var size = me.resize();
                setTimeout(function() {
                    $(me.el).turn('size', size.width, size.height);
                }, 1);
            });
        }
    },
    resize: function () {
        // reset the width and height to the css defaults
        this.el.style.width = '';
        this.el.style.height = '';

        var width = this.el.clientWidth,
            height = Math.round(width / this.ratio) / 2,
            padded = Math.round(document.body.clientHeight * 0.9);

        // if the height is too big for the window, constrain it
        if (height > padded) {
            height = padded;
            width = Math.round(height * this.ratio);
        }

        // set the width and height matching the aspect ratio
        this.el.style.width = width + 'px';
        this.el.style.height = height + 'px';

        return {
            width: width,
            height: height
        };
    },
    plugins: function (pageIndex) {
        var me = this;

        // run the plugin
        $(me.el).turn({
            gradients: true,
            acceleration: true
        });

        $('.book-container').addClass('opened');
        $(turn.el).css('opacity', 1);

        setTimeout(function() {
            $(me.el).turn('page', pageIndex || 1);
        }, 600);
    }
};

creatingFlipbook = false;
function createFlipbook(name, pageIndex) {
    $('body').addClass('hide-overflow');
    $('#flipbook').addClass('visible');

    var index;

    for (var i = 0; i < window.manuscripts.length; i++) {
        if (window.manuscripts[i].name == name) index = i;
    }

    turn.init(window.manuscripts[index], pageIndex);
}

function destroyFlipbook() {
    $(turn.el).turn('page', 1);

    setTimeout(function() {
        $('.book-container').removeClass('opened');

        setTimeout(function() {
            $('#flipbook').removeClass('visible');
            $('body').removeClass('hide-overflow');
            
            turn.destroy();
            creatingFlipbook = false;
        }, 500);
    }, 500);
}

window.resizingF = false;
function resizeFlipbook() {
    if (!turn.el || window.resizingF) return false;

    window.resizingF = true;

    setTimeout(function() {
        var index = $(turn.el).turn('page');

        turn.destroy();

        createFlipbook(window.flipbookTarget, index);

        window.resizingF = false;

        return true;
    }, 1);
}

$('#flipbook .close').on('click', function() { destroyFlipbook(); });
$(window).on('orientationchange', function() { resizeFlipbook(); });

$('.content-script button').on('click', function() {
    window.flipbookTarget = $(this).data('flipbook-target');

    if (creatingFlipbook) return;

    creatingFlipbook = true;
    createFlipbook(window.flipbookTarget);
});