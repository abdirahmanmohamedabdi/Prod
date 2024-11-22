import React from 'react'
import Team from '@/app/components/Teamer';
import Layout from '@/app/components/Layout';
export default function Staff() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Staff</h1>
        <Team/>
      </div>
    </Layout>
  );
}
