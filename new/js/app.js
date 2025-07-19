// ===== CONFIGURATION =====
const CONFIG = {
    app: {
        name: 'Sarvinoz Usmanova',
        version: '2.0.0',
        debug: false,
        defaultLanguage: 'ru',
        supportedLanguages: ['en', 'ru', 'uz'],
        defaultTheme: 'dark',
    },
    scroll: {
        smooth: true,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        mouseMultiplier: 1,
        touchMultiplier: 2,
        infinite: false
    },
    cursor: {
        enabled: true,
    },
    storage: {
        theme: 'portfolio-theme',
        language: 'portfolio-language',
    }
};

// ===== UTILITIES =====
class Utils {
    static setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn('Failed to save to localStorage:', error);
        }
    }

    static getStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.warn('Failed to read from localStorage:', error);
            return defaultValue;
        }
    }
}

// ===== MAIN APPLICATION =====
class PortfolioApp {
    constructor() {
        this.currentLanguage = CONFIG.app.defaultLanguage;
        this.currentTheme = CONFIG.app.defaultTheme;
        this.init();
    }

    init() {
        this.waitForLibraries().then(() => {
            this.setupSmoothScroll();
            this.setupLanguageSwitcher();
            this.setupPortfolio();
            this.setupMobileMenu();
            this.setupBackToTop();
            this.setupIntroAnimation();
            this.setupScrollAnimations();
            this.setupCursor();
            this.setupModal();
            this.setupLogoNavigation();
            document.getElementById('year').textContent = new Date().getFullYear();
            document.body.classList.add('loaded');
        }).catch(error => {
            console.error(error);
            // Fallback for essential functionality
            this.setupLanguageSwitcher();
            this.setupPortfolio();
            this.setupMobileMenu();
            this.setupBackToTop();
            document.getElementById('year').textContent = new Date().getFullYear();
            document.body.classList.add('loaded');
        });
        this.showLoadingScreen();
    }

    showLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 800);
            }, 7000);
        }
    }

    waitForLibraries() {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 50; // 5 seconds max wait

            const checkLibraries = () => {
                attempts++;
                if (typeof gsap !== 'undefined' && typeof Lenis !== 'undefined' && typeof SplitType !== 'undefined') {
                    resolve();
                } else if (attempts >= maxAttempts) {
                    reject(new Error('Required libraries (GSAP, Lenis, SplitType) failed to load.'));
                } else {
                    setTimeout(checkLibraries, 100);
                }
            };

            checkLibraries();
        });
    }

    setupSmoothScroll() {
        if (CONFIG.scroll.smooth && typeof Lenis !== 'undefined') {
            const lenis = new Lenis({
                duration: CONFIG.scroll.duration,
                easing: CONFIG.scroll.easing,
            });

            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
            this.lenis = lenis;
        }
    }

    setupLanguageSwitcher() {
        const langBtns = document.querySelectorAll('.lang-btn, .mobile-lang-btn');
        langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.updateLanguage(lang);
                Utils.setStorage(CONFIG.storage.language, lang);

                langBtns.forEach(b => b.classList.remove('active'));
                document.querySelectorAll(`[data-lang=${lang}]`).forEach(b => b.classList.add('active'));
            });
        });

        const savedLang = Utils.getStorage(CONFIG.storage.language, CONFIG.app.defaultLanguage);
        this.updateLanguage(savedLang);
        document.querySelectorAll(`[data-lang=${savedLang}]`).forEach(b => b.classList.add('active'));
    }

    updateLanguage(lang) {
        this.currentLanguage = lang;
        document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
    }

    setupPortfolio() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const videos = document.querySelectorAll('.portfolio-item[data-category="video"] video');

        videos.forEach(video => {
            video.parentElement.addEventListener('mouseenter', () => video.play());
            video.parentElement.addEventListener('mouseleave', () => video.pause());
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;

                portfolioItems.forEach(item => {
                    const category = item.dataset.category;
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

        if (mobileMenuBtn && mobileMenuOverlay) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuOverlay.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });

            mobileMenuOverlay.addEventListener('click', (e) => {
                if (e.target === mobileMenuOverlay) {
                    mobileMenuOverlay.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            });
        }
    }

    setupBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.lenis) {
                    this.lenis.scrollTo(0);
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    }

    setupIntroAnimation() {
        const heroTitleLines = new SplitType('.hero-title', { types: 'lines' });
        gsap.to(heroTitleLines.lines, {
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.2
        });
    }

    setupScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);
        const header = document.querySelector('.header');

        ScrollTrigger.create({
            start: 'top top-=-100px',
            onUpdate: self => {
                header.classList.toggle('hidden', self.direction === 1 && self.scroll() > 200);
                header.classList.toggle('scrolled', self.scroll() > 50);
            }
        });
    }

    setupCursor() {
        if (CONFIG.cursor.enabled && window.innerWidth > 768) {
            const cursor = document.getElementById('custom-cursor');
            let mouseX = 0, mouseY = 0;
            let cursorX = 0, cursorY = 0;

            document.addEventListener('mousemove', e => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            const updateCursor = () => {
                cursorX += (mouseX - cursorX) * 0.15;
                cursorY += (mouseY - cursorY) * 0.15;
                cursor.style.left = cursorX + 'px';
                cursor.style.top = cursorY + 'px';
                requestAnimationFrame(updateCursor);
            };
            updateCursor();

            document.querySelectorAll('a, button, .portfolio-item').forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
            });
        }
    }

    setupModal() {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const closeBtn = modal.querySelector('.modal-close');

        document.querySelectorAll('.portfolio-item[data-category="photo"]').forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                modalImage.src = imgSrc;
                modal.classList.add('active');
            });
        });

        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    setupLogoNavigation() {
        const logo = document.querySelector('.header-logo');
        if (logo) {
            logo.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.lenis) {
                    this.lenis.scrollTo('#hero');
                } else {
                    document.querySelector('#hero').scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});
