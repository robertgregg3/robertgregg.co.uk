/*
Todo:
    1) event listeners - consolodate
    2) ADD A "REMOVE COMPLETED BUTTON"
    3) Drag not working on mobile
    4) three dots options for todos and subtasks
    5) close button permanently there on mobile
    6) Sort issues with safari

Tests: 
    1) completed both side bar and main el - same after LS
    2) drag and drop - same after LS
    3) content editable.  - same after LS


when form posts: 
    1) add todo to the window. 
    2) Add to local storage 
*/

// TODO: add a favorite star icon and add a view favorites button

const form                = document.getElementById('form');
const input               = document.getElementById('item');
const todosContainer      = document.getElementById('todos-container');
const todosUl             = document.getElementById('todos-ul');
const countTotalTodos     = document.getElementById('count-total-todos');
const countRemainingTodos = document.getElementById('count-remaining-todos');
const countCompletedTodos = document.getElementById('count-completed-todos');
const toolbar             = document.getElementById('toolbar');
// const todosFromLS         = JSON.parse(localStorage.getItem('todos'));
let todosFromLS         = JSON.parse(localStorage.getItem('todos'));

// when there are no todos the toolbar is hidden
toolbar.classList.add('hidden');

// if there are todos in LS then add todos and the text input is el.
if(todosFromLS) {
    todosFromLS.forEach(el => {
        addTodo(el);
        toolbarButtons();
    });
} 

// when you add a todo, perform these actions
form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    addTodo();
    updateLS();
    countTodos();
    toolbarButtons();
    dragItems();
});

