"use client"
import { useState } from "react";
import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, InboxIcon, ChartBarIcon } from "@heroicons/react/outline";
import { UilHome,UilUsersAlt,UilUserCheck,UilFile   } from '@iconscout/react-unicons'
const navigation = [
  { name: "Dashboard", href: "/Hr/Dashboard", icon: UilHome },
  { name: "Staff", href: "/Hr/Staff", icon: UilUsersAlt },
  { name: "Attendance", href: "/Hr/Attendance", icon: UilUserCheck },
  { name: "Reports", href: "/Hr/Reports", icon: UilFile },
 
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="border-r border-gray-200 bg-white flex flex-col flex-grow">
          <div className="px-4 py-5">
            <img
              className="h-14 w-auto"
              src="/logo1.png"
              alt="Workflow"
            />
          </div>
          <div className="flex-grow">
            <nav className="space-y-1 px-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    window.location.pathname === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 h-6 w-6 mr-3"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <main>{children}</main>
      </div>
    </div>
  );
}
