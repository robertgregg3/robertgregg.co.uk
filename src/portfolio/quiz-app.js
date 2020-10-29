
const quizData = [
    {
        question : 'How old is Rob?',
        a: '10',
        b: '38',
        c: 'Older Than Gandalf',
        d: 'Don\'t be so rude!',
        correct: 'b'
    },
    {
        question: 'What languages does Rob know?',
        a: 'Javascript, HTML, CSS, PHP, Node.js and more',
        b: 'French, Chinese',
        c: 'Swearing',
        d: 'Sign language in Russian',
        correct: 'a',
    },
    {
        question: 'Should you hire Rob?',
        a: 'You got cash? Yeah!',
        b: 'If I fit the bill then yes!',
        c: 'Stop everything and hire',
        d: 'Absolutely not!',
        correct: 'b',
    }
];
const quiz       = document.getElementById('quiz'); // container for displaying the results
const answerEls  = document.querySelectorAll(".answer"); // find out of a selection has been made
const questionEl = document.getElementById('question'); // the question title
const a_text     = document.getElementById('a_text'); // answer 1
const c_text     = document.getElementById('c_text'); // answer 2
const b_text     = document.getElementById('b_text'); // answer 3
const d_text     = document.getElementById('d_text'); // answer 4
const submitBtn  = document.getElementById('submit'); // submit button

let currentQuiz = 0; // first array in the quiz data
let score = 0; // total score

loadQuiz(); // called everytime you submit

function loadQuiz(){  // when a quiz is loaded
    deselectAnswers(); // deselect all answers
    const currentQuizData = quizData[currentQuiz]; // declare the 1st element of the array. Because "let currentQuiz = 0" above.
 
    questionEl.innerText = currentQuizData.question; // contents is the current question data

    a_text.innerText = currentQuizData.a; // answer 1
    b_text.innerText = currentQuizData.b; // answer 2
    c_text.innerText = currentQuizData.c; // answer 3
    d_text.innerText = currentQuizData.d; // answer 4
}


function getSelected(){  // find out if an radio button has been selected

    let answer = undefined;  

    answerEls.forEach((answerEl) => {  // for each of the 4 answer elements...
        if(answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer; // return an id of the answer. Means that if an ID has been returned then an answer has been selected
}

function deselectAnswers() {  // when you go to another question you want the radio buttons to be all deselected.
    answerEls.forEach((answerEl) => {  // answerEls declared above is anoy of the radio buttons as they all have a class of answer
        answerEl.checked = false;
    });
}

submitBtn.addEventListener('click', () => {  // when the submit button is pressed.

    const answer = getSelected(); // check to see if an answer has been selected.
   
    if(answer) {  // if an answer ID has been returned
        if(answer === quizData[currentQuiz].correct) {  // and if the answer is equal to the correct answer of the current question
            score++;   // increase the score by one
        }
// you still want the next question to be loaded regardless of the answer is right or not.
        currentQuiz++;
        if(currentQuiz < quizData.length) // if the current quiz nuber is larger than than the total questions
            loadQuiz();
        else {  // show the score.
            quiz.innerHTML = `<h2>Your score is ${score} out of ${quizData.length}</h2> <br />
            <button onclick="location.reload()">Take Quiz again</button>`;
        }
    }    
});