---
title: "페이지 카테고리 이름"
layout: archive
permalink: /python_basic
author_profile: true
sidebar:
    nav: "sidebar-category"
---
{% assign posts = site.categories.human %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}