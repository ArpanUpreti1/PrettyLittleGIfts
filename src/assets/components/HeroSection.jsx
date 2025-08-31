import React from 'react';
import heroimage from '../../images/heroimage.jpg';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.5 } },
    hover: { scale: 1.05, boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)' },
    tap: { scale: 0.97 },
  };

  const uspVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const usps = [
    {
      icon: (
        <svg className="h-8 w-8 text-[#B8860B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: 'Hand-Crafted',
      description: 'Every item is made with care and attention to detail.',
    },
    {
      icon: (
        <svg className="h-8 w-8 text-[#B8860B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: 'Sustainable Sourcing',
      description: 'We use eco-friendly and responsibly sourced materials.',
    },
    {
      icon: (
        <svg className="h-8 w-8 text-[#B8860B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
        </svg>
      ),
      title: 'Personalized Service',
      description: 'Customized gifts and a delightful shopping experience.',
    },
  ];

  const steps = [
    { number: '01', title: 'Browse & Select', description: 'Explore our curated collection and find the perfect gift for any occasion.' },
    { number: '02', title: 'Personalize It', description: 'Add a personal touch with custom messages, colors, or packaging.' },
    { number: '03', title: 'Delivered With Care', description: 'Your gift will be packed beautifully and delivered safely to your loved ones.' },
  ];

  // Testimonials — Nepali names + internet images (stock)
  const testimonials = [
    {
      name: 'आरती श्रेष्ठ',
      location: 'काठमाडौं',
      img: 'https://media.gettyimages.com/id/1427591479/photo/portrait-photography-of-a-young-man-from-asia-standing-front-of-the-camera-with-crossed-arms.jpg?s=2048x2048&w=gi&k=20&c=Wf2Xfyu63L0IVWFBGZNkj6dTJGtDVvRI_1dtcHAyFhI=',
      quote: 'उपहारको गुणस्तर र प्याकेजिङ दुवै उत्कृष्ट! मेरो जन्मदिनको अर्डर समयमै र सुन्दर रूपमा आयो।',
      rating: 5,
    },
    {
      name: 'प्रकाश अधिकारी',
      location: 'पोखरा',
      img: 'https://media.gettyimages.com/id/1478687701/photo/portrait-of-a-indian-businessman.jpg?s=2048x2048&w=gi&k=20&c=uyzSvqfxa-9_Ywj9WSJvib-xs9LQDx4JQ8azuHBYhsU=',
      quote: 'सानो कस्टम नोटसमेत थपिदिएकोमा धेरै खुसी लाग्यो। कस्टमर सपोर्ट पनि छिटो र मित्रवत्।',
      rating: 5,
    },
    {
      name: 'सृजना केसी',
      location: 'ललितपुर',
      img: 'https://media.gettyimages.com/id/172517383/photo/one-cheerful-indian-senior-citizen-male-man-smiling-horizontal-outdoor.jpg?s=2048x2048&w=gi&k=20&c=_N8MlUGTvLNkZwQMoZnhj9wrHziNEu7p4xBCg-ax4cE=',
      quote: 'हातले बनाइएका उत्पादनहरू निकै अर्थपूर्ण रहेछन्। उपहार पाएर परिवार अझै खुशी भयो।',
      rating: 4,
    },
  ];

  const StarRow = ({ rating = 5 }) => (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10.5 13.347a1 1 0 00-1.175 0L6.615 16.283c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="w-full text-center p-4">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl shadow-xl max-h-[80vh] flex items-center justify-center">
        <img src={heroimage} alt="Hero" className="absolute inset-0 w-full h-full object-cover z-0 filter blur-sm scale-105" />
        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-20 p-8 md:p-16 max-w-4xl text-center text-white">
          <motion.h1
            className="font-heading text-5xl md:text-7xl font-bold mb-4 leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
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
            className="text-sm md:text-base opacity-85 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Your one-stop shop for hand-crafted, eco-friendly, and personalized treasures.
          </motion.p>

          <div className="flex justify-center gap-4">
            <motion.button
              className="px-8 py-3 bg-[#B8860B] text-white font-bold rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-white/70"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate('/shop')}
              aria-label="Shop Now"
            >
              Shop Now
            </motion.button>
            <motion.button
              className="px-8 py-3 bg-white text-[#D29C8B] font-bold rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D29C8B]/40"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate('/about')}
              aria-label="Learn More"
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
            className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            variants={uspVariants}
            style={{ transitionDelay: `${index * 0.15}s` }}
          >
            <div className="mb-4">{usp.icon}</div>
            <h3 className="font-heading text-xl font-bold text-[#D29C8B] mb-2">{usp.title}</h3>
            <p className="font-body text-sm text-gray-600">{usp.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* TESTIMONIALS */}
      <section className="mt-20">
        <div className="max-w-6xl mx-auto px-2">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#D29C8B] mb-4">What our customers say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">Real stories from happy customers in Nepal. We use stock imagery for privacy, but the words are all heart. ❤️</p>

          <div className="relative rounded-3xl bg-gradient-to-r from-[#fff6f2] via-[#faf3ee] to-[#f5efe8] p-6 md:p-10 shadow-xl border border-[#d7c2b7]/40">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.article
                  key={t.name}
                  className="group bg-white/80 backdrop-blur rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-100 text-left"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={t.img}
                      alt={`${t.name} avatar`}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-[#D29C8B]/30"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 leading-tight">{t.name}</h3>
                      <p className="text-xs text-gray-500">{t.location}, नेपाल</p>
                      <StarRow rating={t.rating} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">“{t.quote}”</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <div className="mt-20">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#D29C8B] mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
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
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Surprise Someone?</h2>
        <p className="max-w-2xl mx-auto text-sm md:text-base mb-6 opacity-90">
          Make someone’s day with a meaningful, personalized gift they’ll never forget.
        </p>
        <motion.button
          className="px-8 py-3 bg-white text-[#D29C8B] font-bold rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/signup')}
          aria-label="Create Your Account"
        >
          Create Your Account
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HeroSection;
