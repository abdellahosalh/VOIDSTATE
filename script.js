const products = [
  { id:'venom-signal', name:'Venom Signal Tee', price:32, image:'images/venom-signal.png', description:'A dark streetwear essential built around a striking cobra graphic. Venom Signal blends shadow, movement, and quiet danger into one bold front print.' },
  { id:'drift-beyond', name:'Drift Beyond Tee', price:32, image:'images/drift-beyond.png', description:'A lone astronaut floating through the unknown—clean, cold, and limitless. A statement piece for late nights, big ideas, and your own path.' },
  { id:'thorned-remains', name:'Thorned Remains Tee', price:32, image:'images/thorned-remains.png', description:'Beauty and chaos locked together. A skeletal hand and deep red rose meet in a graphic made for darker days.' },
  { id:'fear-no-feeling', name:'Fear No Feeling Tee', price:32, image:'images/fear-no-feeling.png', description:'Raw black-and-white artwork with an uncompromising message. Minimal, intense, and made for the VOID STATE mindset.' },
  { id:'silent-strike', name:'Silent Strike Tee', price:32, image:'images/silent-strike.png', description:'A detailed serpent graphic on a clean dark canvas. It is about patience, precision, and power held back until the right moment.' }
];

let cart = JSON.parse(localStorage.getItem('void-state-cart') || '[]');
let selectedSize = 'M';
const currency = new Intl.NumberFormat('en-US', { style:'currency', currency:'USD' });
const grid = document.querySelector('#product-grid');
const drawer = document.querySelector('#cart-drawer');
const backdrop = document.querySelector('#backdrop');
const cartButton = document.querySelector('.cart-button');
const dialog = document.querySelector('#product-dialog');
const dialogContent = document.querySelector('#dialog-content');
const toast = document.querySelector('#toast');

function productCard(product) {
  return `<article class="product-card"><button class="product-image-button" type="button" data-view="${product.id}" aria-label="View ${product.name}"><img src="${product.image}" alt="${product.name} graphic" loading="lazy"></button><div class="product-meta"><div><h3>${product.name}</h3><p>Graphic T-shirt</p></div><p class="price">${currency.format(product.price)}</p><button class="quick-add" data-add="${product.id}" type="button">Quick add</button></div></article>`;
}

function renderProducts() { grid.innerHTML = products.map(productCard).join(''); }
function saveCart() { localStorage.setItem('void-state-cart', JSON.stringify(cart)); }
function openCart() { drawer.classList.add('is-open'); backdrop.classList.add('is-visible'); drawer.setAttribute('aria-hidden','false'); cartButton.setAttribute('aria-expanded','true'); }
function closeCart() { drawer.classList.remove('is-open'); backdrop.classList.remove('is-visible'); drawer.setAttribute('aria-hidden','true'); cartButton.setAttribute('aria-expanded','false'); }
function notify(message) { toast.textContent = message; toast.classList.add('is-visible'); window.setTimeout(() => toast.classList.remove('is-visible'), 2600); }
function addToCart(id, size = 'M') { const item = cart.find(entry => entry.id === id && entry.size === size); if (item) item.quantity += 1; else cart.push({id, size, quantity:1}); saveCart(); renderCart(); notify('Added to your bag.'); }
function renderCart() {
  const items = document.querySelector('#cart-items');
  const count = cart.reduce((sum,item) => sum + item.quantity, 0);
  document.querySelector('#cart-count').textContent = count;
  if (!cart.length) { items.innerHTML = '<p class="empty-state">Your bag is empty.<br>Find your signal.</p>'; document.querySelector('#cart-total').textContent = currency.format(0); return; }
  let total = 0;
  items.innerHTML = cart.map(item => { const product = products.find(product => product.id === item.id); total += product.price * item.quantity; return `<div class="cart-item"><img src="${product.image}" alt=""><div><h3>${product.name}</h3><p>Size ${item.size} · Qty ${item.quantity}</p><button class="remove-button" data-remove="${item.id}" data-size="${item.size}" type="button">Remove</button></div><strong>${currency.format(product.price * item.quantity)}</strong></div>`; }).join('');
  document.querySelector('#cart-total').textContent = currency.format(total);
}
function viewProduct(id) {
  const product = products.find(product => product.id === id); selectedSize = 'M';
  dialogContent.innerHTML = `<div class="dialog-layout"><img src="${product.image}" alt="${product.name} graphic"><div class="dialog-details"><p class="eyebrow">DROP 001</p><h2 id="dialog-title">${product.name}</h2><p class="price">${currency.format(product.price)}</p><p>${product.description}</p><span class="size-label">SELECT SIZE</span><div class="size-options">${['S','M','L','XL','2XL'].map(size => `<button class="size-option ${size === 'M' ? 'is-selected' : ''}" type="button" data-size="${size}">${size}</button>`).join('')}</div><button class="button button-accent" type="button" data-dialog-add="${product.id}">Add to bag</button></div></div>`;
  dialog.showModal();
}

renderProducts(); renderCart(); document.querySelector('#year').textContent = new Date().getFullYear();
document.addEventListener('click', event => {
  const view = event.target.closest('[data-view]'); const add = event.target.closest('[data-add]'); const remove = event.target.closest('[data-remove]'); const size = event.target.closest('[data-size]'); const dialogAdd = event.target.closest('[data-dialog-add]');
  if (view) viewProduct(view.dataset.view);
  if (add) { addToCart(add.dataset.add); openCart(); }
  if (remove) { cart = cart.filter(item => !(item.id === remove.dataset.remove && item.size === remove.dataset.size)); saveCart(); renderCart(); }
  if (size) { selectedSize = size.dataset.size; document.querySelectorAll('.size-option').forEach(button => button.classList.toggle('is-selected', button.dataset.size === selectedSize)); }
  if (dialogAdd) { addToCart(dialogAdd.dataset.dialogAdd, selectedSize); dialog.close(); openCart(); }
});
cartButton.addEventListener('click', openCart); document.querySelector('#close-cart').addEventListener('click', closeCart); backdrop.addEventListener('click', closeCart); document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('#checkout-button').addEventListener('click', () => notify('Connect your Printify or payment checkout before accepting orders.'));
const menu = document.querySelector('.main-nav'); const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => { const open = menu.classList.toggle('is-open'); menuToggle.setAttribute('aria-expanded', open); });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded','false'); }));
