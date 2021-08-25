$(document).ready(function() {

    /* TODO: jquery slimscroll for cart ============*/
    $('.js-cart-slimscroll').slimScroll({
        height: '310px',
        size: '5px'
    });

    /* TODO: slider banner ==================*/
    if($('.js-banner')) {
        $(".js-banner").owlCarousel({
            items: 1,
            autoplay: false,
            smartSpeed: 1000,
            nav: true,
            navText: ['<div class="c-button__slider c-button__slider--prev"><i class="fa fa-long-arrow-left"></i></div>', '<div class="c-button__slider c-button__slider--next"><i class="fa fa-long-arrow-right"></i></div>'],
            loop: true,
            dots: false,
        });
    };

    if($('.js-special')) {
        $('.js-special').owlCarousel({
            items: 1,
            autoplay: false,
            smartSpeed: 1000,
            nav: true,
            navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
            loop: false,
            dots: true,
        })
    };

    /* TODO: countdown for component clock ==============*/
    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };
        
    function initializeClock(endtime, clock) {
        var days = clock.querySelector('.js-clock__days');
        var hours = clock.querySelector('.js-clock__hours');
        var mins = clock.querySelector('.js-clock__mins');
        var secs = clock.querySelector('.js-clock__secs');

        function updateClock() {
            var t = getTimeRemaining(endtime);
            days.innerHTML = t.days;
            hours.innerHTML = ('0' + t.hours).slice(-2);
            mins.innerHTML = ('0' + t.minutes).slice(-2);
            secs.innerHTML = ('0' + t.seconds).slice(-2);
            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }
        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    };
      
    if($('.js-clock')) {
        var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
        $('.js-clock').each(function(index, el) {
            initializeClock(deadline, el);
        });
    };

    /* TODO: grid for component yield ==============*/
    $('.js-filter > a').on('click', function() {
        var $filter = $(this).attr('data-filter');
        $('.js-filter a').removeClass('active');
        $(this).addClass('active');
        $(this).parents('.js-filter').siblings().find($('.c-yield__public')).hide().removeClass('active');
        $('.' + $filter).show().addClass('active');
    });

    $('.js-filterFeature > a').on('click', function() {
        var $filter = $(this).attr('data-filter');
        $('.js-filterFeature a').removeClass('active');
        $(this).addClass('active');
        $(this).parents('.js-filterFeature').siblings().find($('.c-yield__public')).hide().removeClass('active');
        $('.' + $filter).show().addClass('active');
    });

    /* TODO: show map footer ============*/
    $('.js-map').on('click', function() {
        $('.c-map__content').slideToggle(450);
        $('html, body').animate({ scrollTop: $(document).height() }, 1000);
    });

    /* TODO: back to top ===========*/
    $('.js-baby').on({
        "mouseover": function() {
            $(this).addClass('bounce');
        },
        "mouseout": function() {
            $(this).removeClass('bounce');
        },
        "click": function() {
            $('html, body').animate({ scrollTop: 0 }, 1000);
        }
    });

    /* TODO: slideshow thumbs on index =========*/
    if($('.js-thumbs')) {
        $('.js-thumbs').owlCarousel({
            items: 7,
            autoplay: true,
            nav: false,
            loop: true,
            smartSpeed: 1000,
            margin: 0,
            dots: false,
            responsive:{
                300:{
                    items:1,
                },
                480:{
                    items:2,
                },
                768:{
                    items:3
                },
                992:{
                    items:5
                },
                1200:{
                    items:6
                }
            }
        })
    };

    /* TODO: slideshow slogan on index =================*/
    $('.js-slogan__description').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.js-slogan__thumbs',
        autoplay: false,
    });
    $('.js-slogan__thumbs').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.js-slogan__description',
        dots: false,
        centerMode: true,
        focusOnSelect: true
    });

})