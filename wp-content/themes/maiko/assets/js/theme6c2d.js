;(function ($) {

    "use strict";
    
    var pxl_scroll_top;
    var pxl_window_height;
    var pxl_window_width;
    var pxl_scroll_status = '';
    var pxl_last_scroll_top = 0;
    var pxl_post_slip = false;

    $(window).on('load', function () {
        setTimeout(function() {
            $(".pxl-loader").addClass("is-loaded");
        }, 60);
        $('.pxl-swiper-slider, .pxl-header-mobile-elementor').css('opacity', '1');
        $('.pxl-gallery-scroll').parents('body').addClass('body-overflow').addClass('body-visible-sm');
        pxl_scroll_top = $(window).scrollTop();
        pxl_window_width = $(window).width();
        pxl_window_height = $(window).height();
        maiko_header_sticky();
        maiko_header_mobile();
        maiko_menu_divider_move();
        maiko_scroll_to_top();
        maiko_footer_fixed();
        maiko_shop_quantity();
        maiko_check_scroll();
        maiko_submenu_responsive();
        maiko_panel_anchor_toggle();
        maiko_slider_column_offset();
        maiko_height_ct_grid();
        maiko_bgr_parallax();
        maiko_shop_view_layout();
        maiko_fit_to_screen();
        maiko_el_parallax();
    });

    $(window).on('scroll', function () {
        pxl_scroll_top = $(window).scrollTop();
        pxl_window_height = $(window).height();
        pxl_window_width = $(window).width();
        if (pxl_scroll_top < pxl_last_scroll_top) {
            pxl_scroll_status = 'up';
        } else {
            pxl_scroll_status = 'down';
        }
        pxl_last_scroll_top = pxl_scroll_top;
        maiko_header_sticky();
        maiko_scroll_to_top();
        maiko_footer_fixed();
        maiko_check_scroll();
        maiko_ptitle_scroll_opacity();
        if (pxl_scroll_top < 100) {
            $('.elementor > .pin-spacer').removeClass('scroll-top-active');
        }

    });
    
    $(window).on('resize', function () {
        pxl_window_height = $(window).height();
        pxl_window_width = $(window).width();
        maiko_submenu_responsive();
        maiko_height_ct_grid();
        maiko_header_mobile();
        maiko_slider_column_offset();
        maiko_fit_to_screen();
        maiko_header_sticky();
        setTimeout(function() {
            maiko_menu_divider_move();
        }, 500);
    });

    $(document).ready(function () {
        pxl_window_width = $(window).width();
        maiko_backtotop_progess_bar();
        maiko_button_progess_bar();
        maiko_bgr_hv();
        maiko_type_file_upload();
        maiko_zoom_point();
        maiko_scroll_checkp_blog();

        if(pxl_window_width > 767) {
            maiko_button_parallax();
        }

        $('a[href^="#"]:not(.tabs a)').on('click', function (e) {
            e.preventDefault();

            const target = $(this.getAttribute('href'));

            if (target.length) {
                $('html, body').animate(
                {
                    scrollTop: target.offset().top,
                },
                600
                );
            }
        });

        // 
        $(".btn-svg").on("mouseenter", function(){
            $(this).addClass("active"); 
        }).on("mouseleave", function(){
            $(this).removeClass("active"); 
        });
        // 
        var svgPaths = $('.pxl-icon-list.style-5 svg line, .pxl-icon-list.style-5 svg circle,.pxl-icon-box7 .pxl-item--icon svg path,.pxl-icon-box7 .pxl-item--icon svg line,.pxl-icon-box7 .pxl-item--icon svg rect,.pxl-icon-box7 .pxl-item--icon svg circle');
        var svgPaths_load = $('.pxl-icon-list.style-5 .animated svg path, .pxl-icon-list.style-5 .animated svg line, .pxl-icon-list.style-5 .animated svg circle');
        svgPaths.each(function() {
            var totalLength = this.getTotalLength();

            $(this).attr({
                'stroke-dashoffset': totalLength,
                'stroke-dasharray': totalLength,
            });
        });


        // Button Image Scroll
        var isSlidUp = false;

        $("#scrollButton").click(function() {

            var $targetImage = $(".targetImage");
            var imgHeight = $targetImage.height();
            var containerHeight = $(".pxl-image-single.button-scroll").height();

            var translateYValue = - (imgHeight - containerHeight);
            console.log(translateYValue);

            var newYValue = isSlidUp ? "0px" : translateYValue + "px";
            var buttonText = isSlidUp ? "Slide Image Up" : "Slide Image Down";
            var buttonClassRemove = isSlidUp ? "up" : "down";
            var buttonClassAdd = isSlidUp ? "down" : "up";

            gsap.to($targetImage, {
                y: newYValue, 
                duration: 1,
                ease: "power2.out"
            });

            $("#scrollButton")
            .text(buttonText)
            .removeClass(buttonClassRemove)
            .addClass(buttonClassAdd);

            isSlidUp = !isSlidUp;
        });

               /* Custom One Page by theme */
        if($('.pxl-link-scroll1').length) {
            $('.pxl-item--onepage').on('click', function (e) {
                var _this = $(this);
                var _link = $(this).attr('href');
                var _id_data = e.currentTarget.hash;
                var _offset;
                var _data_offset = $(this).attr('data-onepage-offset');
                if(_data_offset) {
                    _offset = _data_offset;
                } else {
                    _offset = 0;
                }
                if ($(_id_data).length === 1) {
                    var _target = $(_id_data);
                    $('.pxl-onepage-active').removeClass('pxl-onepage-active');
                    _this.addClass('pxl-onepage-active');
                    $('html, body').stop().animate({ scrollTop: _target.offset().top - _offset }, 1000);   
                    return false;
                } else {
                    window.location.href = _link;
                }
                return false;
            });
            $.each($('.pxl-item--onepage'), function (index, item) {
                var target = $(item).attr('href');
                var el =  $(target);
                var _data_offset = $(item).attr('data-onepage-offset');
                var waypoint = new Waypoint({
                    element: el[0],
                    handler: function(direction) {
                        if(direction === 'down'){
                            $('.pxl-onepage-active').removeClass('pxl-onepage-active');
                            $(item).addClass('pxl-onepage-active');
                        }
                        else if(direction === 'up'){
                            var prev = $(item).parent().prev().find('.pxl-item--onepage');
                            $(item).removeClass('pxl-onepage-active');
                            if(prev.length > 0)
                                prev.addClass('pxl-onepage-active');
                        }
                    },
                    offset: _data_offset,
                });
            });
        }

// 
        $('.pxl-contact-form .cm-divider.your-service').on('click', function(){
            $('.pxl-contact-form .cm-divider').removeClass('active');
            $(this).addClass('active');
        });
        $('.pxl-counter7 .pxl-counter--holder').on('click', function(){
            $('.pxl-counter7 .pxl-counter--holder').removeClass('active');
            $(this).addClass('active');
        });
        // 
        $('.cm-divider input,.cm-divider textarea').on('focus', function() {
            $(this).closest('.cm-divider').addClass('focused');
        });
        $('.cm-divider input,.cm-divider textarea').on('blur', function() {
            $(this).closest('.cm-divider').removeClass('focused');
        });

    /* Start Menu Mobile */
        $('.pxl-header-menu li.menu-item-has-children').append('<span class="pxl-menu-toggle"></span>');
        $('.pxl-menu-toggle').on('click', function () {
            if( $(this).hasClass('active')){
                $(this).closest('ul').find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();    
            }else{
                $(this).closest('ul').find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
                $(this).toggleClass('active');
                $(this).parent().find('> .sub-menu').toggleClass('active');
                $(this).parent().find('> .sub-menu').slideToggle();
            }      
        });

        $("#pxl-nav-mobile, .pxl-anchor-mobile-menu").on('click', function () {
            $(this).toggleClass('active');
            $('body').toggleClass('body-overflow');
            $('.pxl-header-menu').toggleClass('active');
        });

        $(".pxl-menu-close, .pxl-header-menu-backdrop, #pxl-header-mobile .pxl-menu-primary a.is-one-page").on('click', function () {
            $(this).parents('.pxl-header-main').find('.pxl-header-menu').removeClass('active');
            $('#pxl-nav-mobile').removeClass('active');
            $('body').toggleClass('body-overflow');
        });
    /* End Menu Mobile */

               /* Custom Grid Filter Moving Border */
        $('.pxl-grid-filter,.pxl-tabs--inner').each(function () {
            var marker = $(this).find('.filter-marker'),
            item = $(this).find('.filter-item,.pxl-item--title'),
            current = $(this).find('.filter-item.active,.pxl-item--title.active');

            var offsetTop = current.length ? current.position().top : 0;

            marker.css({
                top: offsetTop + (current.length ? current.outerHeight() : 0),
                left: current.length ? current.position().left : 0,
                width: current.length ? current.outerWidth() : 0,
                display: "block"
            });

            item.mouseover(function () {
                var self = $(this),
                offsetacTop = self.position().top,
                offsetLeft = self.position().left,
                width = self.outerWidth() || current.outerWidth(),
                top = offsetacTop == 0 ? 0 : offsetacTop || offsetTop,
                left = offsetLeft == 0 ? 0 : offsetLeft || current.position().left;

                marker.stop().animate({
                    top: top + (current.length ? current.outerHeight() : 0),
                    left: left,
                    width: width,
                }, 300);
            });

            item.on('click', function () {
                current = $(this);
            });

            item.mouseleave(function () {
                var offsetlvTop = current.length ? current.position().top : 0;
                marker.stop().animate({
                    top: offsetlvTop + (current.length ? current.outerHeight() : 0),
                    left: current.length ? current.position().left : 0,
                    width: current.length ? current.outerWidth() : 0
                }, 300);
            });
        });


        $('.pxl-menu-hidden-sidebar .pxl-menu-hidden > li').on('mouseenter', function () {
            $(this).removeClass('hoverd').siblings().addClass('hoverd');
        });

        $('.pxl-menu-hidden-sidebar .pxl-menu-hidden > li').on('mouseleave', function () {
            $(this).removeClass('hoverd').siblings().removeClass('hoverd');
        });

        /* Menu Hidden Sidebar Popup */
        const $menuItems = $('.pxl-menu-hidden-sidebar li.menu-item-has-children > a');
        $menuItems.append('<span class="pxl-arrow-toggle"><i class="fas fa-chevron-right"></i></span>');

        $menuItems.on('mouseenter', function () {
            const $this = $(this);
            const $subMenu = $this.next('.sub-menu');
            const $closestUl = $this.closest('ul');
            const $activeSubMenu = $closestUl.find('.sub-menu.active');
            const $activeLink = $closestUl.find('a.active');

            if ($this.hasClass('active')) {
                return;
            }

            $activeSubMenu.removeClass('active').slideUp(300);
            $activeLink.removeClass('active');

            $this.addClass('active');
            $subMenu.addClass('active').slideDown(300);
        });

        /*Start Menu popup */
        $('.pxl-menu-hidden-sidebar .pxl-menu-button').on('click', function () {
            const $menuSidebar = $(this).parents('.pxl-menu-hidden-sidebar');
            $menuSidebar.toggleClass('active');

            if ($menuSidebar.hasClass('active')) {
                const timeline = gsap.timeline({ ease: "power4.inOut" });
                // timeline.to('.pxl-menu-hidden > li', {  duration: 0.25, opacity: 1, y: -25, ease: Power2.out});
                timeline.to('.pxl-menu-popup-wrap .pxl-item--image', {  duration: 0.25, opacity: 1, x: -25, rotate: '-15deg', ease: Power2.out});
                timeline.to('.pxl-menu-popup-wrap .pxl-item-content', {  duration: 0.25, opacity: 1, x: -25, ease: Power2.out});
                $('body').toggleClass('body-overflow');
            }
        });

        $('.pxl-menu-popup-close').on('click', function () {
            const $menuSidebar = $(this).parents('.pxl-menu-hidden-sidebar');
            const timeline = gsap.timeline({ ease: "power2.inOut" });

            $menuSidebar.removeClass('active');
            $('body').removeClass('body-overflow');

            // timeline.to('.pxl-menu-hidden > li', {  duration: 0.25, opacity: 0, y: 25, ease: Power2.out});
            timeline.to('.pxl-menu-popup-wrap .pxl-item--image', {  duration: 0.25, opacity: 0, x: 25, rotate: '0deg', ease: Power2.out});
            timeline.to('.pxl-menu-popup-wrap .pxl-item-content', {  duration: 0.25, opacity: 0, x: 25, ease: Power2.out});
        });

        /*End Menu popup */

        $('.pxl-menu-popup-overlay').on('click', function () {
            const $parent = $(this).parent();
            $parent.removeClass('active').addClass('boxOut');
            $('body').removeClass('body-overflow');
        });

        $('.pxl-menu-hidden-sidebar .pxl-menu-hidden a.is-one-page').on('click', function () {
            const $menuSidebar = $(this).parents('.pxl-menu-hidden-sidebar');
            $menuSidebar.removeClass('active').addClass('boxOut');
            $('body').removeClass('body-overflow');
        });

        const $firstMenuItem = $('.pxl-menu-hidden-sidebar li.menu-item-has-children:first-child > a');
        $firstMenuItem.addClass('active');
        $firstMenuItem.next('.sub-menu').addClass('active').slideDown();

        /* Custom Effects */
        function setupPxlTransitions() {
            $('.pxl-parent-transition').each(function () {
                const $parent = $(this);
                const $transitions = $parent.find('.pxl-transtion');

                $transitions.addClass('pxl-hover-transition');

                $parent.on('mouseenter', function () {
                    $transitions.addClass('pxl-hover-transition');
                });

                $parent.find('.pxl-switch-button').on('mouseover', function () {
                    $transitions.removeClass('pxl-hover-transition');
                });
            });
        }

    /* Menu Vertical */
        $('.pxl-nav-vertical li.menu-item-has-children > a').append('<span class="pxl-arrow-toggle"><i class="fas fa-chevron-up"></i></span>');
        $('.pxl-nav-vertical li.menu-item-has-children > a').on('click', function () {
            if( $(this).hasClass('active')){
                $(this).next().toggleClass('active').slideToggle(); 
            }else{
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
                $(this).closest('ul').find('a.active').toggleClass('active');
                $(this).find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).toggleClass('active');
                $(this).next().toggleClass('active').slideToggle();
            }   
        });

        $(".comments-area .btn-submit").append('<i class="fas fa-comment"></i>');
    /* Mega Menu Max Height */
        var m_h_mega = $('li.pxl-megamenu > .sub-menu > .pxl-mega-menu-elementor').outerHeight();
        var w_h_mega = $(window).height();
        var w_h_mega_css = w_h_mega - 120;
        if(m_h_mega > w_h_mega) {
            $('li.pxl-megamenu > .sub-menu > .pxl-mega-menu-elementor').css('max-height', w_h_mega_css + 'px');
            $('li.pxl-megamenu > .sub-menu > .pxl-mega-menu-elementor').css('overflow-x', 'scroll');
        }
        // Active Mega Menu Hover
        $(document).on({
            mouseenter: function () {
                $(this).parents('.elementor-section').addClass('section-mega-active');
            },
            mouseleave: function () {
                $(this).parents('.elementor-section').removeClass('section-mega-active');
            }
        }, 'li.pxl-megamenu');
    /* End Mega Menu Max Height */
    /* Search Popup */
        var $search_wrap_init = $("#pxl-search-popup");
        var search_field = $('#pxl-search-popup .search-field');
        var $body = $('body');

        $(".pxl-search-popup-button").on('click', function(e) {
            if (!$search_wrap_init.hasClass('active')) {
                $search_wrap_init.addClass('active');
                setTimeout(function() { search_field.get(0).focus(); }, 500);
            } else if (search_field.val() === '') {
                $search_wrap_init.removeClass('active');
                search_field.get(0).focus();
            }
            e.preventDefault();
            return false;
        });

        $(".pxl-subscribe-popup .pxl-item--overlay, .pxl-subscribe-popup .pxl-item--close").on('click', function (e) {
            $(this).parents('.pxl-subscribe-popup').removeClass('pxl-active');
            e.preventDefault();
            return false;
        });

        $("#pxl-search-popup .pxl-item--overlay, #pxl-search-popup .pxl-item--close").on('click', function (e) {
            $body.addClass('pxl-search-out-anim');
            setTimeout(function () {
                $body.removeClass('pxl-search-out-anim');
            }, 800);
            setTimeout(function () {
                $search_wrap_init.removeClass('active');
            }, 800);
            e.preventDefault();
            return false;
        });

    /* Scroll To Top */

        $('.pxl-scroll-top').on('click', function () {
            $('html, body').animate({scrollTop: 0}, 1200);
            $(this).parents('.pxl-wapper').find('.elementor > .pin-spacer').addClass('scroll-top-active');
            return false;
        });

    /* Animate Time Delay */

        $('.pxl-grid-masonry').each(function () {
            var eltime = 80;
            var elt_inner = $(this).children().length;
            var _elt = elt_inner - 1;
            $(this).find('> .pxl-grid-item > .wow').each(function (index, obj) {
                $(this).css('animation-delay', eltime + 'ms');
                if (_elt === index) {
                    eltime = 80;
                    _elt = _elt + elt_inner;
                } else {
                    eltime = eltime + 80;
                }
            });
        });

        $('.btn-text-nina').each(function () {
            var eltime = 0.045;
            var elt_inner = $(this).children().length;
            var _elt = elt_inner - 1;
            $(this).find('> .pxl--btn-text > span').each(function (index, obj) {
                $(this).css('transition-delay', eltime + 's');
                eltime = eltime + 0.045;
            });
        });

        $('.btn-text-nanuk').each(function () {
            var eltime = 0.05;
            var elt_inner = $(this).children().length;
            var _elt = elt_inner - 1;
            $(this).find('> .pxl--btn-text > span').each(function (index, obj) {
                $(this).css('animation-delay', eltime + 's');
                eltime = eltime + 0.05;
            });
        });

        $('.btn-text-smoke').each(function () {
            var eltime = 0.05;
            var elt_inner = $(this).children().length;
            var _elt = elt_inner - 1;
            $(this).find('> .pxl--btn-text > span > span > span').each(function (index, obj) {
                $(this).css('--d', eltime + 's');
                eltime = eltime + 0.05;
            });
        });

        $('.btn-text-reverse .pxl-text--front, .btn-text-reverse .pxl-text--back').each(function () {
            var eltime = 0.05;
            var elt_inner = $(this).children().length;
            var _elt = elt_inner - 1;
            $(this).find('.pxl-text--inner > span').each(function (index, obj) {
                $(this).css('transition-delay', eltime + 's');
                eltime = eltime + 0.05;
            });
        });

    /* End Animate Time Delay */

    /* Lightbox Popup */
        $('.pxl-action-popup').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

    /* Page Title Parallax */
        if($('#pxl-page-title-default').hasClass('pxl--parallax')) {
            $(this).stellar();
        }

    /* Cart Sidebar Popup */
        $(".pxl-cart-sidebar-button").on('click', function () {
            $('body').addClass('body-overflow');
            $('#pxl-cart-sidebar').addClass('active');
        });
        $("#pxl-cart-sidebar .pxl-popup--overlay, #pxl-cart-sidebar .pxl-item--close").on('click', function () {
            $('body').removeClass('body-overflow');
            $('#pxl-cart-sidebar').removeClass('active');
        });
        $(".pxl-accordion1.style2 .pxl-accordion--content").find("br").remove();

    /* Start Icon Bounce */
        var boxEls = $('.el-bounce, .pxl-image-effect1, .el-effect-zigzag');
        $.each(boxEls, function(boxIndex, boxEl) {
            loopToggleClass(boxEl, 'active');
        });

        function loopToggleClass(el, toggleClass) {
            el = $(el);
            let counter = 0;
            if (el.hasClass(toggleClass)) {
                waitFor(function () {
                    counter++;
                    return counter == 2;
                }, function () {
                    counter = 0;
                    el.removeClass(toggleClass);
                    loopToggleClass(el, toggleClass);
                }, 'Deactivate', 1000);
            } else {
                waitFor(function () {
                    counter++;
                    return counter == 3;
                }, function () {
                    counter = 0;
                    el.addClass(toggleClass);
                    loopToggleClass(el, toggleClass);
                }, 'Activate', 1000);
            }
        }

        function waitFor(condition, callback, message, time) {
            if (message == null || message == '' || typeof message == 'undefined') {
                message = 'Timeout';
            }
            if (time == null || time == '' || typeof time == 'undefined') {
                time = 100;
            }
            var cond = condition();
            if (cond) {
                callback();
            } else {
                setTimeout(function() {
                    waitFor(condition, callback, message, time);
                }, time);
            }
        }
    /* End Icon Bounce */

    /* Image Effect */
        if($('.pxl-image-tilt').length){
            $('.pxl-image-tilt').parents('.elementor-top-section').addClass('pxl-image-tilt-active');
            $('.pxl-image-tilt').each(function () {
                var pxl_maxtilt = $(this).data('maxtilt'),
                pxl_speedtilt = $(this).data('speedtilt'),
                pxl_perspectivetilt = $(this).data('perspectivetilt');
                VanillaTilt.init(this, {
                    max: pxl_maxtilt,
                    speed: pxl_speedtilt,
                    perspective: pxl_perspectivetilt
                });
            });
        }

    /* Select Theme Style */
        $('.wpcf7-select').each(function(){
            var $this = $(this), numberOfOptions = $(this).children('option').length;

            $this.addClass('pxl-select-hidden'); 
            $this.wrap('<div class="pxl-select"></div>');
            $this.after('<div class="pxl-select-higthlight"></div>');

            var $styledSelect = $this.next('div.pxl-select-higthlight');
            $styledSelect.text($this.children('option').eq(0).text());

            var $list = $('<ul />', {
                'class': 'pxl-select-options'
            }).insertAfter($styledSelect);

            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }

            var $listItems = $list.children('li');

            $styledSelect.click(function(e) {
                e.stopPropagation();
                $('div.pxl-select-higthlight.active').not(this).each(function(){
                    $(this).removeClass('active').next('ul.pxl-select-options').addClass('pxl-select-lists-hide');
                });
                $(this).toggleClass('active');
            });

            $listItems.click(function(e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));
            });

            $(document).click(function() {
                $styledSelect.removeClass('active');
            });

        });

    /* Nice Select */
        $('.woocommerce-ordering .orderby, #pxl-sidebar-area select, .variations_form.cart .variations select, .pxl-open-table select, .pxl-nice-select').each(function () {
            $(this).niceSelect();
        });

        $('.pxl-post-list .nice-select').each(function () {
            $(this).niceSelect();
        });

    /* Typewriter */
        if($('.pxl-title--typewriter').length) {
            function typewriterOut(elements, callback)
            {
                if (elements.length){
                    elements.eq(0).addClass('is-active');
                    elements.eq(0).delay( 3000 );
                    elements.eq(0).removeClass('is-active');
                    typewriterOut(elements.slice(1), callback);
                }
                else {
                    callback();
                }
            }

            function typewriterIn(elements, callback)
            {
                if (elements.length){
                    elements.eq(0).addClass('is-active');
                    elements.eq(0).delay( 3000 ).slideDown(3000, function(){
                        elements.eq(0).removeClass('is-active');
                        typewriterIn(elements.slice(1), callback);
                    });
                }
                else {
                    callback();
                }
            }

            function typewriterInfinite(){
                typewriterOut($('.pxl-title--typewriter .pxl-item--text'), function(){ 
                    typewriterIn($('.pxl-title--typewriter .pxl-item--text'), function(){
                        typewriterInfinite();
                    });
                });
            }
            $(function(){
                typewriterInfinite();
            });
        }
    /* End Typewriter */

    /* Section Particles */      
        setTimeout(function() {
            $(".pxl-row-particles").each(function() {
                particlesJS($(this).attr('id'), {
                  "particles": {
                    "number": {
                        "value": $(this).data('number'),
                    },
                    "color": {
                        "value": $(this).data('color')
                    },
                    "shape": {
                        "type": "circle",
                    },
                    "size": {
                        "value": $(this).data('size'),
                        "random": $(this).data('size-random'),
                    },
                    "line_linked": {
                        "enable": false,
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": $(this).data('move-direction'),
                        "random": true,
                        "out_mode": "out",
                    }
                },
                "retina_detect": true
            });
            });
        }, 400);

    /* Get checked input - Mailchimpp */
        $('.mc4wp-form input:checkbox').change(function(){
            if($(this).is(":checked")) {
                $('.mc4wp-form').addClass("pxl-input-checked");
            } else {
                $('.mc4wp-form').removeClass("pxl-input-checked");
            }
        });

    /* Scroll to content */
        $('.pxl-link-to-section .btn').on('click', function(e) {
            var id_scroll = $(this).attr('href');
            var offsetScroll = $('.pxl-header-elementor-sticky').outerHeight();
            e.preventDefault();
            $("html, body").animate({ scrollTop: $(id_scroll).offset().top - offsetScroll }, 600);
        });

        // Hover Item Active
        $( ".pxl-post-modern1 .pxl-post--content .pxl-post--item" )
        .on( "mouseenter", function() {
            $(this).addClass("active");          
            $(".pxl-post-modern1 .pxl-post--images .pxl-post--featured").removeClass('active');       
            var selected_item = $(this).find(".pxl-content--inner").attr("data-image");
            $(selected_item).addClass('active').removeClass('non-active');
        } )
        .on( "mouseleave", function() {
            $(".pxl-post-modern1 .pxl-post--content .pxl-post--item").removeClass('active');
            $(".pxl-post-modern1 .pxl-post--images .pxl-post--featured").removeClass('non-active');
            var selected_item = $(this).find(".pxl-content--inner").attr("data-image");
            $(selected_item).removeClass('active').addClass('non-active');
        } 
        );

        // Hover Overlay Effect
        $('.pxl-overlay-shake').mousemove(function(event){ 
            var offset = $(this).offset();
            var W = $(this).outerWidth();
            var X = (event.pageX - offset.left);
            var Y = (event.pageY - offset.top);
            $(this).find('.pxl-overlay--color').css({
                'top' : + Y + 'px',
                'left' : + X + 'px'
            });
        });

        //Some Widget Default
        //$('.widget .cat-item a, .widget_archive li a').append('<span class="pxl-item--divider"></span>');

    /* Social Button Click */
        $('.pxl-social--button').on('click', function () {
            $(this).toggleClass('active');
        });
        $(document).on('click', function (e) {
            if (e.target.className == 'pxl-social--button active')
                $('.pxl-social--button').removeClass('active');
        });

        // Header Home 2
        $('#home-2-header').append('<span class="pxl-header-divider1"></span><span class="pxl-header-divider2"></span><span class="pxl-header-divider3"></span><span class="pxl-header-divider4"></span>');
        $('#home-2-header-sticky').append('<span class="pxl-header-divider2"></span><span class="pxl-header-divider4"></span>');

    });

