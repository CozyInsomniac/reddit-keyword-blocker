document.getElementById('addKeyword').addEventListener('click', () => {
  addKeyword();
});

document.getElementById('keyword').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addKeyword();
  }
});

function addKeyword() {
  const keyword = document.getElementById('keyword').value.trim();
  if (keyword) {
    chrome.storage.sync.get('keywords', ({
      keywords
    }) => {
      if (!keywords) keywords = [];
      if (!keywords.includes(keyword)) {
        keywords.push(keyword);
        chrome.storage.sync.set({
          keywords
        }, () => {
          updateKeywordList(keywords);
          document.getElementById('keyword').value = '';
        });
      } else {
        alert('This keyword is already in the list!');
      }
    });
  }
}

function updateKeywordList(keywords) {
  const keywordsList = document.getElementById('keywordsList');
  keywordsList.innerHTML = '';

  keywords.forEach((keyword, index) => {
    const column = document.createElement('div');
    column.className = 'column is-full';

    const box = document.createElement('div');
    box.className = 'box is-flex is-justify-content-space-between';
    box.style.padding = '20px';
    box.style.fontSize = '1.1rem';
    box.innerHTML = `
      <span>${keyword}</span>
      <button class="button is-small is-danger" data-index="${index}">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;

    column.appendChild(box);
    keywordsList.appendChild(column);
  });

  document.querySelectorAll('.button.is-danger').forEach(button => {
    button.addEventListener('click', (event) => {
      const button = event.target.closest('.button.is-danger');
      const index = button.dataset.index;

      chrome.storage.sync.get('keywords', ({
        keywords
      }) => {
        keywords.splice(index, 1);
        chrome.storage.sync.set({
          keywords
        }, () => {
          updateKeywordList(keywords);
        });
      });
    });
  });
}

chrome.storage.sync.get('keywords', ({
  keywords
}) => {
  updateKeywordList(keywords || []);
});
