# Student Management System

## Project overview

This mini project is a full-stack CRUD application for managing student records. It demonstrates a React user interface, an Express.js REST API, and MongoDB Atlas persistence.

The application also includes a **demo memory store**. If `MONGODB_URI` is not configured, the project still runs locally with sample records, which makes the demonstration reliable without exposing database credentials.

## Features

- Add, view, edit, search and delete student records
- Client-side required-field validation and server-side validation
- Duplicate email protection
- Active/inactive status
- Responsive dashboard with record statistics
- MongoDB Atlas support through Mongoose
- Health endpoint for deployment checks

## Project structure

```text
StudentManagementSystem/
├── backend/
│   ├── server.js
│   ├── server.test.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── app.jsx
│   ├── index.html
│   └── styles.css
├── output-screenshots/
│   ├── campuspulse-dashboard.png
│   └── campuspulse-health.png
├── CASE_STUDY.md
└── README.md
```

## Run locally

```powershell
cd "CASE_STUDY\StudentManagementSystem\backend"
npm install
Copy-Item .env.example .env
npm start
```

Open `http://localhost:5000`.

To connect MongoDB Atlas, replace `MONGODB_URI` in `.env` with the connection string from Atlas. Never commit `.env`.

## Test

```powershell
cd "CASE_STUDY\StudentManagementSystem\backend"
npm test
```

The API can also be checked at `http://localhost:5000/api/health`.

## Deployment

### Render

Create a Web Service from the `backend` folder:

- Root directory: `CASE_STUDY/StudentManagementSystem/backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variable: `MONGODB_URI`

Render will provide a URL such as `https://student-management-system.onrender.com`.

### Vercel

The `frontend` folder is a static Vercel deployment. Import the repository, set the Root Directory to `CASE_STUDY/StudentManagementSystem/frontend`, and deploy. For a live frontend to call a separate Render backend, replace the relative `/api` URLs in `frontend/app.jsx` with the Render URL plus `/api`.

For a simple classroom demonstration, the Render URL serves both the frontend and backend from one deployment.

## Demonstration script

1. Open the dashboard and explain the three-layer architecture.
2. Add a new student and show the success message.
3. Edit the same student and refresh the page to prove persistence.
4. Search by name or course.
5. Delete the record.
6. Submit an invalid email to demonstrate validation.
7. Open `/api/health` and explain the active persistence mode.

## Evaluation evidence checklist

- Screenshot of the dashboard
- Screenshot of add-student success
- Screenshot of edit and refreshed record
- Screenshot of delete confirmation/result
- Screenshot of validation error
- Screenshot of `npm test` passing
- Deployed frontend and backend URLs
- Source code repository URL
