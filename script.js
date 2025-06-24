const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Rome"],
    answer: 2
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats"
    ],
    answer: 1
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hypertext Markup Language",
      "Hyper Trainer Marking Language",
      "Hyper Text Marketing Language",
      "Hyper Tool Multi Language"
    ],
    answer: 0
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None of the above"],
    answer: 1
  }
];

const questionsContainer = document.getElementById("questions");
const scoreDisplay = document.getElementById("score");
const submitButton = document.getElementById("submit");

// Load progress from session storage
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Generate quiz UI
questions.forEach((q, i) => {
  const div = document.createElement("div");
  div.innerHTML = `<p>${q.question}</p>`;
  q.options.forEach((opt, j) => {
    const id = `q${i}_opt${j}`;
    div.innerHTML += `
      <label>
        <input type="radio" name="q${i}" value="${j}" id="${id}" ${progress[i] == j ? "checked" : ""}>
        ${opt}
      </label><br>
    `;
  });
  questionsContainer.appendChild(div);
});

// Save selection to sessionStorage
questionsContainer.addEventListener("change", (e) => {
  if (e.target.type === "radio") {
    const qIndex = parseInt(e.target.name.replace("q", ""));
    progress[qIndex] = parseInt(e.target.value);
    sessionStorage.setItem("progress", JSON.stringify(progress));
  }
});

// Check if score exists in localStorage
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreDisplay.textContent = `Your score is ${storedScore} out of ${questions.length}.`;
}

// Submit quiz
submitButton.addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (progress[i] == questions[i].answer) {
      score++;
    }
  }

  // Display and store score
  scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});
