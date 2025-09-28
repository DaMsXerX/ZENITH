( function( $ ) {

     //animation
    function maiko_animation_handler($scope){   
        elementorFrontend.waypoint($(document).find('.pxl-animate'), function () {
            var $animate_el = $(this),
            data = $animate_el.data('settings');  
            if(typeof data != 'undefined' && typeof data['animation'] != 'undefined'){
                setTimeout(function () {
                    $animate_el.removeClass('pxl-invisible').addClass('animated ' + data['animation']);
                }, data['animation_delay']);
            }else{
                setTimeout(function () {
                    $animate_el.removeClass('pxl-invisible').addClass('animated fadeInUp');
                }, 300);
            }
        });

        elementorFrontend.waypoint($scope.find('.pxl-border-animated'), function () {
            $(this).addClass('pxl-animated');
        });

        elementorFrontend.waypoint($scope.find('.pxl-image-single.circle'), function () {
            $(this).addClass('pxl-animated');
        });

        elementorFrontend.waypoint($scope.find('.pxl-divider.animated'), function () {
            $(this).addClass('pxl-animated');
        }); 

        elementorFrontend.waypoint($scope.find('.pxl-item--image.move-from-left'), function () {
            $(this).addClass('pxl-animated');
        });
        elementorFrontend.waypoint($scope.find('.pxl-item--image.move-from-right'), function () {
            $(this).addClass('pxl-animated');
        }); 
    }

    function maiko_section_start_render(){
        var _elementor = typeof elementor != 'undefined' ? elementor : elementorFrontend;
        
        _elementor.hooks.addFilter( 'pxl_section_start_render', function( html, settings, el ) {

            if(typeof settings.pxl_parallax_bg_img != 'undefined' && settings.pxl_parallax_bg_img.url != ''){
                html += '<div class="pxl-section-bg-parallax"></div>';
            }

            if(typeof settings.pxl_color_offset != 'undefined' && settings.pxl_color_offset != 'none'){
                html += '<div class="pxl-section-overlay-color"></div>';
            }

            if(typeof settings.pxl_overlay_img != 'undefined' && settings.pxl_overlay_img.url != ''){
                html += '<div class="pxl-overlay--image pxl-overlay--imageLeft"><div class="bg-image"></div></div>';
            }

            if(typeof settings.pxl_overlay_img2 != 'undefined' && settings.pxl_overlay_img2.url != ''){
                html += '<div class="pxl-overlay--image pxl-overlay--imageRight"><div class="bg-image"></div></div>';
            }

            return html;
        } );

        $('.pxl-section-bg-parallax').parent('.elementor-element').addClass('pxl-section-parallax-overflow');
    }

    function maiko_column_before_render(){
        var _elementor = typeof elementor != 'undefined' ? elementor : elementorFrontend;
        _elementor.hooks.addFilter( 'pxl-custom-column/before-render', function( html, settings, el ) {
            if(typeof settings.pxl_column_parallax_bg_img != 'undefined' && settings.pxl_column_parallax_bg_img.url != ''){
                html += '<div class="pxl-column-bg-parallax"></div>';
            }
            return html;
        } );
    }

    var pxl_widget_image_handler = function( $scope, $ ) {
        /* Ink Transition Effect */
        const inkTriggers = [...document.querySelectorAll('.pxl-image-ink')];
        const pxl_controller = new ScrollMagic.Controller();
        inkTriggers.map(ink => {
            const sceneInk = new ScrollMagic.Scene({
                triggerElement: ink,
                triggerHook: 'onEnter',
            })
            .setClassToggle(ink, 'is-active')
            .reverse(false)
            .addTo(pxl_controller);
        });
    };

    function maiko_parallax_effect(){  
        if( $(document).find('.pxl-parallax-effect.mouse-move').length > 0 ){
            setTimeout(function(){
                $('.pxl-parallax-effect.mouse-move').each(function(index, el) {
                    var $this = $(this);
                    var $bound = 'undefined'; 
                    
                    if( $this.closest('.mouse-move-bound').length > 0 ){
                        $bound = $this.closest('.mouse-move-bound');
                    }
                    if ( $(this).hasClass('bound-section') ){
                        $bound = $this.closest('.elementor-section');
                    }
                    if ( $(this).hasClass('bound-column') ){
                        $bound = $this.closest('.elementor-column');
                    }
                    if ( $(this).hasClass('mouse-move-scope') ){
                        $bound = $this.parents('.mouse-move-scope');

                    }

                    if( $bound != 'undefined' && $bound.length > 0 )
                        maiko_parallax_effect_mousemove($this, $bound);
                });
            }, 600);
        }
    }

    function maiko_triger_tabs($scope) {
        gsap.registerPlugin(ScrollTrigger);

        const $items = $scope.find('.pxl-tabs-slip.style-1 .pxl-item--content');
        const $inners = $scope.find('.pxl-tabs-slip.style-1 .pxl-item--content > .elementor');
        const $endTrigger = $scope.find('.pxl-tabs-slip.style-1 .pxl-tabs--content');

        if ($items.length > 0) {
            $items.each(function(index, item) {
                gsap.to(item, {
                    opacity: 0,
                    scrollTrigger: {
                        trigger: item,
                        start: "center top",
                        end: "bottom top",
                        scrub: true,
                    }
                });

                if (index < $items.length - 1) {
                    gsap.to(item, {
                        scrollTrigger: {
                            trigger: item,
                            start: "top top",
                            end: "bottom bottom+=150",
                            endTrigger: $endTrigger[0],
                            scrub: true,
                            pin: true,
                            pinSpacing: false,
                        }
                    });
                }
            });
        }

        $inners.each(function(index, inner) {
            if (index < $inners.length - 1) {
                gsap.to(inner, {
                    yPercent: -30,
                    scale: 0.9,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: inner,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    }
                });
            }
        });
    }

    function maiko_triger_tabs_image($scope) {
        gsap.registerPlugin(ScrollTrigger);

        const $items = $scope.find('.pxl-images-slip.style-1 .pxl-item--content');
        const $inners_img = $scope.find('.pxl-images-slip.style-1 .pxl-item--content .pxl-item--image');
        const $endTrigger_img = $scope.find('.pxl-images-slip.style-1 .pxl-images--content');

        if ($items.length > 0) {
            $items.each(function(index, item) {
                gsap.to(item, {
                    opacity: 0,
                    scrollTrigger: {
                        trigger: item,
                        start: "center top",
                        end: "bottom top",
                        scrub: true,
                    }
                });

                if (index < $items.length - 1) {
                    gsap.to(item, {
                        scrollTrigger: {
                            trigger: item,
                            start: "top top",
                            end: "bottom bottom+=150",
                            endTrigger: $endTrigger_img[0],
                            scrub: true,
                            pin: true,
                            pinSpacing: false,
                        }
                    });
                }
            });
        }

        $inners_img.each(function(index_m, inner_m) {
            if (index_m < $inners_img.length - 1) {
                gsap.to(inner_m, {
                    yPercent: 0,
                    scale: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: inner_m,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    }
                });
            }
        });
    }

    function maiko_triger($scope) {
        gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

        /* Main navigation */
        let $panelsSection = $scope.find(".pxl-tabs-slip1.style-2"),
        $panelsContainer = $scope.find(".pxl-tabs-slip1.style-2 .pxl-tabs--content"),
        tween;

        const $panels = $scope.find(".pxl-tabs-slip1.style-2 .pxl-tabs--content .pxl-item--content");
        const $anchors = $scope.find(".pxl-tabs-slip1.style-2 .anchor");
        const $paginationFraction = $scope.find(".pagination-fraction");
        const $currentPage = $paginationFraction.find(".current-page");
        const $totalPages = $paginationFraction.find(".total-pages");

        $currentPage.text(formatNumber(1));
        $totalPages.text(formatNumber($panels.length));

        $anchors.each(function() {
            $(this).on("click", function(e) {
                e.preventDefault();
                let targetElem = $(e.target).attr("href"),
                $targetElem = $scope.find(targetElem); 

                let y = $targetElem;

                if ($targetElem.length && $panelsContainer.is($targetElem.parent())) {
                    let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
                    totalMovement = ($panels.length - 1) * $targetElem.outerWidth();
                    y = Math.round(tween.scrollTrigger.start + ($targetElem.position().left / totalMovement) * totalScroll);
                }

                gsap.to(window, {
                    scrollTo: {
                        y: y,
                        autoKill: false
                    },
                    duration: 1
                });
            });
        });

        /* Panels */
        tween = gsap.to($panels, {
            xPercent: -100 * ($panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: $panelsContainer,
                pin: true,
                start: "top top",
                scrub: 1,
                snap: {
                    snapTo: 1 / ($panels.length - 1),
                    inertia: false,
                    duration: { min: 0.1, max: 0.1 }
                },
                end: () => "+=" + ($panelsContainer.outerWidth() - $(window).width()),
                onUpdate: self => {
                    let progress = self.progress; 
                    let currentIndex = Math.round(progress * ($panels.length - 1)) + 1;
                    $currentPage.text(formatNumber(currentIndex));
                }
            }
        });

        function throttle(func, delay) {
            let lastCall = 0;
            return function (...args) {
                const now = new Date().getTime();
                if (now - lastCall >= delay) {
                    lastCall = now;
                    func.apply(this, args);
                }
            };
        }


        $(window).on('scroll', throttle(function() {
            let scrollLeft = $(this).scrollLeft();
            let middleOfScreen = scrollLeft + $(window).width() / 3;

            $panels.each(function(index) {
                let $panel = $(this);
                let panelOffset = $panel.position().left;
                let panelWidth = $panel.outerWidth();

                if (middleOfScreen >= panelOffset && middleOfScreen < panelOffset + panelWidth) {
                    setActiveAnchor(index);
                }
            });
        }, 100));

        function setActiveAnchor(index) {
            $anchors.removeClass("active");
            if ($anchors.eq(index).length) {
                $anchors.eq(index).addClass("active");
            }
        }
        function formatNumber(num) {
            return num < 10 ? `0${num}` : num;
        }
    }

    function maiko_triger_vertical($scope) {
        gsap.registerPlugin(SplitText, ScrollTrigger);

        const scopeElement = $scope[0] || $scope;
        const targets = scopeElement.querySelectorAll(".pxl-texts-slip .pxl-item--text");
        if (!targets.length) return;
        
        ScrollTrigger.saveStyles(".pxl-texts-slip .pxl-item--text");

        targets.forEach((target) => {
          const split = new SplitText(target, { type: "chars" }); 

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: target,
              scrub: 1, 
              start: "top 50%",
              end: "bottom top+=150",
              pin: true, 
              toggleActions: "play pause reverse pause",
          }
      });

          tl.from(split.chars, {
            opacity: 0,         
            rotateX: -90,      
            stagger: 0.01,     
            ease: "power2.out", 
            duration: 0.1,      
        })
          .to(split.chars, {
            opacity: 0,        
            stagger: 0.01,     
            ease: "power2.in",  
            duration: 0.1,        
        });
      });
    }

    function maiko_animation_btn($scope) {
        const $section = $scope.find('.pxl-section-scale .pxl-sticky-mask, .pxl-video-player .pxl-video--inner');
        const cursor = $section.find('.btn-balloon,.btn-video-wrap')[0];
        if (!cursor) return;

        const cursorWidth = cursor.offsetWidth / 2;
        const cursorHeight = cursor.offsetHeight / 2;

        let mouseX = 0;
        let mouseY = 0;
        let isMouseOver = false;

        $section.on('mousemove', function(e) {
            mouseX = e.pageX;
            mouseY = e.pageY;
        });

        $section.on('mouseenter', function() {
            isMouseOver = true;
        });

        function render() {
            if (isMouseOver) {
                const sectionOffset = $section.offset();

                if (mouseX >= sectionOffset.left && mouseX <= sectionOffset.left + $section.width() &&
                    mouseY >= sectionOffset.top && mouseY <= sectionOffset.top + $section.height()) {

                    gsap.to(cursor, {
                        x: mouseX - sectionOffset.left - cursorWidth,
                        y: mouseY - sectionOffset.top - cursorHeight,
                        ease: "none",
                        duration: 0.1
                    });
            }
        }
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);  

    $section.on('mouseleave', function() {
        isMouseOver = false;
        const sectionCenterX = ($section.width() / 2) - cursorWidth;
        const sectionCenterY = ($section.height() / 2) - cursorHeight;

        gsap.to(cursor, {
            x: sectionCenterX,
            y: sectionCenterY,
            ease: "power1.inOut",
            duration: 0.5
        });
    });

    const sectionCenterX = ($section.width() / 2) - cursorWidth;
    const sectionCenterY = ($section.height() / 2) - cursorHeight;

    gsap.set(cursor, {
        x: sectionCenterX,
        y: sectionCenterY
    });
}



