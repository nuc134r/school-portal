var $content;
var hasNavigated = false;

$(document).ready(function () {
    $content = $('#content');

    History.Adapter.bind(window, 'statechange', function () {
        if (hasNavigated) {
            var state = History.getState();
            ajax(state.url);
        } else {
            hasNavigated = true;
        }
    });
});

function ajax(link, closeDrawer) {

    if (closeDrawer) {
        var layout = document.querySelector('.mdl-layout');
        layout.MaterialLayout.toggleDrawer();
    }

    $.ajax({ url: link.href, data: { 'ajax': 1 } })
        .done(function (data) {
            $content.html(data);
            History.pushState(link.href, 'Keker', link.href);
            if (!(typeof (componentHandler) == 'undefined')) {
                componentHandler.upgradeAllRegistered();
            }
        })
        .error(function (error) {
            alert(error);
        });

    return false;
}