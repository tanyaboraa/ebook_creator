import React from 'react';
import { BookOpen, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    /* Removed 'py-16' and replaced with 'pt-16 pb-12' for tighter bottom control.
       Added 'm-0' and 'mb-[-1px]' to prevent any sub-pixel white gaps. */
    <footer className="relative bg-[#020617] text-gray-400 pt-16 pb-12 overflow-hidden border-t border-gray-800/50 m-0 mb-[-1px]">
      
      {/* Brighter Purple Glow - Increased opacity and adjusted positioning */}
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-purple-600/40 rounded-full blur-[130px] pointer-events-none z-0"></div>
      
      {/* Secondary Glow for Depth */}
      <div className="absolute -top-24 -left-24 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="md:col-span-4">
            <a href="/" className="flex items-center gap-2 text-white font-bold text-xl mb-6 group">
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-2 rounded-xl shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-all">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="tracking-tight">eBook Creator</span>
            </a>
            <p className="text-sm leading-relaxed mb-8 text-gray-400 max-w-xs">
              Empowering creators to craft professional ebooks with cutting-edge AI technology.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github].map((Icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="p-3 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-purple-500/50 hover:text-white transition-all hover:-translate-y-1"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-6">Product</h3>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Templates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-6">Company</h3>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-6">Legal</h3>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Reduced padding to stay tight to the edge */}
        <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px]">
          <p>© {new Date().getFullYear()} eBook Creator. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <p className="flex items-center gap-1.5">
              Made with <span className="text-purple-500 animate-pulse">♥</span> for creators
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;