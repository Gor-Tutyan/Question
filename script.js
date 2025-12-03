// === СТАРТОВЫЙ ЭКРАН ===
document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-screen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('quiz').classList.remove('hidden');
        loadQuestion();
    }, 800);
});

// === ВОПРОСЫ ===
const questions = [
    { question: "Ո՞ր երկիրը ընդհանրապես չունի ոչ մի գետ։", options: ["a) Կատար", "b) ԱՄԷ", "c) Սաուդյան Արաբիա", "d) Լիբիա"], correct: "c" },
    { question: "Թվային հաջորդականություն՝ 2, 3, 5, 9, 17, 33… որ թիվն է հաջորդը?", options: ["65", "64", "66", "67"], correct: "65" },
    { question: "Ո՞ր մոլորակի վրա է մեկ տարին ավելի կարճ, քան մեկ օրը։", options: ["a) Վեներա", "b) Մերկուրի", "c) Մարս", "d) Սատուրն"], correct: "a" },
    { question: "Քանի անգամ կհանդիպի 9 թվանշանը 1-ից մինչև 100-ը ներառյալ թվերի մեջ։", options: ["a) 11", "b) 19", "c) 20", "d) 21"], correct: "c" },
    { question: "Եթե E = 5, ապա BOX = ?։", options: ["a) 40", "b) 41", "c) 42", "d) 45"], correct: "b" },
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
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    selectedDiv.classList.add('selected');

    const correctAnswer = questions[currentQuestion].correct;
    const firstChar = selectedText.trim().charAt(0);
    selectedDiv.dataset.correct = (firstChar === correctAnswer).toString();

    nextBtn.disabled = false;
}

nextBtn.onclick = () => {
    const selected = document.querySelector('.option.selected');
    if (selected && selected.dataset.correct === "true") score++;

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
        // ВСЁ ПРАВИЛЬНО — ПОБЕДА!
        html = `
            <h2 style="color:#005eb8; font-size:2.6rem; margin-bottom:20px;">Շնորհավորում եմ թեռնիկս!</h2>
            <p style="font-size:1.7rem; margin:30px 0;">Գնա և վերցրու քո նվերը ♡</p>
            <img src="picture.jpg" alt="Քո նվերը" class="congrats-image">
        `;
    } else {
        // ЕСТЬ ОШИБКИ — милый грустный гиф
        html = `
            <h2 style="color:#e74c3c; font-size:2.4rem;">${score} / ${questions.length}</h2>
            <p style="font-size:1.8rem; margin:30px 0;">Փորձիր նորից, դու շատ մոտ ես ♡</p>
            <img src="./grinch.gif" 
                 alt="Не грусти" class="sad-gif">
        `;
    }

    scoreEl.innerHTML = html;
}