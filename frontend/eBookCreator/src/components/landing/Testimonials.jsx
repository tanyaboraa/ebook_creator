import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../utils/data';

const Testimonials = () => {
  return (
    <div id='testimonials' className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 font-medium text-sm mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Loved by Creators{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Everywhere
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Don't just take our word for it. Here's what our users have to say about their experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="relative group p-8 rounded-3xl bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform">
                <Quote className="w-6 h-6 fill-current" />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-6 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-purple-500 fill-current' : 'text-gray-200'}`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-8 flex-grow italic">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full opacity-20 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    className="relative w-12 h-12 rounded-full object-cover border-2 border-white"
                    src={testimonial.avatar}
                    alt={testimonial.author}
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
              
              {/* Hover Gradient Background (Optional Overlay) */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 pt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">50K+</div>
            <div className="text-gray-500 font-medium">Happy Creators</div>
          </div>

          <div className="text-center border-x border-gray-100">
            <div className="text-4xl font-bold text-gray-900 mb-2">4.9/5</div>
            <div className="text-gray-500 font-medium">Average Rating</div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">100K+</div>
            <div className="text-gray-500 font-medium">Ebooks Created</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;