function maiko_text_hover_image($scope){

  if($scope.find('.pxl-awards-list,.pxl-portfolio-grid-layout3').length <= 0) return;
  var mouseX = 0,
  mouseY = 0;

  $scope.find('.pxl-awards-list .content-inner,.pxl-portfolio-grid-layout3 .pxl-grid-inner').mousemove(function(e){ 
    var offset = $(this).offset();  
    mouseX = (e.pageX - offset.left);
    mouseY = (e.pageY - offset.top);

});
  gsap.utils.toArray(".pxl-awards-list .fade-in-up, .pxl-portfolio-grid-layout3 .fade-in-up").forEach((element) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 80%", 
          toggleActions: "play none none none"
      },
      duration: 1, 
      opacity: 0,  
      y: 80,   
      ease: "power4.out"
  });
  });

  $scope.find('.pxl-awards-list .pxl--item,.pxl-portfolio-grid-layout3 .pxl-grid-item').on("mouseenter", function() {  
    $(this).removeClass('deactive').addClass('active');   
    var target = $(this).attr('data-target');
    $(this).closest('.content-inner,.pxl-grid-inner').find(target).removeClass('deactive').addClass('active');   
}); 
  $scope.find('.pxl-awards-list .pxl--item,.pxl-portfolio-grid-layout3 .pxl-grid-item').on("mouseleave", function() {
    $(this).addClass('deactive').removeClass('active');  
    var target = $(this).attr('data-target');
    $(this).closest('.content-inner,.pxl-grid-inner').find(target).addClass('deactive').removeClass('active');  
});
  const s = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
},
t = gsap.quickSetter($scope.find('.pxl-awards-list .content-inner,.pxl-portfolio-grid-layout3 .pxl-grid-inner'), "css"),
e = gsap.quickSetter($scope.find('.pxl-awards-list .content-inner,.pxl-portfolio-grid-layout3 .pxl-grid-inner'), "css");

