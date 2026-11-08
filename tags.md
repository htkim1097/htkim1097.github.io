---
layout: default
title: 태그
description: 태그별 게시글 모음
permalink: /tags/
---

<section class="archive-page">

  <header class="archive-header">
    <h1>태그</h1>
    <p>관심 있는 기술과 키워드로 게시글을 찾아봅니다.</p>
  </header>

  {% for tag in site.tags %}
    {% assign tag_name = tag[0] %}
    {% assign tag_posts = tag[1] %}

    <section class="archive-group" id="{{ tag_name | slugify }}">

      <h2>#{{ tag_name }}</h2>

      <ul class="archive-post-list">
        {% for post in tag_posts %}
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