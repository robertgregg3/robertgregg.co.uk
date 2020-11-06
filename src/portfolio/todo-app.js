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
    showTodos();
});

//  add the todo, and if a todo already exists then us the value from local storage as the input.value
function addTodo(el){
    toolbar.classList.remove('hidden');

    let todoText = input.value;

    if(el){
        todoText = el.text;
    }

    if(todoText) {
        const todoItem = document.createElement('li');
        if(el && el.completed) {
            todoItem.classList.add('completed');
            
        }
        todoItem.classList.add('todo-item', 'draggable'); 
        todoItem.contentEditable = true;
        todoItem.setAttribute('draggable', 'true');
        todoItem.innerHTML = `
            <input type="checkbox" class="spring"/>${todoText}
                <i class="fas fa-times close-todo hidden"></i>
            </li>
        `; 
        
        todosUl.appendChild(todoItem);

        const todoItemCheckbox = todoItem.querySelector('input');
        if(el && el.completed && todoItemCheckbox.type === 'checkbox') {
            todoItemCheckbox.checked = true;
        }

        const closeTodo = todoItem.querySelector('.close-todo');
        todoItem.addEventListener('mouseover', () => {
            closeTodo.classList.remove('hidden');
        });

        todoItem.addEventListener('mouseout', () => {
            closeTodo.classList.add('hidden');
        });

        closeTodo.addEventListener('click', () => {
            todoItem.remove();
            updateLS();
        });

        todoItem.addEventListener('click', () => {
            todoItem.removeAttribute('contenteditable', 'false');
            todoItem.setAttribute('contenteditable', 'true');
            updateLS();
        });

        todosUl.addEventListener('keypress', (e) => {
            if (e.code === 'Enter' || event.keyCode === 13) {
                e.preventDefault();
                todoItem.removeAttribute('contenteditable', 'true');
                todoItem.setAttribute('contenteditable', 'false');
                updateLS();
              }
        });

        markComplete();
        countTodos();
        showTodos();

        input.value ='';
    }
}

function markComplete() {
    const todosElCheckbox = document.querySelectorAll('.todo-item input');// all of the todos on the screen

    todosElCheckbox.forEach(checkbox => {
        checkbox.addEventListener('click', (e) => {
            e.target.parentNode.classList[e.target.checked ? 'add' : 'remove']('completed');
            showTodos();
            countTodos();
            updateLS();
        });
    });
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
    showTodos();
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
    countCompletedTodos.innerHTML = `completed: ${totalTodos.length - sum}<br /><button id="show-completed">Show</button>`;
}

function showTodos(){
    const totalTodos       = document.querySelectorAll('.todo-item');// all of the todos on the screen
    const showAllBtn       = document.querySelector('#show-all');
    const showRemainingBtn = document.querySelector('#show-remaining');
    const showCompletedBtn = document.querySelector('#show-completed');

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
}

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
            console.log(offset, nearest);
            return { offset: offset, element: child }
        } else {
            return nearest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

