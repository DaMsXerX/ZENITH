( function( $ ) {
    $( window ).on( 'elementor/frontend/init', function() {
        setTimeout(function() {
            $('.pxl-grid').each(function(index, element) { 
                var $grid_scope = $(this);
                maiko_hover();
                maiko_animation_btn();
                maiko_accordion();
                
                var svgPaths = $('.pxl-service-list .pxl-post--icon svg path, .pxl-service-list .pxl-post--icon svg line, .pxl-service-list .pxl-post--icon svg circle, .pxl-icon-list.style-5 svg path, .pxl-icon-list.style-5 svg line, .pxl-icon-list.style-5 svg circle,.pxl-icon-box7 .pxl-item--icon svg path,.pxl-icon-box7 .pxl-item--icon svg line,.pxl-icon-box7 .pxl-item--icon svg rect,.pxl-icon-box7 .pxl-item--icon svg circle');
                var svgPaths_load = $('.pxl-service-list .pxl-post--icon.animated svg path, .pxl-service-list .pxl-post--icon.animated svg line, .pxl-service-list .pxl-post--icon.animated svg circle, .pxl-icon-list.style-5 .animated svg path, .pxl-icon-list.style-5 .animated svg line, .pxl-icon-list.style-5 .animated svg circle');
                svgPaths.each(function() {
                    var totalLength = this.getTotalLength();

                    $(this).attr({
                        'stroke-dashoffset': totalLength,
                        'stroke-dasharray': totalLength,
                    });
                });

                if( $grid_scope.hasClass('pxl-post-list')){
                    var isoOptions = {};
                    var $grid_isotope = null;
                }else{
                    var $grid_masonry = $grid_scope.find('.pxl-grid-masonry');
                    var isoOptions = {
                        itemSelector: '.pxl-grid-item',
                        layoutMode: $(this).closest('.pxl-grid').attr('data-layout'),
                        fitRows: {
                            gutter: 0
                        },
                        percentPosition: true,
                        masonry: {
                            columnWidth: '.grid-sizer',
                        },
                        containerStyle: null,
                        stagger: 30,
                        sortBy : 'name',
                    };
                    var $grid_isotope = $grid_masonry.isotope(isoOptions);


                    $grid_scope.on('click', '.pxl-grid-filter .filter-item', function(e) {

                        var $this = $(this);
                        var term_slug = $this.attr('data-filter');  
                        
                        $this.siblings('.filter-item.active').removeClass('active');
                        $this.addClass('active'); 
                        $grid_scope.find('.pxl-post--inner').removeClass('animated');

                        if( $this.closest('.pxl-grid-filter').hasClass('ajax') ){
                            var loadmore = $grid_scope.data('loadmore');
                            loadmore.term_slug = term_slug;
                            maiko_grid_ajax_handler( $this, $grid_scope, $grid_isotope, 
                                { action: 'maiko_load_more_post_grid', loadmore: loadmore, iso_options: isoOptions, handler_click: 'filter', scrolltop: 0 }
                                );
                        }else{
                            $grid_isotope.isotope({ filter: term_slug });

                        }
                    });
                }
                $grid_scope.on('click', '.pxl-grid-pagination .ajax a.page-numbers', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var $this = $(this);
                    var loadmore = $grid_scope.data('loadmore');
                    var paged = $this.attr('href');
                    paged = paged.replace('#', '');
                    loadmore.paged = parseInt(paged);
                    maiko_grid_ajax_handler( $this, $grid_scope, $grid_isotope, 
                        { action: 'maiko_load_more_post_grid', loadmore: loadmore, iso_options: isoOptions, handler_click: 'pagination', scrolltop: 0 }
                        );
                    $('html,body').animate({scrollTop: $grid_scope.offset().top - 130}, 500);
                });

                $grid_scope.on('click', '.btn-grid-loadmore', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    var loadmore = $grid_scope.data('loadmore');
                    loadmore.paged = parseInt($grid_scope.data('start-page')) + 1; 

                    maiko_grid_ajax_handler( $this, $grid_scope, $grid_isotope, 
                        { action: 'maiko_load_more_post_grid', loadmore: loadmore, iso_options: isoOptions, handler_click: 'loadmore', scrolltop: 0 }
                        );
                });

                $grid_scope.on('change', '.orderby', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    var loadmore = $grid_scope.data('loadmore');
                    loadmore.orderby = $this.val(); 

                    maiko_grid_ajax_handler( $this, $grid_scope, $grid_isotope, 
                        { action: 'maiko_load_more_post_grid', loadmore: loadmore, iso_options: isoOptions, handler_click: 'select_orderby', scrolltop: 0 }
                        );
                });

            });
function maiko_check_scroll() {
    var $gridItems = $('.pxl-check-scroll .list-item');
    var viewportBottom = $(window).scrollTop() + $(window).height();

    $gridItems.each(function() {
        var $gridItem = $(this);
        var elementTop = $gridItem.offset().top;
        var elementBottom = elementTop + $gridItem.outerHeight();

        if (elementTop < viewportBottom && elementBottom > $(window).scrollTop()) {
            $gridItem.addClass('visible');
        } else {
            $gridItem.removeClass('visible');
        }
    });
}

    /* Get Mouse Move Direction */
function maiko_hover() {
    function getDirection(ev, obj) {
        var w = $(obj).width(),
        h = $(obj).height(),
        x = (ev.pageX - $(obj).offset().left - (w / 2)) * (w > h ? (h / w) : 1),
        y = (ev.pageY - $(obj).offset().top - (h / 2)) * (h > w ? (w / h) : 1),
        d = Math.round( Math.atan2(y, x) / 1.57079633 + 5 ) % 4;
        return d;
    }
    function addClass( ev, obj, state ) {
        var direction = getDirection( ev, obj ),
        class_suffix = null;
        $(obj).removeAttr('class');
        switch ( direction ) {
        case 0 : class_suffix = '--top';    break;
        case 1 : class_suffix = '--right';  break;
        case 2 : class_suffix = '--bottom'; break;
        case 3 : class_suffix = '--left';   break;
        }
        $(obj).addClass( state + class_suffix );
    }
    $.fn.ctDeriction = function () {
        this.each(function () {
            $(this).on('mouseenter',function(ev){
                addClass( ev, this, 'pxl-in' );
            });
            $(this).on('mouseleave',function(ev){
                addClass( ev, this, 'pxl-out' );
            });
        });
    }
    $('.pxl-effect--3d .pxl-effect--direction').ctDeriction();
}

function maiko_accordion() {
    $(".pxl-grid-inner .pxl-accordion--title").on("click", function(e){
        e.preventDefault();
        var pxl_target = $(this).data("target");
        var pxl_parent = $(this).parents(".pxl-accordion");
        var pxl_active = pxl_parent.find(".pxl-accordion--title");
        $.each(pxl_active, function (index, item) {
            var pxl_item_target = $(item).data("target");
            if(pxl_item_target != pxl_target){
                $(item).removeClass("active");
                $(this).parent().removeClass("active");
                $(pxl_item_target).slideUp(400);
            }
        });
        $(this).parent().toggleClass("active");
        $(pxl_target).slideToggle(400);
    });
}

function maiko_animation_btn() {
    const $sections = $('.pxl-portfolio-grid-layout2 .pxl-grid-item .pxl-post--inner');

    $sections.each(function() {
        const $section = $(this);
        const cursor = $section.find('.pxl-post--holder')[0];

        if (!cursor) return;

        const cursorWidth = cursor.offsetWidth / 2;
        const cursorHeight = cursor.offsetHeight / 2;

        let mouseX = 0;
        let mouseY = 0;
        let isMouseOver = false;

        $section.on('mousemove', function(e) {
            const sectionOffset = $section.offset();
            if (
                e.pageX >= sectionOffset.left && e.pageX <= sectionOffset.left + $section.width() &&
                e.pageY >= sectionOffset.top && e.pageY <= sectionOffset.top + $section.height()
            ) {
                mouseX = e.pageX;
                mouseY = e.pageY;
            }
        });

        $section.on('mouseenter', function() {
            isMouseOver = true;
        });

        $section.on('mouseleave', function() {
            isMouseOver = false;

            // Ngừng animation khi con trỏ chuột rời khỏi phần tử
            gsap.to(cursor, {
                x: mouseX - $section.offset().left - 100,
                y: mouseY - $section.offset().top - 100,
                ease: "none",
                duration: 0.1
            });
        });

        function render() {
            if (isMouseOver) {
                const sectionOffset = $section.offset();

                gsap.to(cursor, {
                    x: mouseX - sectionOffset.left - 100,
                    y: mouseY - sectionOffset.top - 100,
                    ease: "none",
                    duration: 0.1
                });
            }
            requestAnimationFrame(render);
        }

        // Bắt đầu vòng lặp animation
        requestAnimationFrame(render);
    });
}



function maiko_grid_ajax_handler($this, $grid_scope, $grid_isotope, args = {}){
    var settings = $.extend( true, {}, {
        action: '',
        loadmore: '',
        iso_options: {},
        handler_click: '',
        scrolltop: 0
    }, args );

    var offset_top = $grid_scope.offset().top; 

    if( settings.handler_click == 'loadmore' ){
        var loadmore_text  = $this.closest('.pxl-load-more').data('loadmore-text');
        var loading_text  = $this.closest('.pxl-load-more').data('loading-text');
        var curoffsettop = $this.offset().top;
    }    

    $.ajax({
        url: main_data.ajax_url,
        type: 'POST',
        data: {
            action: settings.action,
            settings: settings.loadmore,
            handler_click: settings.handler_click
        },
        success: function( res ) {   
            if(res.status == true){  

                if( settings.handler_click == 'loadmore' ){
                    if( settings.loadmore.wg_type == 'post-list'){
                        $grid_scope.find('.pxl-list-inner').append(res.data.html)
                    }else{
                        $grid_scope.find('.pxl-grid-inner').append(res.data.html)
                    }
                }else{
                    if( settings.loadmore.wg_type == 'post-list'){
                        $grid_scope.find('.pxl-list-inner .list-item').remove();
                        $grid_scope.find('.pxl-list-inner').append(res.data.html);
                    }else{
                        $grid_scope.find('.pxl-grid-inner .pxl-grid-item').remove();
                        $grid_scope.find('.pxl-grid-inner').append(res.data.html);
                    }
                }

                if( settings.iso_options && $grid_isotope != null){
                    $grid_isotope.isotope('destroy');
                    $grid_isotope.isotope(settings.iso_options);
                }


                $grid_scope.data('start-page', res.data.paged);

                if( settings.loadmore['pagination_type'] == 'loadmore'){
                    if(res.data.paged >= res.data.max){
                        $grid_scope.find('.pxl-load-more').hide();
                    }else{
                        $grid_scope.find('.pxl-load-more').show();
                    } 
                } 
                if( settings.loadmore['pagination_type'] == 'pagination'){
                    $grid_scope.find(".pxl-grid-pagination").html(res.data.pagin_html);
                }

                if( $grid_scope.find('.result-count').length > 0 ){
                    $grid_scope.find(".result-count").html(res.data.result_count);
                } 
                maiko_check_scroll();
                maiko_hover();
                maiko_animation_btn();

                $(document).on('click', '.filter-item, .nice-select .option', function() {
                    $('.pxl-check-scroll .list-item').removeClass('visible').addClass('visible');
                });
            }      

        },
        beforeSend: function() {  
            $grid_scope.find('.pxl-grid-overlay-loading').removeClass( 'loaded' ).addClass( 'loader' );
            if( settings.handler_click == 'loadmore' ){
                $this.find('.pxl-loadmore-text').text(loading_text);
                $this.parent().addClass('loading');
            }
        },
        complete: function() {
            $grid_scope.find('.pxl-grid-overlay-loading').removeClass( 'loader' ).addClass( 'loaded' ); 
            if( settings.handler_click == 'loadmore' ){
                $this.find('.pxl-loadmore-text').text(loadmore_text);
                $this.parent().removeClass('loading');
            }
            if ( settings.scrolltop ) {
                $( 'html, body' ).animate( { scrollTop: offset_top - 100 }, 0 );
            }
        }
    });
}
}, 150);
});

} )( jQuery ); 