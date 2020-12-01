/* //Todo:
    1) Drag not working on mobile
    2) Sort issues with safari
    3) refactor Enter press or set attributyes code
    4) Sort buttons when category selected
*/ 

/* Tests:
1) Create account > create list > refresh. List should be there (+ selected class) & create list small popup only
2) edit email saves when refreshed
3) create multiple lists > add items for each > change the name of one list > refresh - one list with selected class and filtered items
4) Create subtasks and notes > refresh
5) Reorder Todos > refresh
6) Reorder lists > refresh
*/

const initialScreensBg      = document.getElementById('initial-screens');
const createAccContainer    = document.getElementById('create-account');
const createListText        = document.querySelector('.create-list');
const createFirstListText   = document.querySelector('.create-first-list');

const form                  = document.getElementById('form');
const input                 = document.getElementById('item');
const todosContainer        = document.getElementById('todos-container');
const todosUl               = document.getElementById('todos-ul');
const allTodos              = document.querySelectorAll('.todo-item');

const countTotalTodos       = document.getElementById('count-total-todos');
const countRemainingTodos   = document.getElementById('count-remaining-todos');
const countCompletedTodos   = document.getElementById('count-completed-todos');
const toolbar               = document.getElementById('toolbar');

const profileContainer      = document.getElementById('todo-profile');

const todoCategoryContainer = document.getElementById('todo-list-categories-ul');
const todoCategories        = document.querySelectorAll('.todo-list-category-li');

const createListBtn         = document.getElementById('create-list-btn');
const createListPopup       = document.getElementById('create-list-popup');
const closeCreateListBtn    = createListPopup.querySelector('.close-create-list');
const createListInput       = createListPopup.querySelector('input');
const createListPopupBtn    = createListPopup.querySelector('#create-list__button');

let showCreateAccount       = localStorage.getItem('accountCreated');
let profileEmailFromLS      = localStorage.getItem('email');
let todoCategoriesFromLS    = JSON.parse(localStorage.getItem('todoCategories'));
let todoCategoryFromLS      = localStorage.getItem('todoCategory');
let todosFromLS             = JSON.parse(localStorage.getItem('todos'));
let profileImageFromLS      = localStorage.getItem('profileImage');

let profileImgUrl           = '../images/rob.jpg'
let todoCategoryName        = ''; // variable to convert the category name into a class name for the todo
let selectedCategory        = ''; // variable to use when 2 or more lists are created before a todo is added. 
let catId                   =  1; // variable for sequential ID's for the list categories
let profileEmailText        = ''; // variable for the email address 


// creaate Account 
function createAcc(){
    const createAccContainer = document.getElementById('create-account');
    const createAccEl        = document.createElement('div');

    createAccEl.classList.add('form-section');
    createAccEl.innerHTML = `
        <h2>Create Account</h2>
        <p>This is just a test application</p>
        <button id="use-dummy-data">Use dummy data</button>
        <input type="email" name="create-account-email" id="create-account-email" placeholder="Email Address" />
        <input type="password" name="create-account-password" id="create-account-password" placeholder="Password" />
        <span class="create-account-profile-image-text">Upload Profile Pic</span>
        <input type="file" name="create-account-profile-image" id="create-account-profile-image" accept="image/*" multiple="false" onchange="createAccPreviewFile()" />
        <span id="img-preview"></span>
        <button id="create-account-btn">Create Account</button>
    `;

    createAccContainer.appendChild(createAccEl);

    const useDummyDataBtn    = document.getElementById('use-dummy-data');
    const createAccEmail     = document.getElementById('create-account-email');
    const createAccPassword  = document.getElementById('create-account-password');
    const createAccBtn       = document.getElementById('create-account-btn');

    useDummyDataBtn.addEventListener('click', () => {
        createAccEmail.value = 'test@test.com';
        createAccPassword.value = '1234';
    });

    createAccBtn.addEventListener('click', () => {
        createProfile(createAccEmail);
        createAccContainer.style.marginTop = '-100%';
        createListPopup.classList.remove('create-list--hidden')
        createListPopup.style.marginTop = '0%';
        createAccPreviewFile();
    });
}

