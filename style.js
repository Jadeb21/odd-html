function submitQuiz() {
    // Tableau des bonnes réponses
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
        qB: ["qBa"] // bonus
    };

    let score = 0;
    let total = 11; // 10 questions + 1 bonus
    let erreurs = [];

    // Fonction pour vérifier les réponses uniques (radio)
    function checkRadio(question, bonneId) {
        const selected = document.querySelector(`input[name=${question}]:checked`);
        if (selected && selected.id === bonneId) {
            return true;
        } else {
            erreurs.push(question);
            return false;
        }
    }

    // Fonction pour vérifier les réponses multiples (checkbox)
    function checkCheckbox(bonnesIds) {
        return bonnesIds.every(id => document.getElementById(id)?.checked) &&
               document.querySelectorAll(`input[type=checkbox]:checked`).length === bonnesIds.length;
    }

    // Vérification
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

    // Affichage du score
    alert(`Tu as obtenu ${score}/${total} !`);

    // Optionnel : afficher les questions où tu t’es trompé
    if (erreurs.length > 0) {
        alert("Tu t'es trompé sur : " + erreurs.join(", "));
    }
}