jQuery(document).ajaxComplete(function(event, xhr, settings){
    maiko_shop_quantity();
    maiko_height_ct_grid();
    maiko_bgr_hv();
});

jQuery( document ).on( 'updated_wc_div', function() {
    maiko_shop_quantity();
} );

/* Header Sticky */
function maiko_header_sticky() {
    var isInViewport = false;

    $('.pxl-tabs-slip, .pxl-images-slip, .pxl-texts-slip').each(function () {
        var rect = this.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
            isInViewport = true;
            return false; 
        }
    });

    if (isInViewport) {
        return;
    }

    if ($('#pxl-header-elementor').hasClass('is-sticky')) {
        if (pxl_scroll_top > 100) {
            $('.pxl-header-elementor-sticky.pxl-sticky-stb').addClass('pxl-header-fixed');
            $('#pxl-header-mobile').addClass('pxl-header-mobile-fixed');
        } else {
            $('.pxl-header-elementor-sticky.pxl-sticky-stb').removeClass('pxl-header-fixed');
            $('#pxl-header-mobile').removeClass('pxl-header-mobile-fixed');
        }

        if (pxl_scroll_status == 'up' && pxl_scroll_top > 100) {
            $('.pxl-header-elementor-sticky.pxl-sticky-stt').addClass('pxl-header-fixed');
        } else {
            $('.pxl-header-elementor-sticky.pxl-sticky-stt').removeClass('pxl-header-fixed');
        }
    }

    $('.pxl-header-elementor-sticky').parents('body').addClass('pxl-header-sticky');
}


