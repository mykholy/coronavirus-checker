(function($) {
    "use strict";

    $(document).ready(function() {

        /* Mobile Nav */
        $('#nav-13').slicknav();
        $(".slicknav_menu").appendTo(".small-menu");

        AOS.init({
            duration: 800,
            easing: 'slide',
            once: true
        });

        /* slider-active */
        $('.slider-active-owl').owlCarousel({
            loop: true,
            nav: true,
            autoplay: false,
            dots: false,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            responsive: {
                0: {
                    items: 1
                },
                767: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });

        /*  ACCORDION   */
        $('.accordion > li:eq(0) a').addClass('active').next().slideDown();
        $('.accordion a').click(function(j) {
            var dropDown = $(this).closest('li').find('p');

            $(this).closest('.accordion').find('p').not(dropDown).slideUp();

            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).closest('.accordion').find('a.active').removeClass('active');
                $(this).addClass('active');
            }

            dropDown.stop(false, true).slideToggle();

            j.preventDefault();
        });


        /* Preloader */
        $(window).on('load', function() {
            var preLoder = $(".hola");
            preLoder.fadeOut(1000);
        });

        /* POPUP VIDEO */
        if ($(".video-btn").length) {
            $(".video-btn").on("click", function() {
                $.fancybox({
                    href: this.href,
                    type: $(this).data("type"),
                    'title': this.title,
                    helpers: {
                        title: { type: 'inside' },
                        media: {}
                    },

                    beforeShow: function() {
                        $(".fancybox-wrap").addClass("gallery-fancybox");
                    }
                });
                return false
            });
        }

        /* header_sticky */
        $(window).on('scroll', function() {
            var scroll = $(window).scrollTop();
            if (scroll < 250) {
                $("#header-sticky").removeClass("scroll-header");
            } else {
                $("#header-sticky").addClass("scroll-header");
            }
        });

        /* NavBar Hover */
        window.addEventListener('load', function() {
            // btn-13 : Hover Moving Dot
            var movingDot = new MovingDot('#nav-13');
        });

        // btn-13 : Moving Dot
        function MovingDot(nav) {
            var $navMovingDotBar = document.querySelector(nav);
            if ($navMovingDotBar == null) {
                return;
            }
            var $btnMenu13 = $navMovingDotBar.querySelectorAll('li'),
                bar2 = document.createElement('span'),
                width2, left2;

            bar2.classList.add('dot');
            $navMovingDotBar.appendChild(bar2);

            for (var i = 0, max = $btnMenu13.length; i < max; i++) {
                $btnMenu13[i].addEventListener('mouseenter', function() {
                    width2 = this.offsetWidth,
                        left2 = this.offsetLeft;
                    barMovingCurrentMenu2(width2, left2);
                });
            }

            function barMovingCurrentMenu2(width, left) {
                bar2.style.left = left + (width / 2) + 'px';
                bar2.style.opacity = 1;
            }
        }

        /* Scroll Up */
        $.scrollUp({
            easingType: 'linear',
            scrollSpeed: 900,
            animation: 'fade',
            scrollText: '<i class="fa fa-angle-up"></i>',
        });

        /* Scrolling Effect js */
        // Select all links with hashes
        $('a[href*="#"]')
            // Remove links that don't actually link to anything
            .not('[href="#"]')
            .not('[href="#0"]')
            .click(function(event) {
                // On-page links
                if (
                    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                    location.hostname == this.hostname
                ) {
                    // Figure out element to scroll to
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    // Does a scroll target exist?
                    if (target.length) {
                        // Only prevent default if animation is actually gonna happen
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 500, function() {
                            // Callback after animation
                            // Must change focus!
                            var $target = $(target);
                            $target.focus();
                            if ($target.is(":focus")) { // Checking if the target was focused
                                return false;
                            } else {
                                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                                $target.focus(); // Set focus again
                            };
                        });
                    }
                }
            });


        /* Scroll Up */
        $.scrollUp({
            easingType: 'linear',
            scrollSpeed: 900,
            animation: 'fade',
            scrollText: '<i class="fa fa-angle-up"></i>',
        });

        /* Counter Up */
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });

        /* brand-active */
        $('.brand-active').owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                },
                1200: {
                    items: 5
                }
            }
        })


        /* Client Slider */
        if ($(".testimonials-slider").length) {
            $(".testimonials-slider").owlCarousel({
                autoplay: false,
                smartSpeed: 600,
                margin: 0,
                items: 1,
                loop: true,
                dots: true,
                nav: false,
                navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
                responsive: {
                    0: {
                        items: 1
                    },
                    767: {
                        items: 1
                    },
                    1000: {
                        items: 1
                    }
                }
            });
        }

    });

})(jQuery);