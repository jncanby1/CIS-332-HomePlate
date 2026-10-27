// Shared recipe cards and simple interactive filtering. No external libraries needed.
const photo = (key) => `https://images.unsplash.com/${({pasta:'photo-1473093295043-cdd812d0e601',chicken:'photo-1532550907401-a500c9a57435',breakfast:'photo-1488477181946-6428a0291777',tacos:'photo-1551504734-5ee1c4a1479b',cake:'photo-1578985545062-69928b1d9587',wrap:'photo-1547592180-85f173990554'})[key]}?auto=format&fit=crop&w=900&q=80`;
const card = (r) => `<article class="recipe-card"><img src="${photo(r.image)}" alt="${r.title}" loading="lazy"><div class="recipe-body"><span class="eyebrow">${r.category} · ${r.time}</span><h3>${r.title}</h3><p>${r.description}</p><span class="pill">${r.level}</span></div></article>`;
const grid = document.querySelector('#recipe-grid');
if (grid) {
  const render = () => {
    const term = (document.querySelector('#search')?.value || '').toLowerCase().trim();
    const category = document.querySelector('#category')?.value || 'All';
    const matches = RECIPES.filter(r => (category === 'All' || r.category === category) && (r.title.toLowerCase().includes(term) || r.description.toLowerCase().includes(term)));
    grid.innerHTML = matches.length ? matches.map(card).join('') : '<p>No recipes match your search. Try another keyword.</p>';
  };
  document.querySelector('#search')?.addEventListener('input', render);
  document.querySelector('#category')?.addEventListener('change', render);
  render();
}
const randomButton = document.querySelector('#random-button');
if (randomButton) {
  const result = document.querySelector('#random-result');
  const choose = () => { result.innerHTML = card(RECIPES[Math.floor(Math.random() * RECIPES.length)]); };
  randomButton.addEventListener('click', choose);
  choose();
}
const restaurantSelect = document.querySelector('#restaurant-dish');
if (restaurantSelect) {
  const ideas = {
    'Alfredo Pasta': ['Creamy Garlic Pasta', 'Use butter, garlic, cream, and parmesan for a restaurant-style sauce.'],
    'Chicken Rice Bowl': ['Honey Soy Chicken', 'Pair glazed chicken with rice and your favorite steamed vegetables.'],
    'Loaded Tacos': ['Crispy Potato Tacos', 'Try seasoned potatoes, crunchy slaw, and a tangy sauce.']
  };
  const update = () => { const [name, tip] = ideas[restaurantSelect.value]; document.querySelector('#restaurant-result').innerHTML = `<h3>${name}</h3><p>${tip}</p><a class="text-link" href="recipes.html">Browse all recipes →</a>`; };
  restaurantSelect.addEventListener('change', update); update();
}
