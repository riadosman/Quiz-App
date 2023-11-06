// declare the element from html document
let countSpan = document.querySelector(".count span");
let bulletsSpanCOntianer = document.querySelector(".bullets .spans")
let quizArea = document.querySelector(".quiz-area");
let submitButton = document.querySelector(".submit-button");
let answersArea = document.querySelector(".answers-area");
let bullets = document.querySelector(".bullets");
let countdownElement = document.querySelector('.countdown');
let resultsContainer = document.querySelector(".results");
// declare the global variable to use anywhere in the app
let currentIndex = 0;
let rightAnswers = 0;
let countDOwnInterval;
// create the main function for app
function getQuestion() {
 let myRequest = new XMLHttpRequest();
 console.log("🚀 ~ file: index.js:17 ~ getQuestion ~ myRequest:", myRequest)
 myRequest.onreadystatechange  = function (){
    if (this.readyState === 4 && this.status === 200){
        let questionsObject = JSON.parse(this.responseText);
        let qCount = questionsObject.length;
                        createBullets(qCount);
                        addQustionData(questionsObject[currentIndex],qCount);
        // countdown(5, qCount)
        submitButton.onclick = ()=>{
            let theRightAnswer = questionsObject[currentIndex].right_answer;
            currentIndex++;
                        checkAnswer(theRightAnswer,qCount);
            quizArea.innerHTML = '';
            answersArea.innerHTML ='';
                        addQustionData(questionsObject[currentIndex],qCount)
            clearInterval(countDOwnInterval)
                        handleBulets();
            // countdown(3,qCount);
                        showREsult(qCount);
        }
    }
 };
 myRequest.open("GET" ,"questions.json",true);
 myRequest.send();
}
getQuestion();




function createBullets(num){
    countSpan.innerHTML = num;
    for(let i =0 ;i<num ; i++){
        let theBullet = document.createElement("span");
        if (i === 0) {
            theBullet.className = "on";
        }
        bulletsSpanCOntianer.appendChild(theBullet);
    }
}


function addQustionData(obj,count){
    if (currentIndex < count) {
        let questionTItle = document.createElement("h2");
        let questionText = document.createTextNode(obj.title);
        questionTItle.appendChild(questionText);
        quizArea.appendChild(questionTItle);
        for (let i = 1; i <= 4; i++) {
            let mainDIv = document.createElement("div");
            mainDIv.className = 'answer';
            let radioInput = document.createElement("input");
            radioInput.name = 'question';
            radioInput.type = 'radio';
            radioInput.id = `answer_${i}`;
            radioInput.dataset.answer = obj[`answer_${i}`];
            if (i === 1) {
                radioInput.checked = true;
            }
            let theLable = document.createElement("label");
            theLable.htmlFor = `answer_${i}`;
            let theLableText = document.createTextNode(obj[`answer_${i}`])
            theLable.appendChild(theLableText);
            mainDIv.appendChild(radioInput);
            mainDIv.appendChild(theLable);
            answersArea.appendChild(mainDIv);
        }
    }
}



function checkAnswer(rAnswer,count){
    let answers = document.getElementsByName("question");
    let theChosenAnswer;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            theChoosenAnswer = answers[i].dataset.answer;
        }
    }
    if (rAnswer === theChoosenAnswer) {
        rightAnswers++;
        // console.log("correct");
    }
}

function handleBulets(){
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpan = Array.from(bulletsSpans);
    arrayOfSpan.forEach((span,index)=>{
        if (currentIndex === index){
            span.className = 'on';
        }
    })
}

function showREsult(count) {
    let theResults;
    if (currentIndex === count) {
        quizArea.remove();
        answersArea.remove();
        submitButton.remove();
        bullets.remove();
        if (rightAnswers > count / 2  && rightAnswers < count) {
            theResults = `<span class="good">GOOD</span>, ${rightAnswers} from ${count} is GOOD`
        }else if(rightAnswers === count){
            theResults = `<span class="perfect">PERFECT</span>, all answers is good`
        }else{
            theResults = `<span class="bad">BAD</span>, ${rightAnswers} from ${count} is bad`
        }
        resultsContainer.innerHTML = theResults;
        resultsContainer.style.padding = '10px';
        resultsContainer.style.backgroundColor = 'white';
        resultsContainer.style.marginTop = '10px';
    }
}


// function countdown(duration, count){
//     if(currentIndex < count){
//         let minutes, seconds;
//         countDOwnInterval = setInterval(function(){
//             minutes = parseInt(duration / 60);
//             seconds = parseInt (duration % 60);
//             minutes = minutes < 10 ? `0${minutes}` : minutes;
//             seconds = seconds < 10 ? `0${seconds}` : seconds;
//             countdownElement.innerHTML = `${minutes}:${seconds}`;
//             if (--duration < 0) {
//                 clearInterval(countDOwnInterval);
//                 submitButton.click();
//             }
//         },1000)
//     }
// }