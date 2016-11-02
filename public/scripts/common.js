var $content;

$(document).ready(function () {
    $content = $('#content');
});

function ajax(link) {

    var layout = document.querySelector('.mdl-layout');
    layout.MaterialLayout.toggleDrawer();

    $.ajax({ url: link.href, data: { 'ajax': 1 } })
        .done(function (data) {
            $content.html(data);
        })
        .error(function (error) {
            alert(error);
        });

    return false;
}