/* Header Mobile */
function maiko_header_mobile() {
    var h_header_mobile = $('#pxl-header-elementor').outerHeight();
    if(pxl_window_width < 1199) {
        $('#pxl-header-elementor').css('min-height', h_header_mobile + 'px');
    }
}

/* Scroll To Top */
function maiko_scroll_to_top() {
    if (pxl_scroll_top < pxl_window_height) {
        $('.pxl-scroll-top,.pxl-link-scroll1').addClass('pxl-off').removeClass('pxl-on');
    }
    if (pxl_scroll_top > pxl_window_height) {
        $('.pxl-scroll-top,.pxl-link-scroll1').addClass('pxl-on').removeClass('pxl-off');
    }
}

/* Footer Fixed */
function maiko_footer_fixed() {
    setTimeout(function(){
        var h_footer = $('.pxl-footer-fixed #pxl-footer-elementor').outerHeight() - 1;
        $('.pxl-footer-fixed #pxl-main').css('margin-bottom', h_footer + 'px');
    }, 600);
}

    /* Custom Check Scroll */
function maiko_check_scroll() {
    var $gridItems = $('.pxl-check-scroll .list-item,.pxl-check-scroll .pxl-grid-item');
    var viewportBottom = pxl_scroll_top + $(window).height();

    $gridItems.each(function() {
        var $gridItem = $(this);
        var elementTop = $gridItem.offset().top;
        var elementBottom = elementTop + $gridItem.outerHeight();

        if (elementTop < viewportBottom && elementBottom > pxl_scroll_top) {
            $gridItem.addClass('visible');
        } else {
            $gridItem.removeClass('visible');
        }
        // $('.filter-item,.nice-select .option').click(function() {
        //     $gridItem.removeClass('visible');
        //     $gridItem.addClass('visible');
        // });
    });
}


