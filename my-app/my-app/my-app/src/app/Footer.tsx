import Link from 'next/link';

// The footer component contains the copyright information and a back to top button.
const Footer = () => {
  return (
    <footer className="py-8 border-t border-surface-light">
      <div className="container mx-auto flex justify-between items-center text-sm text-text-muted">
        <div className="footer-left">
          <p>&copy; <span id="year"></span> Sarvinoz Usmanova</p>
        </div>
        <div className="footer-right">
          <Link href="#" className="inline-flex items-center gap-2 px-5 py-3 bg-surface border border-surface-light rounded-full text-text-primary no-underline font-bold text-sm transition-all duration-300 ease-in-out backdrop-blur-md relative overflow-hidden cursor-pointer z-10 select-none">
            Back to Top
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
