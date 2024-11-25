"use client";

import React, { useState, useEffect } from 'react';

import Team from '@/app/components/Teamer';
import Layout from '@/app/components/Layout';
const userRole = "HR";
export default function Staff() {
  const [userRole, setUserRole] = useState('Finance'); // Set initial role to 'HR' for testing

  useEffect(() => {
    // Fetch user role from an API or another source
    const fetchUserRole = async () => {
      try {
        const response = await fetch('/api/user-role');
        const data = await response.json();
        setUserRole(data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  return (
<Layout userRole={userRole}>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Staff</h1>
        <Team/>
      </div>
    </Layout>
  );
}
