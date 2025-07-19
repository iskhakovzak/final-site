// ===== UTILITIES FILE =====

class Utils {
    // ===== DOM UTILITIES =====
    
    static $(selector) {
        return document.querySelector(selector);
    }
    
    static $$(selector) {
        return document.querySelectorAll(selector);
    }
    
    static createElement(tag, className = '', attributes = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        
        return element;
    }
    
    static addClass(element, className) {
        if (element) {
            element.classList.add(className);
        }
    }
    
    static removeClass(element, className) {
        if (element) {
            element.classList.remove(className);
        }
    }
    
    static toggleClass(element, className) {
        if (element) {
            element.classList.toggle(className);
        }
    }
    
    static hasClass(element, className) {
        return element && element.classList.contains(className);
    }
    
    // ===== EVENT UTILITIES =====
    
    static on(element, event, handler, options = {}) {
        if (element) {
            element.addEventListener(event, handler, options);
        }
    }
    
    static off(element, event, handler) {
        if (element) {
            element.removeEventListener(event, handler);
        }
    }
    
    static once(element, event, handler) {
        const onceHandler = (...args) => {
            handler(...args);
            this.off(element, event, onceHandler);
        };
        this.on(element, event, onceHandler);
    }
    
    static delegate(parent, selector, event, handler) {
        this.on(parent, event, (e) => {
            const target = e.target.closest(selector);
            if (target && parent.contains(target)) {
                handler.call(target, e);
            }
        });
    }
    
    // ===== ANIMATION UTILITIES =====
    
    static animate(element, properties, options = {}) {
        if (!element) return;
        
        const defaults = {
            duration: 300,
            easing: 'ease',
            delay: 0,
            fill: 'forwards'
        };
        
        const config = { ...defaults, ...options };
        
        return element.animate(properties, config);
    }
    
    static fadeIn(element, duration = 300) {
        return this.animate(element, [
            { opacity: 0 },
            { opacity: 1 }
        ], { duration });
    }
    
    static fadeOut(element, duration = 300) {
        return this.animate(element, [
            { opacity: 1 },
            { opacity: 0 }
        ], { duration });
    }
    
    static slideIn(element, direction = 'up', duration = 300) {
        const transforms = {
            up: ['translateY(30px)', 'translateY(0)'],
            down: ['translateY(-30px)', 'translateY(0)'],
            left: ['translateX(-30px)', 'translateX(0)'],
            right: ['translateX(30px)', 'translateX(0)']
        };
        
        const [from, to] = transforms[direction] || transforms.up;
        
        return this.animate(element, [
            { opacity: 0, transform: from },
            { opacity: 1, transform: to }
        ], { duration });
    }
    
    // ===== SCROLL UTILITIES =====
    
    static scrollTo(element, options = {}) {
        const defaults = {
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        };
        
        const config = { ...defaults, ...options };
        
        if (typeof element === 'string') {
            element = this.$(element);
        }
        
        if (element) {
            element.scrollIntoView(config);
        }
    }
    
    static scrollToTop(options = {}) {
        this.scrollTo(document.body, options);
    }
    
    static getScrollPosition() {
        return {
            x: window.pageXOffset || document.documentElement.scrollLeft,
            y: window.pageYOffset || document.documentElement.scrollTop
        };
    }
    
