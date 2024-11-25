import React, { useState, useEffect } from 'react';

const Teamer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});

  // Fetch users from an API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle Delete User
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
        console.log("Deleted user with ID:", id);
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Handle Edit User
  const handleEdit = (user) => {
    setEditingUser(user.id);
    setUpdatedUser(user);
  };

  // Save Edited User
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
        console.log("Updated User:", updatedUser);
        setEditingUser(null);
        setUpdatedUser({});
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handle Input Change for Editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">
      <h1 className="text-3xl font-semibold font-font text-gray-800 mb-6">Manage Users</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-font font-medium text-gray-600">Name</th>
              <th className="px-4 py-2 text-left font-font font-medium text-gray-600">Email</th>
              <th className="px-4 py-2 text-left font-font font-medium text-gray-600">Role</th>
              <th className="px-4 py-2 text-left font-font font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b font-font hover:bg-gray-50">
                <td className="px-4 py-2">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      name="name"
                      value={updatedUser.name}
                      onChange={handleChange}
                      className="w-full px-2 py-1 font-font border rounded-md"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingUser === user.id ? (
                    <input
                      type="email"
                      name="email"
                      value={updatedUser.email}
                      onChange={handleChange}
                      className="w-full px-2 py-1  font-font border rounded-md"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      name="role"
                      value={updatedUser.role}
                      onChange={handleChange}
                      className="w-full px-2 py-1 font-font border rounded-md"
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingUser === user.id ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-4 font-font py-2 rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-500 text-white px-4 py-2 font-font rounded-md hover:bg-blue-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-4 py-2 font-font rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Teamer;