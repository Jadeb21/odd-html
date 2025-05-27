
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
    for (let i = 1; i <= 3 ; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.id === bonnesReponses[`q${i}`]) {
            score++;
        }
    }

    // suite q6 et q7 (radio)
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



// ------------------------------
// Animation médusas sur canvas
window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("medusasCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Medusa {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * canvas.height;
            this.size = 30 + Math.random() * 40;
            this.speed = 0.3 + Math.random() * 0.6;
            this.swing = Math.random() * 0.02;
            this.angle = Math.random() * Math.PI * 2;
            this.opacity = 0.1 + Math.random() * 0.4;
            this.color = `rgba(255, 255, 255, ${this.opacity})`; // blanc légèrement transparent
        }
        
        // Anime la meduse
        update() {
            this.angle += this.swing;
            this.y -= this.speed;
            this.x += Math.sin(this.angle) * 0.5;

            if (this.y + this.size < 0) {
                this.reset();
                this.y = canvas.height + this.size;
            }
        }

        draw(ctx) {
            // Corps 
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, this.size * 0.6, this.size * 0.4, 0, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();

            // Tentacules
            for (let i = -2; i <= 2; i++) {
                ctx.beginPath();
                ctx.moveTo(this.x + i * 5, this.y + 5);
                for (let j = 0; j < 10; j++) {
                    const waveX = Math.sin(this.angle + j / 2 + i) * 2;
                    ctx.lineTo(this.x + i * 5 + waveX, this.y + j * 6);
                }
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    const medusas = Array.from({ length: 25 }, () => new Medusa());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        medusas.forEach(m => {
            m.update();
            m.draw(ctx);
        });
        requestAnimationFrame(animate);
    }

    animate();
});

