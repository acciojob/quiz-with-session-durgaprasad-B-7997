const quizData = [
  {
    question: "What is 2 + 2?",
    options: ["2", "3", "4", "5"],
    correct: "2"
  },
  {
    question: "Capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: "2"
  },
  {
    question: "What color is the sky?",
    options: ["Blue", "Green", "Yellow", "Red"],
    correct: "0"
  },
  {
    question: "HTML stands for?",
    options: ["Hyper Trainer Markup Language", "HyperText Markup Language", "HyperText Machine Language", "None"],
    correct: "1"
  },
  {
    question: "JavaScript is?",
    options: ["A type of coffee", "A programming language", "A CSS framework", "None"],
    correct: "1"
  }
];

const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

function loadProgress() {
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
  quizData.forEach((q, qIndex) => {
    const qContainer = document.createElement("div");
    qContainer.classList.add("question");

    const questionEl = document.createElement("p");
    questionEl.textContent = `${qIndex + 1}. ${q.question}`;
    qContainer.appendChild(questionEl);

    q.options.forEach((option, oIndex) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${qIndex}`;
      input.value = oIndex;

      if (savedProgress[`q${qIndex}`] == oIndex) {
        input.checked = true;
      }

      input.addEventListener("change", () => {
        saveAnswer(qIndex, oIndex);
      });

      label.appendChild(input);
      label.append(` ${option}`);
      qContainer.appendChild(label);
      qContainer.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(qContainer);
  });

  const storedScore = localStorage.getItem("score");
  if (storedScore !== null) {
    scoreDiv.textContent = `Your score is ${storedScore} out of ${quizData.length}.`;
  }
}

function saveAnswer(qIndex, oIndex) {
  const currentProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
  currentProgress[`q${qIndex}`] = oIndex;
  sessionStorage.setItem("progress", JSON.stringify(currentProgress));
}

function calculateScore() {
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
  let score = 0;

  quizData.forEach((q, index) => {
    if (savedProgress[`q${index}`] == q.correct) {
      score++;
    }
  });

  localStorage.setItem("score", score);
  scoreDiv.textContent = `Your score is ${score} out of ${quizData.length}.`;
}

submitBtn.addEventListener("click", calculateScore);

document.addEventListener("DOMContentLoaded", loadProgress);
