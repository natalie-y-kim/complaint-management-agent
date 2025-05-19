# Complaint Management System

A mini complaint management system with client and admin views, and outline a scalable system design for real-world deployment.

### Technologies Used

* Backend: Node.js + Express
* Frontend: React + TypeScript + Vite + Tailwind CSS
* Database: Supabase or PostgreSQL

## 🚀 Setup and Installation

### 1. Clone the Repository

```
git clone https://github.com/yourusername/complaint-management-system.git
cd complaint-management-system
```

### 2. Database Schema 

> ⚠️ **Note**: You will need to set up your own [Supabase](https://supabase.com) project and run the following SQL to create the `complaints` table:

To create the `complaints` table manually in Supabase, run the following SQL:

```sql
create table complaints (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  complaint text not null,
  status text default 'Pending',
  created_at timestamp default now()
);
```

### 3. Backend Setup 

```bash
cd server
npm install
touch .env
```

In .env, add:
```ini
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_public_key
```

Then start the server:
```bash
node index.js
```

Server will run on http://localhost:5000

### 4. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```
App will run on: http://localhost:5173

## 📐 Assumptions and tradeoffs

* Supabase was chosen to simplify PostgreSQL hosting and management.
* No authentication is added to the admin dashboard.
* Client-side validation is done manually without third-party libraries like Formik or Zod.
* In development, the frontend uses a hardcoded URL to connect to the Express backend. In a production setting, this would be abstracted using environment variables and `.env` files.
* Backend and frontend run on separate ports with CORS enabled for development (Vite: 5173, Express: 5000).
* Focused on clarity, usability, and functionality over full production hardening.

## 💡 What I'd Improve With More Time

* Add user authentication and role-based access for admin users
* Add pagination and search to the admin dashboard
* Add analytics (e.g., # of resolved vs. pending complaints over time)
* Deploy backend (Render) and frontend (Vercel) to demonstrate the live experience
* Add unit and integration tests using Jest and React Testing Library to ensure stability and avoid regressions
