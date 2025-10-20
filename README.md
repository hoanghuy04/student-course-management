# Student Course Management System

A comprehensive fullstack web application for managing students and courses with a modern, user-friendly interface.

## 🚀 Overview

This application provides a complete solution for educational institutions to manage their students and courses efficiently. Built with modern technologies, it offers real-time statistics, advanced search capabilities, and a responsive design that works on all devices.

**✨ No Backend Setup Required!** Uses json-server for a mock REST API - perfect for learning, prototyping, and development.

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - Modern JavaScript library for building user interfaces
- **Ant Design 5.10.3** - Enterprise-class UI design system
- **Tailwind CSS 3.3.5** - Utility-first CSS framework
- **React Router 6.18.0** - Client-side routing
- **Axios 1.6.0** - HTTP client for API calls
- **Day.js 1.11.10** - Date manipulation library

### Backend (Mock API)
- **JSON Server 0.17.4** - Full fake REST API with zero coding

## 📋 Features

### Student Management
- ✅ View all students with pagination, sorting, and filtering
- ✅ Add new students with form validation
- ✅ Edit existing student information
- ✅ Delete students with confirmation modal
- ✅ Search students by name, email, or ID
- ✅ Real-time statistics (Total, Active, Inactive, New This Month)

### Course Management
- ✅ View all courses with pagination, sorting, and filtering
- ✅ Add new courses with detailed information
- ✅ Edit existing course details
- ✅ Delete courses with confirmation
- ✅ Search courses by name or code
- ✅ Track enrollment count vs capacity
- ✅ Real-time statistics (Total, Active, Inactive, Total Enrollments)

### UI/UX Features
- ✅ Modern and intuitive interface
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states and spinners
- ✅ Success/Error notifications
- ✅ Form validation on frontend
- ✅ Empty state messages
- ✅ Confirmation dialogs for destructive actions

## 📦 Project Structure

```
student-course-management/
├── frontend/                     # React Application
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout/          # Header, Footer, AppLayout (Tailwind)
│   │   ├── pages/               # HomePage, StudentsPage, CoursesPage (Tailwind)
│   │   ├── services/            # API service layer with Axios
│   │   ├── App.js
│   │   └── index.js
│   ├── db.json                  # JSON Server database
│   ├── json-server.json         # JSON Server configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── package.json
│   └── README.md
│
├── backend/                      # (Optional - not needed with json-server)
└── README.md                     # This file
```

## 🚦 Getting Started

### Prerequisites

- **Node.js 16+** and npm
- That's it! No database or backend setup required

### Quick Start

#### Option 1: One-Command Start (Recommended)
```bash
cd frontend
npm install           # First time only
npm run start:all     # Starts both JSON Server + React
```

#### Option 2: Double-Click Script

**Windows:** Double-click `start-app.bat` in the project root

**Mac/Linux:**
```bash
chmod +x start-app.sh   # First time only
./start-app.sh
```

#### Option 3: Use the Shortcut
```bash
cd frontend
npm run dev   # Same as start:all
```

**All methods start:**
- ✅ JSON Server API on `http://localhost:8080`
- ✅ React App on `http://localhost:3000`
- ✅ Auto-opens browser to the app

**See [HOW_TO_START.md](HOW_TO_START.md) for more options!**

## 🎯 Usage

### Running Components Separately

If you prefer to run the API and frontend separately:

**Terminal 1 - JSON Server:**
```bash
cd frontend
npm run start:server
```

**Terminal 2 - React App:**
```bash
cd frontend
npm start
```

### Available Scripts

From the `frontend/` directory:

| Script | Description |
|--------|-------------|
| `npm start` | Run React app only (port 3000) |
| `npm run start:server` | Run JSON Server only (port 8080) |
| `npm run start:all` | Run both concurrently |
| `npm run build` | Build for production |

## 🗄️ Database (db.json)

The application uses **json-server** to provide a full REST API with zero coding. Data is stored in `frontend/db.json`:

### Collections

- **students** - 10 sample student records
- **courses** - 8 sample course records
- **enrollments** - 14 student-course enrollments

### Sample Data

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
  "description": "Learn the fundamentals of computer science",
  "instructor": "Dr. Alan Turing",
  "capacity": 30,
  "startDate": "2024-09-01",
  "endDate": "2024-12-15",
  "status": "Active",
  "currentEnrollment": 4
}
```

### Modifying Data

Edit `frontend/db.json` to:
- Add more sample data
- Modify existing records
- Reset to initial state

json-server automatically reloads when the file changes.

## 🔌 API Endpoints

Base URL: `http://localhost:8080`

