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

    for (let i=0; i<len; i++) {
        const x = generateX();
        password += x;
    }

    pwEl.innerText = password;
    console.log(password)
}

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

copyEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = pwEl.innerText;
    
    if(!password) { return; }
    
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});