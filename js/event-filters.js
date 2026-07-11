(function () {
    var search = document.getElementById('event-search');
    var state = document.getElementById('event-state');
    var status = document.getElementById('event-filter-status');
    var seasons = document.querySelectorAll('.event-season');

    if (!search || !state || !status || !seasons.length) return;

    for (var i = 0; i < seasons.length; i++) {
        seasons[i].dataset.defaultOpen = seasons[i].open ? 'true' : 'false';
    }

    function matchHighlightWidths() {
        var highlightedEvents = document.querySelectorAll('.events-list .next-event');
        var widest = 0;

        for (var i = 0; i < highlightedEvents.length; i++) {
            highlightedEvents[i].style.width = 'fit-content';
        }

        for (var j = 0; j < highlightedEvents.length; j++) {
            widest = Math.max(widest, highlightedEvents[j].getBoundingClientRect().width);
        }

        if (highlightedEvents.length > 1) {
            for (var k = 0; k < highlightedEvents.length; k++) {
                highlightedEvents[k].style.width = widest + 'px';
            }
        }
    }

    function filterEvents() {
        var query = search.value.trim().toLowerCase();
        var useSearch = query.length >= 3;
        var selectedState = state.value;
        var isFiltering = useSearch || selectedState !== '';
        var matches = 0;

        for (var i = 0; i < seasons.length; i++) {
            var events = seasons[i].querySelectorAll('.events-list > li');
            var seasonMatches = 0;

            for (var j = 0; j < events.length; j++) {
                var matchesSearch = !useSearch || events[j].textContent.toLowerCase().indexOf(query) !== -1;
                var matchesState = !selectedState || events[j].dataset.eventState === selectedState;
                var isMatch = matchesSearch && matchesState;

                events[j].hidden = !isMatch;
                if (isMatch) {
                    matches++;
                    seasonMatches++;
                }
            }

            seasons[i].hidden = isFiltering && seasonMatches === 0;
            seasons[i].open = isFiltering && seasonMatches > 0
                ? true
                : seasons[i].dataset.defaultOpen === 'true';
        }

        status.textContent = isFiltering
            ? matches + (matches === 1 ? ' event found' : ' events found')
            : '';
    }

    search.addEventListener('input', filterEvents);
    state.addEventListener('change', filterEvents);
    window.addEventListener('resize', matchHighlightWidths);
    matchHighlightWidths();
}());
