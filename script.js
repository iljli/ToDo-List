//***********************************************************/
const APP_NAME = "ToDoList_Group2"


//***********************************************************/
let taskList = [{
        "id_todo": 0,
        "status_todo": "placeholder", // todo; active; done; deleted; placeholder
        "task_todo": "Start your first task..."
    },
    {
        "id_todo": 10,
        "status_todo": "todo",
        "task_todo": "Task A (todo)"
    },
    {
        "id_todo": 11,
        "status_todo": "todo",
        "task_todo": "Task B (todo)"
    },
    {
        "id_todo": 12,
        "status_todo": "active",
        "task_todo": "Task C (active)"
    },
    {
        "id_todo": 13,
        "status_todo": "active",
        "task_todo": "Task D (active)"
    },
    {
        "id_todo": 14,
        "status_todo": "done",
        "task_todo": "Task E (done)"
    },
    {
        "id_todo": 15,
        "status_todo": "done",
        "task_todo": "Task F (done)"
    },
];


const buttonAddTask = document.getElementById('add-to-do');
const inputFieldMessage = document.getElementById('inputTextField');
let buttonsStart = document.getElementsByClassName('buttonStart');
let buttonsDone = document.getElementsByClassName('buttonDone');
let buttonsDelete = document.getElementsByClassName('buttonDelete');
const summaryToDo = document.getElementById('backlogcounter');
const summaryActive = document.getElementById('activecounter');
const summaryDone = document.getElementById('donecounter');


//***********************************************************/
function parseButtonStart() {
    for (let button of buttonsStart) {
        // console.log(button)
        button.addEventListener("click", eventTaksStart);
    }
}


//***********************************************************/
function parseButtonDone() {
    for (let button of buttonsDone) {
        // console.log(button)
        button.onclick = eventTaskDone;
    }
}


//***********************************************************/
function parseButtonDelete() {
    for (let button of buttonsDelete) {
        // console.log(button)
        button.onclick = eventTaskDelete;
    }
}


//***********************************************************/
const addTaskToList = (id_todo, status_todo, task_todo) => {
    const taskToAdd = {
        "id_todo": id_todo,
        "status_todo": status_todo,
        "task_todo": task_todo
    }
    taskList.push(taskToAdd);
    // console.table(taskList);
}


//***********************************************************/
const textIsNotEmpty = (text) => {
    if (!text) return false;
    let foundNotSpace = false;
    for (let i = 0; i < text.length; i++) {
        if (text[i] !== " ") {
            foundNotSpace = true;
            break;
        }
    }
    return foundNotSpace;
}


//***********************************************************/
function injectTemplateToDOM(todoid, category, todoTextMessage) {
    let domTarget = "";
    let domButton = "";
    let domTargetSub = "";
    let domButtonText = "";

    switch (category) {
        case "todo":
            domTarget = '.tasks_backlog';
            domButton = 'buttonStart';
            domTargetSub = 'tasks_backlog';
            domButtonText = 'start';
            break;
        case "active":
            domTarget = '.tasks_active';
            domButton = 'buttonDone';
            domTargetSub = 'tasks_active';
            domButtonText = 'done';
            break;
        case "done":
            domTarget = '.tasks_done';
            domButton = 'buttonDelete';
            domTargetSub = 'tasks_done';;
            domButtonText = 'delete';
            break;
        default:
            return;
            // break;
    }
    const template = `
    <div class="flexbox_column ${domTargetSub} dynamic" data-todoid="${todoid}">
    <div class="flexbox_container_content"">
        ${todoTextMessage}
        </div>
        <div class="flexbox_container_content ${domButton} clickableItem">
        ${domButtonText}
        </div>
        <!--<div class="flexbox_container_content buttonRemove clickableItem">
        done 
        </div>-->
    </div>
    `;
    document.querySelector(domTarget).lastElementChild.innerHTML += template;
}


