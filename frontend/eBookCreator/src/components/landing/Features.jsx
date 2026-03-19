import React from "react";
// Assumes you have created this data file previously
import { FEATURES } from "../../utils/data"; 

const Features = () => {
  return (
    <div id='features' className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-violet-100 px-4 py-2 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-600"></span>
            </span>
            <span className="text-sm font-semibold text-violet-900">
              Features
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Everything You Need to
            <span className="block text-violet-600">
              Create Your Ebook
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform is packed with powerful features to help you write,
            design, and publish your ebook effortlessly.
          </p>
        </div>

        {/* --- Features Grid Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                /* NEW & UPDATED: Added hover:shadow-violet-500/30 for the purple shadow effect */
                className="group p-8 rounded-3xl bg-white border border-gray-100 
                           hover:border-violet-100 hover:shadow-2xl hover:shadow-violet-500/30 
                           hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
              >
                <div className="relative">
                  {/* Icon with Dynamic Gradient */}
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Optional: 'Learn More' section, shown on hover */}
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-semibold text-violet-600">
                      Learn more
                    </span>
                    <svg
                      className="w-4 h-4 text-violet-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;