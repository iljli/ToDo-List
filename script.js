//***********************************************************/
let taskList = [{
    "id_todo": 0,
    "status_todo": "placeholder", // todo; active; done; deleted; placeholder
    "task_todo": "Start your first task..."
}]


const buttonAddTask = document.getElementById('add-to-do');
const inputFieldMessage = document.getElementById('inputTextField');
let buttonsRemove = document.getElementsByClassName('buttonRemove');
let buttonsStart = document.getElementsByClassName('buttonStart');
// let button


//***********************************************************/
function parseButtonRemove() {
    for (let button of buttonsRemove) {
        // console.log(button)
        button.onclick = removingTask
    }
}


//***********************************************************/
function parseButtonStart() {
    let button;
    let myTest = document.querySelectorAll("div")
    for (button of buttonsStart) {
        // console.log(button)
        button.addEventListener("click", startingTask);
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
// Test if valid Text is in Textfiled
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
// Injects new task to HTML-List
//***********************************************************/
buttonAddTask.onclick = function () {
    console.log("Button pressed for adding task");
    if (textIsNotEmpty(inputFieldMessage.value)) {
        const todoTextMessage = inputFieldMessage.value;
        let todoid = Date.now();
        addTaskToList(todoid, "todo", todoTextMessage)

        const template = `
        <div class = "flexbox_column tasks_backlog" data-todoid="${todoid}">
        <div class = "flexbox_container_content"">
            ${todoTextMessage}
            </div>
            <div class = "flexbox_container_content buttonStart clickableItem" >
            start
            </div>
            <div div class = "flexbox_container_content buttonRemove clickableItem" >
            delete 
            </div>
        </div>
        `;
        document.querySelector('.tasks_backlog').lastElementChild.innerHTML += template;
        parseButtonRemove();
        parseButtonStart();
        console.log(`Added "${todoTextMessage}" to the Task-List`);
    } else {
        console.log("Textfield is empty - nothing added to Task-List")
    }
    inputFieldMessage.value = "";
}


//***********************************************************/
// Injects placeholder task to HTML-List
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

addPlaceholder_todoTasks(); // ToDo; if tasklist is empty



//***********************************************************/
function startingTask(e) {
    console.log(e.target.parentElement.dataset.todoid);
}

//***********************************************************/
function removingTask(e) {
    console.log("Button removing task pressed " + e)
}