import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaEnvelope, FaPhone, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Column 1: Brand & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center mb-4">
              <img 
                className="h-12 w-12 rounded-full mr-3 border-2 border-cyan-500/20" 
                src="/website-logo.avif" 
                alt="EduPath Logo" 
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                EduPath
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Empowering learners worldwide with quality courses and a seamless learning experience. Transform your career with expert-led education.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: FaFacebookF, href: "https://facebook.com", color: "hover:text-blue-600" },
                { icon: FaTwitter, href: "https://twitter.com", color: "hover:text-sky-500" },
                { icon: FaLinkedinIn, href: "https://linkedin.com", color: "hover:text-blue-700" },
                { icon: FaGithub, href: "https://github.com", color: "hover:text-gray-700 dark:hover:text-white" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 bg-white dark:bg-gray-700/50 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600/50 shadow-sm transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "All Courses", href: "/courses" },
                { name: "About Us", href: "/about-us" },
                { name: "Blog", href: "/blog" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Support
            </h3>
            <ul className="space-y-3">
              {[
                { name: "FAQs", modal: "modal_faq" },
                { name: "Contact Us", modal: "modal_contact" },
                { name: "Privacy Policy", modal: "modal_privacy" },
                { name: "Terms of Service", modal: "modal_terms" }
              ].map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={() => document.getElementById(item.modal).showModal()}
                    className="text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 flex items-center group w-full text-left"
                  >
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <FaEnvelope className="w-5 h-5 text-cyan-500 mr-3" />
                <span>support@edupath.com</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <FaPhone className="w-5 h-5 text-cyan-500 mr-3" />
                <span>+8801823461697</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <FaClock className="w-5 h-5 text-cyan-500 mr-3" />
                <span>Mon - Fri, 9AM - 6PM</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} EduPath. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
              <a href="#" className="hover:text-cyan-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-cyan-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-cyan-600 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {[
        {
          id: "modal_faq",
          title: "Frequently Asked Questions",
          content: `
            <strong>Q1: How do I access my courses?</strong><br />
            After registering, simply log in to your dashboard where all your courses will be available anytime, anywhere.<br /><br />

            <strong>Q2: What payment options are available?</strong><br />
            We accept all major credit and debit cards, PayPal, and bank transfers for your convenience.<br /><br />

            <strong>Q3: Can I get a refund if I'm not satisfied?</strong><br />
            Absolutely! We offer a hassle-free refund policy. Please check the Refund Policy page for full details.
          `
        },
        {
          id: "modal_contact",
          title: "Get in Touch",
          content: `
            We're here to help! Reach out to us through:<br /><br />
            <strong>Email:</strong> support@edupath.com<br />
            <strong>Phone:</strong> +8801823461697<br />
            <strong>Office Hours:</strong> Monday - Friday, 9 AM to 6 PM
          `
        },
        {
          id: "modal_privacy",
          title: "Privacy Policy",
          content: `
            Your privacy matters to us. We ensure your personal data is protected with the highest security standards. 
            We never share your information with third parties without consent.<br /><br />
            For full details, please visit our detailed Privacy Policy page on the website.
          `
        },
        {
          id: "modal_terms",
          title: "Terms of Service",
          content: `
            By using our platform, you agree to our terms and conditions. These terms govern your use of our services, 
            courses, and content. Please read them carefully to understand your rights and responsibilities.
          `
        }
      ].map((modal) => (
        <dialog key={modal.id} id={modal.id} className="modal">
          <form method="dialog" className="modal-backdrop backdrop-blur-sm bg-black/30">
            <button>close</button>
          </form>
          <div className="modal-box bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-2xl max-w-2xl">
            <h3 className="font-bold text-2xl mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {modal.title}
            </h3>
            <p 
              className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8"
              dangerouslySetInnerHTML={{ __html: modal.content }}
            />
            <div className="modal-action">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                Close
              </button>
            </div>
          </div>
        </dialog>
      ))}
    </footer>
  );
};

export default Footer;