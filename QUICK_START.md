# 🚀 Quick Start Guide

Get the Student Course Management System running in **3 simple steps**!

## ⚡ Super Quick Start (1 minute)

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Start everything!
npm run start:all
```

That's it! 🎉

- **JSON Server API**: http://localhost:8080
- **React App**: http://localhost:3000

## 📋 What You Need

- Node.js 16+ (Check: `node -v`)
- npm (Comes with Node.js)

**No database, no backend, no complicated setup!**

## 🎯 First Time Setup

### Step 1: Navigate to Frontend
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- React and React Router
- Ant Design UI components
- Tailwind CSS for styling
- JSON Server for mock API
- Axios for API calls
- Day.js for dates

Expected time: 1-2 minutes

### Step 3: Start the Application
```bash
npm run start:all
```

This starts:
- JSON Server on port 8080 (backend API)
- React development server on port 3000 (frontend)

Your browser will automatically open to http://localhost:3000

## ✅ Verify Everything Works

### 1. Check the Homepage
You should see:
- Welcome message with gradient background
- Two cards: "Students Management" and "Courses Management"
- Key features section at the bottom

### 2. Test Students Management
Click "Students Management" or navigate to http://localhost:3000/students

You should see:
- 4 statistics cards showing counts
- A table with 10 sample students
- Search bar and "Add New Student" button

Try:
- ✅ Click "Add New Student" to open the form
- ✅ Search for "john" in the search bar
- ✅ Click column headers to sort
- ✅ Click "Edit" on any student

### 3. Test Courses Management
Click "Courses Management" or navigate to http://localhost:3000/courses

You should see:
- 4 statistics cards
- A table with 8 sample courses
- Search bar and "Add New Course" button

Try:
- ✅ Click "Add New Course"
- ✅ Search for "computer"
- ✅ View enrollment counts (X / Capacity)

### 4. Check the API
Open http://localhost:8080/students in a new tab

You should see JSON data with all students.

Try:
- http://localhost:8080/courses
- http://localhost:8080/enrollments

## 🎨 What You Can Do

### Add a Student
1. Go to Students Management
2. Click "Add New Student"
3. Fill in all fields:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Phone: +1234567890
   - Enrollment Date: Select today
   - Status: Active
4. Click "Create"
5. New student appears in the table!

### Edit a Student
1. Click "Edit" on any student
2. Change any field
3. Click "Update"
4. Changes are saved to `db.json`

### Delete a Student
1. Click "Delete" on any student
2. Confirm the deletion
3. Student is removed

### Search & Filter
- Type in the search bar
- Results update automatically
- Works for students and courses

## 📂 Project Files

After installation, your structure looks like:

```
frontend/
├── db.json                  ← Your database (edit this!)
├── json-server.json         ← JSON Server config
├── src/
│   ├── pages/
│   │   ├── HomePage.js      ← Landing page
│   │   ├── StudentsPage.js  ← Students management
│   │   └── CoursesPage.js   ← Courses management
│   └── services/
│       ├── studentService.js ← Student API calls
│       └── courseService.js  ← Course API calls
└── package.json
```

## 🔧 Common Commands

From the `frontend/` directory:

```bash
# Start everything (recommended)
npm run start:all

# Start only React (need json-server running separately)
npm start

# Start only json-server (need React running separately)
npm run start:server

# Build for production
npm run build

# Install new package
npm install package-name
```

## 💾 Modifying Data

Edit `frontend/db.json` to:

**Add more students:**
```json
{
  "id": 11,
  "firstName": "Your",
  "lastName": "Name",
  "email": "your.email@example.com",
  "phone": "+1234567890",
  "enrollmentDate": "2024-10-19",
  "status": "Active"
}
```

**Reset to original data:**
- Copy from `backend/database.sql` (if available)
- Or delete and reinstall

**json-server automatically reloads** when you save `db.json`!

## 🐛 Troubleshooting

### Port 8080 Already in Use
```bash
# Use different port
npm run start:server -- --port 8081

# Then update src/services/api.js:
# const API_BASE_URL = 'http://localhost:8081';
```

### Port 3000 Already in Use
React will ask if you want to use port 3001. Type `y` and press Enter.

### "Command not found: npm"
Install Node.js from https://nodejs.org/

### Changes Not Showing
1. Check both terminals are running
2. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Check browser console for errors (F12)

### Data Not Loading
1. Verify json-server is running (check terminal)
2. Visit http://localhost:8080/students directly
3. Check `db.json` exists in `frontend/` folder

## 🎓 Next Steps

Now that it's running:

1. **Explore the UI** - Click around, add/edit/delete
2. **Modify Data** - Edit `db.json` to add your own data
3. **Customize Styling** - Update Tailwind classes in components
4. **Add Features** - Implement new functionality
5. **Learn the Code** - Read through the React components

## 📖 Further Reading

- `README.md` - Complete documentation
- `frontend/README.md` - Frontend specific details
- `TAILWIND_MIGRATION.md` - Tailwind CSS info

## 💡 Tips

- **Ctrl+C** in terminal to stop servers
- Changes to React files auto-reload
- Changes to `db.json` auto-reload
- Use browser DevTools (F12) to debug
- Check Network tab to see API calls

## 🎉 You're All Set!

The application is now running. Enjoy building with:
- ⚛️ React
- 🎨 Ant Design
- 🌊 Tailwind CSS
- 🔌 JSON Server

**No backend complexity. Just pure frontend development!** ✨

---

**Need help?** Check the main README.md or create an issue.

