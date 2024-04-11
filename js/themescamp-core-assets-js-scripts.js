
/*==============================================================
                         Ajax read more posts
==============================================================*/

jQuery(document).ready(function ($) {

    revealPosts();

    /* Ajax read more posts*/
    $(document).on('click', '.tcg-show-more:not(.loading)', function () {

        var that = $(this);
        var page = that.data('page');
        var newPage = page + 1;
        var ajaxurl = that.data('url');

        that.addClass('loading').find('.text').slideUp(0);
        that.find('.icon').addClass('spin');

        $.ajax({

            url: ajaxurl,
            type: 'post',
            data: {
                page: page,
                action: 'tcg_load_more'

            },
            error: function (response) {
                console.log(response);
            },
            success: function (response) {

                if (response == 0) {
                    $('.tcg-posts').append("<p class ='text-center  fz-12'><i class='fa-solid fa-chart-simple'></i> You've reached the end of the list!</p>");
                    that.slideUp(320);
                } else {

                    setTimeout(function () {

                        that.data('page', newPage);
                        $('.tcg-posts').append(response);

                        that.removeClass('loading').find('.text').slideDown(320);
                        that.find('.icon').removeClass('spin');

                        revealPosts();

                    }, 500);
                }
            }

        });

    });

    /* Helper function*/
    function revealPosts() {

        var posts = $('article:not(.reveal)');
        var i = 0;

        setInterval(function () {

            if (i >= posts.length) return false;

            var el = posts[i];
            $(el).addClass('reveal');

            i++

        }, 100);

    }

    /*==============================================================
                             Front switcher control
    ==============================================================*/



    var isShow = false;

    $(".fixed-controls .toggel-icon").on("click", function () {
        isShow = !isShow; // Toggle the state

        if (isShow) {
            $(".fixed-controls").addClass("show");
        } else {
            $(".fixed-controls").removeClass("show");
        }
    });

    $(".fixed-controls .btns a").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
    });


    // cursor

    $("#cursor-btns .standerd").on("click", function () {
        $(".cursor-outer").addClass("cutom_cursor");
    });

    if ($(".mouse-custom").hasClass("cutom_cursor")) {
        $("#cursor-btns .standerd").on("click", function () {
            $(".cursor-outer").removeClass("cutom_cursor");
        });
    }

    // cursor
    // $("#cursor-btns .standard").on("click", function(){
    // 	$(".mouse-custom").addClass("standard_cursor");
    // 	$(".mouse-custom").removeClass("cutom_cursor");
    // }

    // $("#cursor-btns .animated").on("click", function(){
    // 	$(".mouse-custom").removeClass("standard_cursor");
    // 	$(".mouse-custom").addClass("cutom_cursor");
    // }
    /*==============================================================
                             Cursor animation
    ==============================================================*/

    function mousecursor() {
        if ($(".cutom_cursor").length) {
            const e = document.querySelector(".cursor-inner"),
                t = document.querySelector(".cursor-outer");
            let n, i = 0,
                o = !1;
            window.onmousemove = function (s) {
                o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
            }, $("body").on("mouseenter", "a, .cursor-pointer", function () {
                e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
            }), $("body").on("mouseleave", "a, .cursor-pointer", function () {
                $(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
            }), e.style.visibility = "visible", t.style.visibility = "visible"
        }
    };

    if ($(".mouse-cursor").size()) {
        mousecursor();
    }

    /*==============================================================
                         URL Dark Mode
    ==============================================================*/

    function checkdarkmode() {
        var result = null,
            tmp = [];
        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === 'mode') result = decodeURIComponent(tmp[1]);
            });
        if (result == 'dark') {
            $('body').addClass('tcg-dark-mode');
        } else {
            return;
        };
    }
    checkdarkmode();

    function waitForElementToExist(selector) {
        return new Promise(resolve => {
          if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
          }
      
          const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer.disconnect();
            }
          });
      
          observer.observe(document.body, {
            subtree: true,
            childList: true,
          });
        });
      }

    $(document).ready(function() {

        $('[data-settings]').each(function() {
            let settings = $(this).data('settings');
            if(settings['tc_dark_mode_responsive_hide_in_dark'] == 'yes'){
                $(this).addClass('tc-hide-in-dark')
            } else if(settings['tc_dark_mode_responsive_hide_in_light'] == 'yes') {
                $(this).addClass('tc-hide-in-light')
            }
        });

        waitForElementToExist('.sticky-wrapper').then((elm) => {
            $('.tc-hide-nav-onscroll').each(function() {
                $(this).parent().addClass('tc-hide-nav-onscroll-handler')
            });
    
            $('.tc-display-nav-onscroll').each(function() {
                $(this).parent().addClass('tc-display-nav-onscroll-handler')
            });
        });

        var wind = $(window);
        var width = $(window).width();
        if (width > 991) {
            wind.on('scroll', function () {
                if($('.is-sticky')[0]){
                    $('.admin-bar .tcg-offcanvas-wrapper').css('top', 0);
                } else {
                    $('.admin-bar .tcg-offcanvas-wrapper').css('top', '');
                }
            });
        }

    });

});





