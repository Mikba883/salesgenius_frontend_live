import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [stickyMenu, setStickyMenu] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setStickyMenu(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  return (
    <header
      className={`fixed left-0 top-0 w-full z-9999 py-4 lg:py-0 ${
        stickyMenu
          ? 'bg-dark/70 backdrop-blur-lg shadow-sm py-3! lg:py-0! transition duration-100 before:absolute before:w-full before:h-[1px] before:bottom-0 before:left-0 before:features-row-border'
          : ''
      }`}
    >
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 md:flex md:items-center md:py-4 lg:py-0 items-center justify-between relative">
        <div className="w-full md:w-1/4 flex items-center justify-between">
          <Link to="/">
            <img src="/images/logo/logo.svg" alt="Logo" />
          </Link>

          {/* Hamburger Toggle BTN */}
          <button
            className="md:hidden block relative z-50"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            <span className="block relative cursor-pointer w-7 h-7">
              <span className="du-block absolute right-0 w-full h-full">
                <span
                  className={`block relative top-0 left-0 bg-white rounded-sm h-[2px] my-[3px] ease-in-out duration-200 ${
                    !navigationOpen ? 'w-full delay-300' : 'w-0 delay-0'
                  }`}
                ></span>
                <span
                  className={`block relative top-0 left-0 bg-white rounded-sm h-[2px] my-[3px] ease-in-out duration-200 ${
                    !navigationOpen ? 'w-full delay-400' : 'w-0 delay-150'
                  }`}
                ></span>
                <span
                  className={`block relative top-0 left-0 bg-white rounded-sm h-[2px] my-[3px] ease-in-out duration-200 ${
                    !navigationOpen ? 'w-full delay-500' : 'w-0 delay-200'
                  }`}
                ></span>
              </span>
              <span className="du-block absolute right-0 w-full h-full rotate-45">
                <span
                  className={`block bg-white rounded-sm ease-in-out duration-200 absolute left-3 top-0 w-[2px] ${
                    !navigationOpen ? 'h-0 delay-0' : 'h-full delay-300'
                  }`}
                ></span>
                <span
                  className={`block bg-white rounded-sm ease-in-out duration-200 absolute left-0 top-3 h-[2px] ${
                    !navigationOpen ? 'w-0 delay-200' : 'w-full delay-400'
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>

        <div
          className={`w-full md:w-auto md:h-auto md:visible md:flex items-center justify-end ${
            navigationOpen
              ? 'h-auto visible flex flex-col relative mt-4 p-6'
              : 'h-0 invisible'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
            <Link to="/signin" className="text-white text-sm hover:text-opacity-75 w-full md:w-auto text-center py-2">
              Sign in
            </Link>

            <Link
              to="/signup"
              className="button-border-gradient relative rounded-lg text-white text-sm flex items-center justify-center gap-1.5 py-2 px-6 shadow-button hover:button-gradient-hover hover:shadow-none w-full md:w-auto"
            >
              Sign up
              <svg
                className="mt-0.5"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4002 7.60002L9.2252 2.35002C9.0002 2.12502 8.6502 2.12502 8.4252 2.35002C8.2002 2.57502 8.2002 2.92502 8.4252 3.15002L12.6252 7.42502H2.0002C1.7002 7.42502 1.4502 7.67502 1.4502 7.97502C1.4502 8.27502 1.7002 8.55003 2.0002 8.55003H12.6752L8.4252 12.875C8.2002 13.1 8.2002 13.45 8.4252 13.675C8.5252 13.775 8.6752 13.825 8.8252 13.825C8.9752 13.825 9.1252 13.775 9.2252 13.65L14.4002 8.40002C14.6252 8.17502 14.6252 7.82503 14.4002 7.60002Z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
