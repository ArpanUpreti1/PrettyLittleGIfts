import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => (
  <motion.div
    className="container mx-auto p-4 md:p-8 my-12"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 max-w-3xl mx-auto">
      <h2 className="text-5xl font-heading text-[#D29C8B] text-center mb-6">Get in Touch</h2>
      <p className="text-lg text-center font-body text-gray-700 mb-8">
        We'd love to hear from you! Send us a message or visit us at our location.
      </p>
      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          className="space-y-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h3 className="text-2xl font-heading text-[#D29C8B] mb-2">Our Location</h3>
            <p className="text-gray-600">
              123 Gift Lane <br/>
              Giftville, GA 30303
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-heading text-[#D29C8B] mb-2">Business Hours</h3>
            <p className="text-gray-600">
              Monday - Friday: 9am - 5pm <br/>
              Saturday: 10am - 4pm <br/>
              Sunday: Closed
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-heading text-[#D29C8B] mb-2">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <motion.a href="#" whileHover={{ scale: 1.2 }}>
                <svg className="w-8 h-8 text-[#B8860B]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.25.15 4.712 1.616 4.862 4.862.058 1.265.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.15 3.25-1.616 4.712-4.862 4.862-1.265.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-3.25-.15-4.712-1.616-4.862-4.862-.058-1.265-.07-1.645-.07-4.85s.012-3.584.07-4.85c.15-3.25 1.616-4.712 4.862-4.862 1.265-.058 1.645-.07 4.85-.07zm0-2.163c-3.376 0-3.722.013-5.068.072-4.14 0-5.871 1.731-6.021 5.871-.059 1.346-.072 1.692-.072 5.068s.013 3.722.072 5.068c.15 4.14 1.731 5.871 5.871 6.021 1.346.059 1.692.072 5.068.072s3.722-.013 5.068-.072c4.14-.15 5.871-1.731 6.021-5.871.059-1.346.072-1.692.072-5.068s-.013-3.722-.072-5.068c-.15-4.14-1.731-5.871-5.871-6.021-1.346-.059-1.692-.072-5.068-.072zM12 5.835a6.165 6.165 0 1 0 0 12.33 6.165 6.165 0 0 0 0-12.33zm0 10.165c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zM18.406 5.835a1.411 1.411 0 1 0 0-2.822 1.411 1.411 0 0 0 0 2.822z"/></svg>
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }}>
                <svg className="w-8 h-8 text-[#B8860B]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.769s.784-1.769 1.75-1.769 1.75.79 1.75 1.769-.784 1.769-1.75 1.769zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2 }}>
                <svg className="w-8 h-8 text-[#B8860B]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.235 0-5.51 2.91-4.717 6.302-3.136-.158-5.925-1.657-7.818-3.95-.316.549-.499 1.19-.499 1.879 0 1.291.653 2.433 1.642 3.102-.605-.019-1.171-.194-1.67-.468v.081c0 3.167 2.27 5.793 5.28 6.402-.551.15-.758.171-1.11.16-1.57.067-2.684-.66-3.084-1.026.837 2.624 3.292 4.543 6.136 4.61-2.264 1.748-5.11 2.977-8.156 2.977-.531 0-.918-.016-1.3-.082 3.107 1.968 6.643 3.127 10.457 3.127 12.578 0 19.467-10.884 19.467-20.254 0-.306-.007-.611-.02-.916.828-.598 1.547-1.349 2.106-2.222z"/></svg>
              </motion.a>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700">Name</label>
              <input type="text" id="name" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#B8860B] focus:border-[#B8860B]" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email</label>
              <input type="email" id="email" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#B8860B] focus:border-[#B8860B]" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-gray-700">Message</label>
              <textarea id="message" rows="5" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#B8860B] focus:border-[#B8860B]" required></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full px-6 py-3 bg-[#D29C8B] text-white font-bold rounded-lg shadow-md hover:bg-opacity-90 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

export default Contact;