// ===== PERFORMANCE OPTIMIZATIONS =====

class PerformanceOptimizer {
    constructor() {
        this.imageObserver = null;
        this.videoObserver = null;
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupVideoOptimization();
        this.setupResourcePrefetching();
        this.monitorPerformance();
    }

    setupLazyLoading() {
        // Enhanced lazy loading with better performance
        const imageOptions = {
            root: null,
            rootMargin: '50px 0px',
            threshold: 0.1
        };

        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Progressive loading
                    if (img.dataset.src) {
                        this.loadImageProgressively(img);
                        this.imageObserver.unobserve(img);
                    }
                }
            });
        }, imageOptions);

        // Observe all lazy images
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.imageObserver.observe(img);
        });
    }

    loadImageProgressively(img) {
        // Create a low-quality placeholder first
        const placeholder = new Image();
        placeholder.src = img.dataset.placeholder || img.dataset.src + '?w=50&blur=5';
        
        placeholder.onload = () => {
            img.src = placeholder.src;
            img.style.filter = 'blur(5px)';
            
            // Load high-quality image
            const highQualityImg = new Image();
            highQualityImg.src = img.dataset.src;
            
            highQualityImg.onload = () => {
                img.src = highQualityImg.src;
                img.style.filter = 'none';
                img.style.transition = 'filter 0.3s ease';
            };
        };
    }

    setupImageOptimization() {
        // Preload critical images
        const criticalImages = [
            'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/public/photos/hero-image.jpg',
            'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/public/photos/vogue-editorial.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });

        // Responsive images with srcset
        document.querySelectorAll('img').forEach(img => {
            if (!img.srcset && img.src.includes('supabase.co')) {
                const baseSrc = img.src.split('?')[0];
                img.srcset = `
                    ${baseSrc}?w=400 400w,
                    ${baseSrc}?w=800 800w,
                    ${baseSrc}?w=1200 1200w,
                    ${baseSrc}?w=1600 1600w
                `;
                img.sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
            }
        });
    }

    setupVideoOptimization() {
        const videoOptions = {
            root: null,
            rootMargin: '100px 0px',
            threshold: 0.25
        };

        this.videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                
                if (entry.isIntersecting) {
                    // Preload video metadata
                    video.preload = 'metadata';
                    
                    // Play video when in viewport
                    if (video.readyState >= 2) {
                        video.play().catch(e => console.warn('Video autoplay failed:', e));
                    } else {
                        video.addEventListener('loadeddata', () => {
                            video.play().catch(e => console.warn('Video autoplay failed:', e));
                        }, { once: true });
                    }
                } else {
                    // Pause video when out of viewport
                    video.pause();
                }
            });
        }, videoOptions);

        // Observe all videos
        document.querySelectorAll('video').forEach(video => {
            this.videoObserver.observe(video);
            
            // Optimize video loading
            video.preload = 'none';
            video.addEventListener('loadstart', () => {
                console.log('Video loading started:', video.src);
            });
        });
    }

    setupResourcePrefetching() {
        // Prefetch next section's resources when user scrolls
        let prefetchedSections = new Set();
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    const nextSection = section.nextElementSibling;
                    
                    if (nextSection && !prefetchedSections.has(nextSection.id)) {
                        this.prefetchSectionResources(nextSection);
                        prefetchedSections.add(nextSection.id);
                    }
                }
            });
        }, {
            rootMargin: '200px 0px'
        });

        document.querySelectorAll('section').forEach(section => {
            sectionObserver.observe(section);
        });
    }

    prefetchSectionResources(section) {
        // Prefetch images in the next section
        const images = section.querySelectorAll('img[data-src]');
        images.forEach(img => {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = img.dataset.src;
            document.head.appendChild(prefetchLink);
        });

        // Prefetch videos in the next section
        const videos = section.querySelectorAll('video[src]');
        videos.forEach(video => {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = video.src;
            document.head.appendChild(prefetchLink);
        });
    }

    monitorPerformance() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            }).observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            }).observe({ entryTypes: ['first-input'] });

            // Cumulative Layout Shift
            new PerformanceObserver((entryList) => {
                let clsValue = 0;
                const entries = entryList.getEntries();
                
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                
                console.log('CLS:', clsValue);
            }).observe({ entryTypes: ['layout-shift'] });
        }

        // Monitor memory usage
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                console.log('Memory usage:', {
                    used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
                    total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
                    limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
                });
            }, 30000);
        }
    }

    // Cleanup method
    destroy() {
        if (this.imageObserver) {
            this.imageObserver.disconnect();
        }
        if (this.videoObserver) {
            this.videoObserver.disconnect();
        }
    }
}

// Critical Resource Loading
class CriticalResourceLoader {
    static async loadCriticalResources() {
        const criticalResources = [
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
            'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.42/bundled/lenis.min.js'
        ];

        const loadPromises = criticalResources.map(src => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        });

        try {
            await Promise.all(loadPromises);
            console.log('Critical resources loaded successfully');
        } catch (error) {
            console.error('Failed to load critical resources:', error);
        }
    }
}

// Optimize bundle size
class BundleOptimizer {
    static removeUnusedCode() {
        // Remove unused CSS classes
        const unusedClasses = ['.unused-class', '.old-style'];
        unusedClasses.forEach(className => {
            const elements = document.querySelectorAll(className);
            elements.forEach(el => el.classList.remove(className.slice(1)));
        });
    }

    static minifyInlineStyles() {
        const styles = document.querySelectorAll('style');
        styles.forEach(style => {
            style.textContent = style.textContent
                .replace(/\s+/g, ' ')
                .replace(/;\s*}/g, '}')
                .replace(/{\s*/g, '{')
                .trim();
        });
    }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    new PerformanceOptimizer();
    BundleOptimizer.removeUnusedCode();
    BundleOptimizer.minifyInlineStyles();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PerformanceOptimizer, CriticalResourceLoader, BundleOptimizer };
} else {
    window.PerformanceOptimizer = PerformanceOptimizer;
    window.CriticalResourceLoader = CriticalResourceLoader;
    window.BundleOptimizer = BundleOptimizer;
}