gsap.ticker.add((() => {
    const o = .15,
    i = 1 - Math.pow(.85, gsap.ticker.deltaRatio());
    s.x += (mouseX - s.x) * i, 
    s.y += (mouseY - s.y) * i, 
    t({
        "--pxl-mouse-x": `${s.x}px`
    }), e({
        "--pxl-mouse-y": `${s.y}px`
    })
}))
}

function maiko_text_hover_image_grid($scope){
    if($scope.find('.pxl-portfolio-grid-layout6').length <= 0) return;

    gsap.utils.toArray(".pxl-portfolio-grid-layout6 .fade-in-up").forEach((element) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 100%", 
                toggleActions: "play none none none"
            },
            duration: 1, 
            opacity: 0,  
            y: 80,   
            ease: "power4.out"
        });
    });

    $scope.find('.pxl-portfolio-grid-layout6 .pxl-grid-item').on("mouseenter", function() {
        $scope.find('.pxl-portfolio-grid-layout6 .pxl-grid-item').removeClass('active').addClass('deactive');
        $scope.find('.pxl-post-container-hover .img-item').removeClass('active').addClass('deactive');
        $(this).removeClass('deactive').addClass('active');
        var target = $(this).attr('data-target');
        $(this).closest('.pxl-post-container-hover').find(target).removeClass('deactive').addClass('active');
    });

    var $firstItem = $scope.find('.pxl-portfolio-grid-layout6 .pxl-grid-item').first();
    $firstItem.removeClass('deactive').addClass('active');
    var target = $firstItem.attr('data-target');
    $firstItem.closest('.pxl-post-container-hover').find(target).removeClass('deactive').addClass('active');
}


