import React, { useState } from 'react';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    complaint: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.complaint) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Response JSON:", result);

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Submission failed');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', complaint: '' });
    } catch (err) {
      setError('There was a problem submitting your complaint. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Submit a Complaint</h2>

      {submitted ? (
        <div className="p-4 bg-green-100 text-green-700 rounded">
          Your complaint has been submitted successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Complaint</label>
            <textarea
              name="complaint"
              value={formData.complaint}
              onChange={handleChange}
              rows={5}
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ComplaintForm;
