var $content,
    $title,
    $fab_link,
    $fab_icon,
    $searchbox,
    $searchwrapper,
    $loading_spinner;


$(document).ready(function () {
    $content = $('#content');
    $title = $('.mdl-layout__title');
    $fab_link = $('#fab-link');
    $fab_icon = $('#fab-icon');
    $searchbox = $('#search');
    $searchwrapper = $('#search-wrapper');
    $loading_spinner = $('#loading-spinner');
});

var expectNavigation = false;

function ajax(link, closeDrawer, browserTriggered) {
    expectNavigation = true;

    var $obfuscator = $('.mdl-layout__obfuscator');

    if (closeDrawer && $obfuscator.hasClass('is-visible')) {
        var layout = document.querySelector('.mdl-layout');
        layout.MaterialLayout.toggleDrawer();
    }

    $fab_link.css('visibility', 'collapse');
    $content.html('');
    $loading_spinner.css('visibility', 'visible');
    $searchbox.val('');
    $searchwrapper.css('visibility', 'collapse');
    $searchwrapper.removeClass('is-focused, is-dirty');

    link.href = link.href || link.attributes["href"].value

    $.ajax({ url: link.href, data: { 'ajax': 1 } })
        .done(function (response, textStatus, jqXHR) {

            if (!response.title && !response.html) {
                window.location.reload();
            }

            $loading_spinner.css('visibility', 'collapse');
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
            if (!browserTriggered) {
                History.pushState({}, response.title + ' | Студенческий портал', link.href);
            }
        })
        .error(function (error) {
            $loading_spinner.css('visibility', 'collapse');
            $title.html('Ошибка');
            History.pushState({}, 'Ошибка | Студенческий портал', link.href);
            $content.html('<div style="position: absolute; z-index: 5; top: calc(30% - 14px);" class="loading-text"><h5>Произошла ошибка.</h5><h5>Тут ничего нет.</h5></div>');
            
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

window.onpopstate = function (e) {
    if(expectNavigation) {
        expectNavigation = false;
    } else {
        ajax(document.location, false, true);
    }
}