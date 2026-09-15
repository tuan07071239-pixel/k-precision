/**
 * K-PRECISION PRODUCT CATALOG FILTER & SEARCH
 * Dynamically renders product cards from Supabase (with fallback to KP_PRODUCTS)
 * and enables instant client-side filtering by category & full-text search.
 */

document.addEventListener('DOMContentLoaded', () => {
  initProductCatalog();
});

let filterHandlerAttached = false;
let currentActiveCategory = 'all';
let currentSearchQuery = '';

async function initProductCatalog() {
  const gridContainer = document.querySelector('.products-grid');
  if (!gridContainer) return;

  // 1. Immediate render from local KP_PRODUCTS
  renderCatalogGrid(gridContainer);
  setupFilterAndSearch();

  // 2. Asynchronous sync with Supabase
  if (window.KP_SUPABASE) {
    try {
      const remoteProducts = await window.KP_SUPABASE.getProducts();
      if (remoteProducts && remoteProducts.length > 0) {
        if (!window.KP_PRODUCTS) window.KP_PRODUCTS = {};
        remoteProducts.forEach(rp => {
          const item = rp.data || {};
          item.sku = rp.sku || rp.id;
          item.name = rp.name;
          item.category = rp.category;
          item.categorySlug = rp.category_slug || 'others';
          item.badge = rp.badge || '';
          item.image = rp.image || '';
          item.shortDesc = rp.short_desc || '';
          item.specs = rp.specs || {};
          window.KP_PRODUCTS[item.sku] = item;
        });

        // Re-render with live Supabase data
        renderCatalogGrid(gridContainer);
        setupFilterAndSearch();
      }
    } catch (err) {
      console.warn('Using offline catalog cache:', err);
    }
  }
}

function setupFilterAndSearch() {
  const searchInput = document.querySelector('#productSearch');
  const filterChips = document.querySelectorAll('.chip-btn');
  const productCards = document.querySelectorAll('.product-card');
  const countDisplay = document.querySelector('.catalog-count');

  if (!productCards.length) return;

  function applyFilter() {
    let matchCount = 0;

    productCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const sku = (card.querySelector('.product-sku')?.textContent || '').toLowerCase();
      const title = (card.querySelector('.product-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.product-desc')?.textContent || '').toLowerCase();
      const specs = (card.querySelector('.product-specs-list')?.textContent || '').toLowerCase();

      const matchesCategory = (currentActiveCategory === 'all' || category.toLowerCase() === currentActiveCategory.toLowerCase());
      const matchesSearch = !currentSearchQuery || 
        sku.includes(currentSearchQuery) || 
        title.includes(currentSearchQuery) || 
        desc.includes(currentSearchQuery) || 
        specs.includes(currentSearchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${matchCount} precision consumable part${matchCount === 1 ? '' : 's'}`;
    }

    // Empty state handling
    let emptyNotice = document.querySelector('.no-products-found');
    const gridContainer = document.querySelector('.products-grid');
    if (matchCount === 0 && gridContainer) {
      if (!emptyNotice) {
        emptyNotice = document.createElement('div');
        emptyNotice.className = 'no-products-found';
        emptyNotice.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px;';
        emptyNotice.innerHTML = `
          <h4 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 8px; color: #0f172a;">No Matching Parts Found</h4>
          <p style="color: #64748B; font-size: 0.9375rem; margin-bottom: 16px;">Try adjusting your search terms or view custom tooling options.</p>
          <button class="btn btn-primary btn-sm reset-filter-btn">Reset All Filters</button>
        `;
        gridContainer.appendChild(emptyNotice);

        emptyNotice.querySelector('.reset-filter-btn').addEventListener('click', () => {
          if (searchInput) searchInput.value = '';
          currentSearchQuery = '';
          currentActiveCategory = 'all';
          filterChips.forEach(c => c.classList.remove('active'));
          const allChip = document.querySelector('.chip-btn[data-filter="all"]');
          if (allChip) allChip.classList.add('active');
          applyFilter();
        });
      }
      emptyNotice.style.display = 'block';
    } else if (emptyNotice) {
      emptyNotice.style.display = 'none';
    }
  }

  // Attach chip events once
  if (!filterHandlerAttached) {
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentActiveCategory = chip.getAttribute('data-filter') || 'all';
        applyFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value.trim().toLowerCase();
        applyFilter();
      });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      const targetChip = document.querySelector(`.chip-btn[data-filter="${categoryParam}"]`);
      if (targetChip) {
        filterChips.forEach(c => c.classList.remove('active'));
        targetChip.classList.add('active');
        currentActiveCategory = categoryParam;
      }
    }

    filterHandlerAttached = true;
  }

  applyFilter();
}

/**
 * Render product cards dynamically from window.KP_PRODUCTS
 */
function renderCatalogGrid(gridContainer) {
  if (!window.KP_PRODUCTS) return;
  const products = Object.values(window.KP_PRODUCTS);
  if (!products.length) return;

  gridContainer.innerHTML = '';

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', p.categorySlug || 'others');

    const badgeHtml = p.badge ? `<span class="product-badge-corner">${p.badge}</span>` : '';
    const imgUrl = p.image || 'assets/images/diagrams/grinding-wheel.svg';

    let specsHtml = '';
    if (p.specs && typeof p.specs === 'object') {
      const entries = Object.entries(p.specs).slice(0, 3);
      specsHtml = entries.map(([k, v]) => `
        <div class="spec-row"><span class="spec-name">${k}:</span><span class="spec-val">${v}</span></div>
      `).join('');
    }

    const firstSpec = p.specs ? Object.values(p.specs)[0] || '' : '';
    const rfqSpecs = p.badge ? `${p.badge}, ${firstSpec}` : firstSpec;

    card.innerHTML = `
      <div class="product-thumb">
        <img src="${imgUrl}" alt="${p.name}" loading="lazy">
        ${badgeHtml}
      </div>
      <div class="product-info">
        <div class="product-sku">SKU: ${p.sku}</div>
        <h4 class="product-title">${p.name}</h4>
        <p class="product-desc">${p.shortDesc || ''}</p>
        <div class="product-specs-list">
          ${specsHtml}
        </div>
        <div class="product-card-footer">
          <button class="btn-add-rfq" 
                  data-sku="${p.sku}" 
                  data-name="${p.name}" 
                  data-specs="${rfqSpecs}" 
                  data-category="${p.category}">+ Add to RFQ</button>
          <a href="product-detail.html?sku=${encodeURIComponent(p.sku)}" class="btn-view-details">Details &amp; Specs &rarr;</a>
        </div>
      </div>
    `;

    gridContainer.appendChild(card);
  });

  // Attach admin controls if Admin is logged in
  if (typeof window.KP_ATTACH_ADMIN_ACTIONS === 'function') {
    window.KP_ATTACH_ADMIN_ACTIONS();
  }
}
