const fs = require('fs');
const path = require('path');
const { KP_PRODUCTS } = require('../assets/js/products-data.js');

const outDir = path.join(__dirname, '..', 'data', 'products');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

let count = 0;
for (const [sku, product] of Object.entries(KP_PRODUCTS)) {
  const item = { ...product };

  // Convert specs object to specList for friendly CMS editing
  if (item.specs && typeof item.specs === 'object' && !Array.isArray(item.specs)) {
    item.specList = Object.entries(item.specs).map(([key, val]) => ({ key, val: String(val) }));
  }

  // Convert operatingConditions object to paramList for friendly CMS editing
  if (item.operatingConditions && typeof item.operatingConditions === 'object' && !Array.isArray(item.operatingConditions)) {
    item.paramList = Object.entries(item.operatingConditions).map(([key, val]) => ({ key, val: String(val) }));
  }

  const filePath = path.join(outDir, `${sku}.json`);
  fs.writeFileSync(filePath, JSON.stringify(item, null, 2), 'utf-8');
  count++;
}

console.log(`Successfully exported ${count} products with specList and paramList to ${outDir}`);
