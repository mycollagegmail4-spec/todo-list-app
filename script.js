// Local Storage Keys
const STORAGE_KEY = 'todoTasks';

// DOM Elements
const taskInput = document.getElementById('taskInput');
const deadlineInput = document.getElementById('deadlineInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const clearBtn = document.getElementById('clearBtn');
const filterButtons = document.querySelectorAll('.filter-btn');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const overdueTasksEl = document.getElementById('overdueTasks');

// Current filter state
let currentFilter = 'all';

// Task array
let tasks = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();
    updateStats();
    setupEventListeners();
    checkOverdueTasks();
    
    // Check for overdue tasks every minute
    setInterval(checkOverdueTasks, 60000);
});

// Event Listeners
function setupEventListeners() {
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    clearBtn.addEventListener('click', clearCompletedTasks);
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });
}

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();
    const deadline = deadlineInput.value;

    if (!taskText) {
        alert('Please enter a task!');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        deadline: deadline || null,
        completed: false,
        createdAt: new Date().toLocaleString()
    };

    tasks.unshift(newTask);
    saveTasks();
    renderTasks();
    updateStats();

    // Clear inputs
    taskInput.value = '';
    deadlineInput.value = '';
    taskInput.focus();
}

// Delete task
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// Clear all completed tasks
function clearCompletedTasks() {
    const completedCount = tasks.filter(t => t.completed).length;
    if (completedCount === 0) {
        alert('No completed tasks to clear!');
        return;
    }

    if (confirm(`Clear ${completedCount} completed task(s)?`)) {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// Check for overdue tasks
function checkOverdueTasks() {
    const now = new Date();
    tasks.forEach(task => {
        if (task.deadline && !task.completed) {
            const deadlineTime = new Date(task.deadline);
            if (deadlineTime < now) {
                task.isOverdue = true;
            } else {
                task.isOverdue = false;
            }
        }
    });
    renderTasks();
}

// Format deadline display
function formatDeadline(deadline) {
    if (!deadline) return null;

    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffMs = deadlineDate - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffMs < 0) {
        const passedHours = Math.floor(-diffMs / (1000 * 60 * 60));
        const passedDays = Math.floor(passedHours / 24);
        if (passedDays > 0) {
            return {
                text: `Overdue by ${passedDays} day${passedDays > 1 ? 's' : ''}`,
                status: 'overdue'
            };
        } else if (passedHours > 0) {
            return {
                text: `Overdue by ${passedHours} hour${passedHours > 1 ? 's' : ''}`,
                status: 'overdue'
            };
        } else {
            return {
                text: 'Overdue',
                status: 'overdue'
            };
        }
    }

    if (diffDays < 1 && diffHours >= 0) {
        return {
            text: `Due in ${diffHours} hour${diffHours !== 1 ? 's' : ''}`,
            status: 'warning'
        };
    } else if (diffDays === 1) {
        return {
            text: 'Due tomorrow',
            status: 'warning'
        };
    } else if (diffDays < 7) {
        return {
            text: `Due in ${diffDays} days`,
            status: 'normal'
        };
    } else {
        return {
            text: deadlineDate.toLocaleDateString(),
            status: 'normal'
        };
    }
}

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';

    // Filter tasks
    let filteredTasks = tasks;
    if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    } else if (currentFilter === 'pending') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'overdue') {
        filteredTasks = tasks.filter(t => {
            if (!t.deadline || t.completed) return false;
            return new Date(t.deadline) < new Date();
        });
    }

    // Show empty state
    if (filteredTasks.length === 0) {
        emptyState.classList.add('show');
        return;
    } else {
        emptyState.classList.remove('show');
    }

    // Render each task
    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        if (task.completed) taskElement.classList.add('completed');
        
        if (task.deadline && !task.completed && new Date(task.deadline) < new Date()) {
            taskElement.classList.add('overdue');
        }

        const deadlineInfo = task.deadline ? formatDeadline(task.deadline) : null;
        const deadlineBadge = deadlineInfo ? `<span class="deadline-badge ${deadlineInfo.status}">${deadlineInfo.text}</span>` : '';

        taskElement.innerHTML = `
            <input 
                type="checkbox" 
                class="checkbox" 
                ${task.completed ? 'checked' : ''}
                onchange="toggleTask(${task.id})"
            >
            <div class="task-content">
                <div class="task-text">${escapeHtml(task.text)}</div>
                <div class="task-meta">
                    ${deadlineBadge}
                    <span class="created-date">Created: ${task.createdAt}</span>
                </div>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;

        taskList.appendChild(taskElement);
    });
}

// Update statistics
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const overdue = tasks.filter(t => {
        if (t.completed || !t.deadline) return false;
        return new Date(t.deadline) < new Date();
    }).length;

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    overdueTasksEl.textContent = overdue;
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const saved = localStorage.getItem(STORAGE_KEY);
    tasks = saved ? JSON.parse(saved) : [];
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}