const questions = [
    {
        question: "Who is the fonder of java script",
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
const questionElement = document.getElementById("question");
const buttonsContainer = document.getElementById("buttons");
const nextButton = document.getElementById("nextBtn");
const scoreElement = document.getElementById("score");
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
function resetState() {
    nextButton.style.display = "none";
    while (buttonsContainer.firstChild) {
        buttonsContainer.removeChild(buttonsContainer.firstChild);
    }
}
function selectAnswer(button, index, correctIndex) {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(btn => btn.disabled = true);
    if (index === correctIndex) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
        buttons[correctIndex].classList.add("correct");
    }
    nextButton.style.display = "block";
}
function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
function showScore() {
    resetState();
    questionElement.innerText = `Quiz Completed!`;
    scoreElement.innerText = `Your Score: ${score} / ${questions.length}`;
    nextButton.innerText = "Restart Quiz";
    nextButton.style.display = "block";
}
showQuestion();
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextQuestion();
    } else {
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
        scoreElement.innerText = "";
    }
});