/* WooComerce Quantity */
function maiko_shop_quantity() {
    "use strict";
    $('#pxl-wapper .quantity').append('<span class="quantity-icon quantity-down pxl-icon--minus"></span><span class="quantity-icon quantity-up pxl-icon--plus"></span>');
    $('.quantity-up').on('click', function () {
        $(this).parents('.quantity').find('input[type="number"]').get(0).stepUp();
        $(this).parents('.woocommerce-cart-form').find('.actions .button').removeAttr('disabled');
    });
    $('.quantity-down').on('click', function () {
        $(this).parents('.quantity').find('input[type="number"]').get(0).stepDown();
        $(this).parents('.woocommerce-cart-form').find('.actions .button').removeAttr('disabled');
    });
    $('.quantity-icon').on('click', function () {
        var quantity_number = $(this).parents('.quantity').find('input[type="number"]').val();
        var add_to_cart_button = $(this).parents( ".product, .woocommerce-product-inner" ).find(".add_to_cart_button");
        add_to_cart_button.attr('data-quantity', quantity_number);
        add_to_cart_button.attr("href", "?add-to-cart=" + add_to_cart_button.attr("data-product_id") + "&quantity=" + quantity_number);
    });
    $('.woocommerce-cart-form .actions .button').removeAttr('disabled');
}

