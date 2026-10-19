const taskInputElement = document.getElementById('new-task');
const addButtonElement = document.getElementById('add-task');
const incompleteTasksListElement = document.getElementById('incomplete-tasks');
const completedTasksListElement = document.getElementById('completed-tasks');

const createTaskElement = function (taskDescription) {
  const taskListItemElement = document.createElement('li');
  const taskCheckboxElement = document.createElement('input');
  const taskLabelElement = document.createElement('label');
  const taskEditInputElement = document.createElement('input');
  const taskEditButtonElement = document.createElement('button');
  const taskDeleteButtonElement = document.createElement('button');
  const taskDeleteButtonImageElement = document.createElement('img');

  taskListItemElement.className = 'todo__item';

  taskCheckboxElement.type = 'checkbox';
  taskCheckboxElement.className = 'todo__checkbox';

  taskLabelElement.textContent = taskDescription;
  taskLabelElement.className = 'todo__label';

  taskEditInputElement.type = 'text';
  taskEditInputElement.className = 'todo__input';

  taskEditButtonElement.textContent = 'Edit';
  taskEditButtonElement.className = 'todo__button todo__button-edit';

  taskDeleteButtonElement.className = 'todo__button todo__button-delete';
  taskDeleteButtonImageElement.className = 'todo__button-delete-img';
  taskDeleteButtonImageElement.src = './remove.svg';
  taskDeleteButtonImageElement.alt = 'Delete task icon';

  taskDeleteButtonElement.appendChild(taskDeleteButtonImageElement);

  taskListItemElement.appendChild(taskCheckboxElement);
  taskListItemElement.appendChild(taskLabelElement);
  taskListItemElement.appendChild(taskEditInputElement);
  taskListItemElement.appendChild(taskEditButtonElement);
  taskListItemElement.appendChild(taskDeleteButtonElement);

  return taskListItemElement;
};

const addTask = function () {
  const taskDescription = taskInputElement.value.trim();

  if (!taskDescription) return;

  const taskListItemElement = createTaskElement(taskDescription);

  incompleteTasksListElement.appendChild(taskListItemElement);
  bindTaskEvents(taskListItemElement);

  taskInputElement.value = '';
};

const editTask = function () {
  const taskListItemElement = this.parentNode;
  const taskEditInputElement =
    taskListItemElement.querySelector('.todo__input');
  const taskLabelElement = taskListItemElement.querySelector('.todo__label');
  const taskEditButtonElement =
    taskListItemElement.querySelector('.todo__button-edit');
  const isEditMode = taskListItemElement.classList.contains(
    'todo__item--edit-mode',
  );

  if (isEditMode) {
    const taskDescription = taskEditInputElement.value.trim();

    if (!taskDescription) return;

    taskLabelElement.textContent = taskDescription;
    taskEditButtonElement.textContent = 'Edit';
  } else {
    taskEditInputElement.value = taskLabelElement.textContent;
    taskEditButtonElement.textContent = 'Save';
  }

  taskListItemElement.classList.toggle('todo__item--edit-mode');
};

const deleteTask = function () {
  const taskListItemElement = this.parentNode;

  taskListItemElement.remove();
};

const toggleTaskCompletion = function () {
  const taskListItemElement = this.parentNode;
  const isTaskIncomplete =
    taskListItemElement.parentNode === incompleteTasksListElement;
  const targetListElement = isTaskIncomplete
    ? completedTasksListElement
    : incompleteTasksListElement;

  taskListItemElement.classList.toggle(
    'todo__item--completed',
    isTaskIncomplete,
  );

  targetListElement.appendChild(taskListItemElement);
};

const bindTaskEvents = function (taskListItemElement) {
  const taskCheckboxElement =
    taskListItemElement.querySelector('.todo__checkbox');
  const taskEditButtonElement =
    taskListItemElement.querySelector('.todo__button-edit');
  const taskDeleteButtonElement = taskListItemElement.querySelector(
    '.todo__button-delete',
  );

  taskEditButtonElement.addEventListener('click', editTask);
  taskDeleteButtonElement.addEventListener('click', deleteTask);
  taskCheckboxElement.addEventListener('change', toggleTaskCompletion);
};

addButtonElement.addEventListener('click', addTask);

const taskLists = [incompleteTasksListElement, completedTasksListElement];

taskLists.forEach((taskListElement) => {
  Array.from(taskListElement.children).forEach((taskListItemElement) => {
    bindTaskEvents(taskListItemElement);
  });
});
