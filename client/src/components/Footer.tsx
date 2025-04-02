import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#94A684] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-accent text-3xl text-accent-light mb-4">VivaVeggie</h3>
            <p className="text-neutral-light mb-4">Charlotte's premier farm-to-table vegetarian restaurant bringing sustainable dining to your community.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-light hover:text-accent-light transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-neutral-light hover:text-accent-light transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.879V12.89h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.989C16.343 19.129 20 14.99 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-neutral-light hover:text-accent-light transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 5.522 4.477 10 10 10 5.522 0 10-4.478 10-10 0-5.523-4.478-10-10-10zm5.058 15.589c-.22.049-.439.094-.658.131a7.373 7.373 0 01-2.231.35c-4.193.151-7.656-3.185-7.797-7.406-.141-4.221 3.184-7.684 7.376-7.836a7.52 7.52 0 012.231.131c.22.046.439.098.658.151.099.024.194.05.291.076v4.661H12.01c-1.096 0-1.997.896-1.997 1.997v1.001c0 1.1.901 1.997 1.997 1.997h2.918v4.661c-.097.026-.192.052-.29.076l-.001.001z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-neutral-light hover:text-accent-light transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C7.284 0 6.944.012 5.877.06 2.246.227 0 2.242 0 5.877v8.246C0 17.758 2.246 19.773 5.877 19.94c1.068.048 1.408.06 4.123.06s3.055-.012 4.123-.06c3.631-.167 5.877-2.182 5.877-5.817V5.877C20 2.242 17.754.227 14.123.06 13.056.012 12.716 0 10 0zm3.193 17.54c-.809.037-1.052.046-3.193.046s-2.384-.01-3.193-.046c-2.16-.1-3.11-1.13-3.11-3.317V5.777c0-2.187.95-3.217 3.11-3.317.809-.036 1.052-.046 3.193-.046s2.384.01 3.193.046c2.16.1 3.11 1.13 3.11 3.317v8.446c0 2.187-.95 3.217-3.11 3.317zM10 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Hours</h4>
            <ul className="space-y-2">
              <li>Monday - Friday: 11am - 9pm</li>
              <li>Saturday: 10am - 10pm</li>
              <li>Sunday: 10am - 8pm</li>
              <li className="font-semibold text-accent-light mt-4">Weekend Brunch: 10am - 2pm</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-accent-light" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>123 Green Street, Charlotte, NC 28202</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-accent-light" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>(704) 555-8729</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-accent-light" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>info@vivaveggie.com</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="mb-4">Subscribe to get seasonal menu updates and special event invitations.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 rounded-l text-neutral-dark focus:outline-none flex-grow" 
              />
              <button 
                type="submit" 
                className="bg-secondary hover:bg-secondary-dark px-4 py-2 rounded-r transition duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </motion.div>
        </div>

        <div className="border-t border-neutral-light border-opacity-20 pt-8 mt-8 text-center text-sm text-neutral-light">
          <p>&copy; {new Date().getFullYear()} VivaVeggie. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="hover:text-accent-light transition duration-300 mx-2">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-accent-light transition duration-300 mx-2">Terms of Service</a>
            <span>|</span>
            <a href="#" className="hover:text-accent-light transition duration-300 mx-2">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
