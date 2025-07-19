// ===== CONFIGURATION FILE =====

const CONFIG = {
    // App settings
    app: {
        name: 'Sarvinoz Usmanova',
        version: '2.0.0',
        debug: false,
        defaultLanguage: 'ru',
        supportedLanguages: ['en', 'ru', 'uz'],
        defaultTheme: 'dark',
        smoothScroll: true,
        cursorEnabled: true,
        animationsEnabled: true
    },

    // API endpoints
    api: {
        baseUrl: 'https://api.example.com',
        timeout: 10000,
        retries: 3
    },

    // Portfolio data
    portfolio: {
        items: [
            {
                id: 1,
                title: 'Vogue Editorial',
                category: 'photo',
                type: 'editorial',
                image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=1887&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=400&auto=format&fit=crop',
                description: 'Fashion editorial for Vogue magazine featuring high-end fashion photography',
                year: 2024,
                client: 'Vogue',
                tags: ['fashion', 'editorial', 'high-end'],
                featured: true
            },
            {
                id: 2,
                title: 'Djafariy Campaign',
                category: 'photo',
                type: 'commercial',
                image: 'https://images.unsplash.com/photo-1545561088-2a73b8894172?q=80&w=1887&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1545561088-2a73b8894172?q=80&w=400&auto=format&fit=crop',
                description: 'Commercial campaign for Djafariy brand showcasing luxury fashion',
                year: 2023,
                client: 'Djafariy',
                tags: ['commercial', 'luxury', 'fashion'],
                featured: true
            },
            {
                id: 3,
                title: 'Elle Magazine',
                category: 'photo',
                type: 'editorial',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
                description: 'Editorial feature for Elle magazine with contemporary fashion styling',
                year: 2023,
                client: 'Elle',
                tags: ['editorial', 'fashion', 'magazine'],
                featured: false
            },
            {
                id: 4,
                title: 'Fashion Portrait 1',
                category: 'photo',
                type: 'portrait',
                image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=1887&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=400&auto=format&fit=crop',
                description: 'Elegant portrait photography showcasing natural beauty',
                year: 2024,
                client: 'Personal',
                tags: ['portrait', 'beauty', 'natural'],
                featured: false
            },
            {
                id: 5,
                title: 'Runway Show 1',
                category: 'photo',
                type: 'runway',
                image: 'https://images.unsplash.com/photo-1545561088-2a73b8894172?q=80&w=1887&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1545561088-2a73b8894172?q=80&w=400&auto=format&fit=crop',
                description: 'Paris Fashion Week runway appearance',
                year: 2023,
                client: 'Paris Fashion Week',
                tags: ['runway', 'fashion-week', 'luxury'],
                featured: true
            },
            {
                id: 6,
                title: 'Editorial Spread 1',
                category: 'photo',
                type: 'editorial',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
                description: 'High-fashion editorial spread for international magazine',
                year: 2024,
                client: 'International Magazine',
                tags: ['editorial', 'high-fashion', 'magazine'],
                featured: false
            },
            {
                id: 7,
                title: 'Commercial Campaign 1',
                category: 'photo',
                type: 'commercial',
                image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=1887&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=400&auto=format&fit=crop',
                description: 'Luxury brand commercial campaign',
                year: 2023,
                client: 'Luxury Brand',
                tags: ['commercial', 'luxury', 'brand'],
                featured: false
            },
            {
                id: 8,
                title: 'Beauty Shot 1',
                category: 'photo',
                type: 'beauty',
                image: 'https://images.unsplash.com/photo-1545561088-2a73b8894172?q=80&w=1887&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1545561088-2a73b8894172?q=80&w=400&auto=format&fit=crop',
                description: 'Close-up beauty photography highlighting features',
                year: 2024,
                client: 'Beauty Brand',
                tags: ['beauty', 'close-up', 'features'],
                featured: false
            },
            {
                id: 9,
                title: 'Fashion Editorial 2',
                category: 'photo',
                type: 'editorial',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
                description: 'Contemporary fashion editorial with bold styling',
                year: 2023,
                client: 'Fashion Magazine',
                tags: ['editorial', 'contemporary', 'bold'],
                featured: false
            },
            {
                id: 10,
                title: 'Portrait Session 1',
                category: 'photo',
                type: 'portrait',
                image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=1887&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=400&auto=format&fit=crop',
                description: 'Professional portrait session in studio',
                year: 2024,
                client: 'Studio Session',
                tags: ['portrait', 'studio', 'professional'],
                featured: false
            },
            {
                id: 11,
                title: 'Runway Show 2',
                category: 'photo',
                type: 'runway',
                image: 'https://images.unsplash.com/photo-1545561088-2a73b8894172?q=80&w=1887&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1545561088-2a73b8894172?q=80&w=400&auto=format&fit=crop',
                description: 'Milan Fashion Week runway appearance',
                year: 2023,
                client: 'Milan Fashion Week',
                tags: ['runway', 'milan', 'fashion-week'],
                featured: false
            },
            {
                id: 12,
                title: 'Commercial Ad 1',
                category: 'photo',
                type: 'commercial',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
                description: 'Print advertisement for fashion brand',
                year: 2024,
                client: 'Fashion Brand',
                tags: ['commercial', 'print', 'advertisement'],
                featured: false
            },
            {
                id: 13,
                title: 'Beauty Editorial 1',
                category: 'photo',
                type: 'beauty',
                image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=1887&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=400&auto=format&fit=crop',
                description: 'Beauty editorial for cosmetics brand',
                year: 2023,
                client: 'Cosmetics Brand',
                tags: ['beauty', 'cosmetics', 'editorial'],
                featured: false
            },
            {
                id: 14,
                title: 'Fashion Spread 1',
                category: 'photo',
                type: 'editorial',
                image: 'https://images.unsplash.com/photo-1545561088-2a73b8894172?q=80&w=1887&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1545561088-2a73b8894172?q=80&w=400&auto=format&fit=crop',
                description: 'Multi-page fashion spread in magazine',
                year: 2024,
                client: 'Fashion Magazine',
                tags: ['editorial', 'spread', 'magazine'],
                featured: false
            },
            {
                id: 15,
                title: 'Studio Portrait 1',
                category: 'photo',
                type: 'portrait',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
                description: 'Studio portrait with dramatic lighting',
                year: 2023,
                client: 'Studio Session',
                tags: ['portrait', 'studio', 'dramatic'],
                featured: false
            },
            {
                id: 16,
                title: 'Runway Show 3',
                category: 'photo',
                type: 'runway',
                image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=1887&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=400&auto=format&fit=crop',
                description: 'New York Fashion Week runway',
                year: 2024,
                client: 'New York Fashion Week',
                tags: ['runway', 'nyfw', 'fashion-week'],
                featured: false
            },
            {
                id: 17,
                title: 'Commercial Campaign 2',
                category: 'photo',
                type: 'commercial',
                image: 'https://images.unsplash.com/photo-1545561088-2a73b8894172?q=80&w=1887&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1545561088-2a73b8894172?q=80&w=400&auto=format&fit=crop',
                description: 'International brand campaign',
                year: 2023,
                client: 'International Brand',
                tags: ['commercial', 'international', 'campaign'],
                featured: false
            },
            {
                id: 18,
                title: 'Beauty Shot 2',
                category: 'photo',
                type: 'beauty',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
                description: 'Close-up beauty photography',
                year: 2024,
                client: 'Beauty Brand',
                tags: ['beauty', 'close-up', 'photography'],
                featured: false
            },
            {
                id: 19,
                title: 'Editorial Feature 1',
                category: 'photo',
                type: 'editorial',
                image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=1887&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=400&auto=format&fit=crop',
                description: 'Feature editorial for fashion publication',
                year: 2023,
                client: 'Fashion Publication',
                tags: ['editorial', 'feature', 'publication'],
                featured: false
            },
            {
                id: 20,
                title: 'Portrait Collection 1',
                category: 'photo',
                type: 'portrait',
                image: 'https://images.unsplash.com/photo-1545561088-2a73b8894172?q=80&w=1887&auto=format&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1545561088-2a73b8894172?q=80&w=400&auto=format&fit=crop',
                description: 'Portrait collection for portfolio',
                year: 2024,
                client: 'Portfolio',
                tags: ['portrait', 'collection', 'portfolio'],
                featured: false
            },
            {
                id: 21,
                title: 'Fashion Reel 1',
                category: 'video',
                type: 'editorial',
                video: 'https://ik.imagekit.io/sarvinozusmanova/video/IMG_9337.MP4?updatedAt=1752780826850',
                thumbnail: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=400&auto=format&fit=crop',
                description: 'Behind the scenes fashion reel showcasing editorial work',
                year: 2024,
                client: 'Personal',
                tags: ['video', 'editorial', 'behind-scenes'],
                featured: true
            }
        ],
        categories: [
            { id: 'all', name: { en: 'All', ru: 'Все', uz: 'Barchasi' } },
            { id: 'photo', name: { en: 'Photo', ru: 'Фото', uz: 'Foto' } },
            { id: 'video', name: { en: 'Video', ru: 'Видео', uz: 'Video' } },
            { id: 'editorial', name: { en: 'Editorial', ru: 'Эдиториал', uz: 'Editorial' } }
        ],
        itemsPerPage: 6,
        loadMoreEnabled: true
    },

    // Experience timeline
    experience: [
        {
            year: 2024,
            title: { en: 'Vogue Editorial', ru: 'Эдиториал для Vogue', uz: 'Vogue Editorial' },
            description: { 
                en: 'Featured in international fashion editorial', 
                ru: 'Участие в международном модном эдиториале', 
                uz: 'Xalqaro moda editorialida ishtirok etdi' 
            },
            category: 'editorial'
        },
        {
            year: 2023,
            title: { en: 'Paris Fashion Week', ru: 'Неделя моды в Париже', uz: 'Parij Moda Haftasi' },
            description: { 
                en: 'Walked for multiple luxury brands', 
                ru: 'Выступала для нескольких люксовых брендов', 
                uz: 'Bir nechta hashamatli brendlar uchun yurdi' 
            },
            category: 'runway'
        },
        {
            year: 2022,
            title: { en: 'Elle Magazine', ru: 'Журнал Elle', uz: 'Elle Jurnali' },
            description: { 
                en: 'Cover and editorial feature', 
                ru: 'Обложка и эдиториал', 
                uz: 'Muqova va editorial material' 
            },
            category: 'editorial'
        }
    ],

    // Personal information
    personal: {
        name: 'Sarvinoz Usmanova',
        title: { en: 'International Model', ru: 'Международная модель', uz: 'Xalqaro Model' },
        location: 'Tashkent, Uzbekistan',
        bio: {
            en: 'An international model based in Tashkent, with a passion for editorial and high-fashion projects. My work is about telling stories and evoking emotions through the lens.',
            ru: 'Международная модель из Ташкента, увлеченная эдиториал и high-fashion проектами. Моя работа — рассказывать истории и вызывать эмоции через объектив.',
            uz: 'Toshkentda istiqomat qiluvchi xalqaro model, editorial va yuqori moda loyihalariga ishtiyoqmand. Mening ishim - ob\'ektiv orqali hikoyalar aytib berish va his-tuyg\'ularni uyg\'otish.'
        },
        measurements: {
            height: '170 cm',
            chest: '75 cm',
            waist: '60 cm',
            hips: '85 cm'
        },
        languages: ['Русский', 'English', 'O\'zbek'],
        specializations: ['Editorial', 'Fashion', 'Commercial', 'Runway'],
        stats: [
            { number: '5+', label: { en: 'Years Experience', ru: 'Лет опыта', uz: 'Yillik Tajriba' } },
            { number: '50+', label: { en: 'Projects', ru: 'Проектов', uz: 'Loyihalar' } },
            { number: '15+', label: { en: 'Brands', ru: 'Брендов', uz: 'Brendlar' } }
        ]
    },

    // Contact information
    contact: {
        email: 'sarahusmanova@icloud.com',
        instagram: 'https://instagram.com/sarvisha.usmanova',
        telegram: 'https://t.me/srv_usmn',
        links: [
            {
                type: 'email',
                url: 'mailto:sarahusmanova@icloud.com',
                icon: '✉️',
                label: 'Email'
            },
            {
                type: 'instagram',
                url: 'https://instagram.com/sarvisha.usmanova',
                icon: '📸',
                label: 'Instagram'
            },
            {
                type: 'telegram',
                url: 'https://t.me/srv_usmn',
                icon: '💬',
                label: 'Telegram'
            }
        ]
    },

    // Animation settings
    animations: {
        duration: {
            fast: 150,
            normal: 300,
            slow: 500,
            verySlow: 1000
        },
        easing: {
            ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            custom: 'cubic-bezier(0.16, 1, 0.3, 1)'
        },
        stagger: {
            fast: 0.05,
            normal: 0.1,
            slow: 0.2
        }
    },

    // Scroll settings
    scroll: {
        smooth: true,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        mouseMultiplier: 1,
        touchMultiplier: 2,
        infinite: false
    },

    // Cursor settings
    cursor: {
        enabled: true,
        size: 12,
        followerSize: 32,
        hoverScale: 2,
        followerHoverScale: 1.5,
        mixBlendMode: 'difference'
    },

    // Theme settings
    themes: {
        dark: {
            background: '#121212',
            surface: '#1A1A1A',
            surfaceLight: '#2A2A2A',
            textPrimary: '#EAEAEA',
            textSecondary: '#B0B0B0',
            textMuted: '#888888',
            primary: '#B5AB9A',
            accent: '#B5AB9A'
        },
        light: {
            background: '#FFFFFF',
            surface: '#F8F9FA',
            surfaceLight: '#E9ECEF',
            textPrimary: '#212529',
            textSecondary: '#6C757D',
            textMuted: '#ADB5BD',
            primary: '#B5AB9A',
            accent: '#B5AB9A'
        }
    },

    // Breakpoints
    breakpoints: {
        mobile: 480,
        tablet: 768,
        desktop: 1024,
        wide: 1440
    },

    // Error messages
    errors: {
        libraryLoad: 'One or more critical libraries failed to load',
        networkError: 'Network error occurred',
        imageLoadError: 'Failed to load image',
        videoLoadError: 'Failed to load video'
    },

    // Success messages
    success: {
        formSubmitted: 'Message sent successfully',
        imageLoaded: 'Image loaded successfully',
        videoLoaded: 'Video loaded successfully'
    },

    // Local storage keys
    storage: {
        theme: 'portfolio-theme',
        language: 'portfolio-language',
        cursorEnabled: 'portfolio-cursor-enabled',
        animationsEnabled: 'portfolio-animations-enabled'
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
} 