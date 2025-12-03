const questions = [
    { question: "Ո՞ր երկիրը ընդհանրապես չունի ոչ մի գետ։", options: ["a) Կատար", "b) ԱՄԷ", "c) Սաուդյան Արաբիա", "d) Լիբիա"], correct: "c" },
    { question: "Թվային հաջորդականություն՝ 2, 3, 5, 9, 17, 33… Ի՞նչ է հաջորդը?", options: ["65", "64", "66", "67"], correct: "65" },
    { question: "Ո՞ր մոլորակի վրա մեկ տարին ավելի կարճ է, քան մեկ օրը։", options: ["a) Վեներա", "b) Մերկուրի", "c) Մարս", "d) Սատուրն"], correct: "a" },
    { question: "Ո՞ր կենդանին ունի երեք սիրտ։", options: ["a) Կաղամար", "b) Ութոտնուկ", "c) Կոկորդիլոս", "d) Ընձուղտ"], correct: "b" },
    { question: "Ո՞ր կենդանին պաշտոնապես ճանաչված է որպես կենսաբանորեն անմահ (չի ծերանում)։", options: ["a) Գրենլանդական շնաձուկ", "b) Meduza Turritopsis dohrnii («անմահ մեդուզա»)", "c) Հսկա կրիա", "d) Լոբստեր"], correct: "b" },
    { question: "Ո՞ր ընկերությունն է ստեղծել աշխարհում առաջին սենսորային էկրանով սմարթֆոնը (1994 թ.)։", options: ["a) Nokia", "b) IBM", "c) Motorola", "d) Apple"], correct: "b" },
    { question: "Ո՞վ է իրականում հորինել համակարգչային մկնիկը։", options: ["a) Սթիվ Ջոբս", "b) Դուգլաս Էնգելբարտ", "c) Ալան Թյուրինգ", "d) Բիլ Գեյթս"], correct: "b" }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');

function loadQuestion() {
    const q = questions[currentQuestion];
    questionEl.innerHTML = q.question;
    optionsEl.innerHTML = '';

    q.options.forEach(option => {
        const div = document.createElement('div');
        div.classList.add('option');
        div.innerHTML = option;
        div.onclick = () => chooseOption(div, option);
        optionsEl.appendChild(div);
    });

    nextBtn.disabled = true;
    nextBtn.textContent = "Հաջորդ հարցը →";
}

function chooseOption(selectedDiv, selectedText) {
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
        opt.style.pointerEvents = 'none';
    });

    selectedDiv.classList.add('selected');

    const correctAnswer = questions[currentQuestion].correct;
    const firstChar = selectedText.trim().charAt(0);
    if (firstChar === correctAnswer || selectedText.includes(correctAnswer)) {
        score++;
    }

    nextBtn.disabled = false;
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    document.getElementById('question-container').classList.add('hidden');
    nextBtn.classList.add('hidden');
    resultEl.classList.remove('hidden');

    let html = '';

    if (score === questions.length) {
        // 7/7 — только поздравление и картинка
        html = `
            <h2 style="color:#005eb8; font-size:2.2rem;">Շնորհավորում ենք!</h2>
            <p style="font-size:1.4rem; margin:20px 0;">Դուք կատարյալ արդյունք եք ցույց տվել</p>
            <img src="picture.jpg" alt="Հաղթանակ" class="congrats-image">
        `;
    } else {
        // Любой другой результат — только счёт
        html = `
            <strong style="font-size:2.5rem; color:#d32f2f;">${score} / ${questions.length}</strong>
            <p style="margin-top:20px; font-size:1.3rem;">Փորձեք նորից, դուք շատ մոտ եք</p>
        `;
    }

    scoreEl.innerHTML = html;
}

loadQuestion();