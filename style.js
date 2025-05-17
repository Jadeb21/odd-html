
console.log("JS chargé !");


function startQuiz() {
    document.getElementById("startBtn").style.display = "none"; // Cache le bouton
    document.getElementById("quizContainer").style.display = "block"; // Affiche le quiz
}

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
    let total = 11; 
    let erreurs = [];

    function checkRadio(question, bonneId) {
        const selected = document.querySelector(`input[name=${question}]:checked`);
        if (selected && selected.id === bonneId) {
            return true;
        } else {
            erreurs.push(question);
            return false;
        }
    }

    function checkCheckbox(bonnesIds) {
    const prefix = bonnesIds[0].slice(0, 2);
    const checkboxes = Array.from(document.querySelectorAll(`input[type="checkbox"][id^=${prefix}]`));
    const cochés = checkboxes.filter(cb => cb.checked).map(cb => cb.id);
    cochés.sort();
    bonnesIds.sort();
    return JSON.stringify(cochés) === JSON.stringify(bonnesIds);
}


    if (checkRadio("q1", bonnesReponses.q1)) score++;
    if (checkRadio("q2", bonnesReponses.q2)) score++;
    if (checkRadio("q3", bonnesReponses.q3)) score++;
    if (checkCheckbox(bonnesReponses.q4)) score++;
    else erreurs.push("q4");
    if (checkCheckbox(bonnesReponses.q5)) score++;
    else erreurs.push("q5");
    if (checkRadio("q6", bonnesReponses.q6)) score++;
    if (checkRadio("q7", bonnesReponses.q7)) score++;
    if (checkCheckbox(bonnesReponses.q8)) score++;
    else erreurs.push("q8");
    if (checkCheckbox(bonnesReponses.q9)) score++;
    else erreurs.push("q9");
    if (checkCheckbox(bonnesReponses.q10)) score++;
    else erreurs.push("q10");
    if (checkCheckbox(bonnesReponses.qB)) score++;
    else erreurs.push("qB");

    alert(`Tu as obtenu ${score}/${total} !`);

    if (erreurs.length > 0) {
        alert("Tu t'es trompé sur : " + erreurs.join(", "));
    }
}


