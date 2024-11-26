"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  UilUsersAlt,
  UilFile,
  UilAngleDown,
  UilHome,
  UilCog,
  UilDollarSign,
} from "@iconscout/react-unicons";
import {
  HomeIcon,
  UserGroupIcon,
  CashIcon,
  ChartBarIcon,
  SpeakerphoneIcon,
  CogIcon,
 MicrophoneIcon,
 UsersIcon,
 DocumentIcon,
} from '@heroicons/react/outline';
// Role-based navigation configuration
const roleBasedNavigation = {
  HR: [
    
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
      href: "/Finance/Payroll",
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
    }, {
      name: "Student Management",
      href: "/SuperAdmin/Students",
      icon: CashIcon,
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children, userRole }) {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const pathname = usePathname();

  const toggleSubLinks = (itemName) => {
    setExpandedMenu(expandedMenu === itemName ? null : itemName);
  };

  const isActive = (href) => pathname.startsWith(href);

  const navigation = roleBasedNavigation[userRole] || [];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64  text-black shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-4 border-b border-gray-700">
            <img src="/logo1.png" alt="Logo" className="h-16 w-auto mx-auto" />
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <div key={item.name}>
                {/* Parent Link */}
                <div className="flex items-center">
                  <a
                    href={item.href}
                    className={classNames(
                      isActive(item.href)
                        ? "bg-one text-black"
                        : "text-black hover:bg-gray-700 hover:text-white",
                      "flex items-center px-4 py-3 rounded-lg transition-all"
                    )}
                  >
                    <item.icon className="h-6 w-8 text-black mr-3 group-hover:text-white" />
                    <span className="text-sm font-font font-medium">{item.name}</span>
                  </a>
                  {item.subLinks && (
                    <button
                      className="ml-2 text-black hover:text-black"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubLinks(item.name);
                      }}
                      aria-expanded={expandedMenu === item.name}
                    >
                      <UilAngleDown
                        className={`transition-transform ${
                          expandedMenu === item.name ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* SubLinks */}
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
                              : "text-black font-font hover:bg-gray-700 hover:text-white",
                            "block px-2 py-2 font-font text-sm font-medium rounded-md"
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

          {/* Footer Section */}
          <div className="p-4 border-t border-gray-700">
            <p className="text-xs text-center text-gray-500">
              © {new Date().getFullYear()} ShuleNet
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64  p-4">{children}</div>
    </div>
  );
}
