const buttonAddTask = document.getElementById('add-to-do');
const inputFieldMessage = document.getElementById('inputTextField');

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

        const template = `
        <div class = "flexbox_column tasks_backlog">
            <div class = "flexbox_container_content">
            ${todoTextMessage}
            </div>
            <div class = "flexbox_container_content buttonStart">
            start
            </div>
        </div>
        `;
        document.querySelector('.tasks_backlog').lastElementChild.innerHTML += template;
        console.log(`Added "${todoTextMessage}" to the Task-List`)
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
            <div class = "flexbox_container_content">
            Add your first task...
            </div>
            <div class = "flexbox_container_content buttonStartPlaceholder">
            start
            </div>
            </div>
        `;
    document.querySelector('.tasks_backlog').firstElementChild.innerHTML += template;
}

addPlaceholder_todoTasks(); // ToDo; if tasklist is empty