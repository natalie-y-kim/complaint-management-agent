# Complaint Management System

A mini complaint management system with client and admin views, and outline a scalable system design for real-world deployment.

### Technologies Used

* Backend: Node.js + Express
* Frontend: React + TypeScript + Vite + Tailwind CSS
* Database: Supabase or PostgreSQL

## Setup and Installation

### Clone the Repository

```
git clone https://github.com/yourusername/complaint-management-system.git
cd complaint-management-system
```

### Backend Setup 

```
cd server
npm install
touch .env
```
In .env, add:
```
SUPABASE_URL=https://zbuoluewjzvmtlhthkdv.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpidW9sdWV3anp2bXRsaHRoa2R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1OTk0NzcsImV4cCI6MjA2MzE3NTQ3N30.Q5ElfyZWI75o2-0LPhF6hAz8ile15U3j6miG5M5cd0Y
```

Then start the server:
```
node index.js
```

Server will run on http://localhost:5000

### Frontend Setup

```
cd ../client
npm install
npm run dev
```
App will run on: http://localhost:5173

## Assumptions and tradeoffs

* Supabase was chosen to simplify PostgreSQL hosting and management.
* No authentication is added to the admin dashboard.
* Client-side validation is done manually without third-party libraries like Formik or Zod.
* In development, the frontend uses a hardcoded URL to connect to the Express backend. In a production setting, this would be abstracted using environment variables and `.env` files.
* Backend and frontend run on separate ports with CORS enabled for development (Vite: 5173, Express: 5000).
* Focused on clarity, usability, and functionality over full production hardening.

## What I'd Improve With More Time

* Add user authentication and role-based access for admin users
* Add pagination and search to the admin dashboard
* Add analytics (e.g., # of resolved vs. pending complaints over time)
* Deploy backend (Render) and frontend (Vercel) to demonstrate the live experience
* Add unit and integration tests using Jest and React Testing Library to ensure stability and avoid regressions
