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
        $(this.el).turn("destroy");
    },

    init: function (book) {
        var me = this;

        // if older browser then don't run javascript
        if (document.addEventListener) {
            this.el = document.querySelector('#book');
            this.addBook(book);

            setTimeout(function() {
                me.resize();
                me.plugins();
            }, 300);

            // on window resize, update the plugin size
            window.addEventListener('resize', function (e) {
                var size = me.resize();
                $(me.el).turn('size', size.width, size.height);
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
    plugins: function () {
        var me = this;

        // run the plugin
        $(me.el).turn({
            gradients: true,
            acceleration: true
        });

        $('.book-container').addClass('opened');

        setTimeout(function() {
            // $(me.el).turn('page', 2);
        }, 600);
    }
};

creatingFlipbook = false;
$('.content-script button').on('click', function() {
    if (creatingFlipbook) return;

    creatingFlipbook = true;
    createFlipbook($(this).data('flipbook-target'));
});

function createFlipbook(name) {
    $('body').addClass('hide-overflow');
    $('#flipbook').addClass('visible');

    var index;

    for (var i = 0; i < window.manuscripts.length; i++) {
        if (window.manuscripts[i].name == name) index = i;
    }

    turn.init(window.manuscripts[index]);
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

$('#flipbook .close').on('click', function() {
    destroyFlipbook();
});

$(window).on('orientationchange', function() {
    $('#flipbook .close').click();
});