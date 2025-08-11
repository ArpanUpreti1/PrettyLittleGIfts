import React from 'react';
import heroimage from '../../images/heroimage.jpg';
import { motion } from 'framer-motion';

const HeroSection = ({ navigateTo }) => {
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.5 } },
    hover: { scale: 1.1, boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)' },
    tap: { scale: 0.95 },
  };

  const uspVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const usps = [
    {
      icon: (
        <svg className="h-8 w-8 text-[#B8860B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: 'Hand-Crafted',
      description: 'Every item is made with care and attention to detail.',
    },
    {
      icon: (
        <svg className="h-8 w-8 text-[#B8860B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: 'Sustainable Sourcing',
      description: 'We use eco-friendly and responsibly sourced materials.',
    },
    {
      icon: (
        <svg className="h-8 w-8 text-[#B8860B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
        </svg>
      ),
      title: 'Personalized Service',
      description: 'Customized gifts and a delightful shopping experience.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Browse & Select',
      description: 'Explore our curated collection and find the perfect gift for any occasion.',
    },
    {
      number: '02',
      title: 'Personalize It',
      description: 'Add a personal touch with custom messages, colors, or packaging.',
    },
    {
      number: '03',
      title: 'Delivered With Care',
      description: 'Your gift will be packed beautifully and delivered safely to your loved ones.',
    },
  ];

  return (
    <div className="w-full text-center p-4">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl shadow-xl max-h-[80vh] flex items-center justify-center">
        <img src={heroimage} className="absolute inset-0 w-full h-full object-cover z-0 filter blur-sm scale-105" />
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

        <div className="relative z-20 p-8 md:p-16 max-w-4xl text-center text-white">
          <motion.h1
            className="font-heading text-5xl md:text-7xl font-bold mb-4 leading-tight"
            variants={headingVariants}
            initial="hidden"
            animate="visible"
          >
            Thoughtful Gifts, Made with Love
          </motion.h1>
          <motion.p
            className="font-body text-lg md:text-xl mb-4 opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            From birthdays to just-because moments — find gifts that make hearts smile.
          </motion.p>
          <motion.p
            className="text-sm md:text-base opacity-80 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Your one-stop shop for hand-crafted, eco-friendly, and personalized treasures.
          </motion.p>
          <div className="flex justify-center gap-4">
            <motion.button
              className="px-8 py-3 bg-[#B8860B] text-white font-bold rounded-full shadow-lg"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigateTo('shop')}
            >
              Shop Now
            </motion.button>
            <motion.button
              className="px-8 py-3 bg-white text-[#D29C8B] font-bold rounded-full shadow-lg"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigateTo('about')}
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </div>

      {/* USPs */}
      <motion.div
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {usps.map((usp, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md text-center hover:shadow-xl transition-shadow duration-300"
            variants={uspVariants}
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            <div className="mb-4">{usp.icon}</div>
            <h3 className="font-heading text-xl font-bold text-[#D29C8B] mb-2">{usp.title}</h3>
            <p className="font-body text-sm text-gray-600">{usp.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* HOW IT WORKS */}
      <div className="mt-20">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#D29C8B] mb-10">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <div className="text-4xl font-bold text-[#B8860B] mb-4">{step.number}</div>
              <h3 className="font-heading text-xl font-bold text-[#D29C8B] mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA BANNER */}
      <motion.div
        className="mt-20 bg-[#D29C8B] text-white rounded-3xl py-10 px-6 shadow-lg max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Ready to Surprise Someone?
        </h2>
        <p className="max-w-2xl mx-auto text-sm md:text-base mb-6 opacity-90">
          Make someone’s day with a meaningful, personalized gift they’ll never forget.
        </p>
        <motion.button
          className="px-8 py-3 bg-white text-[#D29C8B] font-bold rounded-full shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigateTo('signUp')}
        >
          Create Your Account
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HeroSection;