    static isElementInViewport(element) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    static isElementPartiallyInViewport(element) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return (
            rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom > 0 &&
            rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
            rect.right > 0
        );
    }
    
    // ===== DEVICE & BROWSER UTILITIES =====
    
    static isMobile() {
        return window.innerWidth <= CONFIG.breakpoints.tablet;
    }
    
    static isTablet() {
        return window.innerWidth > CONFIG.breakpoints.tablet && window.innerWidth <= CONFIG.breakpoints.desktop;
    }
    
    static isDesktop() {
        return window.innerWidth > CONFIG.breakpoints.desktop;
    }
    
    static isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    static isReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    static isHighContrast() {
        return window.matchMedia('(prefers-contrast: high)').matches;
    }
    
    static getDevicePixelRatio() {
        return window.devicePixelRatio || 1;
    }
    
    // ===== STORAGE UTILITIES =====
    
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
    
    static removeStorage(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.warn('Failed to remove from localStorage:', error);
        }
    }
    
    static clearStorage() {
        try {
            localStorage.clear();
        } catch (error) {
            console.warn('Failed to clear localStorage:', error);
        }
    }
    
    // ===== STRING UTILITIES =====
    
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    static truncate(str, length = 100, suffix = '...') {
        if (str.length <= length) return str;
        return str.substring(0, length) + suffix;
    }
    
    static slugify(str) {
        return str
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    
    static formatNumber(num, options = {}) {
        const defaults = {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        };
        
        return new Intl.NumberFormat(undefined, { ...defaults, ...options }).format(num);
    }
    
    static formatDate(date, options = {}) {
        const defaults = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        return new Intl.DateTimeFormat(undefined, { ...defaults, ...options }).format(new Date(date));
    }
    
    // ===== ARRAY & OBJECT UTILITIES =====
    
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    static deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = this.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    }
    
    static mergeObjects(...objects) {
        return objects.reduce((result, obj) => {
            return { ...result, ...obj };
        }, {});
    }
    
    // ===== MATH UTILITIES =====
    
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    
    static lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    
    static map(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }
    
    static random(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // ===== IMAGE UTILITIES =====
    
    static preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }
    
    static preloadImages(sources) {
        return Promise.all(sources.map(src => this.preloadImage(src)));
    }
    
    static getImageDimensions(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve({
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                    aspectRatio: img.naturalWidth / img.naturalHeight
                });
            };
            img.onerror = reject;
            img.src = src;
        });
    }
    
    // ===== PERFORMANCE UTILITIES =====
    
    static measureTime(fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        return { result, time: end - start };
    }
    
    static async measureTimeAsync(fn) {
        const start = performance.now();
        const result = await fn();
        const end = performance.now();
        return { result, time: end - start };
    }
    
    static requestIdleCallback(callback, options = {}) {
        if ('requestIdleCallback' in window) {
            return window.requestIdleCallback(callback, options);
        } else {
            return setTimeout(callback, 1);
        }
    }
    
    static cancelIdleCallback(id) {
        if ('cancelIdleCallback' in window) {
            window.cancelIdleCallback(id);
        } else {
            clearTimeout(id);
        }
    }
    
    // ===== ERROR HANDLING =====
    
    static handleError(error, context = '') {
        console.error(`Error${context ? ` in ${context}` : ''}:`, error);
        
        // Dispatch error event
        const event = new CustomEvent('app:error', {
            detail: { error, context, timestamp: Date.now() }
        });
        document.dispatchEvent(event);
    }
    
    static async retry(fn, maxAttempts = 3, delay = 1000) {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await fn();
            } catch (error) {
                if (attempt === maxAttempts) {
                    throw error;
                }
                await new Promise(resolve => setTimeout(resolve, delay * attempt));
            }
        }
    }
    
    // ===== VALIDATION UTILITIES =====
    
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    static isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
    
    static isEmpty(value) {
        if (value === null || value === undefined) return true;
        if (typeof value === 'string') return value.trim().length === 0;
        if (Array.isArray(value)) return value.length === 0;
        if (typeof value === 'object') return Object.keys(value).length === 0;
        return false;
    }
    
    // ===== URL UTILITIES =====
    
    static getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    }
    
    static setUrlParam(key, value) {
        const url = new URL(window.location);
        url.searchParams.set(key, value);
        window.history.replaceState({}, '', url);
    }
    
    static removeUrlParam(key) {
        const url = new URL(window.location);
        url.searchParams.delete(key);
        window.history.replaceState({}, '', url);
    }
    
    // ===== COLOR UTILITIES =====
    
    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    static rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    static getContrastColor(hexColor) {
        const rgb = this.hexToRgb(hexColor);
        if (!rgb) return '#000000';
        
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        return brightness > 128 ? '#000000' : '#ffffff';
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
} else {
    window.Utils = Utils;
} 