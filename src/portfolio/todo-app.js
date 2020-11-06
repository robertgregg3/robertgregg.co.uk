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
        todoItem.setAttribute('contenteditable', 'true');
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
        dragElements();

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

function dragElements(){
    var remove = document.querySelector('.draggable');
    
    function dragStart(e) {
      this.style.opacity = '0.4';
      dragSrcEl = this;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
    };
    
    function dragEnter(e) {
      this.classList.add('over');
    }
    
    function dragLeave(e) {
      e.stopPropagation();
      this.classList.remove('over');
    }
    
    function dragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      return false;
    }
    
    function dragDrop(e) {
      if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
      }
      return false;
    }
    
    function dragEnd(e) {
      var listItens = document.querySelectorAll('.draggable');
      [].forEach.call(listItens, function(item) {
        item.classList.remove('over');
      });
      this.style.opacity = '1';
    }
    
    function addEventsDragAndDrop(el) {
      el.addEventListener('dragstart', dragStart, false);
      el.addEventListener('dragenter', dragEnter, false);
      el.addEventListener('dragover', dragOver, false);
      el.addEventListener('dragleave', dragLeave, false);
      el.addEventListener('drop', dragDrop, false);
      el.addEventListener('dragend', dragEnd, false);
    }
    
    var listItens = document.querySelectorAll('.draggable');
    [].forEach.call(listItens, function(item) {
      addEventsDragAndDrop(item);
    });
    
    function addNewItem() {
      var newItem = document.querySelector('.input').value;
      if (newItem != '') {
        document.querySelector('.input').value = '';
        var li = document.createElement('li');
        var attr = document.createAttribute('draggable');
        var ul = document.querySelector('ul');
        li.className = 'draggable';
        attr.value = 'true';
        li.setAttributeNode(attr);
        li.appendChild(document.createTextNode(newItem));
        ul.appendChild(li);
        addEventsDragAndDrop(li);
      }
    }
}

dragElements();
showTodos();