import { motion } from "framer-motion";
import Image from 'next/image';

// The portfolio component displays a grid of portfolio items.
const Portfolio = () => {
  const portfolioItems = [
    {
      "id": 1,
      "category": "photo",
      "src": "https://ik.imagekit.io/sarvinozusmanova/New%20Folder/IMG_9969.WEBP?updatedAt=1752757438569",
      "alt": "Fashion editorial",
      "label": "Editorial"
    },
    // ... more items
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <section className="py-40" id="portfolio">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-20" data-en="Selected Works" data-uz="Tanlangan Ishlar" data-ru="Избранные работы">
          Selected Works
        </h2>
        <div className="flex justify-center gap-5 mb-20">
          <button className="filter-btn active" data-filter="photo" data-en="Photo" data-uz="Foto" data-ru="Фото">
            Photo
          </button>
          <button className="filter-btn" data-filter="video" data-en="Video" data-uz="Video" data-ru="Видео">
            Video
          </button>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {portfolioItems.map((portfolioItem) => (
            <motion.div
              key={portfolioItem.id}
              className="relative overflow-hidden rounded-lg aspect-w-3 aspect-h-4 group"
              data-category={portfolioItem.category}
              tabIndex={0}
              variants={item}
            >
              <picture>
                <source
                  srcSet={`${portfolioItem.src}&tr=w-400,q-80`}
                  media="(max-width: 480px)"
                />
                <source
                  srcSet={`${portfolioItem.src}&tr=w-800,q-80`}
                  media="(max-width: 768px)"
                />
                <img
                  src={portfolioItem.src}
                  alt={portfolioItem.label}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </picture>
              <div className="absolute bottom-5 left-5 px-4 py-2 bg-black/50 rounded-md text-white text-sm font-bold">
                {portfolioItem.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