function createAccPreviewFile() {
    const createAccContainer = document.getElementById('create-account');
    const createAccPreview   = document.getElementById('todo-profile__img');
    const createAccfile      = createAccContainer.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

  if(createAccPreview){
        reader.addEventListener("load", () => {
            createAccPreview.src = reader.result;
            localStorage.setItem("profileImage", createAccPreview.src)
        }, false);
    }
    if (createAccfile) 
        reader.readAsDataURL(createAccfile);
    updateLS();
}

if(!todosFromLS && !todoCategoriesFromLS && !profileEmailFromLS){
    createAcc();
} else {
    const createAccContainer = document.getElementById('create-account');
    createAccContainer.style.display = 'none';
    createProfile();
}

// create profile section
function createProfile(createAccEmail){
    if(profileImageFromLS)
        profileImgUrl = profileImageFromLS;
    
    if(profileEmailFromLS) {
        profileEmailText = profileEmailFromLS;
    } else if(createAccEmail){
        profileEmailText = createAccEmail.value;
    } 
        
    const profileEl = document.createElement('div');
    profileEl.classList.add('profile-container');
    profileEl.innerHTML = `
        <label for="profile-image">
        <input id="profile-image" type="file" accept="image/*" multiple="false" onchange="previewFile()">
        <img 
            src="${profileImgUrl}" 
            alt="Upload profile Image" 
            class="todo-profile__img"
            id="todo-profile__img"
            />
        <i class="fas fa-camera"></i>
        </label>
        <div id="todo-profile__email" contenteditable="true" data-text="Add your email">${profileEmailText}</div>
        `;
    profileContainer.appendChild(profileEl);

    updateEmail(profileEmailText);
    updateLS(profileEmailText);
}

function updateEmail() {
     const profileEmail = document.getElementById('todo-profile__email');
     
     profileEmail.addEventListener('keypress', (e) => {
         if (e.code === 'Enter' || e.keyCode === 13) {
             e.preventDefault();
             profileEmail.setAttribute('contenteditable', 'false');
             profileEmail.setAttribute('contenteditable', 'true');
             profileEmailText = profileEmail.innerText;
             updateLS(profileEmailText);
            }
        });
}

// save the profile image tolocal storage
function previewFile() {
    const profileContainer = document.getElementById('todo-profile');
    const preview          = document.getElementById('todo-profile__img');
    const file             = profileContainer.querySelector('input[type=file]').files[0];
    const reader           = new FileReader();
  
    reader.addEventListener("load", () => {
      preview.src = reader.result;
      localStorage.setItem('profileImage', preview.src)
    }, false);
  
    if (file) 
        reader.readAsDataURL(file);
    updateLS();
}

// add created categories to the sidebar
if(todoCategoriesFromLS){
    todoCategoriesFromLS.forEach(todoCat => {
        todoCategoryName = todoCat.todoCategory;
        createList(todoCategoryName);
    });
}

// show/hide the create list box
if(!showCreateAccount) {
    showCreateAccountScreen();
} else {
    hideCreateAccount();
}

function showCreateAccountScreen() {
    createListPopup.classList.remove('create-list--hidden', 'create-list-popup');
    createListPopup.classList.add('create-list-popup-initial');
    createFirstListText.classList.remove('hidden');
    
    const createFirstListBtn = document.querySelector('.create-list-popup-initial #create-list__button');
    
    createFirstListBtn.addEventListener('click', addRemoveClasses);
    createListInput.addEventListener('keypress', (e) => {
        if (e.code === 'Enter' || e.keyCode === 13) {
            e.preventDefault();
            addRemoveClasses();
        }
    });
}

function hideCreateAccount(){
    createListPopup.classList.remove('create-list-popup-initial');
    createFirstListText.classList.add('hidden');
    initialScreensBg.classList.add('initial-hidden');
    createAccContainer.classList.add('initial-hidden');
    updateLS();
}

function addRemoveClasses(){
    closeCreateListBtn.classList.add('hidden');
    createListPopup.classList.remove('create-list-popup-initial');
    createListPopup.classList.add('create-list-popup');
    createFirstListText.classList.add('hidden');
    initialScreensBg.classList.add('initial-hidden');
    createAccContainer.classList.add('initial-hidden');
    updateLS();
}

