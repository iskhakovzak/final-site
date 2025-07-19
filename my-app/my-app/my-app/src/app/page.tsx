import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('./Hero'))
const About = dynamic(() => import('./About'))
const Portfolio = dynamic(() => import('./Portfolio'))
const Contact = dynamic(() => import('./Contact'))

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Portfolio />
      <Contact />
    </main>
  );
}
