document.addEventListener("DOMContentLoaded", () => {
  const codeBlocks = document.querySelectorAll(".post-content pre");

  codeBlocks.forEach(pre => {
    const code = pre.querySelector("code");

    if (!code) return;

    const wrapper = document.createElement("div");
    wrapper.className = "code-block-wrapper";

    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const button = document.createElement("button");
    button.className = "code-copy-button";
    button.type = "button";
    button.textContent = "복사";

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = "복사 완료";

        setTimeout(() => {
          button.textContent = "복사";
        }, 1500);
      } catch (error) {
        button.textContent = "복사 실패";
      }
    });

    wrapper.appendChild(button);
  });
});