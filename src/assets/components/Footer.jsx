import React from 'react';
const Footer = () => (
  <footer className="p-6 md:p-10 bg-white shadow-inner mt-16">
    <div className="container mx-auto text-center text-sm font-body text-gray-500">
      <p>&copy; {new Date().getFullYear()} Pretty Little Gifts. Crafted with love in Nepal ❤️</p>
    </div>
  </footer>
);

export default Footer;