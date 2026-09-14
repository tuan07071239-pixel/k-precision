/**
 * K-PRECISION PRODUCT CATALOG FILTER & SEARCH
 */

document.addEventListener('DOMContentLoaded', () => {
  initProductCatalog();
});

function initProductCatalog() {
  const searchInput = document.querySelector('#productSearch');
  const filterChips = document.querySelectorAll('.chip-btn');
  const productCards = document.querySelectorAll('.product-card');
  const countDisplay = document.querySelector('.catalog-count');
  const gridContainer = document.querySelector('.products-grid');

  if (!gridContainer || !productCards.length) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function filterProducts() {
    let matchCount = 0;

    productCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const sku = (card.querySelector('.product-sku')?.textContent || '').toLowerCase();
      const title = (card.querySelector('.product-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.product-desc')?.textContent || '').toLowerCase();
      const specs = (card.querySelector('.product-specs-list')?.textContent || '').toLowerCase();

      const matchesCategory = (activeCategory === 'all' || category.toLowerCase() === activeCategory.toLowerCase());
      const matchesSearch = !searchQuery || 
        sku.includes(searchQuery) || 
        title.includes(searchQuery) || 
        desc.includes(searchQuery) || 
        specs.includes(searchQuery);

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
    if (matchCount === 0) {
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
          searchQuery = '';
          activeCategory = 'all';
          filterChips.forEach(c => c.classList.remove('active'));
          const allChip = document.querySelector('.chip-btn[data-filter="all"]');
          if (allChip) allChip.classList.add('active');
          filterProducts();
        });
      }
      emptyNotice.style.display = 'block';
    } else if (emptyNotice) {
      emptyNotice.style.display = 'none';
    }
  }

  // Filter chips click
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-filter') || 'all';
      filterProducts();
    });
  });

  // Search input debounce
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterProducts();
    });
  }

  // Check URL query parameters (e.g. ?category=grinding)
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    const targetChip = document.querySelector(`.chip-btn[data-filter="${categoryParam}"]`);
    if (targetChip) {
      filterChips.forEach(c => c.classList.remove('active'));
      targetChip.classList.add('active');
      activeCategory = categoryParam;
    }
  }

  filterProducts();
}
