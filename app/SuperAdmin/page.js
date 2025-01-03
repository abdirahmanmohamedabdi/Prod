"use client";

import {
  ClipboardListIcon,
  UserGroupIcon,
  CashIcon,
  
  ChartBarIcon,
  SpeakerphoneIcon,
  CogIcon,
} from '@heroicons/react/outline';

import { Protect } from '@clerk/nextjs'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import Sidebar from '../components/Sidebar';
import { useUser } from '@clerk/nextjs';
const actions = [
  {
    title: 'Manage Users',
    href: '/SuperAdmin/hr',
    icon: UserGroupIcon,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    title: 'View Financial Reports',
    href: '/SuperAdmin/finance',
    icon: ChartBarIcon,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    title: 'Post Announcements',
    href: '/SuperAdmin/Announcements',
    icon: SpeakerphoneIcon,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    title: 'Review Operating Incomes',
    href: '/SuperAdmin/finance',
    icon: CashIcon,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
  {
    title: 'Review Non-Operating Incomes',
    href: '/SuperAdmin/finance',
    icon: ClipboardListIcon,
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: CogIcon,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SuperAdminDashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role !== 'SuperAdmin') {
      router.push('/sign-in');
    }
  }, [user, isLoaded, router]);

  if (!isLoaded) {
    return <div>Loading...</div>; // or a loading spinner
  }

  if (user?.publicMetadata?.role !== 'SuperAdmin') {
    return null; // or a loading spinner
  }

  return (
    <Protect>
<Sidebar>
    <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
      {actions.map((action, actionIdx) => (
        <div
          key={action.title}
          className={classNames(
            actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
            actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
            actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
            actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
            'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
          )}
        >
          <div>
            <span
              className={classNames(
                action.iconBackground,
                action.iconForeground,
                'rounded-lg inline-flex p-3 ring-4 ring-white'
              )}
            >
              <action.icon className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-font font-medium">
              <a href={action.href} className="focus:outline-none">
            
                <span className="absolute inset-0" aria-hidden="true" />
                {action.title}
              </a>
            </h3>
            <p className="mt-2 text-sm font-font text-gray-500">
              Quickly manage or review {action.title.toLowerCase()} within the platform.
            </p>
          </div>
          <span
            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
        </div>
      ))}
    </div>
    </Sidebar>
    </Protect>
    
  );
}
