var $content,
    $drawer,
    $drawer_obfuscator;

$(document).ready(function () {
    $content = $('#content');
    $drawer = $('.mdl-layout__drawer');
    $drawer_obfuscator = $('.mdl-layout__obfuscator');
});

function ajax(link) {

    var l = document.getElementById('my-link');

    $drawer.removeClass('is-visible');
    $drawer_obfuscator.removeClass('is-visible');

    $.ajax({ url: link.href, data: { 'ajax': 1 } })
        .done(function (data) {
            $content.html(data);
        })
        .error(function (error) {
            alert(error);
        });

    return false;
}