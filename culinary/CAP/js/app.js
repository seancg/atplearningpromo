function closecontact() {
    $('#contact').trigger('reveal:close');
}

function closerequest() {
    $('#requestForm').trigger('reveal:close');
}

function closevideo() {
    $('#videomodal').trigger('reveal:close');
}

(function ($, window, undefined) {
    'use strict';

    var $doc = $(document),
        Modernizr = window.Modernizr;

    $(document).ready(function () {
        $.fn.foundationAlerts ? $doc.foundationAlerts() : null;
        $.fn.foundationButtons ? $doc.foundationButtons() : null;
        $.fn.foundationAccordion ? $doc.foundationAccordion() : null;
        $.fn.foundationNavigation ? $doc.foundationNavigation() : null;
        $.fn.foundationTopBar ? $doc.foundationTopBar() : null;
        $.fn.foundationCustomForms ? $doc.foundationCustomForms() : null;
        $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
        $.fn.foundationTabs ? $doc.foundationTabs({
            callback: $.foundation.customForms.appendCustomMarkup
        }) : null;
        $.fn.foundationTooltips ? $doc.foundationTooltips() : null;
        $.fn.foundationMagellan ? $doc.foundationMagellan() : null;
        $.fn.foundationClearing ? $doc.foundationClearing() : null;

        $.fn.placeholder ? $('input, textarea').placeholder() : null;


        // scroll-up icon
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scrollup').fadeIn();
            } else {
                $('.scrollup').fadeOut();
            }
        });
        $('.scrollup').click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });

        // prepare captcha
        $.getJSON('contact.php?action=captcha', function (data) {
            $('#captcha').html(data.i1 + ' ' + data.o + ' ' + data.i2);
            $('#s').val(data.s);
        });
        // prepare captcha
        $.getJSON('request.php?action=captcha', function (data) {
            $('#captcha').html(data.i1 + ' ' + data.o + ' ' + data.i2);
            $('#s').val(data.s);
        });
        // contact form handler
        var form = $("form#contactform");
        // make contact form available on click
        $('.feedback,#feedback').click(function (e) {
            $('#contact').reveal();
            return false;
        });


         form.submit(function (e) {
              e.preventDefault();
              if($('#contactname').val()==''){
                alert('Please provide your name');
              }else if($('#contactemail').val()==''){
                alert('Please provide your email');
              }else if($('#contactmessage').val()==''){
                alert('Please fill out your message');
              }else{
                  var formData = $("form#contactform").serialize();
                  $.ajax({
                         url : 'contact.php',
                         type : 'POST',
                         data : { data : formData },
                         success : function(data) {
                            console.log(data);
                            $('#formwrapper').hide();
                            $('#contactmessages').empty().append('<p class="success">Your Message has been sent.</p><a href="javascript:closecontact();" id="contact_close_counter">Close (<span id="counter">10</span>)</a>');
                            var sec = $('span#counter').text() || 0;
                            var timer = setInterval(function () {
                                $('span#counter').text(--sec);
                                if (sec == 0) {
                                    closecontact();
                                    clearInterval(timer);
                                }
                            }, 1000);
                         }
                    });
              }
              
          });

        // request form handler
        var form1 = $("form#requestform");
        // make contact form available on click
        $('.request,#request').click(function (e) {
            $('#requestForm').reveal();
            return false;
        });


         form1.submit(function (e) {
              e.preventDefault();
              if($('#requestname').val()==''){
                alert('Please provide your name');
              }else if($('#requestemail').val()==''){
                alert('Please provide your email');
              }else if($('#requestmessage').val()==''){
                alert('Please fill out your message');
              }else{
                  var formData = $("form#requestform").serialize();
                  $.ajax({
                         url : 'request.php',
                         type : 'POST',
                         data : { data : formData },
                         success : function(data) {
                            // console.log(data);
                            $('#requestwrapper').hide();
                            $('#requestmessages').empty().append('<p class="success">Your Message has been sent.</p>Dear Chef Instructor,<p>Thank you for your interest in American Technical Publishers\' new educational products for mastering knife techniques. Shortly, you will be receiving a link to the e-version of the companion textbook, <em>50 Effective Knife Techniques</em>, which follows the DVD presentation, for immediate review.</p><p>As always, please don’t hesitate to contact us if you have further questions or instructional needs.</p><p>Cordially,</p><p>Gayle</p><a href="javascript:closerequest();" id="request_close_counter">Close (<span id="counter">20</span>)</a>');
                            var sec = $('span#counter').text() || 0;
                            var timer = setInterval(function () {
                                $('span#counter').text(--sec);
                                if (sec == 0) {
                                    closerequest();
                                    clearInterval(timer);
                                }
                            }, 1000);
                         }
                    });
              }
              
          });

        // make contact form available on click
        $('.button_video').on('click', function (e) {
            var file = $(this).data('src');
            console.log(file);
            $('#videomodal').reveal();
            $('#video').attr('src', file);
            return false;
        });
    });

    // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
    $('.block-grid.two-up>li:nth-child(2n+1)').css({
        clear: 'both'
    });
    $('.block-grid.three-up>li:nth-child(3n+1)').css({
        clear: 'both'
    });
    $('.block-grid.four-up>li:nth-child(4n+1)').css({
        clear: 'both'
    });
    $('.block-grid.five-up>li:nth-child(5n+1)').css({
        clear: 'both'
    });

    // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
    if (Modernizr.touch && !window.location.hash) {
        $(window).load(function () {
            setTimeout(function () {
                window.scrollTo(0, 1);
            }, 0);
        });
    }

})(jQuery, this);