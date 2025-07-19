// ===== COMPONENTS JAVASCRIPT =====

// ===== LANGUAGE MODULE =====
class LanguageModule {
    constructor() {
        this.currentLanguage = CONFIG.app.defaultLanguage;
        this.supportedLanguages = CONFIG.app.supportedLanguages;
        this.init();
    }

    init() {
        this.setupLanguageSwitcher();
        this.loadSavedLanguage();
        this.updateAllText();
    }

    setupLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                this.setLanguage(lang);
            });
        });
    }

    setLanguage(language) {
        if (!this.supportedLanguages.includes(language)) return;
        
        this.currentLanguage = language;
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === language) {
                btn.classList.add('active');
            }
        });
        
        // Save to localStorage
        Utils.setStorage(CONFIG.storage.language, language);
        
        // Update all text content
        this.updateAllText();
        
        // Dispatch event
        document.dispatchEvent(new CustomEvent('language:changed', { 
            detail: { language } 
        }));
    }

    updateAllText() {
        const elements = document.querySelectorAll('[data-en], [data-ru], [data-uz]');
        
        elements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLanguage}`);
            if (text) {
                element.textContent = text;
            }
        });
    }

    loadSavedLanguage() {
        const savedLang = Utils.getStorage(CONFIG.storage.language, this.currentLanguage);
        if (savedLang && this.supportedLanguages.includes(savedLang)) {
            this.setLanguage(savedLang);
        }
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

// ===== CURSOR MODULE =====
class CursorModule {
    constructor() {
        this.cursor = null;
        this.cursorFollower = null;
        this.isEnabled = CONFIG.cursor.enabled;
        this.init();
    }

    init() {
        this.createCursor();
        this.setupEventListeners();
        this.updateVisibility();
    }

    createCursor() {
        // Create cursor elements
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        document.body.appendChild(this.cursor);

        this.cursorFollower = document.createElement('div');
        this.cursorFollower.className = 'cursor-follower';
        document.body.appendChild(this.cursorFollower);
    }

    setupEventListeners() {
        // Mouse move
        document.addEventListener('mousemove', (e) => {
            if (!this.isEnabled) return;
            
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            
            // Delayed follower
            setTimeout(() => {
                this.cursorFollower.style.left = e.clientX + 'px';
                this.cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn, .filter-btn, .portfolio-item, .contact-link');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (!this.isEnabled) return;
                this.cursor.classList.add('hover-active');
                this.cursorFollower.classList.add('hover-active');
            });
            
            element.addEventListener('mouseleave', () => {
                if (!this.isEnabled) return;
                this.cursor.classList.remove('hover-active');
                this.cursorFollower.classList.remove('hover-active');
            });
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.updateVisibility();
        });
    }

    updateVisibility() {
        const isMobile = Utils.isMobile();
        const isTouchDevice = Utils.isTouchDevice();
        
        if (isMobile || isTouchDevice) {
            this.disable();
        } else {
            this.enable();
        }
    }

    enable() {
        this.isEnabled = true;
        if (this.cursor) this.cursor.style.display = 'block';
        if (this.cursorFollower) this.cursorFollower.style.display = 'block';
        document.body.style.cursor = 'none';
    }

    disable() {
        this.isEnabled = false;
        if (this.cursor) this.cursor.style.display = 'none';
        if (this.cursorFollower) this.cursorFollower.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
}

// ===== SMOOTH SCROLL MODULE =====
class SmoothScrollModule {
    constructor() {
        this.lenis = null;
        this.init();
    }

    async init() {
        if (typeof Lenis !== 'undefined') {
            this.setupLenis();
        } else {
            console.warn('Lenis not available, using native smooth scroll');
        }
    }

    setupLenis() {
        this.lenis = new Lenis({
            duration: CONFIG.scroll.duration,
            easing: CONFIG.scroll.easing,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: CONFIG.scroll.mouseMultiplier,
            touchMultiplier: CONFIG.scroll.touchMultiplier,
            infinite: CONFIG.scroll.infinite
        });

        // Integrate with GSAP
        if (typeof gsap !== 'undefined') {
            gsap.ticker.add((time) => {
                this.lenis.raf(time * 1000);
            });
        } else {
            function raf(time) {
                this.lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }
    }

    scrollTo(target, options = {}) {
        if (this.lenis) {
            this.lenis.scrollTo(target, options);
        } else {
            // Fallback to native smooth scroll
            if (typeof target === 'string') {
                const element = document.querySelector(target);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', ...options });
                }
            }
        }
    }
}

// ===== ANIMATIONS MODULE =====
class AnimationsModule {
    constructor() {
        this.init();
    }

    init() {
        if (typeof gsap !== 'undefined') {
            this.setupGSAP();
        }
    }

    setupGSAP() {
        // Register ScrollTrigger plugin
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Setup scroll-triggered animations
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        // Animate elements when they come into view
        const animatedElements = document.querySelectorAll('.scroll-trigger');
        
        animatedElements.forEach(element => {
            gsap.fromTo(element, 
                { 
                    opacity: 0, 
                    y: 50 
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }
}

// ===== THEME MODULE =====
class ThemeModule {
    constructor() {
        this.currentTheme = CONFIG.app.defaultTheme;
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.loadSavedTheme();
        this.setTheme(this.currentTheme);
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
                this.setTheme(newTheme);
            });
        }
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        Utils.setStorage(CONFIG.storage.theme, theme);
        
        // Dispatch event
        document.dispatchEvent(new CustomEvent('theme:changed', { 
            detail: { theme } 
        }));
    }

    loadSavedTheme() {
        const savedTheme = Utils.getStorage(CONFIG.storage.theme, this.currentTheme);
        if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
            this.setTheme(savedTheme);
        }
    }
}

// ===== NAVIGATION MODULE =====
class NavigationModule {
    constructor() {
        this.navigation = null;
        this.lastScrollTop = 0;
        this.init();
    }

    init() {
        this.navigation = document.getElementById('navigation');
        this.setupScrollBehavior();
        this.setupMobileMenu();
    }

    setupScrollBehavior() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 50) {
            this.navigation.classList.add('scrolled');
        } else {
            this.navigation.classList.remove('scrolled');
        }
        
        // Hide/show navigation on scroll
        if (scrollTop > this.lastScrollTop && scrollTop > 100) {
            this.navigation.classList.add('hidden');
        } else {
            this.navigation.classList.remove('hidden');
        }
        
        this.lastScrollTop = scrollTop;
    }

    setupMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            });
        }
    }
}

// ===== PORTFOLIO MODULE =====
class PortfolioModule {
    constructor() {
        this.currentFilter = 'all';
        this.portfolioItems = [];
        this.init();
    }

    init() {
        this.loadPortfolioItems();
        this.setupFilters();
        this.setupPortfolioGrid();
    }

    loadPortfolioItems() {
        this.portfolioItems = CONFIG.portfolio.items;
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = btn.getAttribute('data-filter');
                this.filterPortfolio(filter);
                
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    filterPortfolio(filter) {
        this.currentFilter = filter;
        const grid = document.getElementById('portfolio-grid');
        
        if (!grid) return;
        
        // Clear grid
        grid.innerHTML = '';
        
        // Filter items
        const filteredItems = filter === 'all' 
            ? this.portfolioItems 
            : this.portfolioItems.filter(item => 
                item.category === filter || item.type === filter
            );
        
        // Render items
        filteredItems.forEach(item => {
            const itemElement = this.createPortfolioItem(item);
            grid.appendChild(itemElement);
        });
    }

    createPortfolioItem(item) {
        const element = document.createElement('div');
        element.className = 'portfolio-item';
        element.setAttribute('data-category', item.category);
        element.setAttribute('data-type', item.type);
        
        const media = item.video ? 
            `<video src="${item.video}" muted loop></video>` :
            `<img src="${item.image}" alt="${item.title}" loading="lazy">`;
        
        element.innerHTML = `
            ${media}
            <div class="portfolio-overlay">
                <div class="portfolio-info">
                    <div class="portfolio-title">${item.title}</div>
                    <div class="portfolio-category">${item.category}</div>
                </div>
            </div>
            <div class="portfolio-label">${item.type}</div>
        `;
        
        return element;
    }

    setupPortfolioGrid() {
        // Initial render
        this.filterPortfolio('all');
    }
}

// ===== ACCESSIBILITY MODULE =====
class AccessibilityModule {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupReducedMotion();
    }

    setupKeyboardNavigation() {
        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    setupFocusManagement() {
        // Add focus-visible class for better focus styles
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    setupReducedMotion() {
        if (Utils.isReducedMotion()) {
            document.documentElement.classList.add('reduced-motion');
        }
    }
}

// Export modules for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LanguageModule,
        CursorModule,
        SmoothScrollModule,
        AnimationsModule,
        ThemeModule,
        NavigationModule,
        PortfolioModule,
        AccessibilityModule
    };
} else {
    window.LanguageModule = LanguageModule;
    window.CursorModule = CursorModule;
    window.SmoothScrollModule = SmoothScrollModule;
    window.AnimationsModule = AnimationsModule;
    window.ThemeModule = ThemeModule;
    window.NavigationModule = NavigationModule;
    window.PortfolioModule = PortfolioModule;
    window.AccessibilityModule = AccessibilityModule;
} 