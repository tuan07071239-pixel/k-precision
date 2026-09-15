// scripts/supabase-sync.js
// Run with: SUPABASE_SECRET_KEY=... node scripts/supabase-sync.js
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://eczhnrjbgqfcniaatotg.supabase.co';
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_SECRET_KEY) {
  console.error('Error: SUPABASE_SECRET_KEY environment variable is required.');
  process.exit(1);
}

const PRODUCTS_DIR = path.join(__dirname, '..', 'data', 'products');

async function syncProducts() {
  console.log('Reading products from:', PRODUCTS_DIR);
  const files = fs.readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.json'));
  console.log(`Found ${files.length} product files.`);

  const products = [];
  let sortOrder = 1;
  for (const file of files) {
    const raw = fs.readFileSync(path.join(PRODUCTS_DIR, file), 'utf8');
    const item = JSON.parse(raw);
    const sku = item.sku || file.replace('.json', '');

    products.push({
      id: sku,
      sku: sku,
      name: item.name || sku,
      category: item.category || 'Precision Tooling',
      category_slug: item.categorySlug || 'tooling',
      category_url: item.categoryUrl || 'products.html',
      badge: item.badge || '',
      image: item.image || '',
      short_desc: item.shortDesc || '',
      purpose: item.purpose || '',
      workpiece_materials: item.workpieceMaterials || [],
      key_features: item.keyFeatures || [],
      specs: item.specs || {},
      operating_conditions: item.operatingConditions || {},
      certifications: item.certifications || '',
      spec_list: item.specList || [],
      param_list: item.paramList || [],
      data: item,
      sort_order: sortOrder++
    });
  }

  console.log(`Upserting ${products.length} products to Supabase...`);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/products?on_conflict=id`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_SECRET_KEY,
      'Authorization': `Bearer ${SUPABASE_SECRET_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=minimal'
    },
    body: JSON.stringify(products)
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Failed to sync products:', res.status, err);
    process.exit(1);
  }

  console.log(`Successfully synced ${products.length} products to Supabase!`);
}

syncProducts().catch(err => {
  console.error('Error during sync:', err);
  process.exit(1);
});
