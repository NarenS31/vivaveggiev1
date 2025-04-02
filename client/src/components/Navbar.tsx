import { Link } from "wouter";

const Navbar = () => {
  return (
    <nav className="bg-green-700 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between py-4">
          <Link
            href="/"
            className="text-2xl font-semibold text-white tracking-wide hover:text-yellow-300 transition-colors"
          >
            VivaVeggie
          </Link>
          <div className="flex flex-wrap items-center text-sm gap-6">
            {[
              { href: "#about", label: "About" },
              { href: "#process", label: "Our Process" },
              { href: "#team", label: "Team" },
              { href: "#menu", label: "Menu" },
              { href: "#preorder", label: "Pre-Order" },
              { href: "#ingredient-map", label: "Ingredients" },
              { href: "#testimonials", label: "Testimonials" },
              { href: "#virtual-tour", label: "Virtual Tour" },
              { href: "#origin-story", label: "Our Story" },
              { href: "#sustainability-rewards", label: "Rewards" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white font-medium hover:text-yellow-300 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
