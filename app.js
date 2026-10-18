const taskInputElement = document.getElementById('new-task');
const addButtonElement = document.getElementsByTagName('button')[0];
const incompleteTasksListElement = document.getElementById('incompleteTasks');
const completedTasksListElement = document.getElementById('completed-tasks');

const createTaskElement = function (taskDescription) {
  const taskListItemElement = document.createElement('li');
  const taskCheckboxElement = document.createElement('input');
  const taskLabelElement = document.createElement('label');
  const taskEditInputElement = document.createElement('input');
  const taskEditButtonElement = document.createElement('button');
  const taskDeleteButtonElement = document.createElement('button');
  const taskDeleteButtonImageElement = document.createElement('img');

  taskLabelElement.textContent = taskDescription;
  taskLabelElement.className = 'task';

  taskCheckboxElement.type = 'checkbox';
  taskEditInputElement.type = 'text';
  taskEditInputElement.className = 'task';

  taskEditButtonElement.textContent = 'Edit';
  taskEditButtonElement.className = 'edit';

  taskDeleteButtonElement.className = 'delete';
  taskDeleteButtonImageElement.src = './remove.svg';
  taskDeleteButtonElement.appendChild(taskDeleteButtonImageElement);

  taskListItemElement.appendChild(taskCheckboxElement);
  taskListItemElement.appendChild(taskLabelElement);
  taskListItemElement.appendChild(taskEditInputElement);
  taskListItemElement.appendChild(taskEditButtonElement);
  taskListItemElement.appendChild(taskDeleteButtonElement);

  return taskListItemElement;
};

const addTask = function () {
  if (!taskInputElement.value) return;

  const taskListItemElement = createTaskElement(taskInputElement.value);

  incompleteTasksListElement.appendChild(taskListItemElement);
  bindTaskEvents(taskListItemElement, toggleTaskCompletion);

  taskInputElement.value = '';
};

const editTask = function () {
  const taskListItemElement = this.parentNode;

  const taskEditInputElement =
    taskListItemElement.querySelector('input[type=text]');
  const taskLabelElement = taskListItemElement.querySelector('label');
  const taskEditButtonElement = taskListItemElement.querySelector('.edit');
  const isEditMode = taskListItemElement.classList.contains('editMode');

  if (isEditMode) {
    taskLabelElement.textContent = taskEditInputElement.value;
    taskEditButtonElement.textContent = 'Edit';
  } else {
    taskEditInputElement.value = taskLabelElement.textContent;
    taskEditButtonElement.textContent = 'Save';
  }

  taskListItemElement.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskListItemElement = this.parentNode;
  const taskListElement = taskListItemElement.parentNode;

  taskListElement.removeChild(taskListItemElement);
};

const toggleTaskCompletion = function () {
  const taskListItemElement = this.parentNode;
  const isTaskIncomplete =
    taskListItemElement.parentNode === incompleteTasksListElement;
  const targetListElement = isTaskIncomplete
    ? completedTasksListElement
    : incompleteTasksListElement;

  targetListElement.appendChild(taskListItemElement);
};

addButtonElement.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItemElement, checkboxEventHandler) {
  const taskCheckboxElement = taskListItemElement.querySelector(
    'input[type=checkbox]',
  );
  const taskEditButtonElement =
    taskListItemElement.querySelector('button.edit');
  const taskDeleteButtonElement =
    taskListItemElement.querySelector('button.delete');

  taskEditButtonElement.addEventListener('click', editTask);
  taskDeleteButtonElement.addEventListener('click', deleteTask);
  taskCheckboxElement.addEventListener('change', checkboxEventHandler);
};

const taskLists = [incompleteTasksListElement, completedTasksListElement];

taskLists.forEach((taskListElement) => {
  Array.from(taskListElement.children).forEach((taskListItemElement) => {
    bindTaskEvents(taskListItemElement, toggleTaskCompletion);
  });
});
