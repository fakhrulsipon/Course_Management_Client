import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Column 1: Logo & Slogan */}
        <div>
          <img className="h-12 w-12 rounded-full mr-2 border-2 border-primary" src="/website-logo.avif" alt="Logo" />
          <p className="text-gray-400">Empowering learners with quality courses and a seamless learning experience.</p>
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-400">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-400">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-400">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Column 2: Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/courses" className="hover:underline">Courses</a></li>
            <li><a href="/about-us" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Column 3: Support Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:underline">FAQs</li>
            <li className="hover:underline">Contact Us</li>
            <li className="hover:underline">Privacy Policy</li>
          </ul>
        </div>

      </div>
      <div className="text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} CourseHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
