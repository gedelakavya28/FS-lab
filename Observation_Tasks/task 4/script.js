const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const emptyMessage = document.getElementById('emptyMessage');

function updateEmptyState() {
  const tasks = taskList.querySelectorAll('.task-item');
  const hasTasks = tasks.length > 0;

  taskList.style.display = hasTasks ? 'block' : 'none';
  emptyMessage.style.display = hasTasks ? 'none' : 'block';
}

function addTask(taskText) {
  const text = taskText.trim();

  if (!text) {
    taskInput.focus();
    return;
  }

  const listItem = document.createElement('li');
  listItem.className = 'task-item';

  const taskTextElement = document.createElement('span');
  taskTextElement.className = 'task-text';
  taskTextElement.textContent = text;

  const actionGroup = document.createElement('div');
  actionGroup.className = 'task-actions';

  const completeBtn = document.createElement('button');
  completeBtn.className = 'complete-btn';
  completeBtn.type = 'button';
  completeBtn.textContent = 'Complete';

  completeBtn.addEventListener('click', () => {
    listItem.classList.toggle('completed');
    taskTextElement.classList.toggle('completed-text');
    const isCompleted = listItem.classList.contains('completed');
    completeBtn.textContent = isCompleted ? 'Completed' : 'Complete';
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.type = 'button';
  deleteBtn.textContent = 'Delete';

  deleteBtn.addEventListener('click', () => {
    listItem.remove();
    updateEmptyState();
  });

  actionGroup.appendChild(completeBtn);
  actionGroup.appendChild(deleteBtn);
  listItem.appendChild(taskTextElement);
  listItem.appendChild(actionGroup);
  taskList.appendChild(listItem);

  taskInput.value = '';
  taskInput.focus();
  updateEmptyState();
}

addTaskBtn.addEventListener('click', () => {
  addTask(taskInput.value);
});

taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask(taskInput.value);
  }
});

updateEmptyState();
