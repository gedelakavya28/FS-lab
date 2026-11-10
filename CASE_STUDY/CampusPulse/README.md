# CampusPulse - Student Management System

A full-stack student records application that provides a centralized dashboard for adding, viewing, searching, editing, and deleting student information.

## Project Overview

CampusPulse is a Full-Stack Web Development case-study application built with a React frontend, a Node.js and Express backend, and MongoDB Atlas persistence.

The backend also includes a demo memory store. When `MONGODB_URI` is not configured, the application starts with sample records and remains fully usable for local demonstrations without exposing database credentials.

## Features

- Dashboard statistics for total students, active records, and courses
- Add, view, edit, search, and delete student records
- Student fields for name, email, course, year, and status
- Client-side required-field validation and server-side validation
- Email format validation and duplicate email protection
- Active and inactive student status
- Responsive layout for desktop and smaller screens
- MongoDB Atlas support through Mongoose
- Demo memory store fallback for local use
- Health endpoint for deployment checks

## Technologies Used

### Frontend

- React 18
- JavaScript
- JSX compiled in the browser with Babel Standalone
- HTML5 and CSS3

### Backend

- Node.js
- Express 5
- Mongoose 8
- REST API

### Database

- MongoDB Atlas
- In-memory demo data when MongoDB is not configured

## System Architecture

```text
             USER
               |
               v
       REACT FRONTEND
       (served by Express)
               |
          Fetch / HTTP
               |
               v
       NODE.JS + EXPRESS
               |
          Mongoose (optional)
               |
               v
        MONGODB ATLAS

       Without MONGODB_URI:
        DEMO MEMORY STORE
```

The Express server serves the frontend files and exposes the REST API. The API uses MongoDB Atlas when a connection is available; otherwise, it reads and writes to the demo memory store.

## Project Structure

```text
CampusPulse/
├── backend/
│   ├── server.js
│   ├── server.test.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env.example
├── frontend/
│   ├── app.jsx
│   ├── index.html
│   └── styles.css
├── output-screenshots/
│   ├── campuspulse-dashboard.png
│   ├── campuspulse-add-success.png
│   ├── campuspulse-edit-form.png
│   ├── campuspulse-search-results.png
│   ├── campuspulse-validation-error.png
│   └── campuspulse-health.png
├── .gitignore
└── README.md
```

## Student Data Model

| Field | Description |
|---|---|
| `_id` | MongoDB identifier, or a demo record identifier |
| `name` | Student full name |
| `email` | Student email address |
| `course` | Academic course |
| `year` | Academic year from 1 to 4 |
| `status` | `Active` or `Inactive` |
| `createdAt` | Record creation timestamp in MongoDB |
| `updatedAt` | Last update timestamp in MongoDB |

## REST API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check server status and active persistence mode |
| GET | `/api/students` | Retrieve all student records |
| POST | `/api/students` | Add a student record |
| PUT | `/api/students/:id` | Update a student record |
| DELETE | `/api/students/:id` | Delete a student record |

## Local Installation and Setup

### Prerequisites

- Node.js and npm
- Git
- A MongoDB Atlas account if persistent cloud storage is required

### 1. Install backend dependencies

From the `CampusPulse` directory:

```powershell
cd backend
npm install
```

### 2. Configure environment variables (optional)

Create `backend/.env` from the supplied example:

```powershell
Copy-Item .env.example .env
```

Set the values in `.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/student_management
```

`MONGODB_URI` is optional. If it is omitted or the connection fails, CampusPulse uses the demo memory store.

### 3. Start the application

```powershell
npm start
```

Open [http://localhost:5000](http://localhost:5000) in a browser.

For development with automatic server restarts:

```powershell
npm run dev
```

The frontend does not require a separate installation or development server. It is served directly by Express from the `frontend` folder.

## Environment Variables

| Variable | Location | Purpose |
|---|---|---|
| `PORT` | `backend/.env` | Port used by the Express server; defaults to `5000` |
| `MONGODB_URI` | `backend/.env` | MongoDB Atlas connection string |

Never commit `.env` files, database credentials, or private connection strings. The repository ignores `.env` files through `.gitignore`.

## Testing

Run the backend validation tests from the `backend` directory:

```powershell
npm test
```

The tests cover:

- A complete valid student record
- Missing required fields
- Invalid email input
- Invalid academic year input

The health endpoint can also be checked manually:

```text
http://localhost:5000/api/health
```

Example response:

```json
{
  "status": "ok",
  "database": "Demo memory store"
}
```

## Demonstration Workflow

1. Open the dashboard and explain the frontend, API, and persistence layers.
2. Add a student and show the success message.
3. Edit the same record and confirm the updated values.
4. Search by student name, email, or course.
5. Delete the record and confirm the result.
6. Submit an invalid email to demonstrate validation.
7. Open `/api/health` and explain whether MongoDB Atlas or the demo memory store is active.

## Application Screenshots

The repository includes screenshots demonstrating the main workflows:

1. [Dashboard](output-screenshots/campuspulse-dashboard.png)
2. [Add student success](output-screenshots/campuspulse-add-success.png)
3. [Edit student form](output-screenshots/campuspulse-edit-form.png)
4. [Search results](output-screenshots/campuspulse-search-results.png)
5. [Validation error](output-screenshots/campuspulse-validation-error.png)
6. [Health endpoint](output-screenshots/campuspulse-health.png)

## Deployment Configuration

### Render or another Node.js host

- Runtime: Node.js
- Root directory: `CampusPulse/backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variable: `MONGODB_URI`

Because Express serves both the API and the frontend, one backend web service is sufficient for the application. Configure the host's `PORT` value only if the platform requires it.

For a classroom demonstration without a database, deploy without `MONGODB_URI` and use the demo memory store. Demo data is reset whenever the server restarts, so MongoDB Atlas should be configured for persistent records.

## Case Study: Reliable Student Record Updates

When a student record appears not to update, use the following procedure:

1. Check the browser Network tab for the `PUT /api/students/:id` request.
2. Confirm that the request payload contains the edited values.
3. Check the response status and error message.
4. Call `GET /api/students` to verify the returned record.
5. If MongoDB is configured, verify the document in MongoDB Atlas.
6. Check `/api/health` to confirm the active persistence mode.
7. Reload the page and confirm that the frontend fetches the latest records.

This distinguishes frontend state problems from API validation, database connection, and deployment configuration issues.

## Future Enhancements

- Administrator authentication and role-based access
- Pagination for larger student datasets
- Advanced filters by course, year, and status
- Export records to CSV, Excel, or PDF
- Attendance and performance tracking
- Audit logs for record changes
- Automated API and browser tests

## Conclusion

CampusPulse demonstrates a practical full-stack CRUD workflow using React, Node.js, Express, Mongoose, and MongoDB Atlas. It includes a responsive student dashboard, RESTful operations, validation, testing, health monitoring, and a database-free fallback that makes the application easy to demonstrate locally.