### Students API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/students` | Get all students |
| GET | `/students?q=search` | Search students |
| GET | `/students?_page=1&_limit=10` | Paginated students |
| GET | `/students/{id}` | Get student by ID |
| POST | `/students` | Create new student |
| PUT | `/students/{id}` | Update student |
| DELETE | `/students/{id}` | Delete student |

### Courses API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courses` | Get all courses |
| GET | `/courses?q=search` | Search courses |
| GET | `/courses?_page=1&_limit=10` | Paginated courses |
| GET | `/courses/{id}` | Get course by ID |
| POST | `/courses` | Create new course |
| PUT | `/courses/{id}` | Update course |
| DELETE | `/courses/{id}` | Delete course |

### JSON Server Features

- **Pagination**: `?_page=1&_limit=10`
- **Sorting**: `?_sort=field&_order=asc`
- **Full-text search**: `?q=searchTerm`
- **Filtering**: `?status=Active`
- **Relationships**: Automatic relations between collections

## 🎨 Design Highlights

- **Styling Framework**: Tailwind CSS utility classes
  - Clean, maintainable, and consistent styling
  - No custom CSS files needed
  - All styles defined inline with utility classes

- **Color Scheme**:
  - Primary: `#1890ff` (Blue)
  - Success: `#52c41a` (Green)
  - Warning: `#faad14` (Orange)
  - Error: `#f5222d` (Red)

- **Responsive Breakpoints** (Tailwind):
  - Mobile: < 768px (sm)
  - Tablet: 768px - 1023px (md)
  - Desktop: ≥ 1024px (lg, xl)

## 🧪 Testing the API

You can test the API endpoints using:

**Browser:**
```
http://localhost:8080/students
http://localhost:8080/courses
```

**cURL:**
```bash
# Get all students
curl http://localhost:8080/students

# Get specific student
curl http://localhost:8080/students/1

# Create new student
curl -X POST http://localhost:8080/students \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","phone":"+1234567890","enrollmentDate":"2024-10-19","status":"Active"}'
```

**Postman/Insomnia:**
Import the API endpoints and test all CRUD operations.

## 📝 Sample Data Summary

The `db.json` includes:
- **10 Students** with various enrollment dates and statuses
- **8 Courses** across different subjects (CS, Web Dev, ML, etc.)
- **14 Enrollments** linking students to courses with grades

## 🔒 Security Notes

**Important:** json-server is for development and prototyping only!

For production:
- Replace json-server with a real backend (Node.js, Spring Boot, etc.)
- Add authentication and authorization
- Implement proper data validation
- Use a real database (PostgreSQL, MySQL, MongoDB, etc.)
- Add HTTPS/SSL
- Implement rate limiting

## 🚀 Production Build

To build the React app for production:

```bash
cd frontend
npm run build
```

The optimized build will be in `frontend/build/`.

Serve it with any static server:
```bash
npx serve -s build
```

## 🐛 Troubleshooting

### Port Already in Use

**JSON Server (8080):**
Edit `frontend/package.json`:
```json
"start:server": "json-server --watch db.json --port 8081 --delay 500"
```
Also update `frontend/src/services/api.js` to use the new port.

**React App (3000):**
React will auto-suggest port 3001 if 3000 is in use.

### Data Not Showing

1. Ensure json-server is running (check terminal for "Resources")
2. Verify `db.json` exists in `frontend/` directory
3. Check browser console (F12) for errors
4. Confirm API base URL in `src/services/api.js`

### Changes Not Persisting

- Check file permissions on `db.json`
- Ensure json-server has write access
- Look for errors in json-server terminal

## ✨ Advantages

✅ **Zero Backend Setup** - No database, no backend server needed
✅ **Instant Start** - Run with `npm run start:all`
✅ **Full REST API** - Complete CRUD operations included
✅ **Fast Development** - Perfect for learning and prototyping
✅ **Easy Testing** - Reset data anytime by editing db.json
✅ **Real API Behavior** - Pagination, search, sorting built-in
✅ **Modern Stack** - React, Ant Design, Tailwind CSS
✅ **Beautiful UI** - Professional, responsive design

## 📚 Documentation

- Frontend README: `frontend/README.md`
- Tailwind Migration Guide: `TAILWIND_MIGRATION.md` (if exists)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Ant Design](https://ant.design/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JSON Server](https://github.com/typicode/json-server)
- [Axios](https://axios-http.com/)

## 🙏 Acknowledgments

- React team for the amazing library
- Ant Design team for beautiful components
- Tailwind CSS for utility-first styling
- typicode for json-server
- All contributors and users

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the documentation
3. Search for similar issues
4. Create a new issue if needed

---

**Built with ❤️ using React, Ant Design, Tailwind CSS, and JSON Server**

**⚡ Zero Backend Setup - Just `npm install` and `npm run start:all`** 🚀
