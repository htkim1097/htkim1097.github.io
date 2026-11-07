
---
layout: default
title: Home
description: 개발과 기술 학습 기록
---

<section class="home">

  <div class="home-intro">
    <h1>기록하고, 배우고, 만들어가기.</h1>
    <p>
      개발과 기술을 공부하며 경험한 내용을 기록합니다.
    </p>
  </div>

  <section class="post-list-section">
    <h2 class="section-title">최근 게시글</h2>

    <div class="post-list">

      {% for post in site.posts %}

        <article class="post-item">

          <div class="post-item-meta">
            {{ post.date | date: "%Y.%m.%d" }}

            {% for category in post.categories %}
              <span class="category-label">
                {{ category }}
              </span>
            {% endfor %}
          </div>

          <h3>
            <a href="{{ post.url | relative_url }}">
              {{ post.title }}
            </a>
          </h3>

          <p class="post-excerpt">
            {{ post.description | default: post.excerpt | strip_html | truncate: 160 }}
          </p>

          {% if post.tags.size > 0 %}
            <div class="post-tags">
              {% for tag in post.tags %}
                <span class="tag-label">#{{ tag }}</span>
              {% endfor %}
            </div>
          {% endif %}

        </article>

      {% else %}

        <p class="empty-post">
          아직 작성된 게시글이 없습니다.
        </p>

      {% endfor %}

    </div>
  </section>

</section>