createListBtn.addEventListener('click', () => {
    createListPopup.classList.remove('create-list--hidden');
    createListText.classList.remove('hidden');
    closeCreateListBtn.classList.remove('hidden');
});

closeCreateListBtn.addEventListener('click', () => {createListPopup.classList.add('create-list--hidden');});

// create a new list button press
createListPopupBtn.addEventListener('click', () => {
    todoCategoryName = createListInput.value;
    createList(todoCategoryName);
    createListPopup.classList.add('create-list--hidden');
    createListInput.value = '';
    reorderCategoryLists();
    updateLS();
});

// create a new list Enter press
createListInput.addEventListener('keypress', (e) => {
    if (e.code === 'Enter' || e.keyCode === 13) {
        if(createListPopup.classList.contains('create-list-popup-initial')) {
            createListPopup.classList.remove('create-list-popup-initial');
            createListPopup.classList.add('create-list-popup');
        }
        todoCategoryName = createListInput.value;
        createList(todoCategoryName);
        createListPopup.classList.add('create-list--hidden');
        createListInput.value = '';
        reorderCategoryLists();
        updateLS();
    }
}); 

function createList(todoCategoryName) {
    const createListEl      = document.createElement('li');
    const allTodoCategories = document.querySelectorAll('.todo-list-category-li');

    allTodoCategories.forEach(cat => {
        cat.classList.remove('selected')
        if(cat.innerText === todoCategoryName)
            todoCategoryName = todoCategoryName + ' (copy)';
    });

    createListEl.draggable = true;
    createListEl.id        = catId;
    createListEl.classList.add('draggable-list')

    createListEl.classList.add('todo-list-category-li', 'selected');

    if(todoCategoryName) {
        createListEl.className += ' ' + todoCategoryName.split(' ').join('-').toLowerCase();
        createListEl.innerHTML = `
            <i class="fas fa-list-alt icon"></i><span class="category-text">${todoCategoryName}</span>
            <ul class="category-btns cat-hidden">
                <li class="category-btn cat-option cat-save cat-hidden"><i class="fas fa-save"></i></li>
                <li class="category-btn cat-option cat-edit"><i class="fas fa-edit"></i></li>
                <li class="category-btn cat-option cat-delete"><i class="fas fa-trash-alt"></i></li>
            </ul>  
        `;

        todoCategoryContainer.appendChild(createListEl);
        
        selectedCategory         = todoCategoryName.split(' ').join('-').toLowerCase();
        const categoryText       = createListEl.querySelector('.category-text');
        const categoryBtns       = createListEl.querySelector('.category-btns');
        const saveCategoryBtn    = createListEl.querySelector('.cat-save');
        const editCategoryBtn    = createListEl.querySelector('.cat-edit');
        const deleteCategoryBtn  = createListEl.querySelector('.cat-delete');
        catId++;
        
        categoryText.addEventListener('keypress', (e) => {
            if(e.code === 'Enter' || e.keyCode === 13)
                e.preventDefault();
        });

        saveCategoryBtn.addEventListener('click', () => {
            categoryText.setAttribute('contenteditable', 'false');
            updateLS();
            categoryText.classList.remove('category-edit-mode');
            saveCategoryBtn.classList.add('cat-hidden');
            editCategoryBtn.classList.remove('cat-hidden');
            selectedCategory = createListEl.innerText.split(' ').join('-').toLowerCase();
            saveNewListName(selectedCategory);
            categoryBtns.classList.add('cat-hidden');
        });
        
        editCategoryBtn.addEventListener('click', () => {       
            updateLS();
            categoryText.setAttribute('contenteditable', 'true');
            categoryText.classList.add('category-edit-mode');
            saveCategoryBtn.classList.remove('cat-hidden');
            editCategoryBtn.classList.add('cat-hidden');
            editListGetClassToRemove(selectedCategory);
        });

        deleteCategoryBtn.addEventListener('click', (e) => {
            showDeleteCategoryPopup();
        });

        function showDeleteCategoryPopup(){
            const deleteCategoryPopup = document.createElement('div');
            deleteCategoryPopup.classList.add('delete-list-popup');
            deleteCategoryPopup.innerHTML = `
                <i class="fas fa-times close-delete-list"></i>Are you sure you want to delete the list '${todoCategoryName}'?  This action cannot be undone
                <button class="delete-list__button">Yes, delete the list</button>
            `;
            document.body.appendChild(deleteCategoryPopup);

            const deleteCategoryPopupBtn = deleteCategoryPopup.querySelector('.delete-list__button');
            deleteCategoryPopupBtn.addEventListener('click', () => {
                removeTodos();
                createListEl.remove();
                deleteCategoryPopup.remove();
                updateLS();
            });

            const closeDeleteListPopupBtn = deleteCategoryPopup.querySelector('.close-delete-list');
            closeDeleteListPopupBtn.addEventListener('click', () => {
                deleteCategoryPopup.remove();
            });
        }
        removeCatOptions();
        showCatOptions(createListEl);
        findSelectedCategory();
        filterTodos();
        filterTodosWhenClicked(createListEl);
        // refreshAddSelectedAndFilterTodos();
        
        createListEl.addEventListener('click', (e) => {
            selectedCategory = createListEl.innerText.split(' ').join('-').toLowerCase();       
            removeCategorySelectedClass();
            findSelectedCategory();
            removeCatOptions();
            showCatOptions(createListEl);
            e.currentTarget.classList.add('selected');
            todoCategoryName = e.currentTarget.innerText.split(' ').join('-').toLowerCase();
        });
        updateLS();
    }
}

