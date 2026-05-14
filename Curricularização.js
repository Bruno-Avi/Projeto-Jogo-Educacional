
const questions = [
  {
    question: "1 - Qual animal é esse?",
    image: "Marreco.jpg.jpeg",
    answers: ["Marreco", "Pato", "Boi"],
    correct: 0
  },

  {
    question: "2 - Complete o nome da cidade BRU___E",
    image: "",
    answers: ["QU", "SA", "TA"],
    correct: 0
  },

  {
    question: "3 - Qual é a cor da bandeira de Brusque?",
    image: "Brusque.png",
    answers: ["Verde", "Azul", "Branca"],
    correct: 2
  },
   {
    question: "4 - Qual ferramenta aparece no símbolo da cidade?",
    image: "Brusque.jpg",
    answers: ["Pá", "Enxada", "Machado"],
    correct: 2
  },

  {
    question: "5 - Qual é o time de futebol da cidade?",
    image: "",
    answers: ["Brusque", "Flamengo", "Real Madrid"],
    correct: 0
  },

  {
    question: "6 - Onde compramos roupas em Brusque?",
    image: "",
    answers: ["Farmácia", "Posto de Gasolina", "Loja de Roupa"],
    correct: 2
  },

  {
    question: "7 - Qual festa alemã tem na região?",
    image: "",
    answers: ["Oktoberfest", "Carnaval", "Libertadores"],
    correct: 0
  },

  {
    question: "8 - BRUSQUE fica em Santa ______",
    image: "",
    answers: ["Catarina", "Luzia", "Aparecida"],
    correct: 0
  },

  {
    question: "9 - As pessoas vieram de qual país para morar em Brusque?",
    image: "",
    answers: ["Holanda", "China", "Alemanha"],
    correct: 2
  },

  {
    question: "10 - Qual lugar as pessoas usam para rezar?",
    image: "",
    answers: ["Igreja", "Mercado", "Oficina"],
    correct: 0
  },

  {
    question: "11 - Quem veio morar em Brusque primeiro?",
    image: "",
    answers: ["Capivaras", "Alemães", "Astronautas"],
    correct: 1
  },

  {
    question: "12 - As pessoas antigas construíam muitas…",
    image: "",
    answers: ["Robôs", "Celulares", "Casas"],
    correct: 2
  },
 {
    question: "13 - Antigamente as pessoas vinham de barco ou avião?",
    image: "",
    answers: ["Barco", "Avião"],
    correct: 0
  },

  {
    question: "14 - O que as pessoas plantavam antigamente?",
    image: "",
    answers: ["Eucalipto", "Comida", "Terra"],
    correct: 1
  },

  {
    question: "15 - O rio ajudava as pessoas a…",
    image: "",
    answers: ["Viajar", "Nadar", "Voar"],
    correct: 0
  }
];

// IMAGENS DAS TELAS
const imagemAcerto = "feliz.jpg.jpeg";
const imagemErro = "triste.jpg.jpeg";

// TELAS FINAIS
const imagemFinalPerfeito = "finalperfeito.jpg";
const imagemFinalNormal = "finalbom.jpg";

let currentQuestion = 0;
let score = 0;

// TELAS
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const feedbackScreen = document.getElementById("feedback-screen");
const finalScreen = document.getElementById("final-screen");

// QUIZ
const questionTitle = document.getElementById("question-title");
const questionImage = document.getElementById("question-image");
const answersContainer = document.getElementById("answers");


// FEEDBACK
const feedbackImage = document.getElementById("feedback-image");
const feedbackText = document.getElementById("feedback-text");

// FINAL
const finalImage = document.getElementById("final-image");
const finalTitle = document.getElementById("final-title");
const finalText = document.getElementById("final-text");

// COMEÇAR QUIZ
function startQuiz() {
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  loadQuestion();
}

// CARREGAR PERGUNTA
function loadQuestion() {

  const q = questions[currentQuestion];

  questionTitle.innerText = q.question;
 // MOSTRAR IMAGEM SE TIVER
  if (q.image !== "") {
    questionImage.src = q.image;
    questionImage.style.display = "block";
  }

   // ESCONDER IMAGEM SE NÃO TIVER
  else {
    questionImage.style.display = "none";
  }

  answersContainer.innerHTML = "";

  q.answers.forEach((answer, index) => {

    const button = document.createElement("button");

    button.classList.add("answer-btn");

    button.innerHTML = `
      <span class="answer-letter">
        ${String.fromCharCode(97 + index)})
      </span>

      <span>${answer}</span>
    `;

    button.onclick = () => checkAnswer(index);

    answersContainer.appendChild(button);
  });
}

// VERIFICAR RESPOSTA
function checkAnswer(index) {

  const q = questions[currentQuestion];

  quizScreen.classList.remove("active");
  feedbackScreen.classList.add("active");
   // ACERTOU
  if (index === q.correct) {

    score++;

    feedbackImage.src = imagemAcerto;

    feedbackText.innerHTML = `
      Meus Parabéns!<br>
      Você acertou!
    `;
  }

  // ERROU
  else {

    feedbackImage.src = imagemErro;

    feedbackText.innerHTML = `
      Foi quase!<br>
      Mas continue tentando você consegue!
    `;
  }
}

// PRÓXIMA PERGUNTA
function nextQuestion() {

  currentQuestion++;

  feedbackScreen.classList.remove("active");

  // AINDA TEM PERGUNTA
  if (currentQuestion < questions.length) {

    quizScreen.classList.add("active");

    loadQuestion();
  }

  // FINALIZAR QUIZ
  else {

    showFinalScreen();
  }
}

// MOSTRAR TELA FINAL
function showFinalScreen() {

  finalScreen.classList.add("active");

  // ACERTOU TUDO
  if (score === questions.length) {

    finalImage.src = imagemFinalPerfeito;

    finalTitle.innerText = "PARABÉNS!";

    finalText.innerHTML = `
      Você acertou todas as perguntas!<br>
      Você é Brusquense de verdade!
    `;
  }

  // ERROU ALGUMA
  else {

    finalImage.src = imagemFinalNormal;

    finalTitle.innerText = "MUITO BEM!";

    finalText.innerHTML = `
      Você acertou ${score} de ${questions.length} perguntas!
    `;
  }
}

// REINICIAR QUIZ
function restartQuiz() {

  currentQuestion = 0;
  score = 0;

  finalScreen.classList.remove("active");

  startScreen.classList.add("active");
}
