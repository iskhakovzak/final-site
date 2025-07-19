import Link from 'next/link';

// The header component contains the navigation and language switcher.
const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-20 px-0 py-5 z-10 transition-all duration-300 ease-in-out backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center h-full">
        <Link href="#hero" className="text-lg font-bold" aria-label="Home">
          SU
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-10" role="navigation" aria-label="Main navigation">
          <Link href="#about" className="text-sm font-bold uppercase" data-en="About" data-uz="Haqida" data-ru="Обо мне">
            About
          </Link>
          <Link href="#portfolio" className="text-sm font-bold uppercase" data-en="Portfolio" data-uz="Portfolio" data-ru="Портфолио">
            Portfolio
          </Link>
          <Link href="#contact" className="text-sm font-bold uppercase" data-en="Contact" data-uz="Aloqa" data-ru="Контакты">
            Contact
          </Link>
        </nav>

        {/* Desktop Language Switcher */}
        <div className="hidden md:flex gap-4" role="group" aria-label="Language selection">
          <button className="lang-btn active" data-lang="en" aria-label="Switch to English">
            EN
          </button>
          <button className="lang-btn" data-lang="ru" aria-label="Switch to Russian">
            RU
          </button>
          <button className="lang-btn" data-lang="uz" aria-label="Switch to Uzbek">
            UZ
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex flex-col justify-between w-8 h-6 bg-transparent border-none cursor-pointer p-0 z-20">
          <span className="w-full h-0.5 bg-accent rounded-sm transition-all duration-300 ease-in-out"></span>
          <span className="w-full h-0.5 bg-accent rounded-sm transition-all duration-300 ease-in-out"></span>
          <span className="w-full h-0.5 bg-accent rounded-sm transition-all duration-300 ease-in-out"></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-background/90 backdrop-blur-lg z-10 flex items-center justify-center transition-all duration-300 ease-in-out opacity-0 invisible">
        <div className="flex flex-col items-center gap-10">
          <h2 className="text-4xl font-bold font-fashion bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/70">
            Menu
          </h2>
          <nav className="flex flex-col items-center gap-5" role="navigation" aria-label="Mobile navigation">
            <Link href="#about" className="text-2xl font-fashion" data-en="About" data-uz="Haqida" data-ru="Обо мне">
              About
            </Link>
            <Link href="#portfolio" className="text-2xl font-fashion" data-en="Portfolio" data-uz="Portfolio" data-ru="Портфолио">
              Portfolio
            </Link>
            <Link href="#contact" className="text-2xl font-fashion" data-en="Contact" data-uz="Aloqa" data-ru="Контакты">
              Contact
            </Link>
          </nav>

          <div className="flex gap-4" role="group" aria-label="Mobile language selection">
            <button className="mobile-lang-btn active" data-lang="en" aria-label="Switch to English">
              EN
            </button>
            <button className="mobile-lang-btn" data-lang="ru" aria-label="Switch to Russian">
              RU
            </button>
            <button className="mobile-lang-btn" data-lang="uz" aria-label="Switch to Uzbek">
              UZ
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
