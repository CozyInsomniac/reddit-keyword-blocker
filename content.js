chrome.storage.sync.get("keywords", ({ keywords }) => {
  if (keywords && keywords.length > 0) {
    const lowerCaseKeywords = keywords.map(keyword => keyword.toLowerCase());

    const containsExactKeyword = (text, keywords) => {
      return keywords.some(keyword => new RegExp(`\\b${keyword}\\b`, 'i').test(text));
    };

    // For new Reddit layout
    document.querySelectorAll('a[data-ks-id][slot="full-post-link"]').forEach(post => {
      const postContent = post.innerText.toLowerCase();
      if (containsExactKeyword(postContent, lowerCaseKeywords)) {
        post.closest("article").style.display = "none";
      }
    });

    // For old Reddit layout
    document.querySelectorAll('.thing').forEach(postElement => {
      const titleElement = postElement.querySelector('.entry .title a.title');
      if (titleElement) {
        const postTitle = titleElement.textContent.toLowerCase();
        if (containsExactKeyword(postTitle, lowerCaseKeywords)) {
          postElement.style.display = 'none';
        }
      }
    });
  }
});
