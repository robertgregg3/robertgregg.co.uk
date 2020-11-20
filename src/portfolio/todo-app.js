/* //Todo:
    1) event listeners - consolodate
    3) Drag not working on mobile
    6) Sort issues with safari
*/ 

const form                 = document.getElementById('form');
const input                = document.getElementById('item');
const todosContainer       = document.getElementById('todos-container');
const todosUl              = document.getElementById('todos-ul');
const countTotalTodos      = document.getElementById('count-total-todos');
const countRemainingTodos  = document.getElementById('count-remaining-todos');
const countCompletedTodos  = document.getElementById('count-completed-todos');
const toolbar              = document.getElementById('toolbar');
let todosFromLS            = JSON.parse(localStorage.getItem('todos'));

toolbar.classList.add('hidden');

if(todosFromLS) {
    todosFromLS.forEach(el => {
        addTodo(el);
        toolbarButtons();
    });
} 

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    addTodo();
    updateLS();
    countTodos();
    toolbarButtons();
    dragItems();
});

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
            <i class="fas fa-times remove-date close-hidden"></i><span class="date-text"></span>
            <div class="todo-extend-div">
                <div class="extended-todo-item sub-task-items">
                    <span class="sub-task-item-input" contenteditable="true" data-text="+ Add a subtask"></span>
                </div>
                <div class="extended-todo-item sb-todo-date">
                    <input type="date" class="date" name="date" placeholder="dd/mm/yyyy" />
                </div>
                <ul class="subtasks">
                </ul>
                <div class="todo-note">
                    <textarea placeholder="Add a Note"></textarea>
                    <div class="note-saved note-hidden"><div>
                </div>
            </div>
        `; 
        
        // append the li to the ul
        todosUl.appendChild(todoItem);

         // remove the new line when enter is pressed on the main todo element
         const toDoInputText     = todoItem.querySelector('.input-text');
         const closeTodoBtn      = todoItem.querySelector('.close-todo');
         const subtaskContainer  = todoItem.querySelector('.subtasks');
         let removeDate          = todoItem.querySelector('.remove-date');
         let dueDate             = todoItem.querySelector('.extended-todo-item input');
         let dateText            = todoItem.querySelector('.date-text');
         let months              = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
         const subtaskInput      = todoItem.querySelector('.sub-task-item-input');
         const todoExtendingDiv  = todoItem.querySelector('.todo-extend-div');     
         const expandTodoBtn     = todoItem.querySelector('.expand-todo');
         const todoInputText     = todoItem.querySelector('.input-text');
         const todoItemCheckbox  = todoItem.querySelector('input');
         const todoNote          = todoItem.querySelector('textarea');
         const todoNoteSaved     = todoItem.querySelector('.note-saved');


         todosUl.addEventListener('keypress', (e) => {
             if (e.code === 'Enter' || e.keyCode === 13) {
                 e.preventDefault();
                 toDoInputText.setAttribute('contenteditable', 'false');
                 toDoInputText.setAttribute('contenteditable', 'true');
                 updateLS();
               }
         });
                
        // add a due date picker
        if(el && el.duedate) {
            dateText.innerText = el.duedate;
            removeDate.classList.remove('close-hidden');
        }
        
        dueDate.addEventListener('change', () => {
            let inputDate = dueDate.value;
            let inputtedDate = new Date(inputDate);
            dateText.innerText = 'Due: ' + inputtedDate.getDate() + '-' + months[inputtedDate.getMonth()] + '-' + inputtedDate.getFullYear();
            updateLS();
            removeDate.classList.remove('close-hidden');
        });

        removeDate.addEventListener('click', () => {
            dateText.innerText = '';
            removeDate.classList.add('close-hidden');
            dueDate.value = '';
            updateLS();
        });

        // close todo button
        todoItem.addEventListener('mouseover', () => {closeTodoBtn.classList.remove('close-hidden');});
        todoItem.addEventListener('mouseout',  () => {closeTodoBtn.classList.add('close-hidden');});

        closeTodoBtn.addEventListener('click', () => {
            todoItem.remove();
            updateLS();
        });      

        // show the Extendable div
        expandTodoBtn.addEventListener('click', () => {
            todoItem.classList[todoItem.classList.contains('todo-item-height') ? 'remove' : 'add']('todo-item-height');
            todoExtendingDiv.classList[todoExtendingDiv.classList.contains('height-100') ? 'remove' : 'add']('height-100');
            expandTodoBtn.classList[expandTodoBtn.classList.contains('expand-todo--rotate') ? 'remove' : 'add']('expand-todo--rotate');
        });

        // add subtasks Input        
        let subtaskInputClicked = false; // variable used to enable the subtasks after a page reloads
        subtaskInput.addEventListener('keypress', (e) => {
            if (e.code === 'Enter' || e.keyCode === 13) {
                        subtaskInputClicked = true;
                e.preventDefault();
                subtaskInput.setAttribute('contenteditable', 'false');
                subtaskInput.setAttribute('contenteditable', 'true');
                createSubtask(subtaskInputClicked);
                subtaskInputClicked = false;
                updateLS();
            }
        }); 
      
        if(el && el.subTasks){
            for (let i=0; i<el.subTasks.length; i++){
               createSubtask(i);  
           }
        };
        
        function createSubtask(i){      
            const subtaskEl  = document.createElement('li');
            let subtaskText  = subtaskInput.innerText; 
            let subtaskClass = ''; 
            let boxChecked   = ''; 
            let favorited    = '';
            
            if(el && el.subTasks && !subtaskInputClicked){ // if there is a todo, and subtasks, and the enter button was NOT pressed 
                subtaskText = el.subTasks[i].subtask; 
                if(el.subTasks[i].subtaskCompleted){ 
                    subtaskClass = 'completed'; 
                    boxChecked = 'checked';
                }
                if(el.subTasks[i].subtaskFavorited){
                    favorited = 'favorited';
                }
            }
              
            subtaskEl.classList.add('sub-task-item-li');
            subtaskEl.innerHTML = `
            <input type="checkbox" ${boxChecked}/>
            <span class="subtask-text ${subtaskClass}">${subtaskText}</span>
            <div class="subtask-btns">
                <span class="subtask-btn save hidden"><i class="fas fa-save"></i></span>
                <span class="subtask-btn edit"><i class="fas fa-edit"></i></span>
                <span class="subtask-btn delete"><i class="fas fa-trash-alt"></i></span>
                <span class="subtask-btn favorite ${favorited}"><i class="fas fa-star"></i></span>
            </div>          
            `;
                
            subtaskInput.innerText = '';
            
            const subtaskOutput      = subtaskEl.querySelector('.subtask-text');
            const subtaskCheckbox    = subtaskEl.querySelector('input');
            const subtaskBtns        = subtaskEl.querySelector('.subtask-btns')
            const subtaskEditBtn     = subtaskBtns.querySelector('.edit');
            const subtaskDeleteBtn   = subtaskBtns.querySelector('.delete');
            const subtaskFavoriteBtn = subtaskBtns.querySelector('.favorite');
            const subtaskSaveBtn     = subtaskBtns.querySelector('.save');


            // toggle the check box and classes
            subtaskCheckbox.addEventListener('click', () => {
                subtaskOutput.classList[subtaskOutput.classList.contains('completed') ? 'remove' : 'add']('completed');
                updateLS();
            });

            // subtask buttons
            subtaskEditBtn.addEventListener('click', () => {
                subtaskOutput.setAttribute('contenteditable', 'true');
                subtaskOutput.classList.add('editable');
                subtaskSaveBtn.classList.remove('hidden');
                subtaskEditBtn.classList.add('hidden');
                subtaskDeleteBtn.style.marginLeft = '1.05rem';
            });
            subtaskDeleteBtn.addEventListener('click', () => {
                        subtaskEl.remove();
                updateLS();
            });         

             // editing the subtasks
             subtaskOutput.addEventListener('keypress', (e) => {
                if (e.code === 'Enter' || e.keyCode === 13) {
                    e.preventDefault();
                                subtaskOutput.setAttribute('contenteditable', 'false');
                    subtaskOutput.classList.remove('editable');
                    subtaskSaveBtn.classList.add('hidden');
                    subtaskEditBtn.classList.remove('hidden');
                    subtaskDeleteBtn.style.marginLeft = '0rem';
                    updateLS();
                }
            }); 

            // saving the subtask (with button rather than pressing enter - above)
            subtaskSaveBtn.addEventListener('click', () => {
                        subtaskOutput.setAttribute('contenteditable', 'false');
                subtaskOutput.classList.remove('editable');
                subtaskSaveBtn.classList.add('hidden');
                subtaskEditBtn.classList.remove('hidden');
                subtaskDeleteBtn.style.marginLeft = '0rem';
                updateLS();
            }); 

            subtaskFavoriteBtn.addEventListener('click', () => {
                subtaskFavoriteBtn.classList[subtaskFavoriteBtn.classList.contains('favorited') ? 'remove' : 'add']('favorited');
                updateLS();
            });

            subtaskContainer.appendChild(subtaskEl);
            updateLS();
        }    
        
        // completing/un-completing a todo        
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
        
        // text area note
        todoNote.addEventListener('keypress', (e) => {
            if(e.code === 'Enter' || e.keyCode === 13){
                e.preventDefault();
                todoNoteSaved.innerText = todoNote.value;
                todoNoteSaved.classList.remove('note-hidden');
                todoNote.classList.add('note-hidden')
            }
        });   

        todoNoteSaved.addEventListener('click', () => {
            todoNoteSaved.classList.add('note-hidden');
            todoNote.classList.remove('note-hidden');
        });
        
        if(el && el.todoNote){
            todoNoteSaved.innerText = el.todoNote;
            todoNote.value = el.todoNote;
            todoNoteSaved.classList.remove('note-hidden');
            todoNote.classList.add('note-hidden');
        }
        
        countTodos();
        updateLS();
        input.value ='';
    }
}

function updateLS() {
    const todosEls = document.querySelectorAll('.todo-item');    
    
    let todos = [];

    todosEls.forEach(todoEl => {
        const todoTexts  = todoEl.querySelector('.input-text'); 
        const todoDate   = todoEl.querySelector('.date-text');  
        const subtaskEls = todoEl.querySelectorAll('.sub-task-item-li'); 
        const todoNote   = todoEl.querySelector('.todo-note');
        
        let subtasks = []; // an empty array that will eventually contain objects of the subtask / completed status
        
        if(subtaskEls) { 
            subtaskEls.forEach(subtaskEl => { 
                const subtaskOutput   = subtaskEl.querySelector('.subtask-text');
                const subtaskFavorite = subtaskEl.querySelector('.favorite'); 

                subtasks.push({   
                    subtask : subtaskOutput.innerText,
                    subtaskCompleted: subtaskOutput.classList.contains('completed'),
                    subtaskFavorited: subtaskFavorite.classList.contains('favorited')
                });
            });
        }  // what is pushed whether there are subtasks or not. If no subtasks then subtasks will just be an empty array
        todos.push({
            text: todoTexts.innerText,
            completed: todoTexts.classList.contains('completed'),
            duedate: todoDate.innerText,
            subTasks: subtasks,
            todoNote: todoNote.innerText
        }); 
    });
        
    localStorage.setItem('todos', JSON.stringify(todos));    
    countTodos();
}

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

function dragItemsMobile() {
    const draggables = document.querySelectorAll('.draggable');
    const container  = document.getElementById('todos-ul');

    draggables.forEach(draggable => {
        draggable.addEventListener('touchstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('touchend', () => {
            draggable.classList.remove('dragging');
        });
    });

    container.addEventListener('touchmove', (e) => {
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

dragItemsMobile();