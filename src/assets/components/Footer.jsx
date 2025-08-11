import React from 'react';
const Footer = () => (
  <footer className="p-4 md:p-8 bg-white shadow-inner mt-12">
    <div className="container mx-auto text-center text-sm font-body text-gray-500">
      <p>&copy; {new Date().getFullYear()} Pretty Little Gifts. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;