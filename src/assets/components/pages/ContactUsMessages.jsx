import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ContactUsMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const headerRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const backgroundSvgRef = useRef(null);
  const floatingElementsRef = useRef([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:5028/api/ContactUs', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    if (!loading && messages.length > 0) {
      // Header animation
      gsap.fromTo(headerRef.current, 
        { 
          opacity: 0, 
          y: -50,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.7)"
        }
      );

      // Background SVG animation
      gsap.to(backgroundSvgRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none"
      });

      // Floating elements animation
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: -20,
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.2
          });
        }
      });

      // Messages stagger animation
      gsap.fromTo(messagesContainerRef.current.children,
        {
          opacity: 0,
          x: -100,
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.5
        }
      );

      // Scroll trigger for message cards
      Array.from(messagesContainerRef.current.children).forEach((card, index) => {
        gsap.fromTo(card,
          {
            scale: 0.9,
            opacity: 0.7
          },
          {
            scale: 1.02,
            opacity: 1,
            duration: 0.3,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });
    }
  }, [loading, messages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#faf8f6] to-[#f5f1ed]">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-[#D29C8B]"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-32 w-32 border-t-4 border-[#D29C8B] opacity-30"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#faf8f6] via-white to-[#f5f1ed] overflow-hidden">
      {/* Background SVG Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg 
          ref={backgroundSvgRef}
          className="absolute -top-20 -right-20 w-96 h-96 opacity-5"
          viewBox="0 0 400 400"
        >
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D29C8B" />
              <stop offset="100%" stopColor="#E6B8A9" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="150" fill="url(#bgGradient)" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="#D29C8B" strokeWidth="2" />
          <circle cx="200" cy="200" r="50" fill="none" stroke="#D29C8B" strokeWidth="1" />
        </svg>

        <svg className="absolute -bottom-10 -left-10 w-64 h-64 opacity-10" viewBox="0 0 200 200">
          <polygon points="100,10 150,80 100,150 50,80" fill="#D29C8B" />
          <polygon points="100,30 130,70 100,110 70,70" fill="white" />
        </svg>

        {/* Floating decorative elements */}
        <div 
          ref={el => floatingElementsRef.current[0] = el}
          className="absolute top-20 right-1/4 w-6 h-6 bg-[#D29C8B] rounded-full opacity-20"
        />
        <div 
          ref={el => floatingElementsRef.current[1] = el}
          className="absolute top-1/3 left-20 w-4 h-4 bg-[#E6B8A9] rounded-full opacity-30"
        />
        <div 
          ref={el => floatingElementsRef.current[2] = el}
          className="absolute bottom-1/4 right-32 w-8 h-8 bg-[#D29C8B] rounded-full opacity-15"
        />
        <div 
          ref={el => floatingElementsRef.current[3] = el}
          className="absolute top-1/2 left-1/4 w-3 h-3 bg-[#E6B8A9] rounded-full opacity-25"
        />
      </div>

      <motion.div
        className="container mx-auto p-8 font-body relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <div 
            ref={headerRef}
            className="relative inline-block"
          >
            <h1 className="text-6xl md:text-7xl font-heading text-[#D29C8B] mb-4 relative z-10">
              Contact Messages
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 blur-xl"></div>
          </div>
          
          {/* Decorative SVG under title */}
          <svg className="mx-auto mt-4" width="200" height="20" viewBox="0 0 200 20">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="20%" stopColor="#D29C8B" />
                <stop offset="80%" stopColor="#D29C8B" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <line x1="0" y1="10" x2="200" y2="10" stroke="url(#lineGradient)" strokeWidth="2" />
            <circle cx="50" cy="10" r="3" fill="#D29C8B" />
            <circle cx="100" cy="10" r="4" fill="#E6B8A9" />
            <circle cx="150" cy="10" r="3" fill="#D29C8B" />
          </svg>

          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed">
            Manage and review all customer inquiries and feedback in one beautifully organized space.
          </p>
        </div>

        {/* Messages Container */}
        <div className="max-w-5xl mx-auto">
          <div ref={messagesContainerRef} className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
              >
                {/* Card decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      d="M50,10 L70,30 L50,50 L30,30 Z M50,50 L70,70 L50,90 L30,70 Z"
                      fill="#D29C8B"
                    />
                  </svg>
                </div>

                {/* Message number badge */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-[#D29C8B] to-[#E6B8A9] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {index + 1}
                </div>

                {/* User icon */}
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#D29C8B] to-[#E6B8A9] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path
                        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  <div className="flex-grow">
                    {/* Name and email */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-heading text-[#D29C8B] font-bold mb-2 group-hover:text-[#B8860B] transition-colors duration-300">
                        {message.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-500">
                          <path
                            d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="text-gray-600 font-medium">{message.email}</p>
                      </div>
                    </div>

                    {/* Message content */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-l-4 border-[#D29C8B] relative">
                      <div className="absolute top-4 right-4 opacity-10">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#D29C8B">
                          <path d="M14,17H7L2,22V4A2,2 0 0,1 4,2H20A2,2 0 0,1 22,4V15A2,2 0 0,1 20,17H16L14,17Z" />
                        </svg>
                      </div>
                      <p className="text-gray-800 leading-relaxed text-lg font-medium">
                        {message.message}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover effect gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D29C8B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {messages.length === 0 && (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-[#D29C8B] to-[#E6B8A9] rounded-full flex items-center justify-center opacity-20">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path
                    d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-heading text-[#D29C8B] mb-4">No Messages Yet</h3>
              <p className="text-gray-600">When customers send messages, they'll appear here.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUsMessages;