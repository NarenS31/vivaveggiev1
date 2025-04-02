
import { Link } from "wouter";

const Navbar = () => {
  return (
    <nav className="bg-[#94A684] shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between py-3">
          <Link href="/" className="text-xl font-heading text-white">
            ViveVeggie
          </Link>
          <div className="flex flex-wrap items-center text-xs gap-4">
            <a href="#about" className="text-white hover:text-neutral-200 transition-colors">
              About
            </a>
            <a href="#process" className="text-white hover:text-neutral-200 transition-colors">
              Our Process
            </a>
            <a href="#team" className="text-white hover:text-neutral-200 transition-colors">
              Team
            </a>
            <a href="#menu" className="text-white hover:text-neutral-200 transition-colors">
              Menu
            </a>
            <a href="#preorder" className="text-white hover:text-neutral-200 transition-colors">
              Pre-Order
            </a>
            <a href="#ingredient-map" className="text-white hover:text-neutral-200 transition-colors">
              Ingredients
            </a>
            <a href="#testimonials" className="text-white hover:text-neutral-200 transition-colors">
              Testimonials
            </a>
            <a href="#virtual-tour" className="text-white hover:text-neutral-200 transition-colors">
              Virtual Tour
            </a>
            <a href="#origin-story" className="text-white hover:text-neutral-200 transition-colors">
              Our Story
            </a>
            <a href="#sustainability-rewards" className="text-white hover:text-neutral-200 transition-colors">
              Rewards
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
