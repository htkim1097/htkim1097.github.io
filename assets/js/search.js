document.addEventListener("DOMContentLoaded", async () => {
  const input = document.getElementById("search-input");
  const status = document.getElementById("search-status");
  const results = document.getElementById("search-results");

  let posts = [];

  // 검색 데이터 불러오기
  try {
    const response = await fetch("/search.json");

    if (!response.ok) {
      throw new Error("검색 데이터를 불러오지 못했습니다.");
    }

    posts = await response.json();
    status.textContent = `전체 게시글 ${posts.length}개`;
  } catch (error) {
    status.textContent = error.message;
    input.disabled = true;
    return;
  }

  // 검색 결과에 사용할 HTML 요소 생성
  function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text !== undefined) {
      element.textContent = text;
    }

    return element;
  }

  // 검색 결과 출력
  function renderResults(query) {
    results.replaceChildren();

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      status.textContent = `전체 게시글 ${posts.length}개`;
      return;
    }

    const keywords = normalizedQuery
      .split(/\s+/)
      .filter(Boolean);

    const matchedPosts = posts.filter(post => {
      const searchableText = [
        post.title,
        post.description,
        post.content,
        ...(post.categories || []),
        ...(post.tags || [])
      ].join(" ").toLowerCase();

      return keywords.every(keyword =>
        searchableText.includes(keyword)
      );
    });

    status.textContent =
      `${matchedPosts.length}개의 게시글을 찾았습니다.`;

    if (matchedPosts.length === 0) {
      results.appendChild(
        createElement(
          "p",
          "search-empty",
          "검색 결과가 없습니다."
        )
      );
      return;
    }

    matchedPosts.forEach(post => {
      const article = createElement("article", "search-result");

      const meta = createElement(
        "div",
        "search-result-meta",
        post.date
      );

      if (post.categories?.length) {
        meta.append(
          createElement(
            "span",
            "category-label",
            post.categories.join(", ")
          )
        );
      }

      const title = createElement("h2");
      const link = createElement("a", "", post.title);

      link.href = post.url;
      title.appendChild(link);

      const description = createElement(
        "p",
        "search-result-description",
        post.description || post.content.slice(0, 160)
      );

      const tags = createElement("div", "post-tags");

      (post.tags || []).forEach(tag => {
        tags.appendChild(
          createElement("span", "tag-label", `#${tag}`)
        );
      });

      article.append(meta, title, description, tags);
      results.appendChild(article);
    });
  }

  // 입력할 때마다 검색
  input.addEventListener("input", () => {
    renderResults(input.value);
  });
});