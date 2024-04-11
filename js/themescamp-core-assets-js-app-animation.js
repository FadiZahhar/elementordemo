(function ($) {
    "use strict";

    // Get Device width
    let device_width = window.innerWidth;

        if (device_width > 100) {

            gsap.registerPlugin(ScrollTrigger, ScrollSmoother, TweenMax, ScrollToPlugin);
            gsap.config({ nullTargetWarn: false, });

            /*====================================================================================*/
            //# image Animation

            $('.tc-anim-parallax').attr(`data-speed`, `1.2`);
            $('.tc-anim-parallax').attr(`data-lag`, `0`);

            /*====================================================================================*/
            //# Create the smooth scroller!

            let skewSetter = gsap.quickTo("skewY"),
            clamp = gsap.utils.clamp(-15, 15);
            const smoother = ScrollSmoother.create({
                smooth: 1.3,
                effects: device_width < 1025 ? false : true,
                smoothTouch: false,
                normalizeScroll: false,
                ignoreMobileResize: true,
                onUpdate: self => skewSetter(clamp(self.getVelocity() / -80)),
                onStop: () => skewSetter(0)
            });

            if($('.tc-hscroll-container')[0]){

                $('.tc-hscroll-container').each(function() {

                    gsap.registerPlugin(ScrollTrigger);

                    let sections = gsap.utils.toArray(".panel");

                    gsap.to(sections, {
                        xPercent: -100 * (sections.length - 1),
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".tc-hscroll-container",
                            pin: true,
                            scrub: 1,
                            // snap: 1 / (sections.length - 1),
                            end: () => "+=" + document.querySelector(".tc-hscroll-container").offsetWidth
                        }
                    });
                });
            };

            /*====================================================================================*/
            //# correct the layout hight (top plog padding - _animation.scss) when scroll

            ScrollTrigger.create({
              start: 'top -280',
              end: 99999,
              toggleClass: {className: 'main-content--scrolled', targets: '#smooth-wrapper'}
            });

            $(document).ready(function() {
                if($('.tc-sticky-item')[0]){
                    ScrollTrigger.create({    
                        trigger: '.tc-sticky-item',
                        start: 'top top',
                        pin: '.tc-sticky-item',
                        pinSpacing: false    
                    });
                }
                
                if($('.tc-sticky-inparent')[0]){
                    ScrollTrigger.create({
                        trigger: '.tc-sticky-inparent',
                        start: 'top top',  // Start when the top of the sticky item is at the top of the viewport
                        endTrigger: $(".tc-sticky-inparent").parent(), // Use the outer container as the end trigger
                        end: 'bottom bottom', // End when the bottom of the outer container is at the bottom of the viewport
                        pin: true, // Pin the sticky item
                        pinSpacing: false // Disable additional spacing by ScrollTrigger
                    });
                }
                
                if($('.tc-sticky-sidebar')[0]){
                    ScrollTrigger.create({
                        trigger: '.tc-sticky-sidebar',
                        start: 'top top',  // Start when the top of the sticky item is at the top of the viewport
                        endTrigger: $(".tc-sticky-sidebar").parent(), // Use the outer container as the end trigger
                        end: 'bottom bottom+=250px', // End when the bottom of the outer container is at the bottom of the viewport
                        pin: true, // Pin the sticky item
                        pinSpacing: false // Disable additional spacing by ScrollTrigger
                    });
                }
            });

            $(document).ready(function() {
                if($(window).width() >= 480) {
                    let headerHeight;
                    let headerPosition = $('.site-header > div[data-elementor-type="wp-post"] > div').data('settings');
                    if($('header.site-header')[0] && !headerPosition['position']){
                        headerHeight = $('.site-header > div[data-elementor-type="wp-post"] > div').outerHeight();
                    } else if ($('.default-header')[0]) {
                        headerHeight = $('.default-header').outerHeight();
                    }
                    // if($('#wpadminbar')[0]) {
                    //     headerHeight += 30;
                    // }
                    $('#smooth-content').css('padding-top', headerHeight);
                }
            });

            /*====================================================================================*/
            //# Line Animation

            let splitTitleLines = gsap.utils.toArray(".tc-anim-lines");

            splitTitleLines.forEach(splitTextLine => {
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: splitTextLine,
                  start: 'top 90%',
                  end: 'bottom 60%',
                  scrub: false,
                  markers: false,
                  toggleActions: 'play none none none'
                }
              });

              const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
              gsap.set(splitTextLine, { perspective: 400 });
              itemSplitted.split({ type: "lines" })
              tl.from(itemSplitted.lines, { duration: 1, delay: 0.3, opacity: 0, rotationX: -80, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
            });

             /*====================================================================================*/
            //# chars Animation

            let headings = gsap.utils.toArray(".tc-anim-char").reverse();
            headings.forEach((heading, i) => {
                let headingIndex = i + 1;
                let mySplitText = new SplitText(heading, { type: "chars" });
                let chars = mySplitText.chars;

                chars.forEach((char, i) => {
                    smoother.effects(char, { lag: (i + headingIndex) * 0.1, speed: 1 });
                });
            });

             /*====================================================================================*/
            //# Offcanvas

            let buttonO = document.querySelector(".toggle-right");
             if (buttonO) {
                buttonO.addEventListener("click", (e) => {
                    smoother.paused(true);
                    //smoother.kill(); //to remove smooth while keep status (style) 
                    //smoother.revert();//to remove smooth while Reset status (to original) 
                });

                let buttonX = document.querySelector(".offcanvas-close");
                buttonX.addEventListener("click", (e) => {
                    smoother.paused(false);
                });
             }
             
             /*====================================================================================*/
             /*====================================================================================*/
            //# Smooth Show more button of archive
            let button = document.querySelector(".tcg-show-more:not(.loading)");
            if (button) {
                button.addEventListener("click", (e) => {
                    gsap.to(smoother,{
                        scrollTop:smoother.offset(".tcg-show-more:not(.loading)", "center center"),
                        duration:2,
                        ease:'back.out'

                    })
                });
            }






            //# smooth Switcher
            // Check if the element exists before adding the event listener
            let buttonOsw = document.querySelector("#smooth-btns > .activated");
            if (buttonOsw) {
                buttonOsw.addEventListener("click", (e) => {
                    window.location.reload(); // Reload the page
                });
            }


            let buttonXsw = document.querySelector("#smooth-btns > .stop");
            if (buttonXsw) {
                buttonXsw.addEventListener("click", (e) => {
                    smoother.kill();
                });
            }


            //# Mouse Switcher
            let buttonOm = document.querySelector("#cursor-btns > .animated");
            if (buttonOm) {
                buttonOm.addEventListener("click", (e) => {
                    $('body').css('cursor', 'none');
                });
            }

            let buttonXm = document.querySelector("#cursor-btns > .standerd");
            if (buttonXm) {
                buttonXm.addEventListener("click", (e) => {
                    $('body').css('cursor', 'default');
                    $('.mouse-cursor').css('display', 'none');
                });
            }
        }

         //# Header top padding
        // Find the parent and child elements
        let parent = document.querySelector('body');
        let child1 = parent.querySelector('.header');

        if(child1 != null){
            // Check if child1 has the class .abs
            if (child1.classList.contains('white-header')) {
                parent.classList.add('white-header');
            }
        }

})(jQuery);
