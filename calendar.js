const monthYear = document.getElementById('monthYear');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const calendarGrid = document.querySelector('.calendar-grid');

let currentDate = new Date();

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  monthYear.textContent = `${date.toLocaleString('default', { month: 'long'})} ${year}`;

  // Clear the existing days
  const days = calendarGrid.querySelectorAll('.day');
  days.forEach(day => day.remove());

  // Get the first day of the month and the number of days in the month
  const firstDay = new Date(year, month, 1).getDay();
  const numDays = new Date(year, month + 1, 0).getDate();

  // Add empty slots for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    const emptySlot = document.createElement('div');
    calendarGrid.appendChild(emptySlot);
  }

  // Add the days of the month
  for (let day = 1; day <= numDays; day++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.textContent = day;
    dayElement.addEventListener('click', () => addTask(day, month, year));
    calendarGrid.appendChild(dayElement);
  }
}

function changeMonth(offset) {
  currentDate.setMonth(currentDate.getMonth() + offset);
  renderCalendar(currentDate);
}

prevMonthButton.addEventListener('click', () => changeMonth(-1));
nextMonthButton.addEventListener('click', () => changeMonth(1));

function addTask(day, month, year) {
    const task = prompt(`Add a task for ${month + 1}/${day}/${year}:`);
    if (task) {
      // Save task to localStorage or display it on the calendar
      const taskElement = document.createElement('div');
      taskElement.textContent = task;
      taskElement.classList.add('task');
      const dayElements = calendarGrid.querySelectorAll('.day');
      const selectedDay = dayElements[day-1];
      selectedDay.appendChild(taskElement);
  
      // Save the task to localStorage (or another storage method)
      saveTask(day, month, year, task);
    }
  }
  
  function saveTask(day, month, year, task) {
    const key = `${year}-${month}-${day}`;
    const tasks = JSON.parse(localStorage.getItem(key)) || [];
    tasks.push(task);
    localStorage.setItem(key, JSON.stringify(tasks));
  }
  
  function loadTasks() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const numDays = new Date(year, month + 1, 0).getDate();
  
    for (let day = 1; day <= numDays; day++) {
      const key = `${year}-${month}-${day}`;
      const tasks = JSON.parse(localStorage.getItem(key)) || [];
      const dayElement = calendarGrid.querySelector(`.day:nth-child(${day})`);
  
      tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.textContent = task;
        taskElement.classList.add('task');
        dayElement.appendChild(taskElement);
      });
    }
  }
  
  // Call loadTasks() after rendering the calendar
  renderCalendar(currentDate);
//   loadTasks();