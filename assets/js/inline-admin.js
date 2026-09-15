/**
 * K-PRECISION INLINE VISUAL ADMIN
 * Enables on-page visual editing, image uploads to Supabase Storage,
 * product management, and real-time content updates.
 */

(function() {
  let currentUser = null;
  let adminBar = null;

  // Initialize Admin on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    initInlineAdmin();
  });

  async function initInlineAdmin() {
    // 1. Hydrate dynamic site content (for all visitors)
    await hydrateSiteContent();

    // 2. Check Supabase auth session
    if (window.KP_SUPABASE && window.KP_SUPABASE.client) {
      const { data } = await window.KP_SUPABASE.client.auth.getSession();
      if (data && data.session && data.session.user) {
        currentUser = data.session.user;
        enableAdminMode();
      }

      // Listen for auth state changes
      window.KP_SUPABASE.client.auth.onAuthStateChange((event, session) => {
        if (session && session.user) {
          currentUser = session.user;
          enableAdminMode();
        } else {
          currentUser = null;
          disableAdminMode();
        }
      });
    }

    // 3. Listen for admin trigger shortcuts: Ctrl+Shift+A or Cmd+Shift+A
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (currentUser) {
          showToast('Bạn đang ở chế độ Quản trị viên');
        } else {
          showLoginModal();
        }
      }
    });

    // 4. Check URL param ?admin or #admin
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('admin') || window.location.hash === '#admin') {
      if (!currentUser) {
        showLoginModal();
      }
    }

    // 5. Attach click listener to any admin login triggers in footer
    document.querySelectorAll('.kp-admin-trigger').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentUser) {
          showToast('Bạn đang ở chế độ Quản trị viên');
        } else {
          showLoginModal();
        }
      });
    });
  }

  /* ==========================================================================
     ADMIN MODE ACTIVATION
     ========================================================================== */
  function enableAdminMode() {
    renderAdminBar();
    attachProductCardActions();
    attachDetailPageActions();
    enableInlineTextEditing();
    showToast(`Đã đăng nhập: ${currentUser.email}`);
  }

  function attachDetailPageActions() {
    const detailTitle = document.getElementById('detailName');
    if (!detailTitle) return;
    if (document.querySelector('.kp-detail-admin-btn')) return;

    const urlParams = new URLSearchParams(window.location.search);
    const sku = urlParams.get('sku') || document.getElementById('detailSkuBadge')?.textContent.trim();
    if (!sku) return;

    const editBtn = document.createElement('button');
    editBtn.className = 'kp-admin-btn kp-admin-btn-primary kp-detail-admin-btn';
    editBtn.style.cssText = 'display: inline-flex; margin-bottom: 12px;';
    editBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
      Sửa thông tin & Đổi ảnh sản phẩm này
    `;
    editBtn.addEventListener('click', () => {
      const product = (window.KP_PRODUCTS && window.KP_PRODUCTS[sku]) || null;
      showProductModal(product, null, sku);
    });

    detailTitle.parentNode.insertBefore(editBtn, detailTitle);
  }

  function disableAdminMode() {
    if (adminBar) {
      adminBar.remove();
      adminBar = null;
    }
    document.querySelectorAll('.kp-card-admin-actions').forEach(el => el.remove());
    document.querySelectorAll('[data-cms-key]').forEach(el => {
      el.removeAttribute('contenteditable');
      el.classList.remove('kp-editable-active');
    });
    showToast('Đã đăng xuất khỏi chế độ Quản trị.');
  }

  /* ==========================================================================
     FLOATING ADMIN BAR
     ========================================================================== */
  function renderAdminBar() {
    if (document.querySelector('.kp-admin-bar')) return;

    adminBar = document.createElement('div');
    adminBar.className = 'kp-admin-bar';
    adminBar.innerHTML = `
      <div class="kp-admin-status">
        <span class="kp-admin-dot"></span>
        <span>Chế độ Quản trị: BẬT</span>
      </div>
      <button class="kp-admin-btn kp-admin-btn-primary" id="kp-btn-add-product">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Thêm sản phẩm mới
      </button>
      <button class="kp-admin-btn kp-admin-btn-danger" id="kp-btn-logout">
        Đăng xuất
      </button>
    `;

    document.body.appendChild(adminBar);

    // Add Product button
    adminBar.querySelector('#kp-btn-add-product').addEventListener('click', () => {
      showProductModal(null); // Create new product
    });

    // Logout button
    adminBar.querySelector('#kp-btn-logout').addEventListener('click', async () => {
      if (window.KP_SUPABASE && window.KP_SUPABASE.client) {
        await window.KP_SUPABASE.client.auth.signOut();
      }
    });
  }

  /* ==========================================================================
     PRODUCT CARD CONTROLS (EDIT & DELETE ON-PAGE)
     ========================================================================== */
  function attachProductCardActions() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      if (card.querySelector('.kp-card-admin-actions')) return;

      // Ensure card is relative positioned
      if (getComputedStyle(card).position === 'static') {
        card.style.position = 'relative';
      }

      const actions = document.createElement('div');
      actions.className = 'kp-card-admin-actions';
      actions.innerHTML = `
        <button class="kp-card-btn kp-card-edit-btn" title="Chỉnh sửa sản phẩm">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          Sửa
        </button>
        <button class="kp-card-btn kp-card-delete-btn" title="Xoá sản phẩm">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          Xoá
        </button>
      `;

      card.appendChild(actions);

      // Edit click
      actions.querySelector('.kp-card-edit-btn').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const skuEl = card.querySelector('.product-sku');
        const sku = skuEl ? skuEl.textContent.replace('SKU:', '').trim() : '';
        const product = (window.KP_PRODUCTS && window.KP_PRODUCTS[sku]) || null;
        showProductModal(product, card, sku);
      });

      // Delete click
      actions.querySelector('.kp-card-delete-btn').addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const skuEl = card.querySelector('.product-sku');
        const sku = skuEl ? skuEl.textContent.replace('SKU:', '').trim() : '';
        const titleEl = card.querySelector('.product-title');
        const name = titleEl ? titleEl.textContent : sku;

        if (confirm(`Bạn có chắc chắn muốn xoá sản phẩm "${name}" (${sku}) không? Thao tác này không thể hoàn tác.`)) {
          try {
            await window.KP_SUPABASE.deleteProduct(sku);
            if (window.KP_PRODUCTS && window.KP_PRODUCTS[sku]) {
              delete window.KP_PRODUCTS[sku];
            }
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => card.remove(), 300);
            showToast(`Đã xoá sản phẩm: ${name}`);
          } catch (err) {
            alert('Lỗi khi xoá sản phẩm: ' + err.message);
          }
        }
      });
    });
  }

  // Export so product-filter.js can call it when cards re-render
  window.KP_ATTACH_ADMIN_ACTIONS = () => {
    if (currentUser) {
      attachProductCardActions();
    }
  };

  /* ==========================================================================
     PRODUCT CREATE / EDIT MODAL
     ========================================================================== */
  function showProductModal(product, cardElement, fallbackSku) {
    const isEdit = !!product || !!fallbackSku;
    const initialSku = (product && product.sku) || fallbackSku || '';
    const initialName = (product && product.name) || (cardElement ? cardElement.querySelector('.product-title')?.textContent : '') || '';
    const initialCat = (product && product.category) || 'EDM Wires';
    const initialBadge = (product && product.badge) || (cardElement ? cardElement.querySelector('.product-badge-corner')?.textContent : '') || '';
    const initialDesc = (product && product.shortDesc) || (cardElement ? cardElement.querySelector('.product-desc')?.textContent : '') || '';
    const initialImage = (product && product.image) || (cardElement ? cardElement.querySelector('img')?.src : '') || 'assets/images/diagrams/edm-wire.svg';

    let initialSpecs = (product && product.specs) || {};
    if (Object.keys(initialSpecs).length === 0 && cardElement) {
      cardElement.querySelectorAll('.spec-row').forEach(row => {
        const k = row.querySelector('.spec-name')?.textContent.replace(':', '').trim();
        const v = row.querySelector('.spec-val')?.textContent.trim();
        if (k && v) initialSpecs[k] = v;
      });
    }

    const overlay = document.createElement('div');
    overlay.className = 'kp-modal-overlay';
    overlay.innerHTML = `
      <div class="kp-modal">
        <div class="kp-modal-header">
          <h3 class="kp-modal-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            ${isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h3>
          <button class="kp-modal-close" aria-label="Đóng">&times;</button>
        </div>
        <div class="kp-modal-body">
          <!-- IMAGE UPLOAD -->
          <div class="kp-form-group">
            <label class="kp-label">Ảnh sản phẩm</label>
            <div class="kp-image-upload-box">
              <img src="${initialImage}" alt="Xem trước" class="kp-image-preview" id="kp-img-preview">
              <div class="kp-upload-actions">
                <input type="file" id="kp-file-input" accept="image/*" style="display: none;">
                <button type="button" class="kp-admin-btn kp-admin-btn-primary" id="kp-btn-pick-file" style="align-self: flex-start;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  Tải ảnh mới từ máy tính
                </button>
                <input type="text" class="kp-input" id="kp-input-image" value="${initialImage}" placeholder="Hoặc dán đường dẫn ảnh URL...">
                <span class="kp-upload-hint" id="kp-upload-status">Hỗ trợ JPG, PNG, WebP, SVG. Ảnh sẽ tự lưu trên Supabase Storage.</span>
              </div>
            </div>
          </div>

          <!-- SKU & NAME -->
          <div class="kp-form-row">
            <div class="kp-form-group">
              <label class="kp-label">Mã sản phẩm (SKU) *</label>
              <input type="text" class="kp-input" id="kp-input-sku" value="${initialSku}" ${isEdit && initialSku ? 'readonly style="background: #f1f5f9; cursor: not-allowed;"' : ''} placeholder="Ví dụ: KP-EDM-BR25-P5" required>
            </div>
            <div class="kp-form-group">
              <label class="kp-label">Danh mục sản phẩm</label>
              <select class="kp-select" id="kp-input-category">
                <option value="EDM Wires" ${initialCat === 'EDM Wires' ? 'selected' : ''}>EDM Wires</option>
                <option value="Grinding Tools" ${initialCat === 'Grinding Tools' ? 'selected' : ''}>Grinding Tools</option>
                <option value="Cutting Tools" ${initialCat === 'Cutting Tools' ? 'selected' : ''}>Cutting Tools</option>
                <option value="Tool Holding" ${initialCat === 'Tool Holding' ? 'selected' : ''}>Tool Holding</option>
                <option value="Others & Consumables" ${initialCat.includes('Others') ? 'selected' : ''}>Others & Consumables</option>
              </select>
            </div>
          </div>

          <div class="kp-form-group">
            <label class="kp-label">Tên sản phẩm *</label>
            <input type="text" class="kp-input" id="kp-input-name" value="${initialName}" placeholder="Tên sản phẩm đầy đủ..." required>
          </div>

          <div class="kp-form-group">
            <label class="kp-label">Huy hiệu nổi bật (Badge)</label>
            <input type="text" class="kp-input" id="kp-input-badge" value="${initialBadge}" placeholder="Ví dụ: CuZn35 980 N/mm² hoặc Best Seller">
          </div>

          <div class="kp-form-group">
            <label class="kp-label">Mô tả tóm tắt</label>
            <textarea class="kp-textarea" id="kp-input-desc" placeholder="Mô tả kỹ thuật ngắn gọn về công dụng sản phẩm...">${initialDesc}</textarea>
          </div>

          <!-- SPECS BUILDER -->
          <div class="kp-form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <label class="kp-label">Thông số kỹ thuật chính (Specs)</label>
              <button type="button" class="kp-admin-btn" id="kp-btn-add-spec" style="color: #0284c7; padding: 2px 10px; font-size: 11px;">+ Thêm dòng</button>
            </div>
            <div class="kp-specs-builder" id="kp-specs-container">
              <!-- Specs rows populated below -->
            </div>
          </div>
        </div>

        <div class="kp-modal-footer">
          <button type="button" class="kp-admin-btn" id="kp-btn-cancel-modal">Hủy</button>
          <button type="button" class="kp-admin-btn kp-admin-btn-primary" id="kp-btn-save-modal">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Lưu thay đổi ngay
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Populate specs rows
    const specsContainer = overlay.querySelector('#kp-specs-container');
    function addSpecRow(key = '', val = '') {
      const row = document.createElement('div');
      row.className = 'kp-spec-row';
      row.innerHTML = `
        <input type="text" class="kp-input kp-spec-key" placeholder="Tên thông số (e.g. Đường kính)" value="${key}">
        <input type="text" class="kp-input kp-spec-val" placeholder="Giá trị (e.g. Ø0.25mm)" value="${val}">
        <button type="button" class="kp-spec-remove" title="Xoá dòng">&times;</button>
      `;
      row.querySelector('.kp-spec-remove').addEventListener('click', () => row.remove());
      specsContainer.appendChild(row);
    }

    const specEntries = Object.entries(initialSpecs);
    if (specEntries.length > 0) {
      specEntries.forEach(([k, v]) => addSpecRow(k, v));
    } else {
      addSpecRow('Quy cách', '');
      addSpecRow('Vật liệu', '');
    }

    overlay.querySelector('#kp-btn-add-spec').addEventListener('click', () => addSpecRow('', ''));

    // Image file upload handler
    const fileInput = overlay.querySelector('#kp-file-input');
    const pickBtn = overlay.querySelector('#kp-btn-pick-file');
    const imageInput = overlay.querySelector('#kp-input-image');
    const imgPreview = overlay.querySelector('#kp-img-preview');
    const uploadStatus = overlay.querySelector('#kp-upload-status');

    pickBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      if (!file) return;

      uploadStatus.textContent = '⏳ Đang tải ảnh lên Supabase Storage...';
      uploadStatus.style.color = '#0284c7';
      pickBtn.disabled = true;

      try {
        const publicUrl = await window.KP_SUPABASE.uploadImage(file);
        imageInput.value = publicUrl;
        imgPreview.src = publicUrl;
        uploadStatus.textContent = '✅ Đã tải ảnh lên thành công!';
        uploadStatus.style.color = '#10b981';
      } catch (err) {
        uploadStatus.textContent = '❌ Lỗi tải ảnh: ' + err.message;
        uploadStatus.style.color = '#ef4444';
      } finally {
        pickBtn.disabled = false;
      }
    });

    imageInput.addEventListener('input', () => {
      imgPreview.src = imageInput.value || 'assets/images/diagrams/edm-wire.svg';
    });

    // Close modal
    function closeModal() {
      overlay.remove();
    }
    overlay.querySelector('.kp-modal-close').addEventListener('click', closeModal);
    overlay.querySelector('#kp-btn-cancel-modal').addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // Save product
    overlay.querySelector('#kp-btn-save-modal').addEventListener('click', async () => {
      const sku = overlay.querySelector('#kp-input-sku').value.trim();
      const name = overlay.querySelector('#kp-input-name').value.trim();
      const category = overlay.querySelector('#kp-input-category').value;
      const badge = overlay.querySelector('#kp-input-badge').value.trim();
      const shortDesc = overlay.querySelector('#kp-input-desc').value.trim();
      const image = imageInput.value.trim() || 'assets/images/diagrams/edm-wire.svg';

      if (!sku) {
        alert('Vui lòng nhập Mã sản phẩm (SKU)');
        return;
      }
      if (!name) {
        alert('Vui lòng nhập Tên sản phẩm');
        return;
      }

      // Collect specs
      const specs = {};
      overlay.querySelectorAll('.kp-spec-row').forEach(row => {
        const k = row.querySelector('.kp-spec-key').value.trim();
        const v = row.querySelector('.kp-spec-val').value.trim();
        if (k && v) specs[k] = v;
      });

      // Map category to slug
      const catSlugMap = {
        'EDM Wires': 'edm',
        'Grinding Tools': 'grinding',
        'Cutting Tools': 'cutting',
        'Tool Holding': 'toolholding',
        'Others & Consumables': 'others'
      };
      const categorySlug = catSlugMap[category] || 'others';

      const saveBtn = overlay.querySelector('#kp-btn-save-modal');
      saveBtn.disabled = true;
      saveBtn.innerHTML = '⏳ Đang lưu...';

      try {
        const productPayload = {
          sku,
          name,
          category,
          categorySlug,
          categoryUrl: 'products.html',
          badge,
          image,
          shortDesc,
          specs,
          ...(product || {})
        };
        // Update fields
        productPayload.sku = sku;
        productPayload.name = name;
        productPayload.category = category;
        productPayload.categorySlug = categorySlug;
        productPayload.badge = badge;
        productPayload.image = image;
        productPayload.shortDesc = shortDesc;
        productPayload.specs = specs;

        await window.KP_SUPABASE.saveProduct(productPayload);

        // Update local KP_PRODUCTS
        if (!window.KP_PRODUCTS) window.KP_PRODUCTS = {};
        window.KP_PRODUCTS[sku] = productPayload;

        // If card exists on page, update it directly
        if (cardElement) {
          const imgEl = cardElement.querySelector('.product-thumb img');
          if (imgEl) imgEl.src = image;

          let badgeEl = cardElement.querySelector('.product-badge-corner');
          if (badge) {
            if (!badgeEl) {
              badgeEl = document.createElement('span');
              badgeEl.className = 'product-badge-corner';
              cardElement.querySelector('.product-thumb')?.appendChild(badgeEl);
            }
            badgeEl.textContent = badge;
          } else if (badgeEl) {
            badgeEl.remove();
          }

          const titleEl = cardElement.querySelector('.product-title');
          if (titleEl) titleEl.textContent = name;

          const descEl = cardElement.querySelector('.product-desc');
          if (descEl) descEl.textContent = shortDesc;

          const specsList = cardElement.querySelector('.product-specs-list');
          if (specsList) {
            const entries = Object.entries(specs).slice(0, 3);
            specsList.innerHTML = entries.map(([k, v]) => `
              <div class="spec-row"><span class="spec-name">${k}:</span><span class="spec-val">${v}</span></div>
            `).join('');
          }
        } else {
          // Re-render whole catalog to show new product!
          const grid = document.querySelector('.products-grid');
          if (grid && typeof renderCatalogGrid === 'function') {
            renderCatalogGrid(grid);
            attachProductCardActions();
          }
        }

        closeModal();
        showToast(`✅ Đã lưu sản phẩm "${name}" thành công!`);
      } catch (err) {
        alert('Lỗi lưu sản phẩm: ' + err.message);
        saveBtn.disabled = false;
        saveBtn.innerHTML = 'Lưu thay đổi ngay';
      }
    });
  }

  /* ==========================================================================
     INLINE TEXT EDITING (WYSIWYG on [data-cms-key])
     ========================================================================== */
  async function hydrateSiteContent() {
    if (!window.KP_SUPABASE) return;
    const contentMap = await window.KP_SUPABASE.getSiteContent();
    document.querySelectorAll('[data-cms-key]').forEach(el => {
      const key = el.getAttribute('data-cms-key');
      if (contentMap && contentMap[key]) {
        el.innerHTML = contentMap[key];
      }
    });
  }

  function enableInlineTextEditing() {
    document.querySelectorAll('[data-cms-key]').forEach(el => {
      el.setAttribute('contenteditable', 'true');
      el.classList.add('kp-editable-active');

      el.addEventListener('blur', async () => {
        const key = el.getAttribute('data-cms-key');
        const text = el.innerHTML.trim();
        try {
          await window.KP_SUPABASE.saveSiteContent(key, text);
          showToast(`💾 Đã lưu thay đổi: ${key}`);
        } catch (err) {
          console.error('Failed to save text:', err);
        }
      });
    });
  }

  /* ==========================================================================
     ADMIN LOGIN MODAL
     ========================================================================== */
  function showLoginModal() {
    if (document.querySelector('#kp-login-modal')) return;

    const overlay = document.createElement('div');
    overlay.className = 'kp-modal-overlay';
    overlay.id = 'kp-login-modal';
    overlay.innerHTML = `
      <div class="kp-modal" style="max-width: 420px;">
        <div class="kp-modal-header">
          <h3 class="kp-modal-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Đăng nhập Quản trị K-Precision
          </h3>
          <button class="kp-modal-close">&times;</button>
        </div>
        <form id="kp-login-form">
          <div class="kp-modal-body">
            <div class="kp-form-group">
              <label class="kp-label">Email Quản trị</label>
              <input type="email" class="kp-input" id="kp-login-email" value="tuan.nguyen@k-precision.net" required autocomplete="username">
            </div>
            <div class="kp-form-group">
              <label class="kp-label">Mật khẩu</label>
              <input type="password" class="kp-input" id="kp-login-pass" placeholder="Nhập mật khẩu..." required autocomplete="current-password">
            </div>
            <div id="kp-login-error" style="color: #ef4444; font-size: 13px; display: none;"></div>
          </div>
          <div class="kp-modal-footer">
            <button type="button" class="kp-admin-btn" id="kp-login-cancel">Hủy</button>
            <button type="submit" class="kp-admin-btn kp-admin-btn-primary" id="kp-login-submit">
              Đăng nhập &rarr;
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(overlay);

    const closeLogin = () => overlay.remove();
    overlay.querySelector('.kp-modal-close').addEventListener('click', closeLogin);
    overlay.querySelector('#kp-login-cancel').addEventListener('click', closeLogin);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeLogin();
    });

    const form = overlay.querySelector('#kp-login-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = overlay.querySelector('#kp-login-email').value.trim();
      const password = overlay.querySelector('#kp-login-pass').value;
      const errBox = overlay.querySelector('#kp-login-error');
      const submitBtn = overlay.querySelector('#kp-login-submit');

      errBox.style.display = 'none';
      submitBtn.disabled = true;
      submitBtn.innerHTML = '⏳ Đang xác thực...';

      try {
        const { data, error } = await window.KP_SUPABASE.client.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;

        closeLogin();
        currentUser = data.user;
        enableAdminMode();
      } catch (err) {
        errBox.textContent = 'Đăng nhập không thành công: ' + (err.message || 'Mật khẩu không đúng.');
        errBox.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Đăng nhập &rarr;';
      }
    });
  }

  /* ==========================================================================
     TOAST NOTIFICATION
     ========================================================================== */
  function showToast(message) {
    const existing = document.querySelector('.kp-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'kp-toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'all 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Expose helpers globally
  window.KP_INLINE_ADMIN = {
    showLoginModal,
    showProductModal,
    showToast
  };
})();