/* Menu Responsive Dropdown */
function maiko_submenu_responsive() {
    var $maiko_menu = $('.pxl-header-elementor-main, .pxl-header-elementor-sticky');
    $maiko_menu.find('.pxl-menu-primary li').each(function () {
        var $maiko_submenu = $(this).find('> ul.sub-menu');
        if ($maiko_submenu.length == 1) {
            if ( ($maiko_submenu.offset().left + $maiko_submenu.width() + 0 ) > $(window).width()) {
                $maiko_submenu.addClass('pxl-sub-reverse');
            }
        }
    });
}

function maiko_panel_anchor_toggle(){
    'use strict';
    $(document).on('click','.pxl-anchor-button',function(e){
        e.preventDefault();
        e.stopPropagation();
        var target = $(this).attr('data-target');
        $(target).toggleClass('active');
        $('body').addClass('body-overflow');
        $('.pxl-popup--conent .wow').addClass('animated').removeClass('aniOut');
        $('.pxl-popup--conent .fadeInPopup').removeClass('aniOut');
        if($(target).find('.pxl-search-form').length > 0){
            setTimeout(function(){
                $(target).find('.pxl-search-form .pxl-search-field').focus();
            },1000);
        }
    });

    $('.pxl-post-taxonomy .pxl-count').each(function() {
        var content = $(this).html();
        if (content) { 
            var newContent = content.replace('(', '');
            var newContent2 = newContent.replace(')', '');
            $(this).html(newContent2);
        }
    });

    $(document).on('click','.pxl-button.pxl-atc-popup > .btn ,.pxl-text-carousel8 .pxl-atc-popup .btn-overlay ,.pxl-icon1 .pxl-icon--popup,.pxl-info-box3 .btn-atc-popup.btn-overlay, .pxl-team-grid .pxl-item--image > a',function(e){
        $('.pxl-page-popup').removeClass('active');
        e.preventDefault();
        e.stopPropagation();
        var target = $(this).attr('data-target');
        $(target).toggleClass('active');
        $('body').addClass('body-overflow');
    });

    $('.pxl-anchor-button').each(function () {
        var t_target = $(this).attr('data-target');
        var t_delay = $(this).attr('data-delay-hover');
        $(t_target).find('.pxl-popup--conent').css('transition-delay', t_delay + 'ms');
        $(t_target).find('.pxl-popup--overlay').css('transition-delay', t_delay + 'ms');
    });

    $(".pxl-hidden-panel-popup .pxl-popup--overlay, .pxl-hidden-panel-popup .pxl-close-popup").on('click', function () {
        $('body').removeClass('body-overflow');
        $('.pxl-hidden-panel-popup').removeClass('active');
        $('.pxl-popup--conent .wow').addClass('aniOut').removeClass('animated');
        $('.pxl-popup--conent .fadeInPopup').addClass('aniOut');
    });

    $(".pxl-icon-box6 .btn-show-more").on('click', function () {
        $(this).parents('.pxl-icon-box6').addClass('active');
        $(this).parents('.pxl-icon-box6').find('.content-2').addClass('active');
    });


    $(".pxl-popup--close").on('click', function () {
        $('body').removeClass('body-overflow');
        $(this).parent().removeClass('active');
    });
    $(".pxl-close-popup").on('click', function () {
        $('body').removeClass('body-overflow');
        $('.pxl-page-popup').removeClass('active');
    });
}

