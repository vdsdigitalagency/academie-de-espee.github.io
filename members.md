---
title: Roster of Members
---

<div class="event-filters roster-search" role="search" aria-label="Filter members">
  <div>
    <label for="member-search">Search by name:</label>
    <input id="member-search" type="search" minlength="3" placeholder="Enter at least 3 letters" autocomplete="off" />
  </div>
  <div>
    <label for="member-rank">Rank:</label>
    <span class="event-state-select">
      <select id="member-rank">
        <option value="">All ranks</option>
        {% assign ranks = "Scholar|Free Scholar|Provost|Distinguished Provost" | split: "|" %}
        {% for rank in ranks %}
        <option value="{{ rank }}">{{ rank }}</option>
        {% endfor %}
      </select>
    </span>
  </div>
    <span id="member-search-status" role="status" aria-live="polite"></span>
</div>

<table id="member-roster" class="pure-table pure-table-bordered sortable" width="100%">
<caption class="visually-hidden">Academie members by name, rank, and induction date</caption>
<thead>
<tr>
   <th scope="col"> Name </th>
   <th scope="col"> Rank </th>
   <th scope="col"> Date </th>
</tr>
</thead>
<tbody>
{% for data in site.data.members %}
{% assign rank = data[0] %}
{% assign entries = data[1] | sorted %}
{% for entry in entries %}
<tr>
	<td>

    		{% if entry.op_id != null %}
       			<a href="http://op.atlantia.sca.org/op_ind.php?atlantian_id={{entry.op_id}}">
    		{% endif %}
		{{ entry.name }}
    		{% if entry.op_id != null %}
       			</a>
    		{% endif %}
	</td>
	<td> {{ rank }} </td>
	<td> {{ entry.date }} </td>
</tr>
{% endfor %}
{% endfor %}
</tbody>
</table>

*The roster was reviewed and updated as of July 11, 2026.*

Are you a new member of the Academie or have recently changed rank?  [Fill this form](https://forms.gle/Xyj8HFtUp5W8F2oy7){:target="_blank" rel="noopener noreferrer"}, or make a [pull request](https://github.com/academie-de-espee/academie-de-espee.github.io/pulls){:target="_blank" rel="noopener noreferrer"}.


<script src="/js/sorttable.js"></script>
<script>
(function () {
    var search = document.getElementById('member-search');
    var rank = document.getElementById('member-rank');
    var rows = document.getElementById('member-roster').tBodies[0].rows;
    var status = document.getElementById('member-search-status');

    function filterMembers() {
        var query = search.value.trim().toLowerCase();
        var useSearch = query.length >= 3;
        var selectedRank = rank.value;
        var isFiltering = useSearch || selectedRank !== '';
        var matches = 0;

        for (var i = 0; i < rows.length; i++) {
            var name = rows[i].cells[0].textContent.toLowerCase();
            var memberRank = rows[i].cells[1].textContent.trim();
            var matchesSearch = !useSearch || name.indexOf(query) !== -1;
            var matchesRank = !selectedRank || memberRank === selectedRank;
            var isMatch = matchesSearch && matchesRank;
            rows[i].style.display = isMatch ? '' : 'none';
            if (isMatch) matches++;
        }

        status.textContent = isFiltering ? matches + (matches === 1 ? ' member found' : ' members found') : '';
    }

    search.addEventListener('input', filterMembers);
    rank.addEventListener('change', filterMembers);
}());
</script>
