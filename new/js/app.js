// ===== MAIN APPLICATION FILE =====

class PortfolioApp {
    constructor() {
        this.currentLanguage = CONFIG.app.defaultLanguage;
        this.currentTheme = CONFIG.app.defaultTheme;
        this.isInitialized = false;
        this.modules = {};
        this.state = {
            isLoading: true,
            isScrolling: false,
            isMenuOpen: false,
            currentSection: 'hero'
        };
        
        this.init();
    }

    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Initialize core modules
            await this.initializeModules();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initialize UI
            this.initializeUI();
            
            // Start the application
            this.start();
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.handleError(error);
        }
    }

    async initializeModules() {
        // Wait for external libraries
        await this.waitForLibraries();
        
        // Initialize core modules
        this.modules.smoothScroll = new SmoothScrollModule();
        this.modules.cursor = new CursorModule();
        this.modules.animations = new AnimationsModule();
        this.modules.language = new LanguageModule();
        this.modules.theme = new ThemeModule();
        this.modules.portfolio = new PortfolioModule();
        this.modules.navigation = new NavigationModule();
        this.modules.accessibility = new AccessibilityModule();
        
        // Initialize modules
        for (const [name, module] of Object.entries(this.modules)) {
            if (module && typeof module.init === 'function') {
                await module.init();
            }
        }
    }

    async waitForLibraries() {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 50; // 5 seconds max wait
            
            const checkLibraries = () => {
                attempts++;
                if (typeof gsap !== 'undefined' && typeof Lenis !== 'undefined' && typeof SplitType !== 'undefined') {
                    resolve();
                } else if (attempts >= maxAttempts) {
                    reject(new Error('Libraries failed to load'));
                } else {
                    setTimeout(checkLibraries, 100);
                }
            };
            
            checkLibraries();
        });
    }

    setupEventListeners() {
        // Window events
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
        
        // Navigation events
        document.addEventListener('click', this.handleGlobalClick.bind(this));
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        
        // Intersection Observer for sections
        this.setupIntersectionObserver();
        
        // Performance monitoring
        this.setupPerformanceMonitoring();
    }

    initializeUI() {
        // Set initial theme
        this.modules.theme.setTheme(this.currentTheme);
        
        // Set initial language
        this.modules.language.setLanguage(this.currentLanguage);
        
        // Initialize navigation
        this.modules.navigation.init();
        
        // Setup portfolio
        this.modules.portfolio.init();
        
        // Update year in footer
        document.getElementById('year').textContent = new Date().getFullYear();
    }

    start() {
        // Run intro animation immediately
        this.runIntroAnimation();
        
        // Mark as initialized
        this.isInitialized = true;
        
        // Dispatch custom event
        this.dispatchEvent('app:ready');
        
        console.log('Portfolio app initialized successfully');
    }



    async runIntroAnimation() {
        try {
            const heroTitle = document.querySelector('.hero-title');
            const heroImage = document.querySelector('.hero-image');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            
            if (!heroTitle || !heroImage) return;
            
            // Split text for animation
            const heroTitleLines = new SplitType(heroTitle, { types: 'lines' });
            const heroSubtitleLines = new SplitType(heroSubtitle, { types: 'lines' });
            
            // Set initial states
            gsap.set(heroTitleLines.lines, { y: '100%' });
            gsap.set(heroSubtitleLines.lines, { y: '100%' });
            gsap.set(heroImage, { scale: 1.25, opacity: 0 });
            
            // Create timeline
            const tl = gsap.timeline({ delay: 0.5 });
            
            tl.to(heroImage, {
                scale: 1,
                opacity: 1,
                duration: 2,
                ease: 'power3.out'
            })
            .to(heroTitleLines.lines, {
                y: 0,
                duration: 1.5,
                ease: 'power3.out',
                stagger: 0.1
            }, '-=1.5')
            .to(heroSubtitleLines.lines, {
                y: 0,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.05
            }, '-=1');
            
        } catch (error) {
            console.warn('Intro animation failed:', error);
        }
    }

    setupIntersectionObserver() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.state.currentSection = sectionId;
                    
                    // Update navigation
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                    
                    // Dispatch event
                    this.dispatchEvent('section:visible', { sectionId });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-20% 0px -20% 0px'
        });
        
        sections.forEach(section => observer.observe(section));
    }

    setupPerformanceMonitoring() {
        // Monitor performance metrics
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                    }
                }, 0);
            });
        }
    }

    handleResize() {
        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.dispatchEvent('window:resize');
            
            // Update cursor for mobile
            if (window.innerWidth <= CONFIG.breakpoints.tablet) {
                this.modules.cursor?.disable();
            } else {
                this.modules.cursor?.enable();
            }
        }, 250);
    }

    handleScroll() {
        if (!this.state.isScrolling) {
            this.state.isScrolling = true;
            requestAnimationFrame(() => {
                this.state.isScrolling = false;
            });
        }
    }

    handleGlobalClick(event) {
        // Handle mobile menu toggle
        if (event.target.closest('#menu-toggle')) {
            this.toggleMobileMenu();
        }
        
        // Handle back to top
        if (event.target.closest('#back-to-top')) {
            event.preventDefault();
            this.scrollToTop();
        }
        
        // Handle portfolio item clicks
        if (event.target.closest('.portfolio-item')) {
            const item = event.target.closest('.portfolio-item');
            this.openPortfolioModal(item);
        }
        
        // Handle modal close
        if (event.target.closest('#modal-close') || event.target.closest('.modal')) {
            this.closePortfolioModal();
        }
    }

    handleKeydown(event) {
        // Escape key
        if (event.key === 'Escape') {
            this.closePortfolioModal();
            this.closeMobileMenu();
        }
        
        // Navigation keys
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
            this.navigateSections(event.key === 'ArrowUp' ? -1 : 1);
        }
    }

    handleBeforeUnload() {
        // Save current state
        localStorage.setItem(CONFIG.storage.language, this.currentLanguage);
        localStorage.setItem(CONFIG.storage.theme, this.currentTheme);
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const menuToggle = document.getElementById('menu-toggle');
        
        if (mobileMenu && menuToggle) {
            this.state.isMenuOpen = !this.state.isMenuOpen;
            
            if (this.state.isMenuOpen) {
                mobileMenu.classList.add('active');
                menuToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }

    closeMobileMenu() {
        if (this.state.isMenuOpen) {
            this.toggleMobileMenu();
        }
    }

    scrollToTop() {
        if (this.modules.smoothScroll?.lenis) {
            this.modules.smoothScroll.lenis.scrollTo(0);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    openPortfolioModal(item) {
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        
        if (modal && item) {
            const image = item.querySelector('img, video');
            const title = item.querySelector('.portfolio-label')?.textContent || 'Portfolio Item';
            
            if (modalImage) modalImage.src = image?.src || '';
            if (modalTitle) modalTitle.textContent = title;
            if (modalDescription) modalDescription.textContent = 'Portfolio item description';
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closePortfolioModal() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    navigateSections(direction) {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentIndex = sections.findIndex(section => section.id === this.state.currentSection);
        const nextIndex = currentIndex + direction;
        
        if (nextIndex >= 0 && nextIndex < sections.length) {
            const targetSection = sections[nextIndex];
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    dispatchEvent(eventName, data = {}) {
        const event = new CustomEvent(eventName, {
            detail: { ...data, timestamp: Date.now() }
        });
        document.dispatchEvent(event);
    }

    handleError(error) {
        console.error('Application error:', error);
        
        // Show user-friendly error message
        this.showErrorMessage('An error occurred. Please refresh the page.');
        
        // Dispatch error event
        this.dispatchEvent('app:error', { error: error.message });
    }

    showErrorMessage(message) {
        // Create error toast
        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--error);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 5000);
    }

    // Public API methods
    getModule(name) {
        return this.modules[name];
    }

    getState() {
        return { ...this.state };
    }

    setLanguage(language) {
        this.currentLanguage = language;
        this.modules.language?.setLanguage(language);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        this.modules.theme?.setTheme(theme);
    }

    refresh() {
        // Reload the application
        window.location.reload();
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
} else {
    window.PortfolioApp = PortfolioApp;
} 