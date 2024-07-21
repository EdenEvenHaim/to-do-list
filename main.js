const myTextarea = document.getElementById("myTextarea");
const dateTimeBox = document.getElementById("dateTimeBox");
const tasksContainer = document.getElementById("tasksContainer");

const allTasks = [];

displayTasks();

function saveTask() {
    const json = JSON.stringify(allTasks);
    localStorage.setItem("tasks", json);
}

function loadTask() {
    const json = localStorage.getItem("tasks");
    if (!json) return;
    
    const parsedJson = JSON.parse(json);
    for (const item of parsedJson) {
        allTasks.push(item)
    }
}

function add() {
    if (!validation()) return;
    // create task object
    const task = { 
        text: myTextarea.value,
        dateTime: dateTimeBox.value
    };
    
    allTasks.push(task);
    console.log(allTasks);

    clearText();
    saveTask();

    allTasks.splice(0, allTasks.length);
    displayTasks();
    myTextarea.value = dateTimeBox.value = "";
    myTextarea.focus(); 
}

function clearText() {
    myTextarea.value = "";
    dateTimeBox.value = ""; 
}

function displayTasks() {
    loadTask();

    // Clear existing cards in tasksContainer
    tasksContainer.innerHTML = "";

    const cards = allTasks.map(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "18rem";
        card.style.height = "150px";
        card.style.backgroundColor = "rgb(255, 250, 160)";
        card.innerHTML = `
            <div class="card-body">
                <button type="button" class="btn-close" aria-label="Close" onclick="deleteTask(event)"></button>
                <p class="card-text">${item.text}</p>
                <h5 class="card-title">${item.dateTime}</h5>
            </div>
        `;
        return card;
    });

    // Append all cards to tasksContainer
    cards.forEach(card => {
        tasksContainer.appendChild(card);
    });
}

function validation() {
    if (!myTextarea.value) {
        alert("Missing text");
        myTextarea.focus();
        return false;
    } 

    if (!dateTimeBox.value) {
        alert("Missing date and time");
        dateTimeBox.focus();
        return false;
    } 
    return true;
}

function deleteTask(event) {
    const index = getIndexFromElement(event.target.closest(".card"));
        allTasks.splice(index, 1); // Remove task from array
        saveTask(); // Save updated array to localStorage
        displayTasks(); // Refresh display
}
function getIndexFromElement(element) {
    const cards = tasksContainer.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        if (cards[i] === element) return i;
    }
    return -1; // Element not found
}