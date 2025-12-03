const questions = [
    { question: "Ո՞ր երկիրը ընդհանրապես չունի ոչ մի գետ։", options: ["a) Կատար", "b) ԱՄԷ", "c) Սաուդյան Արաբիա", "d) Լիբիա"], correct: "c" },
    { question: "Թվային հաջորդականություն՝ 2, 3, 5, 9, 17, 33… Ի՞նչ է հաջորդը?", options: ["65", "64", "66", "67"], correct: "65" },
    { question: "Ո՞ր մոլորակի վրա մեկ տարին ավելի կարճ է, քան մեկ օրը։", options: ["a) Վեներա", "b) Մերկուրի", "c) Մարս", "d) Սատուրն"], correct: "a" },
    { question: "Ո՞ր կենդանին ունի երեք սիրտ։", options: ["a) Կաղամար", "b) Ութոտնուկ", "c) Կոկորդիլոս", "d) Ընձուղտ"], correct: "b" },
    { question: "Ո՞ր կենդանին պաշտոնապես ճանաչված է որպես կենսաբանորեն անմահ (չի ծերանում)։", options: ["a) Գրենլանդական շնաձուկ", "b) Meduza Turritopsis dohrnii («անմահ մեդուզա»)", "c) Հսկա կրիա", "d) Լոբստեր"], correct: "b" },
    { question: "Ո՞ր ընկերությունն է ստեղծել աշխարհում առաջին սենսորային էկրանով սմարթֆոնը (1994 թ., 13 տարի առաջ iPhone-ից)։", options: ["a) Nokia", "b) IBM", "c) Motorola", "d) Apple"], correct: "b" },
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
}

function chooseOption(selectedDiv, selectedText) {
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
        opt.style.pointerEvents = 'none';
    });

    selectedDiv.classList.add('selected');

    // Надёжная проверка (старая логика, которая работала идеально)
    const correctAnswer = questions[currentQuestion].correct;
    const letter = selectedText.trim().charAt(0);           // a, b, c, d или число
    if (letter === correctAnswer || selectedText.includes(correctAnswer)) {
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

    let html = ``;

    if (score === questions.length) {
        html += `<div style="margin-top: 40px;">
                    <h2 style="color:#005eb8;">Շնորհավորում ենք!</h2>
                    <p>Դուք կատարյալ արդյունք եք ցույց տվել!</p>
                    <img src="picture.jpg" alt="Շնորհավորանք" class="congrats-image">
                 </div>`;
    }

    scoreEl.innerHTML = html;
}

loadQuestion();