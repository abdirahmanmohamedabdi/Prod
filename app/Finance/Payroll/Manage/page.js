"use client"

import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
const userRole = "Finance";
const testUsers = [
  { id: 1, name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
  { id: 2, name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com' },
  { id: 3, name: 'Esther Howard', title: 'Forward Response Developer', role: 'Member', email: 'esther.howard@example.com' },
  { id: 4, name: 'Jenny Wilson', title: 'Central Security Manager', role: 'Admin', email: 'jenny.wilson@example.com' },
  { id: 5, name: 'Kristin Watson', title: 'Lead Implementation Liaison', role: 'Member', email: 'kristin.watson@example.com' },
  { id: 6, name: 'Cameron Williamson', title: 'Internal Applications Engineer', role: 'Owner', email: 'cameron.williamson@example.com' },
  { id: 7, name: 'Courtney Henry', title: 'Direct Assurance Architect', role: 'Member', email: 'courtney.henry@example.com' },
  { id: 8, name: 'Leslie Alexander', title: 'Corporate Integration Specialist', role: 'Admin', email: 'leslie.alexander@example.com' },
  { id: 9, name: 'Ronald Richards', title: 'Product Functionality Consultant', role: 'Owner', email: 'ronald.richards@example.com' },
  { id: 10, name: 'Jacob Jones', title: 'Dynamic Solutions Orchestrator', role: 'Member', email: 'jacob.jones@example.com' },
];

const ManageUsersPage = () => {
  const [users, setUsers] = useState(testUsers);

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

  const deleteUser = async (userId) => {
    try {
      // Delete user from the API or database
      await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      // Remove user from the state
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Sidebar>
      <div className="flex flex-col">
      <h1 className="text-2xl font-bold font-font text-center mb-6">Manage Employees</h1>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-font font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only font-font">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, userIdx) => (
                    <tr key={user.id} className={userIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium font-font text-gray-900">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-font text-sm text-gray-500">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-font text-sm text-gray-500">{user.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-font text-sm text-gray-500">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-font text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-font text-right text-sm font-medium">
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="px-4 py-2 bg-red-500 text-white font-font font-medium rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default ManageUsersPage;

