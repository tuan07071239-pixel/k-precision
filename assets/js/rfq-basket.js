/**
 * K-PRECISION RFQ (REQUEST FOR QUOTE) BASKET SYSTEM
 * Persistent multi-product quotation cart for industrial buyers & engineers.
 */

const RFQ_STORAGE_KEY = 'kp_rfq_basket_v1';

class RFQBasket {
  constructor() {
    this.items = this.loadItems();
    this.initDOM();
    this.updateUI();
    this.bindEvents();
  }

  loadItems() {
    try {
      const saved = localStorage.getItem(RFQ_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Unable to access localStorage for RFQ basket', e);
      return [];
    }
  }

  saveItems() {
    try {
      localStorage.setItem(RFQ_STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {
      console.warn('Unable to save RFQ basket to localStorage', e);
    }
    this.updateUI();
  }

  addItem(item) {
    // Check if item already exists by SKU
    const existingIndex = this.items.findIndex(i => i.sku === item.sku);
    if (existingIndex > -1) {
      this.items[existingIndex].qty += (item.qty || 1);
    } else {
      this.items.push({
        sku: item.sku,
        name: item.name,
        specs: item.specs || '',
        category: item.category || 'General Consumable',
        qty: item.qty || 1
      });
    }

    this.saveItems();
    if (window.showToast) {
      window.showToast(`Added "${item.name}" (${item.sku}) to RFQ list`, 'success');
    }
    this.openDrawer();
  }

  removeItem(sku) {
    this.items = this.items.filter(i => i.sku !== sku);
    this.saveItems();
    if (window.showToast) {
      window.showToast(`Item removed from RFQ list`, 'info');
    }
  }

  updateQty(sku, delta) {
    const item = this.items.find(i => i.sku === sku);
    if (item) {
      item.qty = Math.max(1, item.qty + delta);
      this.saveItems();
    }
  }

  setQty(sku, value) {
    const item = this.items.find(i => i.sku === sku);
    if (item) {
      const parsed = parseInt(value, 10);
      item.qty = isNaN(parsed) || parsed < 1 ? 1 : parsed;
      this.saveItems();
    }
  }

  clear() {
    this.items = [];
    this.saveItems();
  }

  getTotalCount() {
    return this.items.reduce((total, item) => total + item.qty, 0);
  }

  initDOM() {
    // Ensure drawer structure exists in document
    if (!document.querySelector('.rfq-drawer-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'rfq-drawer-overlay';
      document.body.appendChild(overlay);

      const drawer = document.createElement('div');
      drawer.className = 'rfq-drawer';
      drawer.innerHTML = `
        <div class="rfq-drawer-header">
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 1-2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Request for Quote (RFQ)
          </h3>
          <button class="rfq-close-btn" aria-label="Close RFQ Drawer">&times;</button>
        </div>
        <div class="rfq-drawer-body">
          <div class="rfq-empty-state">
            <svg class="rfq-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 1-2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <p>Your RFQ list is currently empty.</p>
            <p style="font-size: 0.8125rem; margin-top: 8px;">Browse cutting tools, grinding wheels, EDM wires, and holders to add items.</p>
          </div>
          <div class="rfq-items-list"></div>
        </div>
        <div class="rfq-drawer-footer">
          <div class="rfq-summary-row">
            <span>Total Selected Items:</span>
            <span class="rfq-total-qty">0 items</span>
          </div>
          <div class="rfq-checkout-actions">
            <button class="btn btn-accent btn-submit-rfq" style="width: 100%;">
              Proceed with Quotation Request &rarr;
            </button>
            <button class="btn btn-outline-light rfq-clear-btn" style="width: 100%; color: #64748B; border-color: #E2E8F0; font-size: 0.8125rem;">
              Clear List
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(drawer);
    }
  }

  bindEvents() {
    // Open drawer on trigger clicks
    document.querySelectorAll('.rfq-trigger-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    // Close buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.rfq-close-btn') || e.target.classList.contains('rfq-drawer-overlay')) {
        this.closeDrawer();
      }
    });

    // Add to RFQ delegation
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.btn-add-rfq');
      if (addBtn) {
        e.preventDefault();
        const sku = addBtn.getAttribute('data-sku');
        const name = addBtn.getAttribute('data-name');
        const specs = addBtn.getAttribute('data-specs');
        const category = addBtn.getAttribute('data-category');
        const qty = parseInt(addBtn.getAttribute('data-qty') || '1', 10);

        this.addItem({ sku, name, specs, category, qty });
      }
    });

    // Delegated actions inside drawer (qty stepper, remove, clear, proceed)
    const drawer = document.querySelector('.rfq-drawer');
    if (drawer) {
      drawer.addEventListener('click', (e) => {
        const plusBtn = e.target.closest('.btn-qty-plus');
        if (plusBtn) {
          this.updateQty(plusBtn.getAttribute('data-sku'), 1);
          return;
        }

        const minusBtn = e.target.closest('.btn-qty-minus');
        if (minusBtn) {
          this.updateQty(minusBtn.getAttribute('data-sku'), -1);
          return;
        }

        const delBtn = e.target.closest('.rfq-delete-btn');
        if (delBtn) {
          this.removeItem(delBtn.getAttribute('data-sku'));
          return;
        }

        const clearBtn = e.target.closest('.rfq-clear-btn');
        if (clearBtn) {
          if (confirm('Clear all items from your RFQ list?')) {
            this.clear();
          }
          return;
        }

        const submitBtn = e.target.closest('.btn-submit-rfq');
        if (submitBtn) {
          this.proceedToRFQ();
        }
      });

      drawer.addEventListener('change', (e) => {
        if (e.target.classList.contains('stepper-val')) {
          const sku = e.target.getAttribute('data-sku');
          this.setQty(sku, e.target.value);
        }
      });
    }
  }

  updateUI() {
    const totalCount = this.getTotalCount();
    
    // Update all badges
    document.querySelectorAll('.rfq-badge').forEach(badge => {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'flex' : 'none';
    });

    // Update Drawer Body
    const emptyState = document.querySelector('.rfq-empty-state');
    const itemsList = document.querySelector('.rfq-items-list');
    const totalQtySpan = document.querySelector('.rfq-total-qty');
    const footer = document.querySelector('.rfq-drawer-footer');

    if (!itemsList) return;

    if (totalQtySpan) {
      totalQtySpan.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;
    }

    if (this.items.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      itemsList.innerHTML = '';
      if (footer) footer.style.opacity = '0.5';
      if (footer) footer.querySelector('.btn-submit-rfq').disabled = true;
    } else {
      if (emptyState) emptyState.style.display = 'none';
      if (footer) footer.style.opacity = '1';
      if (footer) footer.querySelector('.btn-submit-rfq').disabled = false;

      itemsList.innerHTML = this.items.map(item => `
        <div class="rfq-item">
          <div class="rfq-item-details">
            <span class="rfq-item-sku">${escapeHTML(item.sku)}</span>
            <h4 class="rfq-item-name">${escapeHTML(item.name)}</h4>
            <div class="rfq-item-specs">${escapeHTML(item.specs)}</div>
          </div>
          <div class="rfq-qty-stepper">
            <button class="stepper-btn btn-qty-minus" data-sku="${escapeHTML(item.sku)}" aria-label="Decrease quantity">-</button>
            <input type="text" class="stepper-val" data-sku="${escapeHTML(item.sku)}" value="${item.qty}" />
            <button class="stepper-btn btn-qty-plus" data-sku="${escapeHTML(item.sku)}" aria-label="Increase quantity">+</button>
          </div>
          <button class="rfq-delete-btn" data-sku="${escapeHTML(item.sku)}" title="Remove item" aria-label="Remove item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      `).join('');
    }
  }

  openDrawer() {
    const overlay = document.querySelector('.rfq-drawer-overlay');
    const drawer = document.querySelector('.rfq-drawer');
    if (overlay && drawer) {
      overlay.classList.add('active');
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeDrawer() {
    const overlay = document.querySelector('.rfq-drawer-overlay');
    const drawer = document.querySelector('.rfq-drawer');
    if (overlay && drawer) {
      overlay.classList.remove('active');
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  proceedToRFQ() {
    if (this.items.length === 0) return;
    
    // Construct pre-filled inquiry text
    let summaryText = `Hello K-Precision Sales Team,\n\nI would like to request an official quotation for the following precision consumables:\n\n`;
    this.items.forEach((item, index) => {
      summaryText += `${index + 1}. SKU: ${item.sku} | Product: ${item.name} | Specs: ${item.specs} | Qty: ${item.qty} pcs\n`;
    });
    summaryText += `\nPlease provide unit pricing, lead time, and certificate of conformity availability.`;

    // Store in sessionStorage so contact.html can pick it up
    sessionStorage.setItem('kp_rfq_summary', summaryText);
    
    // Redirect to contact page
    window.location.href = 'contact.html?rfq=ready';
  }
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.rfqBasket = new RFQBasket();
});