/* Page Title Scroll Opacity */
function maiko_ptitle_scroll_opacity() {
    var divs = $('#pxl-page-title-elementor.pxl-scroll-opacity .elementor-widget'),
    limit = $('#pxl-page-title-elementor.pxl-scroll-opacity').outerHeight();
    if (pxl_scroll_top <= limit) {
        divs.css({ 'opacity' : (1 - pxl_scroll_top/limit)});
    }
}

/* Slider Column Offset */
function maiko_slider_column_offset() {
    var content_w = ($('#pxl-main').width() - 1200) / 2;
    if (pxl_window_width > 1200) {
        $('.pxl-slider2 .pxl-item--left').css('padding-left', content_w + 'px');
    }
}

/* Preloader Default */
$.fn.extend({
    jQueryImagesLoaded: function () {
      var $imgs = this.find('img[src!=""]')

      if (!$imgs.length) {
        return $.Deferred()
        .resolve()
        .promise()
    }

    var dfds = []

    $imgs.each(function () {
        var dfd = $.Deferred()
        dfds.push(dfd)
        var img = new Image()
        img.onload = function () {
            dfd.resolve()
        }
        img.onerror = function () {
            dfd.resolve()
        }
        img.src = this.src
    })

    return $.when.apply($, dfds)
}
})

function maiko_bgr_parallax() {
    setTimeout(function(){
        $('.pxl-section-bg-parallax').each(function() {
            if (!$(this).hasClass('pinned-zoom-clipped') && !$(this).hasClass('pinned-circle-zoom-clipped') && !$(this).hasClass('mask-parallax')) {
                jarallax(this, {
                    speed: 0.2,
                });
            }
        });
    }, 300);
}

function maiko_el_parallax() {
    $('.el-parallax-wrap').on({
        mouseenter: function() {
            const $this = $(this);
            $this.addClass('hovered');
            $this.find('.el-parallax-item').css({
                transition: 'none'
            });
        },
        mouseleave: function() {
            const $this = $(this);
            $this.removeClass('hovered');
            $this.find('.el-parallax-item').css({
                transition: 'transform 0.5s ease',
                transform: 'translate3d(0px, 0px, 0px)'
            });
        },
        mousemove: function(e) {
            const $this = $(this);
            const bounds = this.getBoundingClientRect();
            const centerX = bounds.left + bounds.width / 2;
            const centerY = bounds.top + bounds.height / 2;
            const deltaX = (centerX - e.clientX) * 0.07104;
            const deltaY = (centerY - e.clientY) * 0.10656; 
            
            requestAnimationFrame(() => {
                $this.find('.el-parallax-item').css({
                    transform: `translate3d(${deltaX}px, ${deltaY}px, 0px)`
                });
            });
        }
    });
}

    /* Button Parallax */
