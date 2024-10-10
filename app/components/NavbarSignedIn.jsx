"use client"
import { Fragment } from 'react'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import UserIcon from '@heroicons/react/solid';
import { Popover, Transition } from '@headlessui/react'
import {
  MenuIcon,
  HeartIcon,
  ViewListIcon,
  PlusIcon,
  ShareIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Logout from './Logout';
import Link from 'next/link';

const recipes = [
  {
    name: 'Add a Recipe',
    description: 'Share some of your favourite recipes.',
    href: '#',
    icon: PlusIcon,
  },
  {
    name: 'My Recipes',
    description: 'My recipes.',
    href: '#',
    icon: ViewListIcon,
  },
  { name: 'Favourite Recipes', description: "Here are some of my favourite recipes.", href: '#', icon: HeartIcon },
  {
    name: 'Share a Recipes',
    description: "Share your favourite recipes.",
    href: '#',
    icon: ShareIcon,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavbarSignedIn() {
  const { data: session, status } = useSession();

  return (
    <div className="bg-white">
      <header>
        <Popover className="relative bg-white">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Pishipoa</span>
                <img
                  className="h-12 w-auto sm:h-10"
                  src="/logo2.png"
                  alt="Pishipoa"
                />
              </a>
            </div>
          
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 ">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            
            <Popover.Group as="nav" className="hidden md:flex space-x-10">
              <Link href="/" className="text-base font-font font-medium text-four hover:text-gray-900">
                Home
              </Link>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? 'text-four' : 'text-four',
                        'group bg-white rounded-md inline-flex items-center text-base font-font font-medium hover:text-gray-900 '
                      )}
                    >
                      <span>Recipes</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? 'text-gray-600' : 'text-gray-400',
                          'ml-2 h-5 w-5 group-hover:text-gray-500'
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

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
                        <div className="rounded-lg shadow-lg overflow-hidden">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                            {recipes.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                              >
                                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-three from-purple-600 to-indigo-600 text-white sm:h-12 sm:w-12">
                                  <item.icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div className="ml-4">
                                  <p className="text-base font-font font-medium text-three">{item.name}</p>
                                  <p className="mt-1 text-sm font-font text-gray-500">{item.description}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Link href="/Recipes" className="text-base font-font font-medium text-four hover:text-gray-900">
                Popular Recipes
              </Link>
            </Popover.Group>
           
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              {status === 'authenticated' ? (
                <>
                  <Image src={session.user.image || '/logo1.png'} alt="Profile" width={40} height={40} className="rounded" />
                  <span className="ml-2 text-base font-medium text-gray-900">{session.user.name}</span>
                  <Logout />
                </>
              ) : (
                <Link href="/api/auth/signin" className="text-base font-font font-medium text-four hover:text-gray-900">
                  Sign In
                </Link>
              )}
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
                  <div className="mt-6">
                    <nav className="grid grid-cols-1 gap-7">
                      {recipes.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-three from-purple-600 to-indigo-600 text-white">
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div className="ml-4 text-base font-medium text-gray-900">{item.name}</div>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Link href="/" className="text-base font-font font-medium text-four hover:text-gray-700">
                      Home
                    </Link>
                    <Link href="/Recipes" className="text-base font-medium font-font text-four hover:text-gray-700">
                      Popular Recipes
                    </Link>
                  </div>
                  <div className="mt-8">
                    {status === 'authenticated' ? (
                      <>
                        <Image src={session.user.image || '/logo2.png'}  alt="Profile" width={40} height={40} className="rounded-full" />
                        <span className="ml-2 text-base font-medium font-font text-gray-900">{session.user.name}</span>
                        <Logout />
                      </>
                    ) : (
                      <Link href="/api/auth/signin" className="text-base font-font font-medium text-four hover:text-gray-900">
                        Sign In
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </header>
    </div>
  )
}