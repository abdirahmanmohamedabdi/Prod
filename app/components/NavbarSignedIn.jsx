"use client";
import { Fragment } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { Popover, Transition } from "@headlessui/react";
import {
  MenuIcon,
  HeartIcon,
  ViewListIcon,
  PlusIcon,
  SearchIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";

const recipes = [
  {
    name: "Add a Recipe",
    description: "Share some of your favourite recipes.",
    href: "/upload",
    icon: PlusIcon,
  },
  {
    name: "Favourite Recipes",
    description: "Here are some of my favourite recipes.",
    href: "/favorites",
    icon: HeartIcon,
  },
  {
    name: "Search for a Recipe",
    description: "Share your favourite recipes.",
    href: "/Search",
    icon: SearchIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavbarSignedIn() {
  const { user } = useUser();

  return (
    <div className="bg-gray-800">
      <header>
        <Popover className="relative bg-gray-800">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Pishipoa</span>
                <img
                  className="h-12 w-auto sm:h-0"
                  src="/logo2.png"
                  alt="Pishipoa"
                />
              </a>
            </div>

            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-700">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>

            <Popover.Group as="nav" className="hidden md:flex space-x-10">
              <a
                href="/SuperAdmin"
                className="text-base font-medium text-white hover:text-gray-300"
              >
                SuperAdmin
              </a>
              <a
                href="/Hr"
                className="text-base font-medium text-white hover:text-gray-300"
              >
                HR
              </a>
              <a
                href="/Finance"
                className="text-base font-medium text-white hover:text-gray-300"
              >
                Finance
              </a>
            
         
             
            </Popover.Group>
            <UserButton />
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
              <div className="rounded-lg shadow-lg bg-gray-800 divide-y-2 divide-gray-700">
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
                      <Popover.Button className="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid grid-cols-1 gap-7">
                      {recipes.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-600 text-white">
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div className="ml-4 text-base font-medium text-gray-900">
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      href="/"
                      className="text-base font-medium text-white hover:text-gray-300"
                    >
                      Home
                    </Link>
                    <Link
                      href="/recipes"
                      className="text-base font-medium text-white hover:text-gray-300"
                    >
                      Popular Recipes
                    </Link>
                    <UserButton />
                  </div>
                  <div className="mt-8">
                    <Link
                      href="/api/auth/signin"
                      className="text-base font-medium text-white hover:text-gray-300"
                    >
                      Sign In
                    </Link>
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