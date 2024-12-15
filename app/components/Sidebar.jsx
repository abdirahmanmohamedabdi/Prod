"use client";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  UsersIcon,
  CashIcon,
  XIcon,
  SpeakerphoneIcon,
  DocumentIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useUser, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Bus, HandCoins, FileStack, ChevronDown, Banknote, Wallet, Landmark } from "lucide-react";

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
      name: "Finance",
      href: "/Finance",
      icon: Landmark,
    },
    {
      name: "Payroll",
      href: "/Finance/Expenses/Payroll",
      icon: Banknote,
    },
    {
      name: "Expenses",
      href: "/Finance/Expenses",
      icon: HandCoins,
      subLinks: [
        { name: "Add Expense", href: "/Finance/Expenses/Create" },
        { name: "Manage Expenses", href: "/Finance/Expenses/Manage" },
      ],
    },
    {
      name: "Incomes",
      href: "/Finance/Incomes",
      icon: Wallet,
      subLinks: [
        { name: "Non-Operating Income ", href: "/Finance/Incomes/Non" },
        { name: "Operating Income", href: "/Finance/Incomes/Operating" },
      ],
    },
    {
      name: "Reports",
      href: "/Finance/Reports",
      icon: FileStack,
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
      icon: HandCoins,
      subLinks: [{ name: "Fees", href: "/SuperAdmin/finance/Fees" }],
    },
    {
      name: "Student Management",
      href: "/SuperAdmin/Students",
      icon: UsersIcon,
      subLinks: [
        { name: "Create", href: "/SuperAdmin/Students/Create" },
        { name: "Manage", href: "/SuperAdmin/Students/Manage" },
      ],
    },
    {
      name: "Transport",
      href: "/SuperAdmin/Transport",
      icon: Bus,
      subLinks: [
        { name: "Bus", href: "/SuperAdmin/Transport/Bus" },
        { name: "Driver", href: "/SuperAdmin/Transport/Drivers" },
        { name: "Route", href: "/SuperAdmin/Transport/Route" },
        { name: "Fuel", href: "/SuperAdmin/Transport/FuelExpenses" },
      ],
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

  const isActive = (href) => pathname === href;

  const navigation = roleBasedNavigation[userRole] || [];

  return (
    <>
      {/* Mobile Sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75" />
          </Transition.Child>
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col bg-white pb-4 shadow-xl">
                <div className="flex justify-between px-4 pt-5">
                  <img className="h-12 w-auto" src="/logo1.png" alt="Workflow" />
                  <button
                    type="button"
                    className="-mr-2 p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-5 flex-1 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <div key={item.name}>
                        <div className="flex items-center justify-between">
                          <a
                            href={item.href}
                            className={classNames(
                              isActive(item.href)
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600 hover:bg-gray-100",
                              "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            )}
                          >
                            <item.icon className="mr-3 h-6 w-6 text-gray-400" aria-hidden="true" />
                            {item.name}
                          </a>
                          {item.subLinks && (
                            <button
                              onClick={() => toggleSubLinks(item.name)}
                              className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
                              aria-expanded={expandedMenu === item.name}
                            >
                              <ChevronDownIcon
                                className={`h-4 w-4 transition-transform ${
                                  expandedMenu === item.name ? "rotate-180" : "rotate-0"
                                }`}
                              />
                            </button>
                          )}
                        </div>
                        {item.subLinks && expandedMenu === item.name && (
                          <div className="ml-8 mt-2 space-y-1">
                            {item.subLinks.map((subLink) => (
                              <a
                                key={subLink.name}
                                href={subLink.href}
                                className={classNames(
                                  isActive(subLink.href)
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-600 hover:bg-gray-100",
                                  "block px-2 py-1 text-sm font-medium rounded-md"
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-gray-50 border-r border-gray-200">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center h-16 flex-shrink-0 px-4 ">
            <img className="h-12 w-auto" src="/logo1.png" alt="Workflow" />
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between">
                    <a
                      href={item.href}
                      className={classNames(
                        isActive(item.href)
                          ? "bg-one text-white"
                          : "text-four font-font hover:bg-gray-100",
                        "group flex items-center px-2 py-2 font-font text-sm font-medium rounded-md"
                      )}
                    >
                      <item.icon className="mr-3 h-6 w-12 text-four" aria-hidden="true" />
                      {item.name}
                    </a>
                    {item.subLinks && (
                      <button
                        onClick={() => toggleSubLinks(item.name)}
                        className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
                        aria-expanded={expandedMenu === item.name}
                      >
                        <ChevronDownIcon
                          className={`h-4 w-4 transition-transform ${
                            expandedMenu === item.name ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  {item.subLinks && expandedMenu === item.name && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.subLinks.map((subLink) => (
                        <a
                          key={subLink.name}
                          href={subLink.href}
                          className={classNames(
                            isActive(subLink.href)
                              ? "bg-indigo-600 text-white"
                              : "text-gray-600 hover:bg-gray-100",
                            "block px-2 py-1 text-sm font-medium rounded-md"
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
        </div>
      </div>

      {/* Content Area */}
      <div className="md:pl-64">
        <div className="flex flex-col flex-1">
          <header className="sticky top-0 z-10 flex h-16 bg-white shadow md:hidden">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 flex justify-between items-center px-4">
              <h1 className="text-lg font-medium text-gray-900">Dashboard</h1>
              <UserButton />
            </div>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