function maiko_parallax_effect_mousemove($this, $bound){  

    var rect = $bound[0].getBoundingClientRect();

    var mouse = {x: 0, y: 0, moved: false};

    $bound.hover(
        function(e) { 
            mouse.moved = true; 
        }, function(e) {
            mouse.moved = false;
            gsap.to($this[0], {
                duration: 0.5,
                x: 0,
                y: 0
            });
        }
        );

    $bound.mousemove(function(e) {
        mouse.moved = true;
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        gsap.to($this[0], {
            duration: 0.5,
            x: (mouse.x - rect.width / 2) / rect.width * -100,
            y: (mouse.y - rect.height / 2) / rect.height * -100
        });
    });

    $(window).on('resize scroll', function(){
        rect = $bound[0].getBoundingClientRect();
    })

}

function maiko_css_inline_js(){
    var _inline_css = "<style>";
    $(document).find('.pxl-inline-css').each(function () {
        var _this = $(this);
        _inline_css += _this.attr("data-css") + " ";
        _this.remove();
    });
    _inline_css += "</style>";
    $('head').append(_inline_css);
}

function maiko_parallax_bg(){  
    $(document).find('.pxl-parallax-background').parallaxBackground({
        event: 'mouse_move',
        animation_type: 'shift',
        animate_duration: 2
    });
    $(document).find('.pxl-pll-basic').parallaxBackground();
    $(document).find('.pxl-pll-rotate').parallaxBackground({
        animation_type: 'rotate',
        zoom: 50,
        rotate_perspective: 500
    });
    $(document).find('.pxl-pll-mouse-move').parallaxBackground({
        event: 'mouse_move',
        animation_type: 'shift',
        animate_duration: 2
    });
    $(document).find('.pxl-pll-mouse-move-rotate').parallaxBackground({
        event: 'mouse_move',
        animation_type: 'rotate',
        animate_duration: 1,
        zoom: 70,
        rotate_perspective: 1000
    });

    $(document).find('.pxl-bg-prx-effect-pinned-zoom-clipped').each(function(index, el) {
        var $el = $(el);
        const clipped_bg_pinned = $el.find('.clipped-bg-pinned'); 
        const clipped_bg = $el.find('.clipped-bg');

        var clipped_bg_animation = gsap.to(clipped_bg, {
            clipPath: 'inset(0% 0% 0%)',
            scale: 1,
            duration: 1,
            ease: 'Linear.easeNone'
        });

        var clipped_bg_scene = ScrollTrigger.create({
            trigger: clipped_bg_pinned,
            start: function() {
                const start_pin = 350;
                return "top +=" + start_pin;
            },
            end: function() {
                const end_pin = 0;
                return "+=" + end_pin;
            },
            animation: clipped_bg_animation,
            scrub: 1,
            pin: true,
            pinSpacing: false,
        });

        function set_clipped_bg_wrapper_height() {
            gsap.set(clipped_bg, { height: window.innerHeight });                                
        }  
        window.addEventListener('resize', set_clipped_bg_wrapper_height);
    });



    $(document).find('.pxl-bg-prx-effect-pinned-circle-zoom-clipped').each(function(index, el) {
        const $el = $(el);

        var svg = $el.find('.circle-zoom-mask-svg'); 
        var img = $el.find('.clipped-bg-circle-pinned'); 
        let circle = $el.find('.circle-zoom'); 
        let radius = +circle[0].getAttribute("r");

        gsap.set(img[0], {
            scale: 2
        });

        var tl = gsap.timeline({
            scrollTrigger: {    
                trigger: el,
                start: "50% 90%",
                end: "80% 100%",
                scrub: 2,
            },
            defaults: {
                duration: 2
            }
        })
        .to(circle[0], {
            attr: {
                r: () => radius
            }
        }, 0)
        .to(img[0], {
            scale: 1,
        }, 0)
        .to(".circle-inner-layer", {
            alpha: 0,
            ease: "power1.in",
            duration: 1 - 0.25
        }, 0.25);


        window.addEventListener("load", maiko_circle_init);
        window.addEventListener("resize", maiko_circle_resize);
        function maiko_circle_init() {
            maiko_circle_resize();  
        }
        function maiko_circle_resize() {
            tl.progress(0);
            var rect = $(el)[0].getBoundingClientRect();
            const rectWidth = rect.width;
            const rectHeight = rect.height
            const dx = rectWidth / 2;
            const dy = rectHeight / 2;
            radius = Math.sqrt(dx * dx + dy * dy);

            tl.invalidate();
            ScrollTrigger.refresh();
        }
    });
}

