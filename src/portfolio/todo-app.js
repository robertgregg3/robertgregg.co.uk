/*when form posts: 

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
const todoSidebar         = document.getElementById('sb-todo');
const todosFromLS         = JSON.parse(localStorage.getItem('todos'));

// when there are no todos the toolbar is hidden
toolbar.classList.add('hidden');

// if there are todos in LS then add todos and the text input is el.
if(todosFromLS) {
    todosFromLS.forEach(el => {
        addTodo(el);
    });
} 

// when you add a todo, perform these actions
form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    addTodo();
    updateLS();
    countTodos();
    toolbarButtons();
});

//  add the todo, and if a todo already exists then us the value from local storage as the input.value
function addTodo(el){
    toolbar.classList.remove('hidden'); // make the tool bar visible

    let todoText = input.value; // assign the todo text to the variable todoText

    if(el){  // if there is a todo from LS then the variable todoText will now = el.text.
        todoText = el.text; // the .text is from the object that comes from local Storage
    }

    if(todoText) {  // if any kind of todoText exists either from LS or that has just been created...
        const todoItem = document.createElement('li');  // create the todo element

        todoItem.classList.add('todo-item', 'draggable'); 
        todoItem.setAttribute('draggable', 'true');
        
        if(el && el.completed) {  // if there is a todo from LS and it has the completed key value pair
            todoItem.classList.add('completed');  // then add the completed class 
        }
        
        // add the todo to the li
        todoItem.innerHTML = ` 
            <input type="checkbox" class="spring"/><span class="input-text" contenteditable="true">${todoText}</span>
                <i class="fas fa-times close-todo hidden"></i>
            </li><span class="date-text"></span>
        `; 
        
        // append the li to the ul
        todosUl.appendChild(todoItem);

        // create the sidebar element
        let sideBarText = todoText;
        
        const sidebarEl =  document.createElement('div');
        sidebarEl.classList.add('sb-todo', 'hidden');
        
        sidebarEl.innerHTML = `
            <div class="sb-todo-item">
                <h2 class="sb-todo-title" contenteditable="true">${sideBarText}</h2>
            </div>
            <div class="sb-todo-item sb-todo-date">
                <input type="date" class="date" name="date" /><span class="date-text2"></span>
            </div>
            <div class="sb-todo-item sb-sub-tasks">
                <form id="sub-task-form">
                    <input 
                    id="sub-task-item" 
                    type="text" 
                    placeholder="New sub task"
                    autocomplete="off"
                    maxlength="50"
                    >
                </form>
            </div>
            <ul class="sub-tasks-ul"></ul>
        `;
        
        todosContainer.appendChild(sidebarEl);

        // add a due date to sidebar and main todo
        let dueDate   = sidebarEl.querySelector('.sb-todo-item input');
        let dateText  = todoItem.querySelector('.date-text');
        let dateText2 = sidebarEl.querySelector('.date-text2');
        let months    = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        dateText2.innerText = 'Set a due date?';

        if(el && el.duedate) {
            dateText.innerText  = el.duedate;
            dateText2.innerText = el.duedate;
        }
        
        dueDate.addEventListener('change', () => {
            let inputDate = dueDate.value;
            let inputtedDate = new Date(inputDate);
            dateText.innerText = 'Due Date: ' + inputtedDate.getDate() + '-' + months[inputtedDate.getMonth()] + '-' + inputtedDate.getFullYear();
            dateText2.innerText = inputtedDate.getDate() + '-' + months[inputtedDate.getMonth()] + '-' + inputtedDate.getFullYear();
            updateLS();
        });

        // add sub-tasks to the sidebar
        const subtaskForm  = document.getElementById('sub-task-form');

        subtaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addSubtask();
            updateLS();
        });

        function addSubtask() {
            // const subTaskText = subtaskInput.value;

            // const subTaskEl = document.createElement('li');

            // subTaskEl.innerHTML = `
            //     <input type="checkbox" class="spring"/><span class="input-text" contenteditable="true">${subTaskText}</span>
            //     <i class="fas fa-times close-todo hidden"></i>
            //     `;

            // subtaskUl.appendChild(subTaskEl);
            alert('hellow subtasks!')
        }

        // make the checkbox checked when loaded from local storage
        const todoItemCheckbox = todoItem.querySelector('input');
        if(el && el.completed && todoItemCheckbox.type === 'checkbox') {
            todoItemCheckbox.checked = true;
        }

        // make the X appear when you hover the li
        const closeTodo = todoItem.querySelector('.close-todo');
        todoItem.addEventListener('mouseover', () => {
            closeTodo.classList.remove('hidden');
        });

        // remove the X when you are not hovering the item
        todoItem.addEventListener('mouseout', () => {
            closeTodo.classList.add('hidden');
        });

        // delete the todo and remove from local storage
        closeTodo.addEventListener('click', () => {
            todoItem.remove();
            sidebarEl.remove();
            updateLS();
        });

        // remove the new line when enter is pressed on the main todo element
        const toDoInputText = todoItem.querySelector('.input-text');

        todosUl.addEventListener('keypress', (e) => {
            if (e.code === 'Enter' || event.keyCode === 13) {
                e.preventDefault();
                toDoInputText.setAttribute('contenteditable', 'false');
                toDoInputText.setAttribute('contenteditable', 'true');
                updateLS();
              }
        });

        // remove the new line when enter is pressed on the sidebar todo
        const sideBarTextEl = sidebarEl.querySelector('.sb-todo-title')

        sidebarEl.addEventListener('keypress', (e) => {
            if (e.code === 'Enter' || event.keyCode === 13) {
                e.preventDefault();
                sideBarTextEl.setAttribute('contenteditable', 'false');
                sideBarTextEl.setAttribute('contenteditable', 'true');
                updateLS();
              }
        });

        if(el && el.completed) {
            sideBarTextEl.classList.add('completed');
        }  

        todoItemCheckbox.addEventListener('click', (e) => {
            e.target.parentNode.classList[e.target.checked ? 'add' : 'remove']('completed');    
            sideBarTextEl.classList[sideBarTextEl.classList.contains('completed') ? 'remove' : 'add']('completed');  
            updateLS();
            toolbarButtons();
            countTodos();
            updateLS();
        });

        // show the sidebar
        todoItem.addEventListener('click', () => {
            hideSidebar();
            sidebarEl.classList[sidebarEl.classList.contains('hidden') ? 'remove' : 'add']('hidden');
            todosContainer.classList[sidebarEl.classList.contains('hidden') ? 'add' : 'remove']('grid-no-sidebar');        
        });      

        // run these functions
        countTodos();
        toolbarButtons();
        updateLS();
        //  clear the input
        input.value ='';
    }
}

function updateLS() {
    const todosEl   = document.querySelectorAll('.todo-item');// all of the todos on the screen
    
    const todos = []; // create the array to push all of the todos into when I save to local storage
    
    todosEl.forEach(todo => {
        const todoTexts = todo.querySelector('.input-text');// the todo input text
        const todoDate  = todo.querySelector('.date-text'); // the todo date text

        todos.push({
            text: todoTexts.innerText,
            completed: todo.classList.contains('completed'),
            duedate: todoDate.innerText
        });
    });
    
    localStorage.setItem('todos', JSON.stringify(todos));
    countTodos();
    toolbarButtons();
}

function countTodos() {
    const totalTodos = document.querySelectorAll('.todo-item');// all of the todos on the screen
    
    // calculation for remaining todos, then used for completed.
    let sum = totalTodos.length;
    totalTodos.forEach(totalTodo => {
        if(totalTodo.classList.contains('completed')){
            sum--;
        }
        return sum;
    });

    countTotalTodos.innerHTML     = `All items: ${totalTodos.length} <br /><button id="show-all">Show</button>`;
    countRemainingTodos.innerHTML = `remaining: ${sum}<br /><button id="show-remaining">Show</button>`;
    countCompletedTodos.innerHTML = `
        completed: ${totalTodos.length - sum}<br />
        <button id="show-completed">Show</button>
        <button id="delete-completed">Delete</button>
    `;
}

function toolbarButtons(){
    const totalTodos         = document.querySelectorAll('.todo-item');// all of the todos on the screen
    const showAllBtn         = document.querySelector('#show-all');
    const showRemainingBtn   = document.querySelector('#show-remaining');
    const showCompletedBtn   = document.querySelector('#show-completed');
    const deleteCompletedBtn = document.querySelector('#delete-completed');
    const sidebarTodoTitles  = document.querySelectorAll('.sb-todo-title');

    showAllBtn.addEventListener('click', () => {
        totalTodos.forEach(totalTodo => {
                totalTodo.classList.remove('hidden');
        });
    });

    showRemainingBtn.addEventListener('click', () => {
        totalTodos.forEach(remainingTodo => {
            if(remainingTodo.classList.contains('completed')){
                remainingTodo.classList.add('hidden');
            }
            if(!remainingTodo.classList.contains('completed')){
                remainingTodo.classList.remove('hidden');
            }
        });
    });

    showCompletedBtn.addEventListener('click', () => {
        totalTodos.forEach(completedTodo => {
            if(!completedTodo.classList.contains('completed')){
                completedTodo.classList.add('hidden');
            }
            if(completedTodo.classList.contains('completed')){
                completedTodo.classList.remove('hidden');
            }
        });
    });

    deleteCompletedBtn.addEventListener('click', () => {
        totalTodos.forEach(todoToDelete => {
            if(todoToDelete.classList.contains('completed')){
                todoToDelete.remove();
                // when the todo items are removed this code removes the completed class which appears
                sidebarTodoTitles.forEach(sidebarTodoTitle => {
                    sidebarTodoTitle.classList.remove('completed');
                    updateLS()
                });
                updateLS();
            }
        });
    });
}

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
        const afterElement = placeElementWhereDragging(container, e.clientY); // e.clientY shows teh Y position of the mouse
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

// function todoSidebar() {
//     const toDoInputTexts        = document.querySelectorAll('.input-text');
//     const sidebarTodoInputTexts = document.querySelectorAll('.sb-todo-title'); 
//     const allSideBars           = document.querySelectorAll('.');

// }

function hideSidebar() {
    const allSidebars = document.querySelectorAll('.sb-todo');
    allSidebars.forEach(sidebar => {
        sidebar.classList.add('hidden');
   });
}



// when you edit the todo the side bar text changes too
const toDoInputTexts        = document.querySelectorAll('.input-text');
const sidebarTodoInputTexts = document.querySelectorAll('.sb-todo-title'); 

toDoInputTexts.forEach(toDoInputText => {
    sidebarTodoInputTexts.forEach(sidebarTodoInputText => {
        if(toDoInputText.textContent === sidebarTodoInputText.textContent){
            const observer     = new MutationObserver((mutationRecords) => {
                sidebarTodoInputText.textContent = mutationRecords[0].target.data
                updateLS();
            })

            observer.observe(toDoInputText, {
                characterData: true,
                subtree: true,
            });
        }
    });
});

sidebarTodoInputTexts.forEach(sidebarTodoInputText => {
    toDoInputTexts.forEach(toDoInputText => {
        if(sidebarTodoInputText.textContent === toDoInputText.textContent){
            const observer     = new MutationObserver((mutationRecords) => {
                toDoInputText.textContent = mutationRecords[0].target.data
                updateLS();
            })

            observer.observe(sidebarTodoInputText, {
                characterData: true,
                subtree: true,
            });
        }
    });
});