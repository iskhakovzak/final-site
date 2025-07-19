// ===== PORTFOLIO JAVASCRIPT =====

class PortfolioManager {
    constructor() {
        this.currentFilter = 'all';
        this.portfolioItems = [];
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.init();
    }

    init() {
        this.loadPortfolioItems();
        this.setupFilters();
        this.setupPortfolioGrid();
        this.setupModal();
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
        this.currentPage = 1;
        this.renderPortfolio();
    }

    renderPortfolio() {
        const grid = document.getElementById('portfolio-grid');
        if (!grid) return;
        
        // Clear grid
        grid.innerHTML = '';
        
        // Filter items
        const filteredItems = this.currentFilter === 'all' 
            ? this.portfolioItems 
            : this.portfolioItems.filter(item => 
                item.category === this.currentFilter || item.type === this.currentFilter
            );
        
        // Get items for current page
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const itemsToShow = filteredItems.slice(startIndex, endIndex);
        
        // Render items
        itemsToShow.forEach(item => {
            const itemElement = this.createPortfolioItem(item);
            grid.appendChild(itemElement);
        });
        
        // Update load more button
        this.updateLoadMoreButton(filteredItems.length);
    }

    createPortfolioItem(item) {
        const element = document.createElement('div');
        element.className = 'portfolio-item';
        element.setAttribute('data-category', item.category);
        element.setAttribute('data-type', item.type);
        element.setAttribute('data-id', item.id);
        
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
        
        // Add click event for modal
        element.addEventListener('click', () => {
            this.openModal(item);
        });
        
        return element;
    }

    setupPortfolioGrid() {
        // Initial render
        this.renderPortfolio();
    }

    setupModal() {
        const modal = document.getElementById('modal');
        const modalClose = document.getElementById('modal-close');
        
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.closeModal();
            });
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
        
        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    openModal(item) {
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        
        if (modal && item) {
            const media = item.video ? 
                `<video src="${item.video}" controls autoplay muted loop></video>` :
                `<img src="${item.image}" alt="${item.title}">`;
            
            if (modalImage) {
                modalImage.innerHTML = media;
            }
            if (modalTitle) modalTitle.textContent = item.title;
            if (modalDescription) modalDescription.textContent = item.description;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Stop video if playing
            const video = modal.querySelector('video');
            if (video) {
                video.pause();
            }
        }
    }

    updateLoadMoreButton(totalItems) {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            const totalPages = Math.ceil(totalItems / this.itemsPerPage);
            const hasMorePages = this.currentPage < totalPages;
            
            loadMoreBtn.style.display = hasMorePages ? 'block' : 'none';
            
            if (hasMorePages) {
                loadMoreBtn.addEventListener('click', () => {
                    this.loadMore();
                });
            }
        }
    }

    loadMore() {
        this.currentPage++;
        this.renderPortfolio();
    }

    // Public methods
    getCurrentFilter() {
        return this.currentFilter;
    }

    getPortfolioItems() {
        return this.portfolioItems;
    }

    refreshPortfolio() {
        this.renderPortfolio();
    }
}

// Initialize portfolio manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioManager = new PortfolioManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioManager;
} else {
    window.PortfolioManager = PortfolioManager;
} 