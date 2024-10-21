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

// Fisher-Yates shuffle for randomizing the array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Randomize the questions at the start
shuffle(questions);

// Load the question and shuffle the options
function loadQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let options = currentQuestion.options.slice(); // Create a copy of options array
    
    // Shuffle the options for random order
    shuffle(options);
    
    document.getElementById("question").textContent = currentQuestion.question;
    
    let buttons = document.getElementsByClassName("option");
    
    // Display shuffled options
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = options[i];
        
        // Check if the selected option matches the original correct answer
        buttons[i].onclick = function() {
            checkAnswer(options[i], currentQuestion.correctAnswer);
        };
    }
}

// Check if the selected answer is correct
function checkAnswer(selectedOption, correctAnswerIndex) {
    let correctAnswer = questions[currentQuestionIndex].options[correctAnswerIndex];
    
    if (selectedOption === correctAnswer) {
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
        shuffle(questions); // Re-shuffle questions for next round
        loadQuestion();
    }
}

// Load the first question on page load
window.onload = function () {
    loadQuestion();
};
