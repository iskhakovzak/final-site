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
            // All 58 Photos - Corrected Supabase URLs
            { id: 1, title: 'Vogue Editorial 01', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-001.jpg', year: 2024, client: 'Vogue', featured: true },
            { id: 2, title: 'Fashion Portrait 01', category: 'photo', type: 'portrait', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-002.jpg', year: 2024, client: 'Portfolio', featured: true },
            { id: 3, title: 'Elle Magazine 01', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-003.jpg', year: 2023, client: 'Elle', featured: false },
            { id: 4, title: 'Beauty Shot 01', category: 'photo', type: 'beauty', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-004.jpg', year: 2024, client: 'Beauty Brand', featured: false },
            { id: 5, title: 'Runway Paris 01', category: 'photo', type: 'runway', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-005.jpg', year: 2023, client: 'Paris Fashion Week', featured: true },
            { id: 6, title: 'Commercial Campaign 01', category: 'photo', type: 'commercial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-006.jpg', year: 2024, client: 'Luxury Brand', featured: false },
            { id: 7, title: 'Editorial Spread 01', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-007.jpg', year: 2024, client: 'International Magazine', featured: false },
            { id: 8, title: 'Studio Portrait 01', category: 'photo', type: 'portrait', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-008.jpg', year: 2023, client: 'Studio Session', featured: false },
            { id: 9, title: 'Fashion Editorial 01', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-009.jpg', year: 2023, client: 'Fashion Magazine', featured: false },
            { id: 10, title: 'Beauty Editorial 01', category: 'photo', type: 'beauty', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-010.jpg', year: 2023, client: 'Cosmetics Brand', featured: false },
            { id: 11, title: 'Runway Milan 01', category: 'photo', type: 'runway', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-011.jpg', year: 2023, client: 'Milan Fashion Week', featured: false },
            { id: 12, title: 'Commercial Ad 01', category: 'photo', type: 'commercial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-012.jpg', year: 2024, client: 'Fashion Brand', featured: false },
            { id: 13, title: 'Fashion Spread 01', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-013.jpg', year: 2024, client: 'Fashion Magazine', featured: false },
            { id: 14, title: 'Portrait Collection 01', category: 'photo', type: 'portrait', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-014.jpg', year: 2024, client: 'Portfolio', featured: false },
            { id: 15, title: 'Runway NYC 01', category: 'photo', type: 'runway', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-015.jpg', year: 2024, client: 'New York Fashion Week', featured: false },
            { id: 16, title: 'Commercial Campaign 02', category: 'photo', type: 'commercial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-016.jpg', year: 2023, client: 'International Brand', featured: false },
            { id: 17, title: 'Beauty Shot 02', category: 'photo', type: 'beauty', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-017.jpg', year: 2024, client: 'Beauty Brand', featured: false },
            { id: 18, title: 'Editorial Feature 01', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-018.jpg', year: 2023, client: 'Fashion Publication', featured: false },
            { id: 19, title: 'Vogue Editorial 02', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-019.jpg', year: 2024, client: 'Vogue', featured: true },
            { id: 20, title: 'Fashion Portrait 02', category: 'photo', type: 'portrait', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-020.jpg', year: 2024, client: 'Portfolio', featured: false },
            { id: 21, title: 'Elle Magazine 02', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-021.jpg', year: 2023, client: 'Elle', featured: false },
            { id: 22, title: 'Beauty Shot 03', category: 'photo', type: 'beauty', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-022.jpg', year: 2024, client: 'Beauty Brand', featured: false },
            { id: 23, title: 'Runway Paris 02', category: 'photo', type: 'runway', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-023.jpg', year: 2023, client: 'Paris Fashion Week', featured: false },
            { id: 24, title: 'Commercial Campaign 03', category: 'photo', type: 'commercial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-024.jpg', year: 2024, client: 'Luxury Brand', featured: false },
            { id: 25, title: 'Editorial Spread 02', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-025.jpg', year: 2024, client: 'International Magazine', featured: false },
            { id: 26, title: 'Studio Portrait 02', category: 'photo', type: 'portrait', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-026.jpg', year: 2023, client: 'Studio Session', featured: false },
            { id: 27, title: 'Fashion Editorial 02', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-027.jpg', year: 2023, client: 'Fashion Magazine', featured: false },
            { id: 28, title: 'Beauty Editorial 02', category: 'photo', type: 'beauty', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-028.jpg', year: 2023, client: 'Cosmetics Brand', featured: false },
            { id: 29, title: 'Runway Milan 02', category: 'photo', type: 'runway', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-029.jpg', year: 2023, client: 'Milan Fashion Week', featured: false },
            { id: 30, title: 'Commercial Ad 02', category: 'photo', type: 'commercial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-030.jpg', year: 2024, client: 'Fashion Brand', featured: false },
            { id: 31, title: 'Fashion Spread 02', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-031.jpg', year: 2024, client: 'Fashion Magazine', featured: false },
            { id: 32, title: 'Portrait Collection 02', category: 'photo', type: 'portrait', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-032.jpg', year: 2024, client: 'Portfolio', featured: false },
            { id: 33, title: 'Runway NYC 02', category: 'photo', type: 'runway', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-033.jpg', year: 2024, client: 'New York Fashion Week', featured: false },
            { id: 34, title: 'Commercial Campaign 04', category: 'photo', type: 'commercial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-034.jpg', year: 2023, client: 'International Brand', featured: false },
            { id: 35, title: 'Beauty Shot 04', category: 'photo', type: 'beauty', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-035.jpg', year: 2024, client: 'Beauty Brand', featured: false },
            { id: 36, title: 'Editorial Feature 02', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-036.jpg', year: 2023, client: 'Fashion Publication', featured: false },
            { id: 37, title: 'Vogue Editorial 03', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-037.jpg', year: 2024, client: 'Vogue', featured: false },
            { id: 38, title: 'Fashion Portrait 03', category: 'photo', type: 'portrait', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-038.jpg', year: 2024, client: 'Portfolio', featured: false },
            { id: 39, title: 'Elle Magazine 03', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-039.jpg', year: 2023, client: 'Elle', featured: false },
            { id: 40, title: 'Beauty Shot 05', category: 'photo', type: 'beauty', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-040.jpg', year: 2024, client: 'Beauty Brand', featured: false },
            { id: 41, title: 'Runway Paris 03', category: 'photo', type: 'runway', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-041.jpg', year: 2023, client: 'Paris Fashion Week', featured: false },
            { id: 42, title: 'Commercial Campaign 05', category: 'photo', type: 'commercial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-042.jpg', year: 2024, client: 'Luxury Brand', featured: false },
            { id: 43, title: 'Editorial Spread 03', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-043.jpg', year: 2024, client: 'International Magazine', featured: false },
            { id: 44, title: 'Studio Portrait 03', category: 'photo', type: 'portrait', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-044.jpg', year: 2023, client: 'Studio Session', featured: false },
            { id: 45, title: 'Fashion Editorial 03', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-045.jpg', year: 2023, client: 'Fashion Magazine', featured: false },
            { id: 46, title: 'Beauty Editorial 03', category: 'photo', type: 'beauty', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-046.jpg', year: 2023, client: 'Cosmetics Brand', featured: false },
            { id: 47, title: 'Runway Milan 03', category: 'photo', type: 'runway', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-047.jpg', year: 2023, client: 'Milan Fashion Week', featured: false },
            { id: 48, title: 'Commercial Ad 03', category: 'photo', type: 'commercial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-048.jpg', year: 2024, client: 'Fashion Brand', featured: false },
            { id: 49, title: 'Fashion Spread 03', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-049.jpg', year: 2024, client: 'Fashion Magazine', featured: false },
            { id: 50, title: 'Portrait Collection 03', category: 'photo', type: 'portrait', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-050.jpg', year: 2024, client: 'Portfolio', featured: false },
            { id: 51, title: 'Runway NYC 03', category: 'photo', type: 'runway', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-051.jpg', year: 2024, client: 'New York Fashion Week', featured: false },
            { id: 52, title: 'Commercial Campaign 06', category: 'photo', type: 'commercial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-052.jpg', year: 2023, client: 'International Brand', featured: false },
            { id: 53, title: 'Beauty Shot 06', category: 'photo', type: 'beauty', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-053.jpg', year: 2024, client: 'Beauty Brand', featured: false },
            { id: 54, title: 'Editorial Feature 03', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-054.jpg', year: 2023, client: 'Fashion Publication', featured: false },
            { id: 55, title: 'Vogue Editorial 04', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-055.jpg', year: 2024, client: 'Vogue', featured: false },
            { id: 56, title: 'Fashion Portrait 04', category: 'photo', type: 'portrait', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-056.jpg', year: 2024, client: 'Portfolio', featured: false },
            { id: 57, title: 'Elle Magazine 04', category: 'photo', type: 'editorial', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-057.jpg', year: 2023, client: 'Elle', featured: false },
            { id: 58, title: 'Beauty Shot 07', category: 'photo', type: 'beauty', image: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/pic/photo-058.jpg', year: 2024, client: 'Beauty Brand', featured: false },

            // All 19 Videos - Corrected Supabase URLs
            { id: 59, title: 'Fashion Reel 01', category: 'video', type: 'editorial', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-001.mp4', year: 2024, client: 'Personal', featured: true },
            { id: 60, title: 'Backstage Video 01', category: 'video', type: 'behind-scenes', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-002.mp4', year: 2024, client: 'Fashion Week', featured: false },
            { id: 61, title: 'Campaign Ad Video 01', category: 'video', type: 'commercial', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-003.mp4', year: 2023, client: 'Luxury Brand', featured: false },
            { id: 62, title: 'Runway Video 01', category: 'video', type: 'runway', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-004.mp4', year: 2023, client: 'Paris Fashion Week', featured: true },
            { id: 63, title: 'Fashion Reel 02', category: 'video', type: 'editorial', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-005.mp4', year: 2024, client: 'Personal', featured: false },
            { id: 64, title: 'Beauty Video 01', category: 'video', type: 'beauty', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-006.mp4', year: 2024, client: 'Beauty Brand', featured: false },
            { id: 65, title: 'Backstage Video 02', category: 'video', type: 'behind-scenes', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-007.mp4', year: 2024, client: 'Fashion Week', featured: false },
            { id: 66, title: 'Campaign Ad Video 02', category: 'video', type: 'commercial', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-008.mp4', year: 2023, client: 'Fashion Brand', featured: false },
            { id: 67, title: 'Runway Video 02', category: 'video', type: 'runway', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-009.mp4', year: 2023, client: 'Milan Fashion Week', featured: false },
            { id: 68, title: 'Fashion Reel 03', category: 'video', type: 'editorial', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-010.mp4', year: 2024, client: 'Personal', featured: false },
            { id: 69, title: 'Beauty Video 02', category: 'video', type: 'beauty', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-011.mp4', year: 2024, client: 'Beauty Brand', featured: false },
            { id: 70, title: 'Backstage Video 03', category: 'video', type: 'behind-scenes', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-012.mp4', year: 2024, client: 'Fashion Week', featured: false },
            { id: 71, title: 'Campaign Ad Video 03', category: 'video', type: 'commercial', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-013.mp4', year: 2023, client: 'International Brand', featured: false },
            { id: 72, title: 'Runway Video 03', category: 'video', type: 'runway', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-014.mp4', year: 2024, client: 'New York Fashion Week', featured: false },
            { id: 73, title: 'Fashion Reel 04', category: 'video', type: 'editorial', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-015.mp4', year: 2024, client: 'Personal', featured: false },
            { id: 74, title: 'Beauty Video 03', category: 'video', type: 'beauty', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-016.mp4', year: 2024, client: 'Beauty Brand', featured: false },
            { id: 75, title: 'Backstage Video 04', category: 'video', type: 'behind-scenes', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-017.mp4', year: 2024, client: 'Fashion Week', featured: false },
            { id: 76, title: 'Campaign Ad Video 04', category: 'video', type: 'commercial', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-018.mp4', year: 2023, client: 'Luxury Brand', featured: false },
            { id: 77, title: 'Fashion Reel 05', category: 'video', type: 'editorial', video: 'https://vxbfqtnfzjrcqhsdftcf.supabase.co/storage/v1/object/sarvinoz/video/video-019.mp4', year: 2024, client: 'Personal', featured: true }
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