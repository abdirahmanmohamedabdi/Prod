"use client";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UilAngleDown, UilDollarSign, UilFile } from "@iconscout/react-unicons";
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  CashIcon,
  XIcon,
  SpeakerphoneIcon,
  DocumentIcon,
} from "@heroicons/react/outline";
import { useUser, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation"; // Ensure usePathname is imported

const roleBasedNavigation = {
  Hr: [
    {
      name: "Staff",
      href: "/Hr/Staff",
      icon: UsersIcon,
      subLinks: [
        { name: "Create Employee", href: "/Hr/Staff/Create" },
        { name: "Manage Employees", href: "/Hr/Staff/Manage" },
      ],
    },
    {
      name: "Reports",
      href: "/Hr/Reports",
      icon: DocumentIcon,
    },
  ],
  Finance: [
    {
      name: "Payroll",
      href: "/Finance/Expenses/Payroll",
      icon: UilDollarSign,
      
    },
    {
      name: "Expenses",
      href: "/Finance/Expenses",
      icon: UilDollarSign,
      subLinks: [
        { name: "Operating income", href: "/Finance/Expenses/Operating" },
        { name: "Non Operating income", href: "/Finance/Expenses/Non" },
      ],
    },
    {
      name: "Reports",
      href: "/Finance/Reports",
      icon: UilFile,
    },
  ],
  SuperAdmin: [
    {
      name: "Announcements",
      href: "/SuperAdmin/Announcements",
      icon: SpeakerphoneIcon,
    },
    {
      name: "Hr",
      href: "/SuperAdmin/hr",
      icon: UsersIcon,
      subLinks: [
        { name: "Add user", href: "/SuperAdmin/hr/Create" },
        { name: "Manage Users", href: "/SuperAdmin/hr/Manage" },
      ],
    },
    {
      name: "Finance",
      href: "/SuperAdmin/finance",
      icon: CashIcon,
      subLinks: [{ name: "Fees", href: "/SuperAdmin/finance/Fees" }],
    },
    {
      name: "Student Management",
      href: "/SuperAdmin/Students",
      icon: CashIcon,
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const [userRole, setUserRole] = useState(null);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded && user) {
      setUserRole(user.publicMetadata.role);
    }
  }, [user, isLoaded]);

  const toggleSubLinks = (itemName) => {
    setExpandedMenu(expandedMenu === itemName ? null : itemName);
  };

  const isActive = (href) => pathname.startsWith(href);

  const navigation = roleBasedNavigation[userRole] || [];

  if (!isLoaded) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <img className="h-8 w-auto" src="/logo1.png" alt="Workflow" />
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      <div className="flex items-center">
                        <a
                          href={item.href}
                          className={classNames(
                            isActive(item.href)
                              ? "bg-indigo-800 text-three"
                              : "text-one hover:bg-indigo-600",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className="mr-4 flex-shrink-0 h-6 w-6 text-three"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                        {item.subLinks && (
                          <button
                            className="ml-2 text-two hover:text-white"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleSubLinks(item.name);
                            }}
                            aria-expanded={expandedMenu === item.name}
                          >
                            <UilAngleDown
                              className={`transition-transform ${
                                expandedMenu === item.name
                                  ? "rotate-180"
                                  : "rotate-0"
                              }`}
                            />
                          </button>
                        )}
                      </div>
                      {item.subLinks &&
                        (expandedMenu === item.name || isActive(item.href)) && (
                          <div className="ml-8 mt-2 space-y-1">
                            {item.subLinks.map((subLink) => (
                              <a
                                key={subLink.name}
                                href={subLink.href}
                                className={classNames(
                                  pathname === subLink.href
                                    ? "text-indigo-600"
                                    : "text-indigo-100 hover:bg-indigo-600",
                                  "block px-2 py-2 text-sm font-medium rounded-md"
                                )}
                              >
                                {subLink.name}
                              </a>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex items-center px-4 py-4 bg-indigo-800">
                <UserButton />
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <img className="h-12 w-auto" src="/logo1.png" alt="Workflow" />
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center">
                    <a
                      href={item.href}
                      className={classNames(
                        isActive(item.href)
                          ? "bg-white text-two"
                          : "text-two hover:bg-indigo-600",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className="mr-3 flex-shrink-0 h-6 w-6 text-two"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                    {item.subLinks && (
                      <button
                        className="ml-2 text-two hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSubLinks(item.name);
                        }}
                        aria-expanded={expandedMenu === item.name}
                      >
                        <UilAngleDown
                          className={`transition-transform ${
                            expandedMenu === item.name
                              ? "rotate-180"
                              : "rotate-0"
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  {item.subLinks &&
                    (expandedMenu === item.name || isActive(item.href)) && (
                      <div className="ml-8 mt-2 space-y-1">
                        {item.subLinks.map((subLink) => (
                          <a
                            key={subLink.name}
                            href={subLink.href}
                            className={classNames(
                              pathname === subLink.href
                                ? "text-one"
                                : "text-three hover:bg-indigo-600",
                              "block px-2 py-2 text-sm font-medium rounded-md"
                            )}
                          >
                            {subLink.name}
                          </a>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex items-center px-4 py-4 bg-one">
            <UserButton />
          </div>
        </div>
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <main>
          {children}

          {/* /End replace */}
        </main>
      </div>
    </>
  );
}
