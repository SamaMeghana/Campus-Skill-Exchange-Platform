const form = document.getElementById('exchangeForm');
const exchangeList = document.getElementById('exchangeList');
const searchInput = document.getElementById('search');
const filterCategory = document.getElementById('filterCategory');

let exchanges = [];

// Load saved posts
if (localStorage.getItem('campusExchanges')) {
  exchanges = JSON.parse(localStorage.getItem('campusExchanges'));
  renderExchanges(exchanges);
}

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const exchange = {
    name: document.getElementById('name').value.trim(),
    location: document.getElementById('location').value.trim(),
    skillToTeach: document.getElementById('skillHave').value.trim(),
    skillToLearn: document.getElementById('skillNeed').value.trim(),
    description: document.getElementById('description').value.trim(),
    time: new Date().toLocaleString()
  };

  exchanges.push(exchange);
  localStorage.setItem('campusExchanges', JSON.stringify(exchanges));
  renderExchanges(exchanges);
  form.reset();
  alert('Your exchange post has been added successfully!');
});

// Search and Filter
searchInput.addEventListener('input', filterAndRender);
filterCategory.addEventListener('change', filterAndRender);

function filterAndRender() {
  const keyword = searchInput.value.trim().toLowerCase();
  const category = filterCategory.value.trim().toLowerCase();

  const filtered = exchanges.filter(e =>
    (e.skillToTeach.toLowerCase().includes(keyword) ||
     e.skillToLearn.toLowerCase().includes(keyword) ||
     e.name.toLowerCase().includes(keyword) ||
     e.location.toLowerCase().includes(keyword)) &&
    (category === "" ||
     e.skillToTeach.toLowerCase().includes(category) ||
     e.skillToLearn.toLowerCase().includes(category))
  );

  renderExchanges(filtered);
}

// Render all posts neatly with aligned labels
function renderExchanges(data) {
  exchangeList.innerHTML = "";

  if (data.length === 0) {
    exchangeList.innerHTML = "<p style='color: gray;'>No exchange posts found.</p>";
    return;
  }

  data.forEach((item) => {
    const card = document.createElement("div");
    card.style.cssText = `
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 18px;
      background-color: #fafafa;
      font-family: 'Consolas', 'Courier New', monospace;
      line-height: 1.8;
      display: grid;
      grid-template-columns: 170px 1fr; /* perfect alignment */
      row-gap: 6px;
    `;

    card.innerHTML = `
      <div><strong>Name</strong></div>          <div>: ${item.name}</div>
      <div><strong>Location</strong></div>      <div>: ${item.location}</div>
      <div><strong>Skill to Learn</strong></div><div>: ${item.skillToLearn}</div>
      <div><strong>Skill to Teach</strong></div><div>: ${item.skillToTeach}</div>
      <div><strong>Description</strong></div>   <div>: ${item.description || "No additional notes"}</div>
      <div><strong>Time</strong></div>          <div>: ${item.time}</div>
      <div style="grid-column: 1 / -1; border-top: 1px solid #ccc; margin-top: 10px;"></div>
    `;

    exchangeList.appendChild(card);
  });
}
