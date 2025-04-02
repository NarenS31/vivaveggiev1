
import { Link } from "wouter";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between py-3">
          <Link href="/" className="text-xl font-heading text-primary-dark">
            ViveVeggie
          </Link>
          <div className="flex flex-wrap items-center text-xs space-x-4">
            <a href="#about" className="text-gray-600 hover:text-primary-dark transition-colors">
              About
            </a>
            <a href="#menu" className="text-gray-600 hover:text-primary-dark transition-colors">
              Menu
            </a>
            <a href="#process" className="text-gray-600 hover:text-primary-dark transition-colors">
              Our Process
            </a>
            <a href="#tour" className="text-gray-600 hover:text-primary-dark transition-colors">
              Virtual Tour
            </a>
            <a href="#team" className="text-gray-600 hover:text-primary-dark transition-colors">
              Team
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-primary-dark transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="text-gray-600 hover:text-primary-dark transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
