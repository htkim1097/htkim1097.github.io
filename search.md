---
layout: default
title: 검색
description: 게시글 검색
permalink: /search/
---

<section class="search-page">

  <header class="archive-header">
    <h1>검색</h1>
    <p>게시글 제목, 본문, 카테고리, 태그를 검색합니다.</p>
  </header>

  <div class="search-box">
    <input
      type="search"
      id="search-input"
      placeholder="검색어를 입력하세요."
      autocomplete="off"
      aria-label="게시글 검색"
    >
  </div>

  <p id="search-status" class="search-status">
    검색어를 입력해 주세요.
  </p>

  <div id="search-results" class="search-results"></div>

</section>

<script
  src="{{ '/assets/js/search.js' | relative_url }}"
  defer
></script>