function maiko_section_before_render(){
    var _elementor = typeof elementor != 'undefined' ? elementor : elementorFrontend;
    _elementor.hooks.addFilter( 'pxl-custom-section/before-render', function( html, settings, el ) {
        if (typeof settings['row_divider'] !== 'undefined') {
            if(settings['row_divider'] == 'angle-top' || settings['row_divider'] == 'angle-bottom' || settings['row_divider'] == 'angle-top-right' || settings['row_divider'] == 'angle-bottom-left') {
                html =  '<svg class="pxl-row-angle" style="fill:#ffffff" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 100 100" version="1.1" preserveAspectRatio="none" height="130px"><path stroke="" stroke-width="0" d="M0 100 L100 0 L200 100"></path></svg>';
                return html;
            }
            if(settings['row_divider'] == 'angle-top-bottom' || settings['row_divider'] == 'angle-top-bottom-left') {
                html =  '<svg class="pxl-row-angle pxl-row-angle-top" style="fill:#ffffff" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 100 100" version="1.1" preserveAspectRatio="none" height="130px"><path stroke="" stroke-width="0" d="M0 100 L100 0 L200 100"></path></svg><svg class="pxl-row-angle pxl-row-angle-bottom" style="fill:#ffffff" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 100 100" version="1.1" preserveAspectRatio="none" height="130px"><path stroke="" stroke-width="0" d="M0 100 L100 0 L200 100"></path></svg>';
                return html;
            }
            if(settings['row_divider'] == 'wave-animation-top' || settings['row_divider'] == 'wave-animation-bottom') {
                html =  '<svg class="pxl-row-angle" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 150" fill="#fff"><path d="M 0 26.1978 C 275.76 83.8152 430.707 65.0509 716.279 25.6386 C 930.422 -3.86123 1210.32 -3.98357 1439 9.18045 C 2072.34 45.9691 2201.93 62.4429 2560 26.198 V 172.199 L 0 172.199 V 26.1978 Z"><animate repeatCount="indefinite" fill="freeze" attributeName="d" dur="10s" values="M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z; M0 86.3149C316 86.315 444 159.155 884 51.1554C1324 -56.8446 1320.29 34.1214 1538 70.4063C1814 116.407 2156 188.408 2560 86.315V232.317L0 232.316V86.3149Z; M0 53.6584C158 11.0001 213 0 363 0C513 0 855.555 115.001 1154 115.001C1440 115.001 1626 -38.0004 2560 53.6585V199.66L0 199.66V53.6584Z; M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z"></animate></path></svg>';
                return html;
            }
            if(settings['row_divider'] == 'curved-top' || settings['row_divider'] == 'curved-bottom') {
                html =  '<svg class="pxl-row-angle" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1920 128" version="1.1" preserveAspectRatio="none" style="fill:#ffffff"><path stroke-width="0" d="M-1,126a3693.886,3693.886,0,0,1,1921,2.125V-192H-7Z"></path></svg>';
                return html;
            }
        }
    } );
} 

function maiko_svg_color($scope) {
    "use strict";

    jQuery($scope).find('.pxl-grid .pxl-post--icon img').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            var $svg = jQuery(data).find('svg');
            if (imgID) {
                $svg.attr('id', imgID);
            }
            if (imgClass) {
                $svg.attr('class', imgClass + ' replaced-svg');
            }
            $svg.removeAttr('xmlns:a');
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 24 24');
            }
            $img.replaceWith($svg);
        }, 'xml');
    });
}
var PXL_Icon_Contact_Form = function( $scope, $ ) {

    setTimeout(function () {
        $('.pxl--item').each(function () {
            var icon_input = $(this).find(".pxl--form-icon"),
            control_wrap = $(this).find('.wpcf7-form-control');
            control_wrap.before(icon_input.clone());
            icon_input.remove();
        });
    }, 10);

};

function maiko_effect_element($scope) {
    const $pxlEffectElement = $scope.find('.pxl-effect');

    if ($pxlEffectElement.length > 0) {
        const settingsData = $pxlEffectElement.attr('data-settings');

        if (settingsData) {
            try {
                const settings = JSON.parse(settingsData);

                const animationType = settings["wcf-animation"] || 'fade'; 
                const fadeFrom = settings["fade-from"] || 'left'; 
                const delay = settings["delay"] || 0; 
                const duration = settings["data-duration"] || 1; 
                const ease = settings["ease"] || 'power2.out'; 
                const offset = settings["fade-offset"] || 50; 

                if (animationType === 'fade') {
                    gsap.from($pxlEffectElement, {
                        x: fadeFrom === 'left' ? -offset : fadeFrom === 'right' ? offset : 0,
                        opacity: 0,
                        delay: delay,
                        duration: duration,
                        ease: ease,
                        scrollTrigger: {
                            trigger: $pxlEffectElement[0], 
                            start: "top 80%", 
                            toggleActions: "play none none none", 
                            once: true, 
                        }
                    });
                }
            } catch (e) {
            }
        }
    }
}

function maiko_scroll_text($scope) {
    $scope.find(".pxl-item--title.style-scroll-bg").each(function() {
        var $container = $(this);

        var text = new SplitText($container[0], { type: 'words, chars' });

        $(text.words).children().first().addClass("first-char");

        gsap.fromTo(text.chars,
        {
            position: 'relative',
            display: 'inline-block',
            opacity: 0.2,
            x: -5,
        },
        {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            scrollTrigger: {
                trigger: $container[0],
                toggleActions: "play pause reverse pause",
                start: "top 70%",
                end: "top 40%",
                scrub: 0.7,
            }
        }
        );
    });
}

