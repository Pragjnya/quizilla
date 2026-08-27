// ================================
// API CONFIGURATION
// ================================
const API_BASE_URL = "http://localhost:8086/api";
// ================================
// APPLICATION STATE
// ================================
let quizzes = [];
let currentQuiz = null;
let questions = [];
let currentQuestionIndex = 0;
let selectedAnswers = [];
// ================================
// DOM ELEMENTS
// ================================
const homeScreen = document.querySelector("#home-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const quizList = document.querySelector("#quiz-list");
const quizCount = document.querySelector("#quiz-count");
const quizCategory = document.querySelector("#quiz-category");
const quizTitle = document.querySelector("#quiz-title");
const currentQuestionNumber = document.querySelector(
    "#current-question-number"
);
const totalQuestionNumber = document.querySelector(
    "#total-question-number"
);
const questionLabelNumber = document.querySelector(
    "#question-label-number"
);
const questionText = document.querySelector("#question-text");
const optionsContainer = document.querySelector(
    "#options-container"
);
const progressBar = document.querySelector("#progress-bar");
const nextButton = document.querySelector("#next-button");
const backButton = document.querySelector("#back-button");
const scoreNumber = document.querySelector("#score-number");
const totalScore = document.querySelector("#total-score");
const resultMessage = document.querySelector("#result-message");
const scoreDescription = document.querySelector(
    "#score-description"
);
const playAgainButton = document.querySelector(
    "#play-again-button"
);
const answerReviewList = document.querySelector(
    "#answer-review-list"
);
const notificationContainer = document.querySelector(
    "#notification-container"
);
// ================================
// NOTIFICATIONS
// ================================
function showNotification(
    title,
    message,
    type = "info"
) {
    const notification =
        document.createElement("div");
    notification.className =
        `notification ${type}`;
    notification.innerHTML = `
        <span class="notification-title">
            ${title}
        </span>
        <span class="notification-message">
            ${message}
        </span>
    `;
    notificationContainer.appendChild(
        notification
    );
    setTimeout(() => {
        notification.classList.add(
            "removing"
        );
        setTimeout(() => {
            notification.remove();
        }, 250);

    }, 4000);
}
// ================================
// SCREEN MANAGEMENT
// ================================
function showScreen(screenToShow) {
    document.querySelectorAll(".screen").forEach((screen) => {
        screen.classList.remove("active-screen");
    });
    screenToShow.classList.add("active-screen");
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
// ================================
// GET ALL QUIZZES
// ================================
async function loadQuizzes() {
    try {
        const response = await fetch(
            `${API_BASE_URL}/quizzes`
        );
        if (!response.ok) {
            throw new Error("Failed to load quizzes");
        }
        quizzes = await response.json();
        renderQuizzes();
    } catch (error) {
        console.error(error);
        quizList.innerHTML = `
            <div class="loading-card">
                😭 QUIZZES ESCAPED THE SERVER.
                <br>
                CHECK IF BACKEND IS RUNNING.
            </div>
        `;
        quizCount.textContent = "SERVER SAD";
    }
}
// ================================
// RENDER QUIZ CARDS
// ================================
function renderQuizzes() {
    quizCount.textContent =
        `${quizzes.length} QUIZZES READY`;
    quizList.innerHTML = "";
    quizzes.forEach((quiz) => {
        const quizCard = document.createElement("article");
        quizCard.className = "quiz-card";
        quizCard.innerHTML = `
            <span class="quiz-card-category">
                ${quiz.category}
            </span>
            <h3>${quiz.title}</h3>
            <p>${quiz.description}</p>
            <button class="play-button">
                PLAY THIS CHAOS →
            </button>
        `;
        quizCard.addEventListener("click", () => {
            startQuiz(quiz);
        });
        quizList.appendChild(quizCard);
    });
}
// ================================
// START SELECTED QUIZ
// ================================
// ================================
// START SELECTED QUIZ
// ================================
async function startQuiz(quiz) {
    try {
        currentQuiz = quiz;
        const response = await fetch(
            `${API_BASE_URL}/questions/quiz/${quiz.id}`
        );
        if (!response.ok) {
            throw new Error(
                "Failed to load questions"
            );
        }
        questions = await response.json();
        if (questions.length === 0) {
            showNotification(
                "QUIZ NOT READY YET",
                "This quiz does not have any questions yet. Check back once questions have been added.",
                "info"
            );
            return;
        }
        currentQuestionIndex = 0;
        selectedAnswers = new Array(
            questions.length
        ).fill(null);
        quizCategory.textContent =
            quiz.category.toUpperCase();
        quizTitle.textContent =
            quiz.title;
        totalQuestionNumber.textContent =
            questions.length;
        showScreen(quizScreen);
        renderCurrentQuestion();
    } catch (error) {
        console.error(error);
        showNotification(
            "QUESTIONS COULDN'T LOAD",
            "We couldn't load this quiz right now. Please make sure the backend is running and try again.",
            "error"
        );
    }
}
// ================================
// RENDER CURRENT QUESTION
// ================================
function renderCurrentQuestion() {
    const question =
        questions[currentQuestionIndex];
    const questionNumber =
        currentQuestionIndex + 1;
    currentQuestionNumber.textContent =
        questionNumber;
    questionLabelNumber.textContent =
        String(questionNumber).padStart(2, "0");
    questionText.textContent =
        question.questionText;
    progressBar.style.width =
        `${(questionNumber / questions.length) * 100}%`;
    optionsContainer.innerHTML = "";
    const options = [
        { letter: "A", text: question.optionA },
        { letter: "B", text: question.optionB },
        { letter: "C", text: question.optionC },
        { letter: "D", text: question.optionD }
    ];
    options.forEach((option) => {
        const optionButton =
            document.createElement("button");
        optionButton.className =
            "option-button";
        optionButton.innerHTML = `
            <span class="option-letter">
                ${option.letter}
            </span>
            <span>
                ${option.text}
            </span>
        `;
        if (
            selectedAnswers[currentQuestionIndex]
            === option.letter
        ) {
            optionButton.classList.add("selected");
        }
        optionButton.addEventListener("click", () => {
            selectedAnswers[currentQuestionIndex] =
                option.letter;
            document
                .querySelectorAll(".option-button")
                .forEach((button) => {
                    button.classList.remove("selected");
                });
            optionButton.classList.add("selected");
            nextButton.disabled = false;
        });

        optionsContainer.appendChild(optionButton);
    });

    nextButton.disabled =
        selectedAnswers[currentQuestionIndex] === null;
    if (
        currentQuestionIndex === questions.length - 1
    ) {
        nextButton.textContent = "SUBMIT THE DAMAGE →";
    } else {
        nextButton.textContent = "NEXT QUESTION →";
    }
}
// ================================
// NEXT QUESTION / SUBMIT
// ================================
nextButton.addEventListener("click", () => {
    if (
        selectedAnswers[currentQuestionIndex] === null
    ) {
        return;
    }

    if (
        currentQuestionIndex <
        questions.length - 1
    ) {
        currentQuestionIndex++;

        renderCurrentQuestion();
    } else {

        submitQuiz();
    }
});
// ================================
// SUBMIT QUIZ
// ================================

// ================================
// SUBMIT QUIZ
// ================================
async function submitQuiz() {
    try {
        nextButton.disabled = true;
        nextButton.textContent =
            "CALCULATING RESULTS...";
        const answers = questions.map(
            (question, index) => {
                return {
                    questionId: question.id,
                    selectedAnswer:
                        selectedAnswers[index]
                };
            }
        );
        const response = await fetch(
            `${API_BASE_URL}/quizzes/submit`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    quizId: currentQuiz.id,
                    answers: answers
                })
            }
        );
        if (!response.ok) {
            throw new Error(
                "Failed to submit quiz"
            );
        }
        const result =
            await response.json();
           console.log("QUIZ RESULT FROM BACKEND:", result); 
        showResult(result);
    } catch (error) {
        console.error(error);
        showNotification(
            "RESULTS COULDN'T LOAD",
            "Your quiz was not submitted successfully. Please try again.",
            "error"
        );
        nextButton.disabled = false;
        nextButton.textContent =
            "SUBMIT QUIZ →";
    }
}
// ================================
// SHOW RESULT
// ================================
// ================================
// SHOW RESULT
// ================================
// ================================
// SHOW RESULT
// ================================
function showResult(result) {
    scoreNumber.textContent = result.score;
    totalScore.textContent =
        result.totalQuestions;
    resultMessage.textContent =
        result.message;
    scoreDescription.textContent =
        `You completed ${currentQuiz.title}. Review your answers below.`;
    renderAnswerReview(
        result.answerReviews || []
    );
    showScreen(resultScreen);
}
// ================================
// RENDER ANSWER REVIEW
// ================================
function renderAnswerReview(answers) {
    answerReviewList.innerHTML = "";
    if (answers.length === 0) {
        answerReviewList.innerHTML = `
            <div class="review-card">
                <p>
                    Detailed answer information was not returned by the backend.
                </p>
            </div>
        `;
        return;
    }

    answers.forEach(
        (answer, index) => {
            const reviewCard =
                document.createElement("article");
            reviewCard.className =
                `review-card ${
                    answer.correct
                        ? "correct"
                        : "incorrect"
                }`;
            const statusText =
                answer.correct
                    ? "CORRECT"
                    : "INCORRECT";
            reviewCard.innerHTML = `
                <span
                    class="review-status ${
                        answer.correct
                            ? "correct"
                            : "incorrect"
                    }"
                >
                    ${statusText}
                </span>
                <h3 class="review-question">
                   ${index + 1}. ${answer.questionText}
                </h3>
                <div class="answer-row">
                    <span class="answer-label">
                        YOUR ANSWER
                    </span>
                    <span
                        class="answer-value ${
                            answer.correct
                                ? ""
                                : "your-answer-wrong"
                        }"
                    >
                        ${answer.selectedAnswer}:
                        ${answer.selectedAnswerText}
                    </span>
                </div>
                <div class="answer-row">
                    <span class="answer-label">
                        CORRECT ANSWER
                    </span>
                    <span
                        class="answer-value correct-answer"
                    >
                        ${answer.correctAnswer}:
                        ${answer.correctAnswerText}
                    </span>
                </div>
            `;
            answerReviewList.appendChild(
                reviewCard
            );
        }
    );
}
// ================================
// BACK TO HOME
// ================================
backButton.addEventListener("click", () => {
    showScreen(homeScreen);
});
playAgainButton.addEventListener("click", () => {
    showScreen(homeScreen);
});
// ================================
// APPLICATION START
// ================================
loadQuizzes();