let questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "Who wrote 'To be, or not to be'?",
        options: ["Shakespeare", "Hemingway", "Austen", "Orwell"],
        correctAnswer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    let options = document.getElementsByClassName("option");
    
    for (let i = 0; i < options.length; i++) {
        options[i].textContent = currentQuestion.options[i];
    }
}

function checkAnswer(optionIndex) {
    if (optionIndex === questions[currentQuestionIndex].correctAnswer) {
        score++;
        document.getElementById("score").textContent = score;
        alert("Correct!");
    } else {
        alert("Wrong answer!");
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        alert("Quiz completed! Your final score is " + score);
        currentQuestionIndex = 0;
        score = 0;
        document.getElementById("score").textContent = score;
        loadQuestion();
    }
}

window.onload = function () {
    loadQuestion();
};
