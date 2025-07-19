// ===== PRELOADER MODULE =====

class PreloaderModule {
    constructor() {
        this.duration = 7000; // 7 seconds
        this.quotes = [
            "Fashion is the armor to survive the reality of everyday life.",
            "Style is a way to say who you are without having to speak.",
            "Fashion is not something that exists in dresses only. Fashion is in the sky, in the street, fashion has to do with ideas, the way we live, what is happening.",
            "Elegance is the only beauty that never fades.",
            "Fashion is about dressing according to what's fashionable. Style is more about being yourself.",
            "The joy of dressing is an art.",
            "Fashion is what you're offered four times a year by designers. And style is what you choose.",
            "Beauty begins the moment you decide to be yourself.",
            "Fashion is like eating, you shouldn't stick to the same menu.",
            "Style is knowing who you are, what you want to say, and not giving a damn."
        ];
        this.currentQuoteIndex = 0;
        this.progress = 0;
        this.isComplete = false;
        this.init();
    }

    init() {
        this.setupElements();
        this.startPreloader();
    }

    setupElements() {
        this.preloader = document.getElementById('preloader');
        this.progressBar = document.getElementById('preloader-bar');
        this.quoteElement = document.getElementById('preloader-quote');
        this.percentageElement = document.getElementById('preloader-percentage');
        
        if (!this.preloader || !this.progressBar || !this.quoteElement || !this.percentageElement) {
            console.error('Preloader elements not found');
            return;
        }
    }

    startPreloader() {
        const startTime = Date.now();
        const endTime = startTime + this.duration;
        
        const updateProgress = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            this.progress = Math.min((elapsed / this.duration) * 100, 100);
            
            // Update progress bar
            if (this.progressBar) {
                this.progressBar.style.width = `${this.progress}%`;
            }
            
            // Update percentage
            if (this.percentageElement) {
                this.percentageElement.textContent = `${Math.round(this.progress)}%`;
            }
            
            // Update quotes every 2 seconds
            const quoteInterval = Math.floor(this.progress / 14); // 14% intervals for 7 quotes
            if (quoteInterval !== this.currentQuoteIndex && quoteInterval < this.quotes.length) {
                this.currentQuoteIndex = quoteInterval;
                this.updateQuote();
            }
            
            if (this.progress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                this.complete();
            }
        };
        
        requestAnimationFrame(updateProgress);
    }

    updateQuote() {
        if (this.quoteElement && this.currentQuoteIndex < this.quotes.length) {
            // Fade out
            this.quoteElement.style.opacity = '0';
            
            setTimeout(() => {
                // Update text
                this.quoteElement.textContent = this.quotes[this.currentQuoteIndex];
                
                // Fade in
                this.quoteElement.style.opacity = '1';
            }, 300);
        }
    }

    complete() {
        this.isComplete = true;
        
        // Add completion animation
        if (this.preloader) {
            this.preloader.classList.add('hidden');
            
            setTimeout(() => {
                this.preloader.style.display = 'none';
                
                // Dispatch completion event
                document.dispatchEvent(new CustomEvent('preloader:complete'));
                
                // Show main content
                document.body.classList.add('loaded');
            }, 500);
        }
    }

    // Public method to check if preloader is complete
    isPreloaderComplete() {
        return this.isComplete;
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PreloaderModule;
} else {
    window.PreloaderModule = PreloaderModule;
} 