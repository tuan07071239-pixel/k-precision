const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, '..', 'data', 'products');
const outputJsPath = path.join(__dirname, '..', 'assets', 'js', 'products-data.js');
const outputJsonPath = path.join(__dirname, '..', 'data', 'products.json');

const DEFAULT_CATEGORY_IMAGES = {
  grinding: 'assets/images/diagrams/grinding-wheel.svg',
  cutting: 'assets/images/diagrams/cutting-tool.svg',
  toolholding: 'assets/images/diagrams/tool-holding.svg',
  edm: 'assets/images/diagrams/edm-wire.svg',
  others: 'assets/images/diagrams/precision-lab.svg'
};

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const yamlBlock = match[1];
  const data = {};
  const lines = yamlBlock.split(/\r?\n/);
  
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    
    // Remove quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    } else if (val === '[]') {
      val = [];
    } else if (val === '{}') {
      val = {};
    }
    data[key] = val;
  }
  return data;
}

function buildProducts() {
  if (!fs.existsSync(productsDir)) {
    console.error(`Error: Products directory not found at ${productsDir}`);
    process.exit(1);
  }

  const allFiles = fs.readdirSync(productsDir);
  const products = {};

  // Sort files for deterministic ordering
  allFiles.sort();

  for (const file of allFiles) {
    if (!file.endsWith('.json') && !file.endsWith('.md')) continue;

    try {
      const fullPath = path.join(productsDir, file);
      const raw = fs.readFileSync(fullPath, 'utf-8');
      let item = null;

      if (file.endsWith('.json')) {
        item = JSON.parse(raw);
      } else if (file.endsWith('.md')) {
        item = parseFrontmatter(raw);
        // If an .md file was found, also write out the .json version for Sveltia CMS
        if (item && item.sku) {
          const jsonPath = path.join(productsDir, `${item.sku}.json`);
          fs.writeFileSync(jsonPath, JSON.stringify(item, null, 2), 'utf-8');
          console.log(`[CONVERT] Converted ${file} -> ${item.sku}.json`);
        }
      }

      if (!item || !item.sku) {
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

      // Ensure specs and operatingConditions exist
      item.specs = item.specs || {};
      item.operatingConditions = item.operatingConditions || {};

      // Fallback image if empty
      if (!item.image || !item.image.trim()) {
        const slug = (item.categorySlug || 'others').toLowerCase();
        item.image = DEFAULT_CATEGORY_IMAGES[slug] || DEFAULT_CATEGORY_IMAGES.others;
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
