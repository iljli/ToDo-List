
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
buttonAddTask.onclick = function (e) {
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
        document.querySelector('.tasks_backlog').firstElementChild.innerHTML += template;
        console.log(`Added "${todoTextMessage}" to the Task-List`)
    } else {
        console.log("Textfield is empty - nothing added to Task-List")
    }
    inputFieldMessage.value = "";
}
