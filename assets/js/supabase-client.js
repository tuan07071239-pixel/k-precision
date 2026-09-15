/**
 * K-PRECISION SUPABASE CLIENT
 * Handles real-time database queries, authentication, and image storage.
 */

const SUPABASE_CONFIG = {
  url: 'https://eczhnrjbgqfcniaatotg.supabase.co',
  anonKey: 'sb_publishable_kepPTbUsmvBsbBt3PBAHHA_aa-DssPm',
  bucketName: 'product-images'
};

// Initialize Supabase Client
let sbClient = null;
if (typeof supabase !== 'undefined' && supabase.createClient) {
  sbClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
}

window.KP_SUPABASE = {
  client: sbClient,
  config: SUPABASE_CONFIG,

  /**
   * Get all products from Supabase, ordered by sort_order
   */
  async getProducts() {
    if (!sbClient) return null;
    try {
      const { data, error } = await sbClient
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('Could not fetch products from Supabase, using local fallback:', err.message);
      return null;
    }
  },

  /**
   * Save or update a product (supports renaming SKU via oldId)
   */
  async saveProduct(productData, oldId = null) {
    if (!sbClient) throw new Error('Supabase client not initialized');
    const sku = productData.sku || productData.id;
    if (!sku) throw new Error('Product SKU is required');

    const payload = {
      id: sku,
      sku: sku,
      name: productData.name,
      category: productData.category,
      category_slug: productData.categorySlug || productData.category_slug || 'others',
      category_url: productData.categoryUrl || productData.category_url || 'products.html',
      badge: productData.badge || '',
      image: productData.image || '',
      short_desc: productData.shortDesc || productData.short_desc || '',
      purpose: productData.purpose || '',
      workpiece_materials: productData.workpieceMaterials || productData.workpiece_materials || [],
      key_features: productData.keyFeatures || productData.key_features || [],
      specs: productData.specs || {},
      operating_conditions: productData.operatingConditions || productData.operating_conditions || {},
      certifications: productData.certifications || '',
      spec_list: productData.specList || productData.spec_list || [],
      param_list: productData.paramList || productData.param_list || [],
      data: productData,
      updated_at: new Date().toISOString()
    };

    if (oldId && oldId !== sku) {
      const { data, error } = await sbClient
        .from('products')
        .update(payload)
        .eq('id', oldId)
        .select();
      if (error) throw error;
      return data && data[0];
    } else {
      const { data, error } = await sbClient
        .from('products')
        .upsert(payload, { onConflict: 'id' })
        .select();
      if (error) throw error;
      return data && data[0];
    }
  },

  /**
   * Delete a product
   */
  async deleteProduct(id) {
    if (!sbClient) throw new Error('Supabase client not initialized');
    const { error } = await sbClient
      .from('products')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  },

  /**
   * Upload image file to Supabase Storage
   * Returns public URL of the uploaded image
   */
  async uploadImage(file) {
    if (!sbClient) throw new Error('Supabase client not initialized');
    
    // Generate clean unique filename
    const ext = file.name.split('.').pop();
    const cleanName = file.name
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-');
    const filename = `${Date.now()}-${cleanName}.${ext}`;

    const { data, error } = await sbClient.storage
      .from(SUPABASE_CONFIG.bucketName)
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = sbClient.storage
      .from(SUPABASE_CONFIG.bucketName)
      .getPublicUrl(filename);

    return urlData.publicUrl;
  },

  /**
   * Get all site texts (site_content)
   */
  async getSiteContent() {
    if (!sbClient) return {};
    try {
      const { data, error } = await sbClient.from('site_content').select('*');
      if (error) throw error;
      const map = {};
      (data || []).forEach(item => {
        map[item.key] = item.content;
      });
      return map;
    } catch (err) {
      console.warn('Could not load site_content:', err.message);
      return {};
    }
  },

  /**
   * Save a site text key
   */
  async saveSiteContent(key, content, page = 'global') {
    if (!sbClient) throw new Error('Supabase client not initialized');
    const { error } = await sbClient.from('site_content').upsert({
      key,
      content,
      page,
      updated_at: new Date().toISOString()
    }, { onConflict: 'key' });
    if (error) throw error;
    return true;
  }
};
