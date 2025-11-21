import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative z-10 pb-17.5 lg:pb-22.5 xl:pb-27.5">
      {/* bg shapes */}
      <div className="absolute bottom-0 left-0 w-full flex flex-col gap-3 -z-1 opacity-50">
        <div className="w-full h-[1.24px] footer-bg-gradient"></div>
        <div className="w-full h-[2.47px] footer-bg-gradient"></div>
        <div className="w-full h-[3.71px] footer-bg-gradient"></div>
        <div className="w-full h-[4.99px] footer-bg-gradient"></div>
        <div className="w-full h-[6.19px] footer-bg-gradient"></div>
        <div className="w-full h-[7.42px] footer-bg-gradient"></div>
        <div className="w-full h-[8.66px] footer-bg-gradient"></div>
        <div className="w-full h-[9.90px] footer-bg-gradient"></div>
        <div className="w-full h-[13px] footer-bg-gradient"></div>
      </div>

      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 relative pt-17.5">
        <div className="w-full h-[1px] footer-divider-gradient absolute top-0 left-0"></div>

        <div className="flex flex-wrap lg:flex-nowrap justify-between items-start gap-10">
          <div className="w-full lg:w-auto">
            <Link className="mb-8.5 inline-block" to="/">
              <img src="/images/logo/logo.svg" alt="Logo" />
            </Link>

            <p className="max-w-md text-gray-400">
              Real-time AI guidance for sales professionals. Never lose a deal again.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-16 lg:gap-24">
            <div>
              <h5 className="font-semibold text-white mb-5">Products</h5>

              <ul className="flex flex-col gap-3.5">
                <li>
                  <a
                    href="/#"
                    className="font-medium ease-in duration-300 hover:text-white"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="/#"
                    className="font-medium ease-in duration-300 hover:text-white"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="/#"
                    className="font-medium ease-in duration-300 hover:text-white"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="/#"
                    className="font-medium ease-in duration-300 hover:text-white"
                  >
                    Changelog
                  </a>
                </li>
                <li>
                  <a
                    href="/#"
                    className="font-medium ease-in duration-300 hover:text-white"
                  >
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-5">Legal</h5>

              <ul className="flex flex-col gap-3.5">
                <li>
                  <Link
                    to="/privacy-policy"
                    className="font-medium ease-in duration-300 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="font-medium ease-in duration-300 hover:text-white"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-5">Support</h5>

              <ul className="flex flex-col gap-3.5">
                <li>
                  <Link
                    to="/contact"
                    className="font-medium ease-in duration-300 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
