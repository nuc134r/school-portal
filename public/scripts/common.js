var $content,
    $title,
    $fab_link,
    $fab_icon,
    $searchbox,
    $searchwrapper;


$(document).ready(function () {
    $content = $('#content');
    $title = $('.mdl-layout__title');
    $fab_link = $('#fab-link');
    $fab_icon = $('#fab-icon');
    $searchbox = $('#search');
    $searchwrapper = $('#search-wrapper');
});

function ajax(link, closeDrawer) {

    var $obfuscator = $('.mdl-layout__obfuscator');

    if (closeDrawer && $obfuscator.hasClass('is-visible')) {
        var layout = document.querySelector('.mdl-layout');
        layout.MaterialLayout.toggleDrawer();
    }

    $fab_link.css('visibility', 'collapse');
    $content.html('<div class="loading-text loading-text-vert-centered">=^_^=</div>');
    $searchbox.val('');
    $searchwrapper.css('visibility', 'collapse');
    $searchwrapper.removeClass('is-focused, is-dirty');

    $.ajax({ url: link.href, data: { 'ajax': 1 } })
        .done(function (response) {

            // TODO: Validate 'response'

            $content.html(response.html);
            $title.html(response.title);

            if (response.fab) {
                $fab_link.css('visibility', 'visible');
                $fab_link.attr('href', response.fab.link);
                $fab_icon.html(response.fab.icon);
            }

            if (response.searchable) {
                $searchwrapper.css('visibility', 'visible');
            }

            if (!(typeof (componentHandler) == 'undefined')) {
                componentHandler.upgradeAllRegistered();
            }

            History.pushState({}, response.title + ' | Студенческий портал', link.href);
        })
        .error(function (error) {
            showMessage('AJAX navigation error: ' + error.status);
            console.error(error);
        });

    return false;
}

function showMessage(message) {
    var notification = document.querySelector('.mdl-js-snackbar');
    notification.MaterialSnackbar.showSnackbar(
        {
            message: message
        }
    );
}

