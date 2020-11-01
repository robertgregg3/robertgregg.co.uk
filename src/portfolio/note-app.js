/*  CODE LOGIC

    there is a textarea and another same size area behind it
    When we save the note, the area behind has the value of the text area. 
    So you swap hidden classes of text area/other area when youpress save or edit

    Store the textarea value in Local storage.
    When we retrieve the items from Local storage
    we create a new note and add the textarea value as the textarea value

 */


// parsing teh json file with the notes
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes) {
    addNewNote();
}



// if there are notes then make a new note with thr JSON note data
if(notes){
    notes.forEach(note => {
        addNewNote(note); // note is the textarea.value  So for each array item in LS, add a text area.value
    });
}

// green button at the top right
const addBtn = document.querySelector('.add-note');

addBtn.addEventListener('click', () => {    
    //create new EMPTY note from that button but ONLY if an empty note doesnt already exist.  This stops creating endless empty notes.
        const textareas    = document.querySelectorAll('textarea');
        let textAreasValue = true;

        textareas.forEach(textareaEl => {
            if(textareaEl.value === ''){
                textAreasValue = false;
            }
            return textAreasValue;
        });
        
        if(textAreasValue) {
            addNewNote();
        }
});

// setting the variable "text" which will hold the data in the text area
function addNewNote(text = '') {
    const note = document.createElement('div');   
    note.classList.add('note'); 
    
    note.innerHTML = `
        <div class="notes">
            <div class="tools">
            <div class="tool button">
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
            <button class="edit hidden"><i class="fas fa-edit"></i></button>
            <button class="save"><i class="fas fa-save"></i></button>
            </div>
            </div>
            <div class="main hidden">
            </div>
            <textarea></textarea>
        </div>
    `;
    
    const editBtn   = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const saveBtn   = note.querySelector('.save');
    const main      = note.querySelector('.main');
    const textarea  = note.querySelector('textarea');

    textarea.value  = text;
    
    editBtn.addEventListener('click', () => {
        editBtn.classList.add('hidden');
        saveBtn.classList.remove('hidden');
        main.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    });

    saveBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
        saveBtn.classList.add('hidden');
        editBtn.classList.remove('hidden');
    });
    
    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS();
    });

    textarea.addEventListener('input', (e) => {
        const { value } = e.target;
        
        main.innerHTML = marked(value);

        updateLS();
    });

    document.body.appendChild(note);
}

// To local Storage - First define all of the text areas
// assign the value of each text area toan element on an array
// JSON.stringify the array into local storage

function updateLS(){
    const notesText = document.querySelectorAll('textarea');

    const notes = [];

    notesText.forEach((note) => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes)); 
  }