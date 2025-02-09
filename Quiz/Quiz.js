const questions = [
    {
        question: "Who is the founder of JavaScript?",
        answers: ["Dennis Ritchie", "James Gosling", "Brendan Eich", "Bjarne Stroustrup"],
        correct: 2
    },
    {
        question: "What does HTML stand for?",
        answers: ["HyperText Markup Language", "HighText Machine Language", "HyperLoop Markup Language", "HyperText Markdown Language"],
        correct: 0
    },
    {
        question: "Which language runs in a web browser?",
        answers: ["Java", "C", "Python", "JavaScript"],
        correct: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;

const questionElement = document.getElementById("question");
const buttonsContainer = document.getElementById("buttons");
const nextButton = document.getElementById("nextBtn");
const scoreElement = document.getElementById("score");
const bestScoreElement = document.getElementById("bestScore");

// Function to show the question
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];

    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, index, currentQuestion.correct));
        buttonsContainer.appendChild(button);
    });
}

// Function to reset buttons and hide Next button
function resetState() {
    nextButton.style.display = "none";
    while (buttonsContainer.firstChild) {
        buttonsContainer.removeChild(buttonsContainer.firstChild);
    }
}

// Function to handle answer selection and highlight correct/incorrect answer
function selectAnswer(button, index, correctIndex) {
    const buttons = document.querySelectorAll(".btn");

    // Disable all buttons after selection
    buttons.forEach(btn => btn.disabled = true);

    if (index === correctIndex) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
        buttons[correctIndex].classList.add("correct");
    }

    // Show Next button after selecting an answer
    setTimeout(() => {
        nextButton.style.display = "block";
    }, 1000);
}

// Function to handle the "Next" button click
function handleNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Function to show final score and update best score in LocalStorage
function showScore() {
    resetState();
    questionElement.innerText = `🎉 Quiz Completed!`;
    scoreElement.innerHTML = `Your Score: <strong>${score} / ${questions.length}</strong>`;

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
    }

    bestScoreElement.innerHTML = `🏆 Best Score: <strong>${bestScore} / ${questions.length}</strong>`;

    nextButton.innerText = "Restart Quiz";
    nextButton.style.display = "block";
}

// Start the quiz
showQuestion();

// Ensure Next button works properly
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextQuestion();
    } else {
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
        scoreElement.innerText = "";
        nextButton.innerText = "Next"; // ✅ Reset button text after restart
    }
});

// Fetch additional questions from an API (optional)
async function fetchQuestions() {
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=3&type=multiple");
        if (!response.ok) throw new Error("Failed to fetch questions.");
        const data = await response.json();

        data.results.forEach(q => {
            questions.push({
                question: q.question,
                answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
                correct: q.answers.indexOf(q.correct_answer)
            });
        });

        showQuestion();
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
}

// Uncomment to use API fetching
// fetchQuestions();