function maiko_button_parallax() {
    const $buttons = $('.pxl-menu-hidden-sidebar .pxl-menu-button,.pxl-search-popup-button,.pxl-post-carousel3 .btn-readmore,.pxl-portfolio-carousel6 .btn-readmore a,.pxl-text-carousel8 .btn-readmore a,.pxl-icon1.style-box-paralax a, .pxl-counter5 .pxl-counter--holder, .pxl-counter6 .pxl-counter--holder, .pxl-button .btn-icon-box, .btn.btn-icon-box-hover, .btn.btn-icon-box-dot');
    if ($buttons.length === 0) {
        return;
    }
    $buttons.on('mouseenter', function() {
        const $text = $(this).find('svg');
        if ($text.length === 0) {
            return;
        }
        gsap.set($text, {
            transformOrigin: "50% 50%"
        });
    });
    $buttons.on('mousemove', function(e) {  
        const $btn = $(this); 
        const $text = $btn.find('svg:not(.pxl-scroll-progress-circle), span, .pxl-counter--title, .language, .pxl-anchor-divider, .pxl-anchor--title');
        
        if ($text.length === 0) {
            return;
        }
        const { left, top, width, height } = this.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const deltaX = (e.clientX - centerX) * 0.444;
        const deltaY = (e.clientY - centerY) * 0.444;
        gsap.to([$btn, $text], {
            duration: 0.8,
            x: deltaX,
            y: deltaY,
            ease: "power3.out"
        });
    });
    $buttons.on('mouseleave', function() {
        const $btn = $(this); 
        const $text = $btn.find('svg:not(.pxl-scroll-progress-circle), span, .pxl-counter--title, .language, .pxl-anchor-divider, .pxl-anchor--title');
        if ($text.length === 0) {
            return;
        }
        gsap.to([$btn, $text], {
            duration: 0.8,
            x: 0,
            y: 0,
            ease: "elastic.out(1, 0.3)"
        });
    });
}

function maiko_bgr_hv() {
    const $slides = $('.pxl-portfolio-carousel2 .pxl-swiper-slide .pxl-post--inner');
    const $backgroundChanger = $('.bgr-change');

    $slides.each(function () {
        const bg = extractBackgroundImage($(this).css('background-image'));
        $backgroundChanger.css('background-image', `url(${bg})`);
    });

    $(document).on("mouseenter", ".pxl-portfolio-carousel2 .pxl-swiper-slide .pxl-post--inner", function () {
        const bg = extractBackgroundImage($(this).css('background-image'));
        $backgroundChanger.css('background-image', `url(${bg})`);
        $backgroundChanger.addClass('flicker');

        setTimeout(() => {
            $backgroundChanger.removeClass('flicker');
        }, 600);
    });
}

function extractBackgroundImage(backgroundImage) {
    return backgroundImage.replace(/url\(["']?|["']?\)/g, '');
}

/* Menu Divider Move */
function maiko_menu_divider_move() {
    $('.pxl-nav-menu1.fr-style-box, .pxl-nav-menu1.fr-style-box2, .pxl-menu-show-line').each(function () {
        var current = $(this).find('.pxl-menu-primary > .current-menu-item, .pxl-menu-primary > .current-menu-parent, .pxl-menu-primary > .current-menu-ancestor');
        if(current.length > 0) {
            var marker = $(this).find('.pxl-divider-move');
            marker.css({
                left: current.position().left,
                width: current.outerWidth(),
                display: "block"
            });
            marker.addClass('active');
            current.addClass('pxl-shape-active');
            if (Modernizr.csstransitions) {
                $(this).find('.pxl-menu-primary > li').mouseover(function () {
                    var self = $(this),
                    offsetLeft = self.position().left,
                    width = self.outerWidth() || current.outerWidth(),
                    left = offsetLeft == 0 ? 0 : offsetLeft || current.position().left;
                    marker.css({
                        left: left,
                        width: width,
                    });
                    marker.addClass('active');
                    current.removeClass('pxl-shape-active');
                });
                $(this).find('.pxl-menu-primary').mouseleave(function () {
                    marker.css({
                        left: current.position().left,
                        width: current.outerWidth()
                    });
                    current.addClass('pxl-shape-active');
                });
            }
        } else {
            var marker = $(this).find('.pxl-divider-move');
            var current = $(this).find('.pxl-menu-primary > li:nth-child(1)');
            marker.css({
                left: current.position().left,
                width: current.outerWidth(),
                display: "block"
            });
            if (Modernizr.csstransitions) {
                $(this).find('.pxl-menu-primary > li').mouseover(function () {
                    var self = $(this),
                    offsetLeft = self.position().left,
                    width = self.outerWidth() || current.outerWidth(),
                    left = offsetLeft == 0 ? 0 : offsetLeft || current.position().left;
                    marker.css({
                        left: left,
                        width: width,
                    });
                    marker.addClass('active');
                });
                $(this).find('.pxl-menu-primary').mouseleave(function () {
                    marker.css({
                        left: current.position().left,
                        width: current.outerWidth()
                    });
                    marker.removeClass('active');
                });
            }
        }
    });
}

/* Back To Top Progress Bar */
function maiko_backtotop_progess_bar() {
    if ($('.pxl-scroll-top').length > 0) {
        var progressPaths = document.querySelectorAll('.pxl-scroll-top path');
        progressPaths.forEach(function (progressPath) {
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
            progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        });

        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            progressPaths.forEach(function (progressPath) {
                var pathLength = progressPath.getTotalLength();
                var progress = pathLength - (scroll * pathLength / height);
                progressPath.style.strokeDashoffset = progress;
            });
        };

        updateProgress();
        $(window).scroll(updateProgress);

        var offset = 50;
        var duration = 550;
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > offset) {
                $('.pxl-scroll-top').addClass('active-progress');
            } else {
                $('.pxl-scroll-top').removeClass('active-progress');
            }
        });
    }

}

function maiko_button_progess_bar() {
    if ($('.btn-icon-box-dot').length > 0) {
        var progressPaths = document.querySelectorAll('.btn-icon-box-dot path');

        progressPaths.forEach(function (progressPath) {
            var pathLength = progressPath.getTotalLength();
            $(progressPath).attr({
                'stroke-dashoffset': pathLength,
                'stroke-dasharray': pathLength,
            });
            progressPath.getBoundingClientRect(); 
        });
    }
}


