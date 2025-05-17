
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




//meduse
const canvas = document.getElementById('medusasCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Medusa {
    constructor(x, y, radius, speedY, wiggle, color) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.radius = radius;
        this.speedY = speedY;
        this.wiggle = wiggle;
        this.color = color;
        this.angle = Math.random() * Math.PI * 2;
    }

    update() {
        this.y -= this.speedY;
        this.angle += this.wiggle;
        this.x = this.baseX + Math.sin(this.angle) * 10;

        if (this.y + this.radius < 0) {
            this.y = canvas.height + this.radius;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        // Tentacules 
        for (let i = -2; i <= 2; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x + i * 5, this.y);
            ctx.quadraticCurveTo(this.x + i * 5 + 2, this.y + this.radius * 1.5, this.x + i * 5, this.y + this.radius * 3);
            ctx.strokeStyle = this.color;
            ctx.stroke();
        }
    }
}

// Configuration des méduses
const medusas = [
  { x: 355, y: 76, radius: 26, speedY: 0.62, wiggle: 0.047, color: "hsla(215, 100%, 70%, 0.5)" },
  { x: 1118, y: 129, radius: 36, speedY: 0.87, wiggle: 0.044, color: "hsla(211, 100%, 70%, 0.5)" },
  { x: 565, y: 346, radius: 31, speedY: 0.88, wiggle: 0.062, color: "hsla(202, 100%, 70%, 0.5)" },
  { x: 836, y: 154, radius: 24, speedY: 0.34, wiggle: 0.052, color: "hsla(203, 100%, 70%, 0.5)" },
  { x: 896, y: 425, radius: 34, speedY: 0.38, wiggle: 0.062, color: "hsla(183, 100%, 70%, 0.5)" },
  { x: 1029, y: 219, radius: 37, speedY: 0.85, wiggle: 0.079, color: "hsla(183, 100%, 70%, 0.5)" },
  { x: 699, y: 437, radius: 40, speedY: 0.63, wiggle: 0.044, color: "hsla(191, 100%, 70%, 0.5)" },
  { x: 628, y: 779, radius: 30, speedY: 0.3, wiggle: 0.069, color: "hsla(183, 100%, 70%, 0.5)" },
  { x: 867, y: 643, radius: 37, speedY: 0.47, wiggle: 0.07, color: "hsla(214, 100%, 70%, 0.5)" },
  { x: 382, y: 389, radius: 30, speedY: 0.82, wiggle: 0.025, color: "hsla(198, 100%, 70%, 0.5)" }
].map(cfg => new Medusa(cfg.x, cfg.y, cfg.radius, cfg.speedY, cfg.wiggle, cfg.color));

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const m of medusas) {
        m.update();
        m.draw();
    }
    requestAnimationFrame(animate);
}

animate();
