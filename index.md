---
layout: default
title: Home
---

# 최근 게시글

<!-- site.posts : jekyll이 _posts 폴더에 있는 게시글을 읽어서 자동으로 목록을 만듬 -->
{% for post in site.posts %}

## [{{ post.title }}]({{ post.url | relative_url }})

{{ post.date | date: "%Y-%m-%d" }}

{{ post.excerpt }}

---

{% endfor %}