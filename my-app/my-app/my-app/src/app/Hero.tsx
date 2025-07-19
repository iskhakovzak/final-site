import { motion } from "framer-motion";
import Image from 'next/image';
import { useExperiment } from 'next-experiments';

// The hero component displays the main heading and a background image.
const Hero = () => {
  const { variant } = useExperiment('newHeroLayout');

  const title = {
    initial: { y: "100%" },
    animate: { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  };

  const Treatment = () => (
    <motion.h1
      className="text-clamp-hero leading-tight text-center relative z-10"
      variants={{
        animate: { transition: { staggerChildren: 0.1 } },
      }}
      initial="initial"
      animate="animate"
    >
      <span className="block overflow-hidden">
        <motion.span className="block" variants={title}>Sarvinoz</motion.span>
      </span>
      <span className="block overflow-hidden">
        <motion.span className="block" variants={title}>Usmanova</motion.span>
      </span>
    </motion.h1>
  );

  const Control = () => (
    <motion.h1
      className="text-clamp-hero leading-tight text-center relative z-10"
      variants={{
        animate: { transition: { staggerChildren: 0.1 } },
      }}
      initial="initial"
      animate="animate"
    >
      <span className="block overflow-hidden">
        <motion.span className="block" variants={title}>S. Usmanova</motion.span>
      </span>
    </motion.h1>
  );

  return (
    <section className="h-screen w-full relative flex items-center justify-center overflow-hidden" id="hero">
      {variant === 'treatment' ? <Treatment /> : <Control />}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <picture>
          <source
            srcSet="https://ik.imagekit.io/sarvinozusmanova/New%20Folder/IMG_4975.JPG?updatedAt=1752757683245&tr=w-400,q-80"
            media="(max-width: 480px)"
          />
          <source
            srcSet="https://ik.imagekit.io/sarvinozusmanova/New%20Folder/IMG_4975.JPG?updatedAt=1752757683245&tr=w-800,q-80"
            media="(max-width: 768px)"
          />
          <source
            srcSet="https://ik.imagekit.io/sarvinozusmanova/New%20Folder/IMG_4975.JPG?updatedAt=1752757683245&tr=w-1200,q-80"
            media="(max-width: 1200px)"
          />
          <motion.img
            className="w-full h-full object-cover object-center filter grayscale transition-all duration-500 ease-in-out"
            src="https://ik.imagekit.io/sarvinozusmanova/New%20Folder/IMG_4975.JPG?updatedAt=1752757683245"
            alt="Portrait of Sarvinoz Usmanova"
            loading="eager"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }}
          />
        </picture>
      </div>
    </section>
  );
};

export default Hero;