//  add the todo, and if a todo already exists then us the value from local storage as the input.value
function addTodo(el){
    toolbar.classList.remove('hidden');
    
    let todoText = input.value; 
    
    if(el){  
        todoText = el.text; 
    }
    
    if(todoText) {  
        // create the todo item with a li
        const todoItem = document.createElement('li');  
        
        todoItem.classList.add('todo-item', 'draggable', 'todo-item-height'); 
        todoItem.setAttribute('draggable', 'true');
        todoItem.innerHTML = ` 
            <input type="checkbox" class="spring"/>
            <span class="input-text" contenteditable="true">${todoText}</span>
            <i class="fas fa-times close-todo close-hidden"></i><i class="fas fa-level-down-alt expand-todo"></i>
            <span class="date-text"></span>
            <div class="todo-extend-div">
                <div class="extended-todo-item sub-task-items">
                    <span class="sub-task-item-input" contenteditable="true" data-text="+ Add a subtask"></span>
                </div>
                <div class="extended-todo-item sb-todo-date">
                    <input type="date" class="date" name="date" />
                </div>
                <ul class="subtasks">
                </ul>
            </div>
        `; 
        
        // append the li to the ul
        todosUl.appendChild(todoItem);

         // remove the new line when enter is pressed on the main todo element
         const toDoInputText = todoItem.querySelector('.input-text');

         todosUl.addEventListener('keypress', (e) => {
             if (e.code === 'Enter' || e.keyCode === 13) {
                 e.preventDefault();
                 toDoInputText.setAttribute('contenteditable', 'false');
                 toDoInputText.setAttribute('contenteditable', 'true');
                 updateLS();
               }
         });
                
        // add a due date picker
        let dueDate   = todoItem.querySelector('.extended-todo-item input');
        let dateText  = todoItem.querySelector('.date-text');
        let months    = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        if(el && el.duedate) {
            dateText.innerText  = el.duedate;
        }
        
        dueDate.addEventListener('change', () => {
            let inputDate = dueDate.value;
            let inputtedDate = new Date(inputDate);
            dateText.innerText = 'Due: ' + inputtedDate.getDate() + '-' + months[inputtedDate.getMonth()] + '-' + inputtedDate.getFullYear();
            updateLS();
        });

        // close todo button
        const closeTodoBtn = todoItem.querySelector('.close-todo');
        todoItem.addEventListener('mouseover', () => {closeTodoBtn.classList.remove('close-hidden');});
        todoItem.addEventListener('mouseout',  () => {closeTodoBtn.classList.add('close-hidden');});

        closeTodoBtn.addEventListener('click', () => {
            todoItem.remove();
            updateLS();
        });      

        // show the Extendable div
        const todoExtendingDiv = todoItem.querySelector('.todo-extend-div');     
        const expandTodoBtn    = todoItem.querySelector('.expand-todo');

        expandTodoBtn.addEventListener('click', () => {
            todoItem.classList[todoItem.classList.contains('todo-item-height') ? 'remove' : 'add']('todo-item-height');
            todoExtendingDiv.classList[todoExtendingDiv.classList.contains('height-100') ? 'remove' : 'add']('height-100');
            expandTodoBtn.classList[expandTodoBtn.classList.contains('expand-todo--rotate') ? 'remove' : 'add']('expand-todo--rotate');
        });

        // add subtasks
        const subtaskInput = todoItem.querySelector('.sub-task-item-input');
        
        let subtaskInputClicked = false; // variable used to enable the subtasks after a page reloads
        subtaskInput.addEventListener('keypress', (e) => {
            if (e.code === 'Enter' || e.keyCode === 13) {
                subtaskInputClicked = true;
                e.preventDefault();
                subtaskInput.setAttribute('contenteditable', 'false');
                subtaskInput.setAttribute('contenteditable', 'true');
                addSubtask(subtaskInputClicked);
                subtaskInputClicked = false;
                updateLS();
            }
        }); 

        const subtaskContainer = todoItem.querySelector('.subtasks')

        if(el && el.subTasks){
              el.subTasks.forEach(subtask=> {
                addSubtask(subtask);
              });
            }

        function addSubtask(subtask){
            const subtaskEl = document.createElement('li');
            let subtaskText = subtaskInput.innerText;

            if(el && el.subTasks && !subtaskInputClicked){ // the ! is for when the page loads and then you add a new subtask
                subtaskText = subtask;
            }
            subtaskEl.classList.add('sub-task-item-li');
            
            subtaskEl.innerHTML = `
                <input type="checkbox" />
                <span class="subtask-text">${subtaskText}</span>
            `;
   
            subtaskInput.innerText = '';

            subtaskContainer.appendChild(subtaskEl);
            updateSubtasks();
            updateLS();
        }        
        
        // completing/un-completing a todo
        const todoInputText    = todoItem.querySelector('.input-text');
        const todoItemCheckbox = todoItem.querySelector('input');
        
        if(el && el.completed) {
            todoItemCheckbox.checked = true;
            todoInputText.classList.add('completed');  // then add the completed class 
            updateLS();
        }
        
        todoItemCheckbox.addEventListener('click', () => {
            todoInputText.classList[todoInputText.classList.contains('completed') ? 'remove' : 'add']('completed');
            updateLS();
            countTodos();
            toolbarButtons();
        });     
        
        countTodos();
        updateLS();
        input.value ='';
    }
}

function updateLS() {
    const todosEls = document.querySelectorAll('.todo-item');    
    
    const todos = [];

    todosEls.forEach(todoEl => {
        const todoTexts        = todoEl.querySelector('.input-text');
        const todoDate         = todoEl.querySelector('.date-text'); 
        const subtaskEls       = todoEl.querySelectorAll('.sub-task-item-li'); 
        
        let subTasks = [];
            
        if(subtaskEls) {
            const subTasksElements = [...subtaskEls];
            subTasks = subTasksElements.map((el) => el.innerText);
        }
        
        todos.push({
            text: todoTexts.innerText,
            completed: todoTexts.classList.contains('completed'),
            duedate: todoDate.innerText,
            subTasks: subTasks
        });
     });

    localStorage.setItem('todos', JSON.stringify(todos));
    countTodos();
}

