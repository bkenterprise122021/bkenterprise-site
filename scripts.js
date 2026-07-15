const fallbackProducts = [
  { id: 'bk-service-pro', name: 'BK Service Pro', description: 'A service business platform for bookings, customers, jobs and operational workflows.', url: '#', status: 'Coming Soon', category: 'Business Tools', featured: true, icon: '🔧' },
  { id: 'bk-edusuite', name: 'BK EduSuite', description: 'Teacher report generation, learner performance tracking and school administration tools.', url: '#', status: 'Coming Soon', category: 'Education', featured: true, icon: '🎓' },
  { id: 'bk-question-guesser', name: 'BK Question Guesser', description: 'A multiplayer browser quiz game with rounds, timers and live scoring.', url: '#', status: 'Beta', category: 'Games', featured: true, icon: '🎮' },
  { id: 'bk-community-status', name: 'BK Community Status', description: 'A community outage and status reporting tool built for fast local updates.', url: '#', status: 'Live', category: 'Utilities', featured: true, icon: '⚡' },
  { id: 'ai-website-prompt-generator', name: 'AI Website Prompt Generator', description: 'Generate structured website-building prompts from a simple project idea.', url: '#', status: 'Coming Soon', category: 'AI Tools', featured: false, icon: '🤖' },
  { id: 'bk-budget-app', name: 'BK Budget App', description: 'A simple monthly budget tracker powered by Google Sheets and web app logic.', url: '#', status: 'Coming Soon', category: 'Finance', featured: false, icon: '💰' }
];

let allProducts = [];

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const yearEl = document.getElementById('year');

yearEl.textContent = new Date().getFullYear();

function trackEvent(eventName, params = {}) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
  }
}

async function loadProducts() {
  try {
    const response = await fetch('products.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not load products.json');
    const products = await response.json();
    allProducts = Array.isArray(products) && products.length ? products : fallbackProducts;
  } catch (error) {
    allProducts = fallbackProducts;
  }

  setupCategories(allProducts);
  updateStats(allProducts);
  renderProducts(allProducts);
}

function setupCategories(products) {
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))].sort();
  categoryFilter.innerHTML = '<option value="all">All categories</option>' + categories.map(category => `<option value="${escapeAttribute(category)}">${escapeHtml(category)}</option>`).join('');
}

function updateStats(products) {
  const live = products.filter(p => normalizeStatus(p.status) === 'live').length;
  const soon = products.filter(p => normalizeStatus(p.status) === 'coming soon').length;
  document.getElementById('statTotal').textContent = products.length;
  document.getElementById('statLive').textContent = live;
  document.getElementById('statSoon').textContent = soon;
}

function renderProducts(products) {
  if (!products.length) {
    productGrid.innerHTML = '<div class="loading-card">No products match your search.</div>';
    return;
  }

  productGrid.innerHTML = products.map(productCard).join('');
}

function productCard(product) {
  const status = product.status || 'Coming Soon';
  const statusClass = statusClassName(status);
  const url = product.url || '#';
  const disabled = url === '#';
  const buttonLabel = normalizeStatus(status) === 'live' ? 'Launch App →' : 'Learn More →';

  return `
    <article class="product-card reveal is-visible">
      <div class="product-icon">${escapeHtml(product.icon || '🚀')}</div>
      <div class="product-category">${escapeHtml(product.category || 'BK Product')}</div>
      <h3>${escapeHtml(product.name || 'Untitled Product')}</h3>
      <p>${escapeHtml(product.description || '')}</p>
      <div class="product-actions">
        <span class="badge ${statusClass}">${escapeHtml(status)}</span>
        <a class="product-link" href="${escapeAttribute(url)}" target="${disabled ? '_self' : '_blank'}" rel="noopener" onclick="handleProductClick(event, '${escapeAttribute(product.id || product.name || 'product')}', '${escapeAttribute(url)}')">${buttonLabel}</a>
      </div>
    </article>
  `;
}

function handleProductClick(event, productId, url) {
  trackEvent('product_click', { product_id: productId });

  if (url === '#') {
    event.preventDefault();
    alert('This product link is not added yet. Update products.json with the live Apps Script URL when ready.');
  }
}

function applyFilters() {
  const search = (searchInput.value || '').trim().toLowerCase();
  const category = categoryFilter.value;

  const filtered = allProducts.filter(product => {
    const matchesSearch = !search || [product.name, product.description, product.category, product.status].join(' ').toLowerCase().includes(search);
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}

let searchTimer;
searchInput.addEventListener('input', () => {
  applyFilters();
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    if (searchInput.value.trim()) trackEvent('product_search', { search_term: searchInput.value.trim() });
  }, 700);
});
categoryFilter.addEventListener('change', () => {
  applyFilters();
  trackEvent('category_filter', { category: categoryFilter.value });
});

function normalizeStatus(status) {
  return String(status || '').trim().toLowerCase();
}

function statusClassName(status) {
  const normalized = normalizeStatus(status);
  if (normalized === 'live') return 'live';
  if (normalized === 'beta') return 'beta';
  return 'soon';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, '&#096;');
}

function setupRevealAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

loadProducts();
setupRevealAnimations();
