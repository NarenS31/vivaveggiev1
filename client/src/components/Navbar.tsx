
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
            <a href="#menu" className="text-white hover:text-neutral-200 transition-colors">
              Menu
            </a>
            <a href="#process" className="text-white hover:text-neutral-200 transition-colors">
              Our Process
            </a>
            <a href="#virtual-tour" className="text-white hover:text-neutral-200 transition-colors">
              Virtual Tour
            </a>
            <a href="#team" className="text-white hover:text-neutral-200 transition-colors">
              Team
            </a>
            <a href="#testimonials" className="text-white hover:text-neutral-200 transition-colors">
              Testimonials
            </a>
            <a href="#origin" className="text-white hover:text-neutral-200 transition-colors">
              Our Story
            </a>
            <a href="#ingredients" className="text-white hover:text-neutral-200 transition-colors">
              Ingredients
            </a>
            <a href="#contact" className="text-white hover:text-neutral-200 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
