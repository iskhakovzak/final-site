// ===== SUPABASE CONFIGURATION =====

class SupabaseManager {
    constructor() {
        // Get Supabase credentials from CONFIG
        this.supabaseUrl = CONFIG.supabase.url;
        this.supabaseKey = CONFIG.supabase.anonKey;
        this.supabase = null;
        this.init();
    }

    async init() {
        try {
            // Initialize Supabase client
            const { createClient } = supabase;
            this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
            console.log('Supabase initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Supabase:', error);
        }
    }

    // Upload photo to Supabase storage
    async uploadPhoto(file, folder = 'photos') {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${folder}/${fileName}`;

            const { data, error } = await this.supabase.storage
                .from('media')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) throw error;

            // Get public URL
            const { data: publicData } = this.supabase.storage
                .from('media')
                .getPublicUrl(filePath);

            return {
                success: true,
                url: publicData.publicUrl,
                path: filePath,
                fileName: fileName
            };
        } catch (error) {
            console.error('Photo upload failed:', error);
            return { success: false, error: error.message };
        }
    }

    // Save photo metadata to database
    async savePhotoMetadata(photoData) {
        try {
            const { data, error } = await this.supabase
                .from('portfolio_items')
                .insert([{
                    title: photoData.title,
                    category: photoData.category,
                    type: photoData.type || 'photo',
                    image: photoData.url,
                    thumbnail: photoData.thumbnail || photoData.url,
                    description: photoData.description,
                    year: new Date().getFullYear(),
                    client: photoData.client || 'Portfolio',
                    tags: photoData.tags || [],
                    featured: photoData.featured || false,
                    created_at: new Date().toISOString()
                }]);

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Failed to save photo metadata:', error);
            return { success: false, error: error.message };
        }
    }

    // Get all portfolio items
    async getPortfolioItems() {
        try {
            const { data, error } = await this.supabase
                .from('portfolio_items')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Failed to fetch portfolio items:', error);
            return { success: false, error: error.message };
        }
    }

    // Delete photo from storage and database
    async deletePhoto(itemId, filePath) {
        try {
            // Delete from storage
            const { error: storageError } = await this.supabase.storage
                .from('media')
                .remove([filePath]);

            if (storageError) throw storageError;

            // Delete from database
            const { error: dbError } = await this.supabase
                .from('portfolio_items')
                .delete()
                .eq('id', itemId);

            if (dbError) throw dbError;

            return { success: true };
        } catch (error) {
            console.error('Failed to delete photo:', error);
            return { success: false, error: error.message };
        }
    }

    // Update photo metadata
    async updatePhotoMetadata(itemId, updates) {
        try {
            const { data, error } = await this.supabase
                .from('portfolio_items')
                .update(updates)
                .eq('id', itemId);

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Failed to update photo metadata:', error);
            return { success: false, error: error.message };
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SupabaseManager;
} else {
    window.SupabaseManager = SupabaseManager;
}