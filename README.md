# To-Do List App 📝

A modern, fully-featured to-do list application with deadline tracking, local storage, and a beautiful user interface.

## Features

✨ **Core Features:**
- ✅ Add, complete, and delete tasks
- 📅 Set deadlines for each task
- 💾 Automatic local storage persistence
- 🎯 Mark tasks as completed
- 🗑️ Delete individual tasks or clear all completed tasks
- 📊 Real-time statistics (total, completed, overdue tasks)

⏰ **Deadline Management:**
- 🚨 Automatic overdue detection
- ⚠️ Warning badges for urgent deadlines
- 📍 Smart deadline display ("Due tomorrow", "Due in 3 days", etc.)
- 🔔 Visual indicators for overdue tasks (highlighted in red)
- ⏱️ Real-time countdown updates

🎨 **User Interface:**
- Modern, gradient-based design
- Responsive layout (works on mobile and desktop)
- Smooth animations and transitions
- Filter tasks by status (All, Pending, Completed, Overdue)
- Empty state messaging
- Accessibility-friendly design

## How to Use

### Getting Started
1. Open `index.html` in your web browser
2. The app will automatically load any previously saved tasks

### Adding Tasks
1. Enter a task name in the "Add a new task..." field
2. (Optional) Set a deadline using the date/time picker
3. Click "Add Task" or press Enter

### Managing Tasks
- **Complete a task:** Check the checkbox next to the task
- **Delete a task:** Click the "Delete" button
- **Filter tasks:** Use the filter buttons to view All, Pending, Completed, or Overdue tasks
- **Clear completed:** Click "Clear All Completed Tasks" to remove all finished tasks at once

### Deadline Features
- Tasks show smart deadline labels:
  - "Due in 2 hours" - warning (less than 24 hours)
  - "Due tomorrow" - warning
  - "Due in 5 days" - normal
  - "Overdue by 2 days" - overdue (red background)
- Overdue tasks are automatically highlighted
- Stats panel shows the number of overdue tasks

## Technical Details

### Technologies Used
- **HTML5** - Structure
- **CSS3** - Styling with gradients and animations
- **Vanilla JavaScript** - No dependencies needed
- **Local Storage API** - For data persistence

### File Structure
```
todo-list-app/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # JavaScript functionality
└── README.md       # Documentation
```

### Local Storage
- Tasks are automatically saved to browser's local storage
- Data persists even after closing the browser
- Each browser/device has its own separate task list
- Clear browser data to reset all tasks

## Features Breakdown

### Task Management
- Add tasks with optional deadlines
- Mark tasks as complete/incomplete
- Delete individual tasks
- Bulk clear completed tasks

### Deadline System
- Set deadline for any task
- Automatic overdue detection
- Smart time formatting
- Visual status indicators:
  - 🟢 Normal (7+ days away)
  - 🟡 Warning (less than 24 hours)
  - 🔴 Overdue (past deadline)

### Statistics Dashboard
- Total tasks count
- Completed tasks count
- Overdue tasks count
- Real-time updates

### Filtering System
- **All** - Show all tasks
- **Pending** - Show only incomplete tasks
- **Completed** - Show only finished tasks
- **Overdue** - Show only overdue tasks

## Browser Compatibility
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Works on mobile browsers

## Future Enhancement Ideas
- Categories/tags for tasks
- Priority levels (High, Medium, Low)
- Recurring tasks
- Task notes/descriptions
- Cloud sync
- Dark mode
- Export/import functionality
- Task editing
- Due time notifications

## License
Free to use and modify for personal or educational purposes.

## Author
Created as a modern to-do list application with deadline tracking.