/* Custom Type File Upload*/
function maiko_type_file_upload() {

    var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
    isIE = /msie/i.test( navigator.userAgent );

    $.fn.pxl_custom_type_file = function() {

        return this.each(function() {

            var $file = $(this).addClass('pxl-file-upload-hidden'),
            $wrap = $('<div class="pxl-file-upload-wrapper">'),
            $button = $('<button type="button" class="pxl-file-upload-button">Choose File</button>'),
            $input = $('<input type="text" class="pxl-file-upload-input" placeholder="No File Choose" />'),
            $label = $('<label class="pxl-file-upload-button" for="'+ $file[0].id +'">Choose File</label>');
            $file.css({
                position: 'absolute',
                opacity: '0',
                visibility: 'hidden'
            });

            $wrap.insertAfter( $file )
            .append( $file, $input, ( isIE ? $label : $button ) );

            $file.attr('tabIndex', -1);
            $button.attr('tabIndex', -1);

            $button.click(function () {
                $file.focus().click();
            });

            $file.change(function() {

                var files = [], fileArr, filename;

                if ( multipleSupport ) {
                    fileArr = $file[0].files;
                    for ( var i = 0, len = fileArr.length; i < len; i++ ) {
                        files.push( fileArr[i].name );
                    }
                    filename = files.join(', ');
                } else {
                    filename = $file.val().split('\\').pop();
                }

                $input.val( filename )
                .attr('title', filename)
                .focus();
            });

            $input.on({
                blur: function() { $file.trigger('blur'); },
                keydown: function( e ) {
                    if ( e.which === 13 ) {
                        if ( !isIE ) { 
                            $file.trigger('click'); 
                        }
                    } else if ( e.which === 8 || e.which === 46 ) {
                        $file.replaceWith( $file = $file.clone( true ) );
                        $file.trigger('change');
                        $input.val('');
                    } else if ( e.which === 9 ){
                        return;
                    } else {
                        return false;
                    }
                }
            });

        });

    };
    $('.wpcf7-file[type=file]').pxl_custom_type_file();
}

    //divider blog
function maiko_scroll_checkp_blog($scope){
    $('.pxl-service-carousel2 .pxl-post--icon, .pxl-service-list .pxl-post--icon,.pxl-icon-list.style-5,.pxl-icon-box7').each(function () {
        var wcont1 = $(this);

        function checkScrollPosition() {
            var pxl_scroll_top = $(window).scrollTop(),
            viewportBottom = pxl_scroll_top + $(window).height(),
            elementTop = wcont1.offset().top,
            elementBottom = elementTop + wcont1.outerHeight();

            if (elementTop < viewportBottom && elementBottom > pxl_scroll_top) {
                wcont1.addClass('animated');
            }
        }

        checkScrollPosition();

        $(window).on('scroll', function () {
            checkScrollPosition();
        });

    });
}

 //Shop View Grid/List
function maiko_shop_view_layout(){

    $(document).on('click','.pxl-view-layout .view-icon a', function(e){
        e.preventDefault();
        if(!$(this).parent('li').hasClass('active')){
            $('.pxl-view-layout .view-icon').removeClass('active');
            $(this).parent('li').addClass('active');
            $(this).parents('.pxl-content-area').find('ul.products').removeAttr('class').addClass($(this).attr('data-cls'));
        }
    });
}

function maiko_height_ct_grid($scope){
    // $('.pxl-portfolio-grid-layout1 .pxl-grid-item,.pxl-portfolio-carousel2 .pxl-swiper-slide').each(function () {
    //     var elementHeight = $(this).find(".pxl-post-content-hide").height();
    //     $(this).find(".pxl-post-content-hide").css("margin-bottom",  "-"+elementHeight + "px");     
    // });

    $('.pxl-icon-box7').each(function () {
        var elementHeight2 = $(this).find(".pxl-item--description").height();
        $(this).find(".pxl-item--description").css("margin-bottom",  "-"+elementHeight2 + "px");     
    });
}
    // Zoom Point
function maiko_zoom_point() {
    $(".pxl-zoom-point").each(function () {

        let scaleOffset = $(this).data('offset');
        let scaleAmount = $(this).data('scale-mount');

        function scrollZoom() {
            const images = document.querySelectorAll("[data-scroll-zoom]");
            let scrollPosY = 0;
            scaleAmount = scaleAmount / 100;

            const observerConfig = {
                rootMargin: "0% 0% 0% 0%",
                threshold: 0
            };

            images.forEach(image => {
                let isVisible = false;
                const observer = new IntersectionObserver((elements, self) => {
                    elements.forEach(element => {
                        isVisible = element.isIntersecting;
                    });
                }, observerConfig);

                observer.observe(image);

                image.style.transform = `scale(${1 + scaleAmount * percentageSeen(image)})`;

                window.addEventListener("scroll", () => {
                    if (isVisible) {
                        scrollPosY = window.pageYOffset;
                        image.style.transform = `scale(${1 +
                            scaleAmount * percentageSeen(image)})`;
                        }
                    });
            });

            function percentageSeen(element) {
                const parent = element.parentNode;
                const viewportHeight = window.innerHeight;
                const scrollY = window.scrollY;
                const elPosY = parent.getBoundingClientRect().top + scrollY + scaleOffset;
                const borderHeight = parseFloat(getComputedStyle(parent).getPropertyValue('border-bottom-width')) + parseFloat(getComputedStyle(element).getPropertyValue('border-top-width'));
                const elHeight = parent.offsetHeight + borderHeight;

                if (elPosY > scrollY + viewportHeight) {
                    return 0;
                } else if (elPosY + elHeight < scrollY) {
                    return 100;
                } else {
                    const distance = scrollY + viewportHeight - elPosY;
                    let percentage = distance / ((viewportHeight + elHeight) / 100);
                    percentage = Math.round(percentage);

                    return percentage;
                }
            }
        }

        scrollZoom();

    });
}

    // Fit to Screen
function maiko_fit_to_screen() {
    $('.pxl-gallery-scroll.h-fit-to-screen').each(function () {
        var h_adminbar = 0;
        var h_section_header = 0;
        var h_section_footer = 0;
        if ($('#wpadminbar').length == 1) {
            h_adminbar = $('#wpadminbar').outerHeight();
        }
        if ($('#pxl-header-elementor').length == 1) {
            h_section_header = $('#pxl-header-elementor').outerHeight();
        }
        if ($('#pxl-footer-elementor').length == 1) {
            h_section_footer = $('#pxl-footer-elementor').outerHeight();
        }
        var h_total = pxl_window_height - (h_adminbar + h_section_header + h_section_footer);
        $(this).css('height', h_total + 'px');
    });
}


$(document).on('click', function(event) {
    var clickedElement = $(event.target);
    var divWithClass = $('.pxl-icon-box6.active');
    var divWithClass2 = $('.pxl-icon-box6 .content-2');

    if (clickedElement.hasClass('pxl-icon-box6') && clickedElement.hasClass('active')) {
        return;
    }

    var isClickInsideDiv = divWithClass.has(clickedElement).length > 0;

    if (!isClickInsideDiv) {
        divWithClass.removeClass('active');
        divWithClass2.removeClass('active');
    }
});


})(jQuery);