function updateSubtasks(){
    const totalSubtasks = document.querySelectorAll('.sub-task-item-li');

    totalSubtasks.forEach(subtaskItem => {
        const subtaskCheckbox  = subtaskItem.querySelector('input');
        const subtaskInputText = subtaskItem.querySelector('.subtask-text');

        subtaskCheckbox.addEventListener('click', () => {
            subtaskInputText.classList[subtaskInputText.classList.contains('completed') ? 'remove' : 'add']('completed');
            subtaskItem.remove();
            updateLS();
        });
    });
}

updateSubtasks();

function countTodos() {
    const totalTodos     = document.querySelectorAll('.todo-item');
    const toDoInputTexts = document.querySelectorAll('.input-text');
   
    let sum = totalTodos.length;

    toDoInputTexts.forEach(toDoInputText => {
        if(toDoInputText.classList.contains('completed')){
            sum--;
        }
        return sum;
    });

    countTotalTodos.innerHTML     = `All items: ${totalTodos.length} <br /><button id="show-all">Show</button>`;
    countRemainingTodos.innerHTML = `remaining: ${sum}<br /><button id="show-remaining">Show</button>`;
    countCompletedTodos.innerHTML = `completed: ${totalTodos.length - sum}<br />
        <button id="show-completed">Show</button>
        <button id="delete-completed">Delete</button>
    `;
}

function toolbarButtons(){
    const totalTodos         = document.querySelectorAll('.input-text');
    const showAllBtn         = document.querySelector('#show-all');
    const showRemainingBtn   = document.querySelector('#show-remaining');
    const showCompletedBtn   = document.querySelector('#show-completed');
    const deleteCompletedBtn = document.querySelector('#delete-completed');

    showAllBtn.addEventListener('click', () => {
        totalTodos.forEach(totalTodo => {
            totalTodo.parentNode.classList.remove('hidden');
        });
    });

    showRemainingBtn.addEventListener('click', () => {
        totalTodos.forEach(remainingTodo => {
            remainingTodo.parentNode.classList[remainingTodo.classList.contains('completed') ? 'add' : 'remove']('hidden');
        });
    });

    showCompletedBtn.addEventListener('click', () => {
        totalTodos.forEach(completedTodo => {
            completedTodo.parentNode.classList[completedTodo.classList.contains('completed') ? 'remove' : 'add']('hidden');
        });
    });

    deleteCompletedBtn.addEventListener('click', () => {
        totalTodos.forEach(todoToDelete => {
            if(todoToDelete.classList.contains('completed')){
                todoToDelete.parentNode.remove();
                const totalTodosAfterDeleted = document.querySelectorAll('.input-text'); // delete a todo, grab all remaining & remove hidden class
                totalTodosAfterDeleted.forEach(todoAfterDeleted => {
                    todoAfterDeleted.parentNode.classList.remove('hidden');
                })
                updateLS();
            }
        });
        updateLS();
    });
}

toolbarButtons();

function dragItems() {
    const draggables = document.querySelectorAll('.draggable');
    const container  = document.getElementById('todos-ul');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = placeElementWhereDragging(container, e.clientY); // e.clientY shows the Y position of the mouse
        const draggable = document.querySelector('.dragging');
        if(afterElement == null ){
            container.appendChild(draggable);
            updateLS();
        } else {
            container.insertBefore(draggable, afterElement);
            updateLS();
        }
    });

    function placeElementWhereDragging(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
        
        return draggableElements.reduce((nearest, child) => {
            const box    = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if(offset < 0 && offset > nearest.offset) {
                return { offset: offset, element: child }
            } else {
                return nearest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
}

dragItems();

function hideSidebar() {
    const allSidebars = document.querySelectorAll('.sb-todo');
    allSidebars.forEach(sidebar => {
        sidebar.classList.add('hidden');
   });
}    