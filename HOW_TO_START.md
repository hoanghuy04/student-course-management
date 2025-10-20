# 🚀 How to Start the Application

Multiple ways to start both JSON Server and React App with a single command!

## 📋 Quick Reference

| Method | Command | Description |
|--------|---------|-------------|
| **NPM Script** | `npm run start:all` | Recommended - colored output |
| **NPM Shortcut** | `npm run dev` | Same as start:all |
| **Windows Script** | Double-click `start-app.bat` | Windows users |
| **Mac/Linux Script** | `./start-app.sh` | Mac/Linux users |

---

## 🎯 Method 1: NPM Scripts (Recommended)

### From `frontend/` directory:

```bash
cd frontend
npm run start:all
```

**Or use the shortcut:**
```bash
npm run dev
```

### What It Does:
- ✅ Starts JSON Server on port 8080
- ✅ Starts React App on port 3000
- ✅ Shows colored output with prefixes:
  - `[API]` - JSON Server output (Blue)
  - `[APP]` - React App output (Magenta)
- ✅ Kills both when you press Ctrl+C

### Output Example:
```
[API] JSON Server is running on http://localhost:8080
[APP] webpack compiled successfully
[APP] On Your Network: http://192.168.1.100:3000
```

---

## 🖱️ Method 2: Double-Click Scripts

### Windows Users

1. **Navigate to the project root**
2. **Double-click `start-app.bat`**
3. A command window will open and start everything!

**Or** from `frontend/` directory, double-click `start.bat`

### Mac/Linux Users

1. **Make the script executable** (first time only):
   ```bash
   chmod +x start-app.sh
   ```

2. **Run the script:**
   ```bash
   ./start-app.sh
   ```

**Or** from `frontend/` directory:
```bash
chmod +x start.sh
./start.sh
```

---

## ⌨️ Method 3: Individual Commands

If you prefer to run them separately in different terminals:

### Terminal 1 - JSON Server:
```bash
cd frontend
npm run start:server
```

### Terminal 2 - React App:
```bash
cd frontend
npm start
```

---

## 🛠️ Available NPM Scripts

From the `frontend/` directory:

| Script | Command | Description |
|--------|---------|-------------|
| **start:all** | `npm run start:all` | Start both JSON Server + React |
| **dev** | `npm run dev` | Alias for start:all |
| **start** | `npm start` | Start React app only |
| **start:server** | `npm run start:server` | Start JSON Server only |
| **build** | `npm run build` | Build for production |
| **test** | `npm test` | Run tests |

---

## 📍 URLs After Starting

Once started, access the application at:

- **React App (Frontend)**: http://localhost:3000
- **JSON Server (API)**: http://localhost:8080
- **Students API**: http://localhost:8080/students
- **Courses API**: http://localhost:8080/courses
- **Enrollments API**: http://localhost:8080/enrollments

---

## 🛑 How to Stop

Press **Ctrl+C** in the terminal.

With the `start:all` script, this will automatically stop both servers.

---

## 🔧 Troubleshooting

### Port Already in Use

**Port 8080 (JSON Server):**
```bash
# Windows - Find and kill process
netstat -ano | findstr :8080
taskkill /PID <process_id> /F

# Mac/Linux - Find and kill process
lsof -ti:8080 | xargs kill -9
```

**Port 3000 (React):**
React will automatically ask if you want to use port 3001.

### Script Not Running

**Windows (.bat):**
- Right-click → "Run as Administrator"
- Check if Node.js is in PATH

**Mac/Linux (.sh):**
```bash
# Make executable
chmod +x start-app.sh

# Run
./start-app.sh
```

### Dependencies Not Installed

If you get "command not found" errors:

```bash
cd frontend
npm install
```

### JSON Server Not Starting

Make sure `db.json` exists:
```bash
# Check if file exists
ls frontend/db.json   # Mac/Linux
dir frontend\db.json  # Windows
```

---

## 💡 Tips

### Auto-Open Browser
The React app automatically opens your browser to http://localhost:3000

### Live Reload
- React auto-reloads when you edit `.js` files
- JSON Server auto-reloads when you edit `db.json`

### View All Data
Visit http://localhost:8080/db to see all data at once:
```json
{
  "students": [...],
  "courses": [...],
  "enrollments": [...]
}
```

### Custom Port
Edit `package.json` to change ports:
```json
"start:server": "json-server --watch db.json --port 8081 --delay 500"
```

Don't forget to update `src/services/api.js` too!

---

## 🎨 Enhanced Output Features

The `start:all` script includes:

- **Color-coded output**: Easy to distinguish API vs APP logs
- **Named prefixes**: `[API]` and `[APP]` labels
- **Kill-others flag**: Stops both when one fails
- **Synchronized startup**: Both start together

---

## 📱 First Time Setup

Complete setup from scratch:

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install all dependencies
npm install

# 3. Start everything
npm run start:all
```

That's it! Total time: ~2 minutes ⚡

---

## 🎯 Recommended Workflow

For daily development:

1. **Morning**: Run `npm run start:all` (or double-click script)
2. **Code**: Both servers run in background
3. **Evening**: Press Ctrl+C to stop

No need to restart unless you:
- Install new npm packages
- Change port configuration
- Encounter errors that require fresh start

---

## ✅ Success Indicators

You'll know everything is working when you see:

```
[API] JSON Server is running on http://localhost:8080
[API] Resources
[API] http://localhost:8080/students
[API] http://localhost:8080/courses
[API] http://localhost:8080/enrollments

[APP] webpack compiled successfully
[APP] Compiled successfully!
[APP] 
[APP] You can now view student-course-management-frontend in the browser.
[APP] 
[APP]   Local:            http://localhost:3000
```

And your browser automatically opens to the application!

---

**Choose your preferred method and start coding!** 🚀

