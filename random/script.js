let totalDays = 150;

function createNewCalendar() {
    let calendarName = document.getElementById('calendarName').value;
    if (calendarName === '') {
        alert('Please enter a name for the new calendar.');
        return;
    }

    let calendars = document.getElementById('calendars');

    // Create a new calendar container with a heading
    let calendarContainer = document.createElement('div');
    calendarContainer.className = 'calendar-container';
    let heading = document.createElement('h2');
    heading.textContent = calendarName;
    calendarContainer.appendChild(heading);

    // Create the initial days for this calendar
    drawDays(calendarContainer, calendarName, 1, 21);

    calendars.appendChild(calendarContainer);
}

function drawDays(container, calendarName, start, end) {
    let weekRow = document.createElement('div');
    weekRow.className = 'week';

    for (let i = start; i <= end; i++) {
        let dayDiv = document.createElement('div');
        dayDiv.className = 'day not-completed';
        dayDiv.innerHTML = i;

        let dayKey = calendarName + '-' + i;
        if (localStorage.getItem(dayKey) === 'true') {
            dayDiv.classList.remove('not-completed');
            dayDiv.classList.add('completed');
        }

        dayDiv.addEventListener('click', function() {
            if (this.classList.contains('completed')) {
                this.classList.remove('completed');
                this.classList.add('not-completed');
                localStorage.setItem(dayKey, false);
            } else {
                this.classList.add('completed');
                this.classList.remove('not-completed');
                localStorage.setItem(dayKey, true);
            }
        });

        weekRow.appendChild(dayDiv);

        // At the end of the week or the end of the total days, append the week row to the calendar
        if (i % 7 === 0 || i === end) {
            container.appendChild(weekRow);
            weekRow = document.createElement('div');
            weekRow.className = 'week';
        }
    }
}

window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        let calendarContainers = document.getElementsByClassName('calendar-container');
        for (let j = 0; j < calendarContainers.length; j++) {
            let calendarContainer = calendarContainers[j];
            let calendarName = calendarContainer.children[0].textContent;
            let currentDays = calendarContainer.getElementsByClassName('day').length;
            if (currentDays < totalDays) {
                let nextDays = Math.min(currentDays + 21, totalDays);
                drawDays(calendarContainer, calendarName, currentDays + 1, nextDays);
            }
        }
    }
};