// remove the todo items associated with the category you are deleting
function removeTodos() {
    const totalTodoItems = document.querySelectorAll('.todo-item');
    totalTodoItems.forEach(todoItemEl => {
        if(todoItemEl.classList.contains(selectedCategory)){
            todoItemEl.remove();
            updateLS();
        }
    });
}

// gets all of the category options buttons and removes them
function removeCatOptions(){
    const allCatBtns = document.querySelectorAll('.category-btns');
    allCatBtns.forEach(catBtn => {
        if(!catBtn.classList.contains('cat-hidden'))
            catBtn.classList.add('cat-hidden');
    });
}

// Show the category options buttons for the current EL
function showCatOptions(createListEl) {
    const catBtns = createListEl.querySelector('ul');
    catBtns.classList.remove('cat-hidden');
}

// When editing a category we grab the selected categroy and use that as the class to remove
function editListGetClassToRemove(selectedCategory) {
    const allTodos = document.querySelectorAll('.todo-item');

    allTodos.forEach(todo => {
        if(todo.classList.contains(selectedCategory)){
            todo.classList.remove(selectedCategory);
            todo.classList.add('list-modifying');   
        }
    });
    updateLS();
}

// when sdving the new category confirm the NEW selectCategory name
function saveNewListName(selectedCategory) {
    updateLS();
    updateClassAfterEditing(selectedCategory);
}

// apply the NEW selectCategory name to the list items
function updateClassAfterEditing(selectedCategory) {
    const allTodos = document.querySelectorAll('.todo-item');
    
    allTodos.forEach(todo => {
        if(todo.classList.contains('list-modifying')){
            todo.classList.remove('list-modifying');   
            todo.classList.add(selectedCategory);
        }
    });
    updateLS();
}

// set todocategoryName for the selected list category
function findSelectedCategory(){
    todoCategories.forEach(oneCat => {
        if(oneCat.classList.contains('selected'))
            todoCategoryName = oneCat.innerText.split(' ').join('-').toLowerCase();
    });
}

// filter todos when a category is added
function filterTodos(){
    const allTodos = document.querySelectorAll('.todo-item');
   
    allTodos.forEach(oneTodo => {
        if(oneTodo.classList.contains(todoCategoryName.split(' ').join('-').toLowerCase()))
            oneTodo.classList.remove('hidden');
        if(!oneTodo.classList.contains(todoCategoryName.split(' ').join('-').toLowerCase()))
            oneTodo.classList.add('hidden');
    });
}

// add the event listener here so it is called on refresh. Otherwise the classes don't change straight away (remove and add selected)
const allCategories = document.querySelectorAll('.todo-list-category-li');
    
