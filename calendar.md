---
title: Academie Calendar
---

Here you will find the upcoming events where the members of the Academie d'Espee host prize fights, offer hospitality, and bring the community together through gatherings, meetings, and practices. Only events within the Kingdom of Atlantia that include rapier fencing activities are listed below. For a complete schedule of all official SCA events, please visit the [Kingdom of Atlantia Calendar](https://atlantia.sca.org/calendar/).

Do you want to advertise an event? Email [Lady Virginie de Champagne](mailto:vvdelaitre@gmail.com) to have your event published. For questions regarding a specific event, please contact the Academie’s designated Point of Contact (POC) listed for that event.

<div class="event-filters" role="search" aria-label="Filter events">
  <div>
    <label for="event-search">Search events:</label>
    <input id="event-search" type="search" minlength="3" placeholder="Enter at least 3 letters" autocomplete="off">
  </div>
  <div>
    <label for="event-state">State:</label>
    <span class="event-state-select">
      <select id="event-state">
        <option value="">All states</option>
        <option value="VA">Virginia</option>
        <option value="MD">Maryland</option>
        <option value="NC">North Carolina</option>
        <option value="SC">South Carolina</option>
        <option value="other">Other / Online</option>
      </select>
    </span>
  </div>
  <span id="event-filter-status" role="status" aria-live="polite"></span>
</div>

{% assign sorted_seasons = site.data.events | sort: "start_date" | reverse %}
{% assign today = site.time | date: "%Y-%m-%d" %}
{% assign next_event_date = "9999-12-31" %}
{% for group in site.data.events %}
  {% for event in group.events %}
    {% if event.date >= today and event.date < next_event_date %}
      {% assign next_event_date = event.date %}
    {% endif %}
  {% endfor %}
{% endfor %}
{% assign next_event_week = next_event_date | date: "%G-%V" %}
{% for group in sorted_seasons %}
<details class="event-season"{% if group.end_date >= today %} open{% endif %}>
<summary><h2>{{ group.season }}</h2></summary>
<ul class="events-list">
{% assign sorted_events = group.events | sort: "date" | reverse %}
{% for event in sorted_events %}
  {% assign is_next_event = false %}
  {% assign event_week = event.date | date: "%G-%V" %}
  {% assign event_state = "other" %}
  {% if event.location contains ", VA" %}{% assign event_state = "VA" %}
  {% elsif event.location contains ", MD" %}{% assign event_state = "MD" %}
  {% elsif event.location contains ", NC" %}{% assign event_state = "NC" %}
  {% elsif event.location contains ", SC" %}{% assign event_state = "SC" %}
  {% endif %}
  {% if event.date >= today and event_week == next_event_week %}
    {% assign is_next_event = true %}
  {% endif %}
  <li data-event-state="{{ event_state }}"{% if is_next_event %} class="next-event"{% endif %}>
    <strong>{{ event.display_date }} – {{ event.name }}</strong><br>
    <em>{{ event.location }}</em>
    {% for link in event.links %}
      <br>{% if link.prefix %}{{ link.prefix }} {% endif %}<a href="{{ link.url }}">{{ link.label }}</a>{% if link.note %} {{ link.note }}{% endif %}
    {% endfor %}
    {% for note in event.notes %}
      <br>{{ note }}
    {% endfor %}
    {% if event.emphasis %}<br><em>{{ event.emphasis }}</em>{% endif %}
    {% if event.poc %}<br><em>POC: {{ event.poc }}</em>{% endif %}
  </li>
{% endfor %}
</ul>
</details>
{% endfor %}

<script src="/js/event-filters.js"></script>
