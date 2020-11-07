/*when form posts: 

    1) add todo to the window. 
    2) Add to local storage 

*/

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

toolbar.classList.add('hidden');

if(todosFromLS) {
    todosFromLS.forEach(el => {
        addTodo(el);
    });
} 

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
    updateLS();
    countTodos();
    toolbarButtons();
});

//  add the todo, and if a todo already exists then us the value from local storage as the input.value
function addTodo(el){
    toolbar.classList.remove('hidden');

    let todoText = input.value;

    if(el){
        todoText = el.text;
    }

    if(todoText) {
        // create the todo element
        const todoItem = document.createElement('li');

        todoItem.classList.add('todo-item', 'draggable'); 
        todoItem.setAttribute('draggable', 'true');

        if(el && el.completed) {
            todoItem.classList.add('completed');  
        }

        todoItem.innerHTML = `
            <input type="checkbox" class="spring"/><span class="input-text" contenteditable="true">${todoText}</span>
                <i class="fas fa-times close-todo hidden"></i>
            </li>
        `; 
        
        todosUl.appendChild(todoItem);

        // create the sidebar element
        let sideBarText = todoText;
        
        const sidebarEl =  document.createElement('div');
        sidebarEl.classList.add('sb-todo', 'hidden')
        
        sidebarEl.innerHTML = `
        <div class="sb-todo-item">
        <h2 class="sb-todo-title" contenteditable="true">${sideBarText}</h2>
        </div>
        <div class="sb-todo-item sb-todo-date">
        <input type="date" placeholder="Set a due date?"/><span class="date-text"></span>
        </div>
        `;
        
        todosContainer.appendChild(sidebarEl);
    
        // const dueDate     = document.querySelector('.sb-todo-date input');
        // const dueDateText = document.querySelector('.sb-todo-date .date-text');

        // if(dueDate){
        //     dueDateText.innerText = dueDate.value;
        // } else {
        //     dueDateText.innerText = 'Set a due date?';
        // }

        // when retrieving from local storage make the check box checked if it was before    
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

        todoItemCheckbox.addEventListener('click', (e) => {
            e.target.parentNode.classList[e.target.checked ? 'add' : 'remove']('completed');    
            sideBarTextEl.classList.add('completed');  
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
    const todosEl = document.querySelectorAll('.todo-item');// all of the todos on the screen
        
    const todos = []; // create the array to push all of the todos into when I save to local storage

    todosEl.forEach(todo => {
        todos.push({
            text: todo.innerText,
            completed: todo.classList.contains('completed')
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