allCategories.forEach(cat => {
    cat.addEventListener('click', (e) => {
        todoCategoryName = cat.innerText;
        e.currentTarget.classList.add('selected');  
        filterTodos();          
        updateLS();
    });
});

// remove selected class function
function removeCategorySelectedClass() {
    const allCategories = document.querySelectorAll('.todo-list-category-li');
    allCategories.forEach(cat => {
        cat.classList.remove('selected'); 
    });
}

function filterTodosWhenClicked(){
    const allCategories = document.querySelectorAll('.todo-list-category-li');
    const allTodos      = document.querySelectorAll('.todo-item');
    
    allCategories.forEach(cat => {
        cat.addEventListener('click', (e) => {
            clickedItemEl = e.currentTarget.innerText.split(' ').join('-').toLowerCase();
            
            allTodos.forEach(oneTodo => {
                if(oneTodo.classList.contains(clickedItemEl))
                    oneTodo.classList.remove('hidden');
                if(!oneTodo.classList.contains(clickedItemEl))
                    oneTodo.classList.add('hidden');
            });
        });
    });
}

filterTodosWhenClicked();

// hide the toolbar on page load
toolbar.classList.add('toolbar-hidden');

// add the todo form
form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    addTodo();
    updateLS();
    countTodos();
    dragItems();
    dragItemsMobile();
});

// create todos from localStorage
if(todosFromLS) {
    todosFromLS.forEach(el => {
        addTodo(el);
    });
} 

