
console.log("JS chargé !");


function startQuiz() {
    document.getElementById("startBtn").style.display = "none"; // Cache le bouton
    document.getElementById("quizContainer").style.display = "block"; // Affiche le quiz
}
let nombreEssais = 0;
let attempts = 0;


function submitQuiz() {
    const bonnesReponses = {
        q1: "q1a",
        q2: "q2a",
        q3: "q3a",
        q4: ["q4a", "q4b"],
        q5: ["q5a", "q5b"],
        q6: "q6a",
        q7: "q7a",
        q8: ["q8a", "q8b"],
        q9: ["q9a", "q9b"],
        q10: ["q10a", "q10b", "q10c"],
        qB: ["qBa", "qBb"]
    };

    let score = 0;

    // Questions simples (radio)
    for (let i = 1; i <= 3; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.id === bonnesReponses[`q${i}`]) {
            score++;
        }
    }

    // q6 et q7 (radio)
    for (let i = 6; i <= 7; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.id === bonnesReponses[`q${i}`]) {
            score++;
        }
    }

    // Questions à réponses multiples (checkbox)
    const checkboxQuestions = ["q4", "q5", "q8", "q9", "q10", "qB"];
    checkboxQuestions.forEach(q => {
        const expected = bonnesReponses[q];
        const selected = Array.from(document.querySelectorAll(`input[id^="${q}"]:checked`)).map(el => el.id);
        if (arraysEqual(selected.sort(), expected.sort())) {
            score++;
        }
    });

    // Incrémenter le nombre d’essais
    attempts++;

    // Ajouter une nouvelle ligne au tableau
    const tableBody = document.getElementById("scoreBody");
    const newRow = tableBody.insertRow();
    const attemptCell = newRow.insertCell(0);
    const scoreCell = newRow.insertCell(1);
    attemptCell.textContent = attempts;
    scoreCell.textContent = score;
}

// Fonction utilitaire
function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}
