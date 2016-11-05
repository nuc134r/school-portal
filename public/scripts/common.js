var $content,
    $title,
    $fab_link,
    $fab_icon;


$(document).ready(function () {
    $content = $('#content');
    $title = $('.mdl-layout__title');
    $fab_link = $('#fab-link');
    $fab_icon = $('#fab-icon');
});

function ajax(link, closeDrawer) {

    var $obfuscator = $('.mdl-layout__obfuscator');

    if (closeDrawer && $obfuscator.hasClass('is-visible')) {
        var layout = document.querySelector('.mdl-layout');
        layout.MaterialLayout.toggleDrawer();
    }

    $fab_link.css('visibility', 'collapse');
    $content.html('<div class="loading-text">=^_^=</div>');

    //return false;

    $.ajax({ url: link.href, data: { 'ajax': 1 } })
        .done(function (response) {

            $content.html(response.html);

            $title.html(response.title);

            if (response.fab) {
                $fab_link.css('visibility', 'visible');
                $fab_link.attr('href', response.fab.link);
                $fab_icon.html(response.fab.icon);
            }

            if (!(typeof (componentHandler) == 'undefined')) {
                componentHandler.upgradeAllRegistered();
            }

            History.pushState({}, response.title + ' | Студенческий портал', link.href);
        })
        .error(function (error) {
            console.error(error);
        });

    return false;
}

/*$(window).bind('statechange', function () {
    if (event.state) {
        var state = History.getState();
        var url = state.url;

        ajax(url);
    }
});*/