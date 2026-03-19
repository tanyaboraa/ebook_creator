import { BookOpen, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="">
      {/* Subtle Background Pattern */}
      <div className="">
        <div className=""></div>
      </div>

      <div className="">
        <div className="">
          {/* Brand Section */}
          <div className="">
            <a href="/" className="">
              <div className="">
                <BookOpen className="" />
              </div>
              <span className="">eBook Creator</span>
            </a>
            <p className="">
              Create, design, and publish stunning ebooks with the power of AI.
            </p>
          </div>

          {/* Social Links */}
          <div className="">
            <a
              href="https://twitter.com"
              className=""
              aria-label="Twitter"
            >
              <Twitter className="" />
            </a>
            <a
              href="https://linkedin.com"
              className=""
              aria-label="LinkedIn"
            >
              <Linkedin className="" />
            </a>
            <a
              href="https://github.com"
              className=""
              aria-label="GitHub"
            >
              <Github className="" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;