function maiko_split_text($scope){
    var st = $scope.find(".pxl-split-text");
    if(st.length == 0) return;
    gsap.registerPlugin(SplitText);

    st.each(function(index, el) {
       var els = $(el).find('p').length > 0 ? $(el).find('p')[0] : el;
       const pxl_split = new SplitText(els, { 
        type: "lines, words, chars",
        lineThreshold: 0.5,
        linesClass: "split-line"
    });
       var split_type_set = pxl_split.chars;

       gsap.set(els, { perspective: 400 });

       var settings = {
        scrollTrigger: {
            trigger: els,
            toggleActions: "play none none none",
            start: "top 86%",
            once: true
        },
        duration: 0.8, 
        stagger: 0.02,
        ease: "Linear.easeNone"
    };
    if( $(el).hasClass('split-in-fade') ){
        settings.opacity = 0;
    }
    if( $(el).hasClass('split-in-right') ){
        settings.opacity = 0;
        settings.x = "50";
    }
    if( $(el).hasClass('split-in-left') ){
        settings.opacity = 0;
        settings.x = "-50";
    }
    if( $(el).hasClass('split-in-up') ){
        settings.opacity = 0;
        settings.y = "80";
    }
    if( $(el).hasClass('split-in-down') ){
        settings.opacity = 0;
        settings.y = "-80";
    }
    if( $(el).hasClass('split-in-rotate') ){
        settings.opacity = 0;
        settings.rotateX = "50deg";
    }
    if( $(el).hasClass('split-in-scale') ){
        settings.opacity = 0;
        settings.scale = "0.5";
    }

    if( $(el).hasClass('split-lines-transform') ){
        pxl_split.split({
            type:"lines",
            lineThreshold: 0.5,
            linesClass: "split-line"
        }); 
        split_type_set = pxl_split.lines;
        settings.opacity = 0;
        settings.yPercent = 100;
        settings.autoAlpha = 0;
        settings.stagger = 0.1;
    }

    if( $(el).hasClass('split-lines-transform-down') ){
        pxl_split.split({
            type:"lines",
            lineThreshold: 0.5,
            linesClass: "split-line"
        }); 
        split_type_set = pxl_split.lines;
        settings.opacity = 0;
        settings.yPercent = -100;
        settings.autoAlpha = 0;
        settings.stagger = 0.1;
    }

    if( $(el).hasClass('split-lines-rotation-x') ){
        pxl_split.split({
            type:"lines",
            lineThreshold: 0.5,
            linesClass: "split-line"
        }); 
        split_type_set = pxl_split.lines;
        settings.opacity = 0;
        settings.rotationX = -120;
        settings.transformOrigin = "top center -50";
        settings.autoAlpha = 0;
        settings.stagger = 0.1;
    }
    if( $(el).hasClass('btn-text-timeline') ){
        settings.opacity = 0;
        settings.scale = "1.2";
        settings.y = "-60";
        settings.transformOrigin = "top center -50";
        settings.autoAlpha = 0;
        settings.stagger = 0.05;
    }

    if ($(el).hasClass('split-up')) {
        pxl_split.split({ type: "words" });
        split_type_set = pxl_split.words;

        $(split_type_set).each(function (index, elw) {
            gsap.from(elw, {
              opacity: 0,
              duration: 1.5,
              y: 80,
              delay: 0.25,
              ease: "power4",
              stagger: {
                each: 0.15
            }
        },index * 0.1);
        });
    }

    if ($(el).hasClass('split-hero')) {
        const pxl_split = new SplitText(el, { type: "chars" });
        const split_type_set = pxl_split.chars; 

        $(split_type_set).each(function(index,elw) {
            gsap.set(elw, {
                autoAlpha: 1,
                y: "0",
                autoAlpha: 1,
                stagger: { each: 0.03, from: "random" },
                duration: 0.2,
                ease: "Linear.easeNone",
            },index * 0.01);
        });

        gsap.from(split_type_set, {
            y: "101%",
            autoAlpha: 0,
            stagger: { each: 0.03, from: "random" },
            scrollTrigger: {
                trigger: el,
                start: "top 86%",
                toggleActions: "play reverse play reverse",
            }
        });
    }

    if( $(el).hasClass('split-words-scale') ){
        pxl_split.split({type:"words"}); 
        split_type_set = pxl_split.words;

        $(split_type_set).each(function(index,elw) {
            gsap.set(elw, {
                opacity: 0,
                scale:index % 2 == 0  ? 0 : 2,
                force3D:true,
                duration: 0.1,
                ease: "Linear.easeNone",
                stagger: 0.02,
            },index * 0.01);
        });

        var pxl_anim = gsap.to(split_type_set, {
            scrollTrigger: {
                trigger: el,
                toggleActions: "play reverse play reverse",
                start: "top 86%",
            },
            rotateX: "0",
            scale: 1,
            opacity: 1,
        });

    }else{
        var pxl_anim = gsap.from(split_type_set, settings);
    }

    if( $(el).hasClass('hover-split-text') ){
        $(el).mouseenter(function(e) {
            pxl_anim.restart();
        });
    }
});
}

function maiko_zoom_point(){
    elementorFrontend.waypoint($(document).find('.pxl-zoom-point'), function () {
        var offset = $(this).offset();
        var offset_top = offset.top;
        var scroll_top = $(window).scrollTop();
    }, {
        offset: -100,
        triggerOnce: true
    });
}

function maiko_logo_marquee($scope){
    const logos = $scope.find('.pxl-item--marquee');
    gsap.set(logos, { autoAlpha: 1 })

    logos.each(function(index, el) {
        gsap.set(el, { xPercent: 100 * index });
    }); 

    if (logos.length > 2) {
        const logosWrap = gsap.utils.wrap(-100, ((logos.length - 1) * 100));
        const durationNumber = logos.data('duration');
        const slipType = logos.data('slip-type');
        var slipResult = `-=${logos.length * 100}`;
        if(slipType == 'right') {
            slipResult = `+=${logos.length * 100}`;
        }
        gsap.to(logos, {
            xPercent: slipResult,
            duration: durationNumber,
            repeat: -1,
            ease: 'none',
            modifiers: {
                xPercent: xPercent => logosWrap(parseFloat(xPercent))
            }
        });
    }             
}

