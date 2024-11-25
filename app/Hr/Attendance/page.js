"use client";

import Layout from "../../components/Layout";
const userRole = "HR";
export default function Attendance() {
  return (
    <Layout userRole={userRole}>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Attendance</h1>
        {/* Your page content */}
      </div>
    </Layout>
  );
}
