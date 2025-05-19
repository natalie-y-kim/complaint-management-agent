import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">
        Complaint Management System
      </h1>

      <Link
        to="/submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit a Complaint
      </Link>

      <Link
        to="/admin"
        className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Go to Admin Dashboard
      </Link>
    </div>
  );
}

export default App;
