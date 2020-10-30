/*  Code Logic

    To get a password we need to see what boxes are ticked. 
    When a box is ticked we need to generate a random number/letter/symbol etc.
    There is a function which adds to an array these elements when the box is checked.
    You then return the value of that array in the size of teh input length. 

*/

const pwEl         = document.getElementById('pw');
const copyEl       = document.getElementById('copy');
const lengthEl     = document.getElementById('length');
const upperEl      = document.getElementById('upper');
const lowerEl      = document.getElementById('lower');
const numberEl     = document.getElementById('number');
const symbolEl     = document.getElementById('symbol');
const generatePwEl = document.getElementById('generate-pw');

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers      = '0123456789';
const symbols      = '!£$%^&*()_+=@';

function getLowercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
} 

function getUppercase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
} 

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
} 

function generatePassword() {
    const len = lengthEl.value;

    let password = '';

 // get the length and then do this for each position/character etc   
    for (let i=0; i<len; i++) {
        const x = generateX();
        password += x; // basically the password equals generateX 
    }

    pwEl.innerText = password;
}

// this takes adds one to an array xs, of either letter/number/symbol
function generateX() {
    const xs = [];
    if(upperEl.checked) {
        xs.push(getUppercase());
    }
    
    if(lowerEl.checked) {
        xs.push(getLowercase());
    }
    
    if(numberEl.checked) {
        xs.push(getNumber());
    }
    
    if(symbolEl.checked) {
        xs.push(getSymbol());
    }
// then get the total array and return the array in the length of the password
    return xs[Math.floor(Math.random() * xs.length)];
}

generatePwEl.addEventListener('click', () => {
    if  (!upperEl.checked &&
        !lowerEl.checked &&
        !numberEl.checked &&
        !symbolEl.checked) {
            alert('please check something')
        } else {
            generatePassword();
        }
    });

    // to copy something it needs to be in an input or text area etc. 
    // as we haven't got one of those we create on, set the value of 
    // it to the value of the password and then copy to clipboard
copyEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = pwEl.innerText;
    
    if(!password) { return; }
    
    textarea.select();
    document.execCommand('copy');
    textarea.remove(); // remove the text area because we only need it for the password
    alert('Password copied to clipboard');
});