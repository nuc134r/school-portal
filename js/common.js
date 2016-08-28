$(document).ready(function () {
    var hamburgerBtn = $('.hamburger'),
        hamburgerCounter = $('.hamburger-counter'),
        $body = $('body'),
        nav = $('nav'),
        overlay = $('.hamburger-overlay'),
        logo = $('.navbar-brand');

    function toggleOverlay() {
        hamburgerBtn.toggleClass('hamburger-toggled');
        nav.toggleClass('navbar-toggled');
        
        overlay.toggleClass('overlay-opened');
        $body.toggleClass('noscroll');
    }

    hamburgerBtn.click(toggleOverlay);
    hamburgerCounter.click(toggleOverlay);

    logo.click(function (e) {
        if (overlay.hasClass('overlay-opened')) {
            e.preventDefault();
            toggleOverlay();
        }
    });

    function isBreakpoint( alias ) {
        return $('.device-' + alias).is(':visible');
    }

    function EnableAjaxNavigation() {
        var $a = $('a');
        $a.unbind('click');
        $a.click(function (e) {
            e.preventDefault();
            var $this = $(this);

            if ($this.hasClass('overlay-link')) {
                toggleOverlay();
            }

            var href = $this.attr('href');
            if (href) {
                var url = window.location.origin + href;
                console.log('Went to ' + url);

                $.ajax(url)
                    .done(function (data) {
                        $('#content-block').html(data);
                        EnableAjaxNavigation();
                        history.pushState({}, 'Keker', href);
                        if(isBreakpoint('xs')) {
                            window.scrollTo(0, 0);
                        } else {
                            $("html, body").animate({scrollTop: 0}, 'fast');
                        }
                    })
                    .fail(function (err) {
                        window.location.replace(href);
                    });
            }
        });
    }

    //EnableAjaxNavigation();
});
