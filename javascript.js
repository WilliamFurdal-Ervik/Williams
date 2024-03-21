const taskInput = document.getElementById('task-input');
const difficultySelect = document.getElementById('difficulty-select');
const notesInput = document.getElementById('notes-input');
const dateTimeInput = document.getElementById('datetime-input');
const todoListWithDatetime = document.getElementById('todo-list-with-datetime');
const todoListWithoutDatetime = document.getElementById('todo-list-without-datetime');
const todoListFinished = document.getElementById('todo-list-finished');
let totalPoints = 0;

// function for å legge til en task
function addTask() {
    // trimmer vekk whitespaces på taskinputen 
    const taskText = taskInput.value.trim();
    const notes = notesInput.value.trim();
    const difficulty = difficultySelect.value;
    const dateTime = dateTimeInput.value;

    // dette gjør at det ikke skjer noe om the er tomt i text boksen 
    if (taskText !== '') {
        // lagger en ny li/task 
        const listItem = document.createElement('li');

        // Use an h3 element for the task name
        const taskName = document.createElement('h3');
        taskName.textContent = taskText;
        listItem.appendChild(taskName);

        // viser vansklighetsgrad på oppgaven
        const difficultySpan = document.createElement('span');
        difficultySpan.textContent = `Difficulty: ${difficulty}`;
        listItem.appendChild(difficultySpan);

        if (notes !== '') {
            const notesP = document.createElement('p');
            notesP.textContent = `Note: ${notes}`;
            listItem.appendChild(notesP);
        }

        if (dateTime !== '') {
            const dateTimeSpan = document.createElement('span');
            dateTimeSpan.textContent = `Date/time: ${dateTime}`;
            listItem.appendChild(dateTimeSpan);
        }

        // legger den nye tasken in i listen 
        if (dateTime !== '') {
            if (todoListWithDatetime) {
                todoListWithDatetime.appendChild(listItem);
            }
        } else {
            if (todoListWithoutDatetime) {
                todoListWithoutDatetime.appendChild(listItem);
            }
        }

        // lage en slett knapp
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Task';
        deleteButton.addEventListener('click', function () {
            deleteTask(listItem);
        });

        // Funksjon for å fullføre en oppgave
        const finishButton = document.createElement('button');
        finishButton.textContent = 'Finish';
        finishButton.addEventListener('click', function () {
            finishTask(listItem);
        });

        listItem.appendChild(deleteButton);
        listItem.appendChild(finishButton);

        // gjør text boksen tom igjen 
        taskInput.value = '';
        difficultySelect.value = 'easy';
        notesInput.value = '';
        dateTimeInput.value = '';
    }
}

// Funksjon for å fullføre en oppgave
function finishTask(task) {
    // Legg til poengene for fullført oppgave
    let points = 0;
    switch (task.querySelector('span').textContent.split(": ")[1]) {
        case 'easy':
            points = 1;
            break;
        case 'medium':
            points = 3;
            break;
        case 'hard':
            points = 5;
            break;
        default:
            points = 0;
    }
    totalPoints += points;

    // Fjern slett- og fullfør-knappene
    task.removeChild(task.querySelector('button')); // Delete Task button
    task.removeChild(task.querySelector('button')); // Finish button

    // Flytt oppgaven til "Finished Tasks" listen
    todoListFinished.appendChild(task);

    // Oppdaterer poengtelleren i HTML
    updatePointCounter();
}

// Funksjon for å oppdatere poengtelleren i HTML
function updatePointCounter() {
    const pointCounter = document.getElementById('point-counter');
    pointCounter.textContent = `Points: ${totalPoints}`;
}

// function for å slette task
function deleteTask(task) {
    task.parentElement.removeChild(task);
}

// venter på at enter blir trykket før addtask
taskInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
