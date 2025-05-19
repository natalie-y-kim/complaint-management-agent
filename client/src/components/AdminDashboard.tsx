import React, { useEffect, useState } from 'react';

type Complaint = {
  id: string;
  name: string;
  email: string;
  complaint: string;
  status: string;
  created_at: string;
};

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Resolved'>('All');

  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://localhost:5000/complaints');
      const data = await response.json();
      setComplaints(data);
    } catch (err) {
      console.error('Error fetching complaints:', err);
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Pending' ? 'Resolved' : 'Pending';
    try {
      await fetch(`http://localhost:5000/complaints/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchComplaints(); // refresh data
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const deleteComplaint = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/complaints/${id}`, {
        method: 'DELETE',
      });
      fetchComplaints();
    } catch (err) {
      console.error('Error deleting complaint:', err);
    }
  };

  const filteredComplaints =
    filter === 'All'
      ? complaints
      : complaints.filter((c) => c.status === filter);

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="mb-4 flex items-center gap-4">
        <label className="font-medium">Filter by status:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="border px-2 py-1 rounded"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Complaint</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{c.email}</td>
              <td className="p-2 border">{c.complaint}</td>
              <td className="p-2 border">
                {new Date(c.created_at).toLocaleString()}
              </td>
              <td className="p-2 border">{c.status}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => toggleStatus(c.id, c.status)}
                >
                  Toggle Status
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => deleteComplaint(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
