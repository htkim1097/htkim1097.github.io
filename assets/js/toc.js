document.addEventListener("DOMContentLoaded", () => {
  const toc = document.getElementById("post-toc");
  const tocList = document.getElementById("post-toc-list");
  const content = document.querySelector(".post-content");

  if (!toc || !tocList || !content) return;

  // 게시글의 h2, h3 제목 수집
  const headings = content.querySelectorAll("h2, h3");

  if (headings.length === 0) return;

  headings.forEach((heading, index) => {
    // 제목에 id가 없으면 자동 생성
    if (!heading.id) {
      heading.id = `heading-${index + 1}`;
    }

    const li = document.createElement("li");
    const link = document.createElement("a");

    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;

    if (heading.tagName === "H3") {
      li.classList.add("toc-subitem");
    }

    li.appendChild(link);
    tocList.appendChild(li);
  });

  toc.hidden = false;
});