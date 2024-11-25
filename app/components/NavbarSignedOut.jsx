"use client";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  MenuIcon,
  HeartIcon,
  ViewListIcon,
  PlusIcon,
  ShareIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function NavbarSignedOut() {
  return (
    <div className="bg-white">
      <header>
        <Popover className="relative bg-white">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Pishipoa</span>
                <img className="h-12 w-auto sm:h-14" src="/logo1.png" alt="" />
              </a>
            </div>

            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 ">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>

            <Popover.Group as="nav" className="hidden md:flex space-x-10">
              <a
                href="/SuperAdmin"
                className="text-base  font-font font-medium text-black hover:text-one"
              >
                SuperAdmin
              </a>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-2xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                        <div className="rounded-lg shadow-lg  overflow-hidden"></div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <a
                href="/Hr"
                className="text-base font-font font-medium text-black hover:text-one"
              >
                Hr
              </a>
              <a
                href="/Finance"
                className="text-base font-font font-medium text-black hover:text-one"
              >
                Finance
              </a>
            </Popover.Group>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <a
                href="/Login"
                className="whitespace-nowrap  font-font text-base font-medium text-black hover:text-one"
              >
                Sign in
              </a>
              <a
                href="/Signup"
                className="ml-8 whitespace-nowrap font-font inline-flex font-font items-center justify-center bg-one from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700"
              >
                Get Started
              </a>
            </div>
          </div>
          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-lg bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        className="h-12 w-auto"
                        src="/logo2.png"
                        alt="pishipoa"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6"></div>
                </div>
                <div className="py-6 px-5">
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="/"
                      className="text-base  font-font font-medium text-four hover:text-gray-700"
                    >
                      Home
                    </a>

                    <a
                      href="/Recipes"
                      className="text-base font-medium font-font text-four hover:text-gray-700"
                    >
                      About Us
                    </a>
                    <a
                      href="/Recipes"
                      className="text-base font-medium font-font text-four hover:text-gray-700"
                    >
                      Contact
                    </a>
                  </div>
                  <div className="mt-6">
                    <a
                      href="/Signup"
                      className="w-full flex items-center justify-center  bg-one font-font  to-indigo-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700"
                    >
                      Get Started
                    </a>
                    <p className="mt-6 text-center text-base font-font font-medium text-four">
                      Existing user?&nbsp;
                      <a href="/Login" className="font-font break text-one">
                        Sign in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </header>
    </div>
  );
}
