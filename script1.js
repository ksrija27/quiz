const data=[
    {
        question: "What does CSS stand for?",
        answers: ["Creative Style System", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Syntax"],
        correct: 1
      },
      {
        question: "Which HTML tag is used to display a picture on a webpage?",
        answers: ["<image>", "<img>", "<pic>", "<src>"],
        correct: 1
      },
      {
        question: "Which JavaScript method is used to select an element by ID?",
        answers: ["getElementById()", "querySelectorAll()", "getElementsByTag()", "selectById()"],
        correct: 0
      },
      {
        question: "What does the '===' operator do in JavaScript?",
        answers: [
          "Assigns a value",
          "Compares both value and type",
          "Compares only value",
          "Checks if a variable exists"
        ],
        correct: 1
      },
      {
        question: "Which property is used to make a website responsive?",
        answers: ["position", "z-index", "media queries", "padding"],
        correct: 2
      },
      {
        question: "What is a semantic HTML element?",
        answers: [
          "An element that doesn’t do anything",
          "An element with a specific meaning about its content",
          "An element used only for styling",
          "An element used only for JavaScript"
        ],
        correct: 1
      },
      {
        question: "Which Git command stages all changes for commit?",
        answers: ["git commit -m", "git add .", "git stage", "git init"],
        correct: 1
      },
      {
        question: "Which of these is a frontend JavaScript framework?",
        answers: ["Laravel", "Django", "React", "Spring Boot"],
        correct: 2
      },
      {
        question: "Which HTML tag is used to make text bold?",
        answers: ["<i>", "<em>", "<strong>", "<bold>"],
        correct: 2
      },
      {
        question: "Which HTTP status code means 'Forbidden'?",
        answers: ["401", "403", "404", "500"],
        correct: 1
      }
];
let currentQues=0;
let score=0;
let timeLeft=0;
let timer;
let username="";
const startscr=document.getElementById("start");
const quizBox = document.getElementById("quizbox");
const resultscr = document.getElementById("result");
const question1 = document.getElementById("question");
const answers1 = document.getElementById("answers");
const feedback1 = document.getElementById("feedback");
const nextBtn = document.getElementById("nextbtn");
const timers = document.getElementById("timer");
const progress1 = document.getElementById("progress");
const scoreText = document.getElementById("scoretext");
const userLabel = document.getElementById("userlabel");
function shuffleQuestions(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
document.getElementById("startbtn").onclick=() =>{
    const name=document.getElementById("username").value.trim();
    if(!name) return window.alert("Please enter user name!!");
    username=name;
    userLabel.textContent= ` 👋Hello , ${username}`;
    startscr.classList.add("hide");
    quizBox.classList.remove("hide");
    shuffleQuestions(data);
    loadQuestion();
};
function loadQuestion(){
    clearInterval(timer);
    timeLeft=15;
    timers.textContent=`⏱️ ${timeLeft}s`;
    timer=setInterval(updateTimer,1000);
    const q=data[currentQues];
    question1.textContent=q.question;
    answers1.innerHTML="";
    feedback1.textContent="";
    progress1.textContent=`Question ${currentQues+1} of ${data.length}`;
    q.answers.forEach((answertext,index) =>{
        const btn=document.createElement("button");
        btn.textContent=answertext;
        btn.onclick=()=>selectAnswer(index,btn);
        answers1.appendChild(btn);
    });
}
function updateTimer(){
    timeLeft--;
    timers.textContent=`⏱️ ${timeLeft}s`;
    if(timeLeft===0){
        clearInterval(timer);
        selectAnswer(-1);
    }
}
function selectAnswer(index,selectedbtn=null){
    clearInterval(timer);
    const q=data[currentQues];
    const btns=answers1.querySelectorAll("button");
    btns.forEach((btn1,i) =>{
        btn1.disabled=true;
        if (i === q.correct) btn1.classList.add("correct");
        else if (btn1 === selectedbtn) btn1.classList.add("wrong");
      });
      if (index === q.correct) {
        feedback1.textContent = "✅ Correct!";
        score++;
      } else {
        feedback1.textContent = `❌ Wrong! Correct: ${q.answers[q.correct]}`;
      }
    }
    nextBtn.onclick = () => {
      currentQues++;
      if (currentQues < data.length) {
        loadQuestion();
      } else {
        showResult();
      }
    };
    function showResult() {
      quizBox.classList.add("hide");
      resultscr.classList.remove("hide");
      scoreText.textContent = `${username}, you scored ${score} out of ${data.length}. 🎉`;
  }
    
    document.getElementById("restart").onclick = () => {
      currentQues = 0;
      score = 0;
      resultscr.classList.add("hide");
      startscr.classList.remove("hide");
      document.getElementById("username").value = ""
  };
document.getElementById("themebtn").onclick = () => {
      document.body.classList.toggle("dark-mode");
  };  
    
