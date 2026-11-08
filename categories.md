---
layout: default
title: 카테고리
description: 카테고리별 게시글 모음
permalink: /categories/
---

<section class="archive-page">

  <header class="archive-header">
    <h1>카테고리</h1>
    <p>주제별로 게시글을 모아봅니다.</p>
  </header>

  {% for category in site.categories %}
    {% assign category_name = category[0] %}
    {% assign category_posts = category[1] %}

    <section class="archive-group" id="{{ category_name | slugify }}">

      <h2>{{ category_name }}</h2>

      <ul class="archive-post-list">
        {% for post in category_posts %}
          <li>
            <time>{{ post.date | date: "%Y.%m.%d" }}</time>
            <a href="{{ post.url | relative_url }}">
              {{ post.title }}
            </a>
          </li>
        {% endfor %}
      </ul>

    </section>
  {% endfor %}

</section>