const form     = document.querySelector('form');
const ul       = document.querySelector('ul');
const button   = document.querySelector('button');
const input    = document.getElementById('item');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
const data     = JSON.parse(localStorage.getItem('items'));

localStorage.setItem('items', JSON.stringify(itemsArray));


const liMaker = (text) => {  // create a variable and assign the text value to it as well as: 
    const li = document.createElement('li'); // creating an li
    li.innerHTML = text;  // add the text to the innerHTML of the created li
    li.innerHTML += `<i class="fas fa-times close-todo hidden"> </i>`; // add this to the text too

    li.addEventListener('click', () => { 
        li.classList.toggle('completed');  // when you click the li it toggles the completed class
    });
    
    // close the li with teh X button which appears on mouse over
    li.onmouseover = li.onmouseout = handler
        
    let closeTodo = li.querySelector('.close-todo');
    
    function handler(e) {
        if (e.type == 'mouseover') {
            closeTodo.classList.remove('hidden');
        }
        if (e.type == 'mouseout') {
            closeTodo.classList.add('hidden');
        }
    }
    
    //function to close the li when you click the X
    closeTodo.addEventListener('click', () => {
        li.remove();
        updateLS();
    });

    ul.appendChild(li);
}

// when the enter button is pressed
form.addEventListener('submit', function (e) {
    // prevent the default form post action
    e.preventDefault();
    //add the value of the input to the items array for LocalStorage    
    itemsArray.push(input.value); 
    // send the items to LocalStorage and stringify them to JSON data
    localStorage.setItem('items', JSON.stringify(itemsArray));
    // function to add the li to the ul
    liMaker(input.value);
    // reset the contents of the input to an empty string
    input.value = "";

});

// command for each of the items in the itemsArray to be added as a li item
data.forEach(item => {
  liMaker(item);
});

// update the local storage
function updateLS() {
    const todosEl = document.querySelectorAll('li');

    const itemsArray = [];

    todosEl.forEach((li) => {
        itemsArray.push(li.innerHTML);
    });

    localStorage.setItem('items', JSON.stringify(itemsArray));
}