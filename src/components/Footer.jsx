import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-100/80 text-blue-400 py-10 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Column 1: Logo & Slogan */}
        <div>
          <div className="flex items-center mt-1">
            <img className="h-12 w-12 rounded-full mr-2 border-2 border-primary" src="/website-logo.avif" alt="Logo" />
        <span className="text-2xl font-extrabold text-blue-400 tracking-wide">EduPath</span>
          </div>
      
          <p className="text-gray-600 mt-4 dark:text-white">Empowering learners with quality courses and a seamless learning experience.</p>
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
          <ul className="space-y-2 text-gray-600 dark:text-white">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/courses" className="hover:underline">Courses</a></li>
            <li><a href="/about-us" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Column 3: Support Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-gray-600 dark:text-white">

            <li className="hover:underline">
              <button className="hover:underline" onClick={() => document.getElementById('modal_faq').showModal()}>FAQs</button>
              <dialog id="modal_faq" className="modal">
                <form method="dialog" className="modal-box max-w-lg">
                  <h3 className="font-bold text-2xl mb-4 text-blue-400">Frequently Asked Questions</h3>
                  <p className="text-gray-700 leading-relaxed space-y-4 dark:text-white">
                    <strong>Q1: How do I access my courses?</strong><br />
                    After registering, simply log in to your dashboard where all your courses will be available anytime, anywhere.<br />

                    <strong>Q2: What payment options are available?</strong><br />
                    We accept all major credit and debit cards, PayPal, and bank transfers for your convenience.<br />

                    <strong>Q3: Can I get a refund if I’m not satisfied?</strong><br />
                    Absolutely! We offer a hassle-free refund policy. Please check the Refund Policy page for full details.<br />
                  </p>
                  <div className="modal-action mt-6">
                    <button className="btn bg-blue-400 text-white hover:bg-blue-500">Close</button>
                  </div>
                </form>
              </dialog></li>

            <li className="hover:underline">
              <button className="hover:underline" onClick={() => document.getElementById('modal_contact').showModal()}>Contact Us</button>
              <dialog id="modal_contact" className="modal">
                <form method="dialog" className="modal-box max-w-lg">
                  <h3 className="font-bold text-2xl mb-4 text-blue-400">Get in Touch</h3>
                  <p className="text-gray-700 leading-relaxed space-y-4 dark:text-white">
                    We’re here to help! Reach out to us through:<br />
                    <strong>Email:</strong> <a href="mailto:support@coursehub.com" className="text-blue-400 underline">support@coursehub.com</a><br />
                    <strong>Phone:</strong> +8801823461697<br />
                    <strong>Office Hours:</strong> Monday - Friday, 9 AM to 6 PM<br />
                  </p>
                  <div className="modal-action mt-6">
                    <button className="btn hover:text-white hover:bg-blue-500">Close</button>
                  </div>
                </form>
              </dialog></li>

            <li className="hover:underline">
              <button className="hover:underline" onClick={() => document.getElementById('modal_privacy').showModal()}>Privacy Policy</button>
              <dialog id="modal_privacy" className="modal">
                <form method="dialog" className="modal-box max-w-lg">
                  <h3 className="font-bold text-2xl mb-4 text-blue-400">Privacy Policy</h3>
                  <p className="text-gray-700 leading-relaxed space-y-4 dark:text-white">
                    Your privacy matters to us. We ensure your personal data is protected with the highest security standards. We never share your information with third parties without consent.<br />
                    For full details, please visit our detailed Privacy Policy page on the website.
                  </p>
                  <div className="modal-action mt-6">
                    <button className="btn hover:text-white hover:bg-blue-400">Close</button>
                  </div>
                </form>
              </dialog></li>
          </ul>
        </div>

      </div>
      <div className="text-center text-gray-500 text-sm mt-8 dark:text-white">
        &copy; {new Date().getFullYear()} CourseHub. All rights reserved.
      </div>
    </footer >
  );
};

export default Footer;
