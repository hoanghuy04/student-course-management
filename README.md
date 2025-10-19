# Student Course Management System - Frontend

React application for managing students and courses with a modern, user-friendly interface.

## Technologies

- React 18.2.0
- Ant Design 5.10.3
- Tailwind CSS 3.3.5
- React Router 6.18.0
- Axios 1.6.0
- Day.js 1.11.10
- **JSON Server 0.17.4** - Mock REST API

## Prerequisites

- Node.js 16+ and npm/yarn
- **No backend required!** Uses json-server for mock API

## Installation

```bash
# Install dependencies
npm install

# Installs:
# - React and Ant Design
# - Tailwind CSS
# - json-server (mock REST API)
# - All other dependencies
```

## Running the Application

### Option 1: Run Everything at Once (Recommended)
```bash
npm run start:all
```
This command starts both the json-server API (port 8080) and React app (port 3000) simultaneously.

### Option 2: Run Separately

**Terminal 1 - Start JSON Server:**
```bash
npm run start:server
```
The mock API will be available at `http://localhost:8080`

**Terminal 2 - Start React App:**
```bash
npm start
```
The frontend will be available at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the React app in development mode
- `npm run start:server` - Runs json-server on port 8080
- `npm run start:all` - Runs both json-server and React app concurrently
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner

## Features

### Homepage
- Welcome page with navigation cards
- Quick access to Students and Courses management
- Feature highlights

### Students Management
- View all students with pagination
- Search and filter students
- Real-time statistics (Total, Active, Inactive, New This Month)
- Add new students
- Edit existing students
- Delete students with confirmation
- View student details

### Courses Management
- View all courses with pagination
- Search courses by name or code
- Real-time statistics (Total, Active, Inactive, Total Enrollments)
- Add new courses
- Edit existing courses
- Delete courses with confirmation
- View course details
- Track current enrollment vs capacity

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Layout/
│   │       ├── Header.js (Tailwind styled)
│   │       ├── Footer.js (Tailwind styled)
│   │       └── AppLayout.js (Tailwind styled)
│   ├── pages/
│   │   ├── HomePage.js (Tailwind styled)
│   │   ├── StudentsPage.js (Tailwind styled)
│   │   └── CoursesPage.js (Tailwind styled)
│   ├── services/
│   │   ├── api.js
│   │   ├── studentService.js
│   │   └── courseService.js
│   ├── App.js
│   ├── index.js
│   └── index.css (Tailwind imports)
├── db.json (JSON Server database)
├── json-server.json (JSON Server config)
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Database (db.json)

The application uses **json-server** to provide a mock REST API. The database is stored in `db.json` with the following collections:

- **students** - 10 sample students
- **courses** - 8 sample courses
- **enrollments** - 14 sample enrollments

### Sample Data Structure

**Student:**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "enrollmentDate": "2024-01-15",
  "status": "Active"
}
```

**Course:**
```json
{
  "id": 1,
  "courseName": "Introduction to Computer Science",
  "courseCode": "CS101",
  "description": "Learn the fundamentals...",
  "instructor": "Dr. Alan Turing",
  "capacity": 30,
  "startDate": "2024-09-01",
  "endDate": "2024-12-15",
  "status": "Active",
  "currentEnrollment": 4
}
```

## API Endpoints (JSON Server)

All endpoints are available at `http://localhost:8080`

### Students
- `GET /students` - Get all students
- `GET /students?q=search` - Search students
- `GET /students?_page=1&_limit=10` - Paginated students
- `GET /students/:id` - Get student by ID
- `POST /students` - Create student
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student

### Courses
- `GET /courses` - Get all courses
- `GET /courses?q=search` - Search courses
- `GET /courses?_page=1&_limit=10` - Paginated courses
- `GET /courses/:id` - Get course by ID
- `POST /courses` - Create course
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course

### Enrollments
- `GET /enrollments` - Get all enrollments

## JSON Server Features

- **Full CRUD operations** - Create, Read, Update, Delete
- **Pagination** - `?_page=1&_limit=10`
- **Sorting** - `?_sort=field&_order=asc`
- **Full-text search** - `?q=searchTerm`
- **Filtering** - `?status=Active`
- **Delay simulation** - 500ms delay for realistic API behavior

## Styling

The application uses **Tailwind CSS** for styling with Ant Design components:

### Tailwind Configuration
- Custom colors defined in `tailwind.config.js`:
  - Primary: `#1890ff`
  - Success: `#52c41a`
  - Warning: `#faad14`
  - Error: `#f5222d`
- Preflight disabled to avoid conflicts with Ant Design
- All components use Tailwind utility classes

### Ant Design Theme
- Primary Color: `#1890ff`
- Success Color: `#52c41a`
- Warning Color: `#faad14`
- Error Color: `#f5222d`

## Responsive Design

The application is fully responsive and works on:
- Desktop (1400px+)
- Tablet (768px - 1399px)
- Mobile (< 768px)

## Modifying Data

You can edit `db.json` directly to:
- Add more sample data
- Change existing records
- Reset to initial state

The json-server will automatically reload when `db.json` changes.

## Production Build

```bash
# Build the React app
npm run build

# The build folder will contain the optimized production build
# Serve it with any static server
```

**Note:** For production, you'll need to replace json-server with a real backend API.

## Troubleshooting

### Port Already in Use

If port 8080 or 3000 is already in use:

**Change json-server port:**
Edit `json-server.json` or `package.json` script:
```json
"start:server": "json-server --watch db.json --port 8081 --delay 500"
```
Then update `frontend/src/services/api.js` to use the new port.

**React will auto-suggest port 3001** if 3000 is in use.

### Data Not Showing

1. Check that json-server is running (you should see "Resources" in terminal)
2. Verify `db.json` exists in the frontend directory
3. Check browser console for errors
4. Ensure API base URL in `src/services/api.js` is correct

### Changes Not Persisting

json-server writes changes to `db.json`. If changes aren't saving:
- Check file permissions
- Ensure json-server has write access to `db.json`
- Check for json-server errors in terminal

## Advantages of JSON Server

✅ **No backend setup required** - Start coding immediately
✅ **Zero configuration** - Works out of the box
✅ **Full REST API** - Complete CRUD operations
✅ **Fast development** - Perfect for prototyping
✅ **Easy testing** - Reset data anytime by editing db.json
✅ **Real API behavior** - Pagination, search, sorting included

## Next Steps

- Add authentication/authorization
- Implement student-course enrollment UI
- Add grade management features
- Export data to PDF/Excel
- Replace json-server with real backend when ready

---

**No backend installation required! Just `npm install` and `npm run start:all`** 🚀
