import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import Sidebar from '../../components/Sidebar'; // Ensure the correct import path

const FinancePage = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role !== 'Finance') {
      router.push('/sign-in');
    }
  }, [user, isLoaded, router]);

  if (!isLoaded) {
    return <div>Loading...</div>; // or a loading spinner
  }

  if (user?.publicMetadata?.role !== 'Finance') {
    return null; // or a loading spinner
  }

  return (
    <Sidebar>
      <div>
        <h1>Finance Dashboard</h1>
        <p>Welcome, {user?.fullName}</p>
        {children}
      </div>
    </Sidebar>
  );
};

export default FinancePage;