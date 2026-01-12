async function search() {
  const q = document.getElementById('search').value;
  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  const data = await res.json();

  const box = document.getElementById('results');
  box.innerHTML = '';

  data.forEach(s => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h3>${s.title}</h3>
      <p>${s.description || ''}</p>
      <img src="${s.image}">
      <br>
      <a href="${s.rawScript}" target="_blank">تحميل السكربت</a>
    `;
    box.appendChild(div);
  });
}
