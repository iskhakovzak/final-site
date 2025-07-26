// ===== SUPABASE URL EXTRACTOR =====

class SupabaseURLExtractor {
    constructor() {
        this.imageUrls = [];
        this.videoUrls = [];
        this.extractUrls();
    }

    extractUrls() {
        if (!CONFIG || !CONFIG.portfolio || !CONFIG.portfolio.items) {
            console.error('CONFIG.portfolio.items not found');
            return;
        }

        CONFIG.portfolio.items.forEach(item => {
            if (item.type === 'photo' || item.category === 'photo') {
                if (item.image) {
                    this.imageUrls.push({
                        id: item.id,
                        title: item.title,
                        url: item.image,
                        thumbnail: item.thumbnail || item.image
                    });
                }
            } else if (item.type === 'video' || item.category === 'video') {
                if (item.video) {
                    this.videoUrls.push({
                        id: item.id,
                        title: item.title,
                        url: item.video,
                        thumbnail: item.thumbnail || item.video
                    });
                }
            }
        });
    }

    // Get all image URLs
    getImageUrls() {
        return this.imageUrls;
    }

    // Get all video URLs
    getVideoUrls() {
        return this.videoUrls;
    }

    // Get just the URL strings for images
    getImageUrlStrings() {
        return this.imageUrls.map(item => item.url);
    }

    // Get just the URL strings for videos
    getVideoUrlStrings() {
        return this.videoUrls.map(item => item.url);
    }

    // Print all URLs to console
    printAllUrls() {
        console.log('\n=== SUPABASE IMAGE URLS ===');
        console.log(`Total Images: ${this.imageUrls.length}`);
        this.imageUrls.forEach((item, index) => {
            console.log(`${index + 1}. ${item.title}`);
            console.log(`   URL: ${item.url}`);
        });

        console.log('\n=== SUPABASE VIDEO URLS ===');
        console.log(`Total Videos: ${this.videoUrls.length}`);
        this.videoUrls.forEach((item, index) => {
            console.log(`${index + 1}. ${item.title}`);
            console.log(`   URL: ${item.url}`);
        });
    }

    // Export URLs as JSON
    exportAsJSON() {
        return {
            images: this.imageUrls,
            videos: this.videoUrls,
            summary: {
                totalImages: this.imageUrls.length,
                totalVideos: this.videoUrls.length,
                totalItems: this.imageUrls.length + this.videoUrls.length
            }
        };
    }

    // Download URLs as text file
    downloadUrlsAsFile() {
        const content = this.generateTextContent();
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'supabase-urls.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    generateTextContent() {
        let content = 'SUPABASE MEDIA URLS\n';
        content += '===================\n\n';
        
        content += `IMAGES (${this.imageUrls.length} total):\n`;
        content += '------------------------\n';
        this.imageUrls.forEach((item, index) => {
            content += `${index + 1}. ${item.title}\n`;
            content += `   ${item.url}\n\n`;
        });
        
        content += `\nVIDEOS (${this.videoUrls.length} total):\n`;
        content += '------------------------\n';
        this.videoUrls.forEach((item, index) => {
            content += `${index + 1}. ${item.title}\n`;
            content += `   ${item.url}\n\n`;
        });
        
        return content;
    }
}

// Initialize extractor when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.supabaseExtractor = new SupabaseURLExtractor();
    
    // Print URLs to console
    window.supabaseExtractor.printAllUrls();
    
    // Make data available globally
    window.supabaseImageUrls = window.supabaseExtractor.getImageUrls();
    window.supabaseVideoUrls = window.supabaseExtractor.getVideoUrls();
    
    console.log('\n=== EXTRACTOR READY ===');
    console.log('Use these commands in console:');
    console.log('- supabaseExtractor.getImageUrls() - Get all image data');
    console.log('- supabaseExtractor.getVideoUrls() - Get all video data');
    console.log('- supabaseExtractor.downloadUrlsAsFile() - Download as text file');
    console.log('- supabaseImageUrls - Global array of image URLs');
    console.log('- supabaseVideoUrls - Global array of video URLs');
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SupabaseURLExtractor;
} else {
    window.SupabaseURLExtractor = SupabaseURLExtractor;
}