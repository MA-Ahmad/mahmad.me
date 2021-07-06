import React, { useState, useContext } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { WindmillContext } from "@windmill/react-ui";
import { Moon, Sun } from "../Icons/Icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { mode, toggleMode } = useContext(WindmillContext); // dark mode

  const navList = [
    { name: "Home", route: "/" },
    { name: "Blog", route: "/blog" },
    { name: "Projects", route: "/projects" },
    { name: "About", route: "/about" }
  ];

  return (
    <header className="fixed top-0 w-full shadow-lg bg-white dark:text-gray-100 text-black dark:bg-gray-700 z-20">
      <nav>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" flex items-center justify-between h-16">
            <div className="flex items-center">
              <div
                className="flex-shrink-0 cursor-pointer"
                onKeyPress={() => setIsOpen(false)}
                onClick={() => setIsOpen(false)}
                role="button"
                tabIndex={0}
              >
                <Link href="/">
                  <img
                    className="inline rounded-full w-10"
                    src="https://avatars2.githubusercontent.com/u/37842853?v=4"
                    alt="profile icon"
                  />
                </Link>
              </div>
              <div className=" hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navList.map(item => (
                    <Link
                      href={item.route}
                      key={item.name}
                      passHref
                      scroll={false}
                    >
                      <a className=" hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-900  dark:focus:bg-gray-900 px-3 py-2 rounded-md text-sm lg:text-base font-medium">
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="button"
              aria-label="dark mode"
              onClick={toggleMode}
              className="shadow hidden md:block self-center bg-white hover:bg-gray-100 focus:ring focus:ring-gray-500  dark:bg-black dark:hover:bg-gray-900 focus:outline-none rounded-md p-1.5"
            >
              {mode === "dark" ? (
                <Sun aria-hidden="true" />
              ) : (
                <Moon aria-hidden="true" />
              )}
            </button>
            <div className="-mr-2 flex md:hidden space-x-4">
              {/* <!-- Mobile menu button --> */}
              <button
                type="button"
                aria-label="dark mode"
                onClick={toggleMode}
                className="shadow block md:hidden self-center bg-white hover:bg-gray-100 focus:ring focus:ring-gray-500  dark:bg-black dark:hover:bg-gray-900 focus:outline-none rounded-md p-1.5"
              >
                {mode === "dark" ? (
                  <Sun aria-hidden="true" />
                ) : (
                  <Moon aria-hidden="true" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-200 dark:bg-gray-900 inline-flex items-center justify-center p-2 rounded-md dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-400 dark:focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          duration-300
          show={isOpen}
          enter="transition duration-300 ease-out duration-200 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition duration-300 ease-in-out duration-200 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {/* <!-- Mobile menu, show/hide based on menu state. --> */}
          {ref => (
            <div
              className="border-b dark:border-gray-600 md:hidden"
              id="mobile-menu"
            >
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navList.map(item => (
                  <div
                    key={item.name}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-hidden="true"
                  >
                    <Link href={item.route} scroll={false}>
                      <a className=" hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-900  dark:focus:bg-gray-900 block px-3 py-2 rounded-md text-sm md:text-base font-medium">
                        {item.name}
                      </a>
                    </Link>{" "}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </header>
  );
};

export default Navbar;
