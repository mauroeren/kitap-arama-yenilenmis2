async function searchBooks(query) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&langRestrict=tr&maxResults=6`;

  const response = await fetch(url);
  const data = await response.json();

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = "";

  if (data.items) {
    data.items.forEach(item => {
      const book = item.volumeInfo;
      const div = document.createElement('div');
      div.className = 'book';
      div.innerHTML = `
        <img src="${book.imageLinks?.thumbnail || ''}" alt="Kapak">
        <div class="book-info">
          <h3>${book.title}</h3>
          <p><strong>Yazar:</strong> ${book.authors ? book.authors.join(', ') : 'Bilinmiyor'}</p>
          <p><strong>Yıl:</strong> ${book.publishedDate || 'Yok'}</p>
        </div>
      `;
      resultsDiv.appendChild(div);
    });
  } else {
    resultsDiv.innerHTML = "<p>Sonuç bulunamadı.</p>";
  }
}

function searchBooksFromInput() {
  const query = document.getElementById('search').value;
  searchBooks(query);
}