//***********************************************************/
buttonAddTask.onclick = function () {
    console.log("Button pressed for adding task");
    if (textIsNotEmpty(inputFieldMessage.value)) {
        const todoTextMessage = inputFieldMessage.value;
        let todoid = Date.now();
        addTaskToList(todoid, "todo", todoTextMessage);
        injectTemplateToDOM(todoid, "todo", todoTextMessage);
        parseButtonStart();
        countTasks(taskList);
        console.log(`Added "${todoTextMessage}" to the Task-List`);
        localStorage.setItem(APP_NAME, JSON.stringify(taskList));
    } else {
        console.log("Textfield is empty - nothing added to Task-List");
    }
    inputFieldMessage.value = "";
}


//***********************************************************/
addPlaceholder_todoTasks = function () {
    const template = `
    <div class = "flexbox_column tasks_backlog placeholder">
    <div class="flexbox_container_content">
    Add your first task...
        </div>
        <div class="flexbox_container_content buttonStartPlaceholder">
        start
    </div>
    `;
    document.querySelector('.tasks_backlog').firstElementChild.innerHTML += template;
}


//***********************************************************/
function eventUpdateHandler(e) {
    renderRemoveToDoList(e);
    renderToDoList(taskList);
    parseButtonStart();
    parseButtonDone();
    parseButtonDelete();
    countTasks(taskList);
    localStorage.setItem(APP_NAME, JSON.stringify(taskList));
}


//***********************************************************/
function eventTaksStart(e) {
    console.log('Button "start" pressed ');
    console.log(e.target.parentElement.dataset.todoid);
    const foundItem = taskList.findIndex(index => index.id_todo == e.target.parentElement.dataset.todoid);
    console.log(`Index of found item: ${foundItem}`);
    e.target.parentElement.remove();
    taskList[foundItem].status_todo = "active";
    eventUpdateHandler(e);
}


//***********************************************************/
function eventTaskDone(e) {
    console.log('Button "done" pressed ');
    console.log(e.target.parentElement.dataset.todoid);
    const foundItem = taskList.findIndex(index => index.id_todo == e.target.parentElement.dataset.todoid);
    console.log(`Index of found item: ${foundItem}`);
    e.target.parentElement.remove();
    taskList[foundItem].status_todo = "done";
    eventUpdateHandler();
}


//***********************************************************/
function eventTaskDelete(e) {
    console.log('Button "delete" pressed ');
    console.log(e.target.parentElement.dataset.todoid);
    const foundItem = taskList.findIndex(index => index.id_todo == e.target.parentElement.dataset.todoid);
    console.log(`Index of found item: ${foundItem}`);
    e.target.parentElement.remove();
    // taskList[foundItem].status_todo = "done";
    taskList.splice(foundItem, 1);
    eventUpdateHandler();
}


//***********************************************************/
function renderToDoList(list) {
    list.forEach(item => {
        // console.log(item);
        injectTemplateToDOM(item.id_todo, item.status_todo, item.task_todo);
    })
}


//***********************************************************/
function renderRemoveToDoList(e) {
    const element = document.querySelectorAll('.dynamic');

    for (let i = 0; i < element.length; i++) {
        element[i].remove();
    }
}


//***********************************************************/
function countTasks(list) {
    let backLogCount = 0;
    let activeLogCount = 0;
    let doneLogCount = 0;

    backLogCount = list.filter(result => result.status_todo === "todo").length;
    activeLogCount = list.filter(result => result.status_todo === "active").length;
    doneLogCount = list.filter(result => result.status_todo === "done").length;
    console.log(`Backlog tasks: ${backLogCount}`);
    console.log(`Active tasks: ${activeLogCount}`);
    console.log(`Done tasks: ${doneLogCount}`);
    summaryToDo.value = backLogCount;
    summaryActive.value = activeLogCount;
    summaryDone.value = doneLogCount;
}


//***********************************************************/
function getListToLocalStorage() {
    const taskListTemp = localStorage.getItem(APP_NAME)
    
    if (taskListTemp) {
        taskList = JSON.parse(taskListTemp);
    }

}


//***********************************************************/
function init() {
    
    getListToLocalStorage();
    renderToDoList(taskList);
    parseButtonStart();
    parseButtonDone();
    parseButtonDelete();
    countTasks(taskList);
}


//***********************************************************/

init();