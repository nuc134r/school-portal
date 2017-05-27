var socket = io();

socket.on('message', function (data) {
    if (data.inbox) {
        if (document.location.pathname == '/chat/' + data.from.id) {
            appendChatMessage(data);
        } else {
            showChatMessage(data);
        }
    } else {
        if (document.location.pathname == '/chat/' + data.toId) {
            appendOwnChatMessage(data);
        }
    }
});

function buildMessageDOM(data, user, hideAvatar) {
    var user;

    var html = null;

    if (hideAvatar) {
        html = '<div style="margin-left: 41px; font-size: 14px; width: 100%; margin-top: 8px;" ts="' + (+new Date(data.createdAt)) + '" user_id="' + user.id + '">' + data.message + '</div>';
    } else {
        html =
            '<div style="width: 100%; min-height: 35px; margin-top: 16px;" ts="' + (+new Date(data.createdAt)) + '" user_id="' + user.id + '">' +
            '   <a href="/profile/' + user.id + '" onclick="ajax(this, true); return false;">' +
            '       <img src="' + user.images.small + '" style="height: 35px; width: 35px; position: relative;" class="mdl-user-avatar"/>' +
            '   </a>' +
            '   <div style="margin-left: 40px;">' +
            '       <a href="/profile/' + user.id + '" onclick="ajax(this, true); return false;" style="text-decoration: none; color: black; font-weight: 400;">' + user.name.first + '</a>' +
            '       <span style="opacity: .5; font-size: 12px; padding-left: 5px;">' + data.createdAtDisplay + '</span>' +
            '   </div>' +
            '   <div style="margin-left: 41px; font-size: 14px; width: 100%;">' + data.message + '</div>' +
            '</div>';
    }

    return html;
}

function appendChatMessage(data) {
    var lastMessage = $('#messages_wrap').children().last();
    var hideAvatar = lastMessage.attr('user_id') == data.from.id && (Math.floor((+new Date(data.createdAt)) / 1000) - Math.floor(+lastMessage.attr('ts') / 1000)) < 30;

    $('#messages_wrap')
        .append(buildMessageDOM(data, data.from, hideAvatar))
        .scrollTop(messages_wrap.scrollHeight);
}

function appendOwnChatMessage(data) {
    var lastMessage = $('#messages_wrap').children().last();
    var hideAvatar = lastMessage.attr('user_id') == school_context.user.id && (Math.floor((+new Date(data.createdAt)) / 1000) - Math.floor(+lastMessage.attr('ts') / 1000)) < 30;

    $('#messages_wrap')
        .append(buildMessageDOM(data, school_context.user, hideAvatar))
        .scrollTop(messages_wrap.scrollHeight);
}

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

    var url = link.href || link.attributes["href"].value

    $.ajax({ url: url, data: { 'ajax': 1 } })
        .done(function (response, textStatus, jqXHR) {

            if (!response.title && !response.html) {
                window.location.reload();
                return;
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

function showChatMessage(data) {
    document.querySelector('.mdl-js-snackbar').MaterialSnackbar.showSnackbar(
        {
            message: data.from.name.first + ' ' + data.from.name.last + ': ' + data.message,
            timeout: 5000,
            actionHandler: function () {
                ajax({ href: '/chat/' + data.from.id });
            },
            actionText: 'Открыть'
        }
    );
}

window.onpopstate = function (e) {
    if (expectNavigation) {
        expectNavigation = false;
    } else {
        ajax(document.location, false, false);
    }
}

