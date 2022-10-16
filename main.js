import { quizData } from './quiz_data.js';

const question = $('#question');
const quesNo = $('#ques-no');
const submitBtn = $('.submit');
const nextQuizBtn = $('.next-quiz');

let currentQuiz = 0;
let score=0;

loadQuiz();

function loadQuiz(){
    const currentQuizData=quizData[currentQuiz];
    question.text(currentQuizData.question);
    quesNo.text("Q"+(currentQuiz+1)+" LEVEL"+(quizData[currentQuiz].level));
    $('#a-text').text(currentQuizData.choices[0]);
    $('#b-text').text(currentQuizData.choices[1]);
    $('#c-text').text(currentQuizData.choices[2]);
}

function getAnswered(){
    return document.quizForm.answer.value;
}

function showResults(results){
    $('#quiz-form').hide();
    $('#quiz-results').show();
    $('#results').text(results);
    $('#sold-shop').text("この商品があるお店 : "+quizData[currentQuiz].shop);
    $('#products-img').attr('src', './images/Q'+(currentQuiz+1)+'.jpeg');
}

function showQuiz(){
    $('#quiz-form').show();
    $('#quiz-results').hide();
}

submitBtn.on('click', ()=> {
    const answer = getAnswered();
    const currentQuizData=quizData[currentQuiz];
    if(answer){
        if (currentQuizData.correct[0]===answer){
            showResults("正解");
            score++;
        } else {
            showResults("残念... 答えは"+currentQuizData.choices[currentQuizData.correct[1]-1]+"でした。");
        }
    }

    document.getElementById(answer).checked=false;
});

nextQuizBtn.on('click', ()=> {
    currentQuiz++;
    if (currentQuiz<quizData.length){
        loadQuiz();
        showQuiz();
    }else{
        alert(`あなたの正答数は${score}です！`);
        window.location.reload();
    }
});