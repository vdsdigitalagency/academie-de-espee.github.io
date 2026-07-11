(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var links = document.querySelectorAll('a[target="_blank"]');

        for (var i = 0; i < links.length; i++) {
            var notice = document.createElement('span');
            notice.className = 'visually-hidden';
            notice.textContent = ' (opens in a new tab)';
            links[i].appendChild(notice);
        }
    });
}());
