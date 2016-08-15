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
});

