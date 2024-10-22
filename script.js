let questions = [
    {
        question: "How ethanol is produced?",
        options: ["Biomass", "Acids", "Produce by animals", "Starch"],
        correctAnswer: 0
    },
    {
        question: "What is the proto make ethanol?",
        options: ["Distillation of starch", "Fermentation of sugar", "Hydrolysis of cellulose", "Synthesis of glucose"],
        correctAnswer: 1
    },
    {
        question: "The engine works in 4 stages; whate these?",
        options: ["Intake, compression, combustion, discharge", "Intake, compression, ignition, exhaust", "Intake, compression, combustion, exhaustion", "Intake, expansion, combustion, expulsion"],
        correctAnswer: 1
    },
    {
        question: "Why can ethanol lead to improved overall efficiency despite it's low energy content?",
        options: ["Ethanol requires less foil", "when appropriately blended, can prove power milage", " Ethanol has a higher energy density enhancing efficiency ", " Ethanol 
engines have better combustion control, optimizing performance"],
        correctAnswer: 1
    },
    {
        question: "The engine work 4 stages; what are these?",
        options: ["Intake, compression, combustion, discharge", "Intake, compression, ignition, exhaust", "Intake, compression, combustion, exhaustion", "Intake, expansion, combustion, expulsion"],
        correctAnswer: 1
    },
    {
        question: "The engine works in tages; what are these?",
        options: ["Intake, compression, combustion, discharge", "Intake, compression, ignition, exhaust", "Intake, compression, combustion, exhaustion", "Intake, expansion, combustion, expulsion"],
        correctAnswer: 1
    },
    {
        question: "The engine works in 4 stages; what are these?",
        options: ["Intake, compression, combustion, discharge", "Intake, compression, ignition, exhaust", "Intake, compression, combustion, exhaustion", "Intake, expansion, combustion, expulsion"],
        correctAnswer: 1
    },
    {
        question: "The ene works in 4 stages; whare these?",
        options: ["Intake, compression, combustion, discharge", "Intake, compression, ignition, exhaust", "Intake, compression, combustion, exhaustion", "Intake, expansion, combustion, expulsion"],
        correctAnswer: 1
    },
    {
        question: "The eine work in 4 ages; what are these?",
        options: ["Intake, compression, combustion, discharge", "Intake, compression, ignition, exhaust", "Intake, compression, combustion, exhaustion", "Intake, expansion, combustion, expulsion"],
        correctAnswer: 1
    },
    {
        question: "The enne works in 4 stages; at are ese?",
        options: ["Intake, compression, combustion, discharge", "Intake, compression, ignition, exhaust", "Intake, compression, combustion, exhaustion", "Intake, expansion, combustion, expulsion"],
        correctAnswer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = [];  // Store indices of answered questions

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
    // Skip already answered questions when going back
    while (answeredQuestions.includes(currentQuestionIndex) && currentQuestionIndex > 0) {
        currentQuestionIndex--;
    }

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

    // Show or hide the "Back" button based on the current question index and unanswered questions
    if (currentQuestionIndex === 0 || !canGoBack()) {
        document.getElementById("back").style.display = "none"; // Hide "Back" button on the first question or no unanswered questions left
    } else {
        document.getElementById("back").style.display = "block"; // Show "Back" button after the first question
    }
    
    // Update the progress bar
    updateProgressBar();
}

// Check if the selected answer is correct
function checkAnswer(selectedOption, correctAnswerIndex) {
    let correctAnswer = questions[currentQuestionIndex].options[correctAnswerIndex];
    
    if (selectedOption === correctAnswer) {
        score++;
        document.getElementById("score").textContent = score;
        alert("Correct!");
    } else {
        alert("Wrong answer! Moving to next question.");
    }
    
    // Add current question to the list of answered questions
    answeredQuestions.push(currentQuestionIndex);
    
    // Move to the next question after checking the answer (whether correct or wrong)
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        // Display quiz completion message and final score
        alert("Quiz completed! Your final score is " + score);
        
        // Optionally, you can also display a message in the HTML
        document.getElementById("question").textContent = "Quiz Complete! Final Score: " + score;
        document.getElementsByClassName("options")[0].style.display = "none"; // Hide options after completion
        document.getElementById("submit").style.display = "none"; // Hide submit button after completion
        document.getElementById("back").style.display = "none"; // Hide back button after completion
    }
}

// Go back to the previous unanswered question
function goBack() {
    if (canGoBack()) {
        currentQuestionIndex--;
        
        // Skip already answered questions
        while (answeredQuestions.includes(currentQuestionIndex) && currentQuestionIndex > 0) {
            currentQuestionIndex--;
        }
        
        loadQuestion();
    }
}

// Check if we can go back to a previous unanswered question
function canGoBack() {
    for (let i = currentQuestionIndex - 1; i >= 0; i--) {
        if (!answeredQuestions.includes(i)) {
            return true;
        }
    }
    return false;
}

// Update the progress bar
function updateProgressBar() {
    let progress;

    // If all questions are answered, set the progress to 100%
    if (answeredQuestions.length === questions.length) {
        progress = 100;
    } else {
        progress = (answeredQuestions.length / questions.length) * 100;
    }

    document.getElementById("progress-bar").style.width = progress + "%";
}

// Load the first question on page load
window.onload = function () {
    loadQuestion();
};

function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var mainContent = document.getElementById('main-content');
    sidebar.classList.toggle('open');
    mainContent.classList.toggle('shifted');
    document.getElementById('header').classList.toggle('shifted');
}