function addTodo(el, todoCategoryName){
    findSelectedCategory();
    toolbar.classList.remove('toolbar-hidden');
    input.style.marginTop = '0';
   
    let todoText = input.value; 
    
    if(el) {
        todoText = el.text; 
        todoCategoryName = el.todoCategory;    
    }
    
    if(todoText) {  
        const todoItem = document.createElement('li');  
        
        todoItem.classList.add('todo-item', 'draggable', 'todo-item-height'); 

        if(el) {
            todoItem.className += ' ' + todoCategoryName.split(' ').join('-').toLowerCase();
        } else if (el && selectedCategory === '') {
            todoItem.className += ' ' + todoCategoryName.split(' ').join('-').toLowerCase();
        } else if (el && selectedCategory !== '') {
            todoItem.className += ' ' + selectedCategory;
        } else{
            todoItem.className += ' ' + selectedCategory;
        }

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
                </div>
            </div>
        `; 
        
        // append the li to the ul
        todosUl.appendChild(todoItem);

        // remove the new line when enter is pressed on the main todo element
        const toDoInputText    = todoItem.querySelector('.input-text');
        const closeTodoBtn     = todoItem.querySelector('.close-todo');
        const subtaskContainer = todoItem.querySelector('.subtasks');
        const subtaskInput     = todoItem.querySelector('.sub-task-item-input');
        const todoExtendingDiv = todoItem.querySelector('.todo-extend-div');     
        const expandTodoBtn    = todoItem.querySelector('.expand-todo');
        const todoInputText    = todoItem.querySelector('.input-text');
        const todoItemCheckbox = todoItem.querySelector('input');
        const todoNote         = todoItem.querySelector('textarea');
        let removeDate         = todoItem.querySelector('.remove-date');
        let dueDate            = todoItem.querySelector('.extended-todo-item input');
        let dateText           = todoItem.querySelector('.date-text');
        let months             = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
            todoItem.classList[todoItem.classList.contains('todo-item-tilt') ? 'remove' : 'add']('todo-item-tilt');
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
            todoInputText.classList.add('completed');  
            todoItem.classList.add('hidden');
            updateLS();
        }
        
        todoItemCheckbox.addEventListener('click', () => {
            todoInputText.classList[todoInputText.classList.contains('completed') ? 'remove' : 'add']('completed');
            todoItem.classList[todoItem.classList.contains('hidden') ? 'remove' : 'add']('hidden');
            updateLS();
            countTodos();
        });   
        
        // text area note   
        if(el && el.todoNote)
            todoNote.value = el.todoNote;
        
        filterTodosWhenClicked()
        countTodos();
        updateLS();
        input.value ='';
    }
}

function filterTodosOnPageReload(selectedCategory) {
    const allTodos = document.querySelectorAll('.todo-item');

    allTodos.forEach(todo => {
        if(!todo.classList.contains(selectedCategory))
            todo.classList.add('hidden');
    });
}

filterTodosOnPageReload(selectedCategory);

function updateLS() {
    // When first list is created initial screens are true
    const initialScreensBgLS = document.getElementById('initial-screens'); 
    localStorage.setItem('accountCreated', initialScreensBgLS.classList.contains('initial-hidden'));

    const todosEls = document.querySelectorAll('.todo-item');    
    
    let todos = [];

    todosEls.forEach(todoEl => {
        const todoTexts  = todoEl.querySelector('.input-text'); 
        const todoDate   = todoEl.querySelector('.date-text');  
        const subtaskEls = todoEl.querySelectorAll('.sub-task-item-li'); 
        const todoNote   = todoEl.querySelector('textarea');
        const categories = document.querySelectorAll('.todo-list-category-li');

        let categoryName = '';

        categories.forEach(category => {
            if(todoEl.classList.contains(category.innerText.split(' ').join('-').toLowerCase()))
                categoryName = category.innerText.split(' ').join('-').toLowerCase();
                return categoryName;
            });
        
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
            todoCategory: categoryName,
            text: todoTexts.innerText,
            completed: todoTexts.classList.contains('completed'),
            duedate: todoDate.innerText,
            subTasks: subtasks,
            todoNote: todoNote.value
        }); 
    });

    // add profile email to local storage
    localStorage.setItem('email', profileEmailText);

    // add the category selected to LS
    let todoCategories      = [];
    const allTodoCategories = document.querySelectorAll('.todo-list-category-li');

    allTodoCategories.forEach(todoCategory => {

        todoCategories.push({
            todoCategory: todoCategory.innerText,
            selected: todoCategory.classList.contains('selected')
        });

        if(todoCategory.classList.contains('selected'))
            localStorage.setItem('todoCategory', todoCategory.innerText);
    });

    // add all created todo List categories
    localStorage.setItem('todoCategories', JSON.stringify(todoCategories));
        
    // add todos to local storage
    localStorage.setItem('todos', JSON.stringify(todos));    
    countTodos();
    toolbarButtons();
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
    const todoItemCategories = document.querySelectorAll('.todo-list-category-li');
    const totalTodoItems     = document.querySelectorAll('.todo-item');
    
    showAllBtn.addEventListener('click', () => {
        totalTodoItems.forEach(item =>{
            item.classList.remove('hidden2');
            item.classList.remove('hidden');
            console.log('yesy')
        });
        todoItemCategories.forEach(todoItemCategory => {
            todoItemCategory.classList.remove('selected');
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
                });
                updateLS();
            }
        });
        updateLS();
    });
}

toolbarButtons();

function dragItems() {
    const draggables = document.querySelectorAll('.draggable');
    const container  = document.querySelector('#todos-ul:not(#todo-list-categories-ul)');

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

// reoder categories DRAG and DROP
function reorderCategoryLists() {
    const draggableLists    = document.querySelectorAll('.draggable-list');
    const dragListContainer = document.querySelector('#todo-list-categories-ul:not(#todos-ul)');

    draggableLists.forEach(dragList => {
        dragList.addEventListener('dragstart', () => {dragList.classList.add('dragging-list');});
        dragList.addEventListener('dragend',   () => {dragList.classList.remove('dragging-list');});
        dragListContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            const afterElement = getDragListAfterElement(dragListContainer, e.clientY);
            const draggableList = document.querySelector('.dragging-list');
            if(afterElement == null){
                dragListContainer.appendChild(draggableList);
                updateLS();
            } else {
                dragListContainer.insertBefore(draggableList, afterElement);
                updateLS();
            }
        })
    })

    function getDragListAfterElement(dragListContainer, y){
        const draggableElements = [...dragListContainer.querySelectorAll('.draggable-list:not(.dragging-list)')];

        return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if(offset < 0 && offset > closest.offset){
                    return { offset: offset, element: child}
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;
        }
}

reorderCategoryLists();