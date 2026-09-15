const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, '..', 'data', 'products');
const outputJsPath = path.join(__dirname, '..', 'assets', 'js', 'products-data.js');
const outputJsonPath = path.join(__dirname, '..', 'data', 'products.json');

function buildProducts() {
  if (!fs.existsSync(productsDir)) {
    console.error(`Error: Products directory not found at ${productsDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'));
  const products = {};

  // Sort files by name for deterministic ordering
  files.sort();

  for (const file of files) {
    try {
      const fullPath = path.join(productsDir, file);
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const item = JSON.parse(raw);
      if (!item.sku) {
        console.warn(`Warning: File ${file} missing sku, skipped.`);
        continue;
      }

      // Convert specList array to specs object if present
      if (Array.isArray(item.specList)) {
        item.specs = item.specs || {};
        item.specList.forEach(({ key, val }) => {
          if (key && key.trim()) {
            item.specs[key.trim()] = val;
          }
        });
      }

      // Convert paramList array to operatingConditions object if present
      if (Array.isArray(item.paramList)) {
        item.operatingConditions = item.operatingConditions || {};
        item.paramList.forEach(({ key, val }) => {
          if (key && key.trim()) {
            item.operatingConditions[key.trim()] = val;
          }
        });
      }

      products[item.sku] = item;
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  const count = Object.keys(products).length;

  // 1. Generate assets/js/products-data.js
  const jsContent = `/**
 * K-PRECISION OFFICIAL PRODUCT DATABASE
 * High-precision manufacturing consumables, specifications, applications, and operating conditions.
 * Automatically compiled from data/products/*.json by scripts/build-products.js
 * Total products: ${count}
 */

const KP_PRODUCTS = ${JSON.stringify(products, null, 2)};

// Expose globally for browser usage
if (typeof window !== 'undefined') {
  window.KP_PRODUCTS = KP_PRODUCTS;
}

// CommonJS export for Node.js build tools and test suites
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KP_PRODUCTS };
}
`;

  fs.writeFileSync(outputJsPath, jsContent, 'utf-8');
  console.log(`[OK] Successfully compiled ${count} products to ${outputJsPath}`);

  // 2. Generate data/products.json
  fs.writeFileSync(outputJsonPath, JSON.stringify(products, null, 2), 'utf-8');
  console.log(`[OK] Successfully generated ${outputJsonPath}`);
}

buildProducts();
