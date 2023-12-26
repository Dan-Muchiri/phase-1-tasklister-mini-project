document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('create-task-form').addEventListener('submit', function(event) {
      event.preventDefault();

      const taskDescription = document.getElementById('new-task-description').value;
      const taskPriority = document.getElementById('priority').value;

      createTask(taskDescription, taskPriority);
  });

  function createTask(description, priority) {
      const taskList = document.getElementById('tasks');
      const newTask = document.createElement('li');
      const btn = document.createElement('button');

      btn.textContent = "x";
      btn.style.marginLeft = "3px";
      newTask.textContent = description;

      if (priority === 'high') {
          newTask.style.color = 'red';
      } else if (priority === 'medium') {
          newTask.style.color = 'orange';
      } else {
          newTask.style.color = 'green';
      }

      newTask.setAttribute('data-priority', priority);
      newTask.appendChild(btn);

      btn.addEventListener('click', function() {
          taskList.removeChild(newTask);
          updateTaskList(); 
      });

      taskList.appendChild(newTask);
      updateTaskList(); 
  }

  function updateTaskList() {
      const taskList = document.getElementById('tasks');
      const tasksArray = Array.from(taskList.children);

      tasksArray.sort((a, b) => {
          const priorityA = a.getAttribute('data-priority');
          const priorityB = b.getAttribute('data-priority');

          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[priorityB] - priorityOrder[priorityA];
      });

      taskList.innerHTML = '';
      tasksArray.forEach(task => taskList.appendChild(task));
  }
});