function maiko_text_marquee($scope){

    const text_marquee = $scope.find('.pxl-text--marquee');

    const boxes = gsap.utils.toArray(text_marquee);

    const loop = text_horizontalLoop(boxes, {paused: false,repeat: -1,});

    function text_horizontalLoop(items, config) {
        items = gsap.utils.toArray(items);
        config = config || {};
        let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
        totalWidth, curX, distanceToStart, distanceToLoop, item, i;
        gsap.set(items, {
            xPercent: (i, el) => {
                let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
                return xPercents[i];
            }
        });
        gsap.set(items, {x: 0});
        totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
        for (i = 0; i < length; i++) {
            item = items[i];
            curX = xPercents[i] / 100 * widths[i];
            distanceToStart = item.offsetLeft + curX - startX;
            distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
            tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
            .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
            times[i] = distanceToStart / pixelsPerSecond;
        }
        function toIndex(index, vars) {
            vars = vars || {};
            (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
            let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
            if (time > tl.time() !== index > curIndex) { 
                vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
                time += tl.duration() * (index > curIndex ? 1 : -1);
            }
            curIndex = newIndex;
            vars.overwrite = true;
            return tl.tweenTo(time, vars);
        }
        tl.next = vars => toIndex(curIndex+1, vars);
        tl.previous = vars => toIndex(curIndex-1, vars);
        tl.current = () => curIndex;
        tl.toIndex = (index, vars) => toIndex(index, vars);
        tl.times = times;
        tl.progress(1, true).progress(0, true);
        if (config.reversed) {
            tl.vars.onReverseComplete();
            tl.reverse();
        }
        return tl;
    }
}

function maiko_scroll_fixed_section(){
    const fixed_section_top = $('.pxl-section-fix-top');
    if (fixed_section_top.length > 0) {
        ScrollTrigger.matchMedia({
            "(min-width: 991px)": function() {
                const pinnedSections = ['.pxl-section-fix-top'];
                pinnedSections.forEach(className => {
                    gsap.to(".pxl-section-fix-bottom", {
                        scrollTrigger: {
                            trigger: ".pxl-section-fix-bottom",
                            scrub: true,
                            pin: className,
                            pinSpacing: false,
                            start: 'top bottom',
                            end: "bottom top",
                        },
                    });
                    gsap.to(".pxl-section-fix-bottom .pxl-section-overlay-color", {
                        scrollTrigger: {
                            trigger: ".pxl-section-fix-bottom",
                            scrub: true,
                            pin: className,
                            pinSpacing: false,
                            start: 'top bottom',
                            end: "bottom top",
                        },
                    });
                });
            }
        });
    }

    const section_overlay_color = $('.pxl-section-overlay-color');
    if (section_overlay_color.length > 0) {
        const space_top = section_overlay_color.data('space-top');
        const space_left = section_overlay_color.data('space-left');
        const space_right = section_overlay_color.data('space-right');
        const space_bottom = section_overlay_color.data('space-bottom');

        const radius_top = section_overlay_color.data('radius-top');
        const radius_left = section_overlay_color.data('radius-left');
        const radius_right = section_overlay_color.data('radius-right');
        const radius_bottom = section_overlay_color.data('radius-bottom');

        const overlay_radius = radius_top + 'px ' + radius_right + 'px ' + radius_bottom + 'px ' + radius_left + 'px ';

        ScrollTrigger.matchMedia({
            "(min-width: 991px)": function() {
                const pinnedSections = ['.pxl-bg-color-scroll'];
                pinnedSections.forEach(className => {
                    gsap.to(".overlay-type-scroll", {
                        scrollTrigger: {
                            trigger: ".pxl-bg-color-scroll",
                            scrub: true,
                            pinSpacing: false,
                            start: 'top bottom',
                            end: "bottom top",
                        },
                        left: space_left + "px",
                        right: space_right + "px",
                        top: space_top + "px",
                        bottom: space_bottom + "px",
                        borderRadius: overlay_radius,
                    });
                });
            }
        });
    }
}
function maiko_scroll_checkp($scope){
    $scope.find('.pxl-el-divider').each(function () {
        var wcont1 = $(this);


        function checkScrollPosition() {
            var pxl_scroll_top = $(window).scrollTop(),
            viewportBottom = pxl_scroll_top + $(window).height(),
            elementTop = wcont1.offset().top,
            elementBottom = elementTop + wcont1.outerHeight();

            if (elementTop < viewportBottom && elementBottom > pxl_scroll_top) {
                wcont1.addClass('visible');
            }
        }

        checkScrollPosition();

        $(window).on('scroll', function () {
            checkScrollPosition();
        });

    });
}
function maiko_section_start_render2(){

    var _elementor = typeof elementor != 'undefined' ? elementor : elementorFrontend;

    _elementor.hooks.addFilter( 'pxl_section_start_render', function( html, settings, el ) {

        if(typeof settings.pxl_parallax_bg_img != 'undefined' && settings.pxl_parallax_bg_img.url != ''){

            html += '<div class="pxl-section-bg-parallax"></div>';

        }

        return html;

    } );

} 

function wglPhysicsButton($scope) {
    // module aliases
    var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint;

    var logoArea = document.querySelector(".pxl-button_physics");

    // Lấy dữ liệu từ data-settings
    const settings = JSON.parse(logoArea.getAttribute("data-settings").replace(/&quot;/g, '"'));

    // width and height of the area
    let w = logoArea.offsetWidth;
    let h = logoArea.offsetHeight;

    // create an engine
    var engine = Engine.create();
    // Gravity
    engine.world.gravity.x = 0;
    engine.world.gravity.y = 0.7;

    // create a renderer
    var render = Render.create({
        element: logoArea,
        engine: engine,
        options: {
            width: w,
            height: h,
            background: "rgba(0,0,0,0)",
            wireframes: false,
            pixelRatio: window.devicePixelRatio,
        },
    });

    const wallOptions = {
        isStatic: true,
        render: {
            visible: false,
        },
    };

    // create walls, ground, and ceiling
    const ceiling = Bodies.rectangle(w / 2, -10, w, 10, wallOptions);
    const ground = Bodies.rectangle(w / 2, h + 10, w, 10, wallOptions);
    const leftWall = Bodies.rectangle(-10, h / 2, 10, h, wallOptions);
    const rightWall = Bodies.rectangle(w + 10, h / 2, 10, h, wallOptions);

    // Create shapes dynamically based on settings
    const shapes = [];
    settings.forEach((value, index) => {
        const width = 173; 
        const height = 44; 
        const x = 45 + (index % 2) * (width + 55);
        const y = 70; 

        const shape = Bodies.rectangle(x, y, width, height, {
            render: {
                visible: false,
            },
        });

        // Tạo HTML để hiển thị text
        const textElement = document.createElement("p");
        textElement.className = "pxl-throwable-element";
        textElement.style.opacity = "1";
        textElement.style.position = "absolute";
        textElement.style.borderRadius = "20px";
        textElement.style.fontSize = "13px";
        textElement.style.fontWeight = "400";
        textElement.style.textAlign = "center";
        textElement.style.color = "white";
        textElement.style.padding = "11px 30px";
        textElement.style.pointerEvents = "none"; 
        textElement.style.width = "auto";

        const checkIcon = document.createElement("i");
        checkIcon.className = "fas fa-check";
        checkIcon.style.marginRight = "5px";
        checkIcon.style.fontSize = "13px"; 

        const spanElement = document.createElement("span");
        spanElement.className = "span-element-rot";
        spanElement.style.whiteSpace = "nowrap";
        spanElement.innerText = value; 
        textElement.appendChild(checkIcon);
        textElement.appendChild(spanElement);

        logoArea.appendChild(textElement);

        const delay = Math.random() * 2000;
        setTimeout(() => {
            // Áp dụng lực nhẹ để làm cho các hình chữ nhật rơi xuống từ từ
            Matter.Body.applyForce(shape, shape.position, {
                x: Math.random() * 0.05, 
                y: Math.random() * 0.05 + 0.07  
            });
        }, delay);

        shapes.push({ body: shape, element: textElement, span: spanElement });
    });

    const mouseControl = MouseConstraint.create(engine, {
        element: logoArea,
        constraint: {
            render: {
                visible: false,
            },
        },
    });

    // Add all of the bodies to the world
    Composite.add(engine.world, [ground, ceiling, rightWall, leftWall, mouseControl, ...shapes.map((s) => s.body)]);

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    // Cập nhật vị trí văn bản mà không xoay
    Matter.Events.on(engine, "afterUpdate", () => {
        shapes.forEach(({ body, element, span }) => {
            const width = body.bounds.max.x - body.bounds.min.x; 
            const height = body.bounds.max.y - body.bounds.min.y;

            // Cập nhật vị trí của thẻ <p>
            element.style.left = `${body.position.x}px`;
            element.style.top = `${body.position.y}px`;
            element.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;

        });
    });
}

$( window ).on( 'elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction( 'frontend/element_ready/global', function( $scope ) {
        maiko_svg_color($scope);
        maiko_scroll_checkp($scope);
        maiko_animation_btn($scope);
        maiko_effect_element($scope);
    } );
    maiko_parallax_bg(); 
    maiko_section_start_render();
    maiko_section_start_render2();
    maiko_column_before_render();
    maiko_css_inline_js();
    maiko_parallax_effect();
    maiko_section_before_render();
    maiko_zoom_point();
    maiko_scroll_fixed_section();
    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_contact_form.default', PXL_Icon_Contact_Form );

    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_heading.default', function( $scope ) {
        maiko_split_text($scope);
        maiko_scroll_text($scope);
    } );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_text_editor.default', function( $scope ) {
        maiko_split_text($scope);
    } );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_image.default', function( $scope ) {
        pxl_widget_image_handler($scope);
    } );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_post_slip.default', function( $scope ) {
        maiko_split_text($scope);
    } );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_logo_marquee.default', function( $scope ) {
        maiko_logo_marquee($scope);
    } );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_text_marquee.default', function( $scope ) {
        maiko_text_marquee($scope);
    } );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_awards_list.default', function( $scope ) {
        maiko_text_hover_image($scope);
    } );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/physics_item.default', function( $scope ) {
        wglPhysicsButton($scope);
    } );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_tabs_slip.default', function( $scope ) {
        if ($(window).width() > 767) {
            maiko_triger($scope);
            maiko_triger_tabs($scope);
        }
    } );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_text_slip.default', function( $scope ) {
        maiko_triger_vertical($scope);
    } );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_images_slip.default', function( $scope ) {
        maiko_triger_tabs_image($scope);
    } );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_post_grid.default', function( $scope ) {
        maiko_text_hover_image($scope);
        maiko_text_hover_image_grid($scope);
    } );
    elementorFrontend.hooks.addAction( 'frontend/element_ready/global', function( $scope ) {
        maiko_animation_handler($scope);
    } );
} );
} )( jQuery );
