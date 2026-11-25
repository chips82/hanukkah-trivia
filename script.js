const questions = [
  {
    question: "כמה ימים נמשכת חג החנוכה?",
    answers: ["7 ימים", "8 ימים", "9 ימים", "12 ימים"],
    correct: 1,
    fact: "חנוכה נמשך שמונה ימים, החל מכ"ה בכסלו."
  },
  {
    question: "מהו השם של כלי המשחק המסורתי של חנוכה?",
    answers: ["סביבון", "קובייה", "טופסה", "חידון"],
    correct: 0,
    fact: "בסביבון מופיעות האותיות נ-ג-ה-פ, שפה אחד יש לומר: \"נֵס גָּדוֹל הָיָה שָׁם\"."
  },
  {
    question: "איזה נס חנוכה זוכרים?",
    answers: ["יציאת מצרים", "קריעת ים סוף", "פך שמן קטן", "עשרת הדברות"],
    correct: 2,
    fact: "לפי המסורת, שמן טהור שנותר בביהמ״ק הספיק להדלקה במשך שמונה ימים."
  },
  {
    question: "מי עמד בראש הכוחות שדחו את היוונים?",
    answers: ["דוד המלך", "יהושע בן נון", "המכבים", "שלמה המלך"],
    correct: 2,
    fact: "מרד המכבים, בראשות משפחת חשמונאי, הוביל לשחרור ירושלים."
  },
  {
    question: "באיזו תקופה חוגגים את חנוכה?",
    answers: ["אביב", "קיץ", "סתיו", "חורף"],
    correct: 3,
    fact: "חנוכה חוגג בחודש כסלו, בדרך כלל בחורף."
  },
  {
    question: "מה מכינים באופן מסורתי בחנוכה?",
    answers: ["אוזני המן", "סופגניות ולביבות", "מצות", "קובה"],
    correct: 1,
    fact: "סופגניות מטוגנות בלביבות חטופיות הופכים לחגיגיים דווקא כשהן מטוגנות בשמן."
  },
  {
    question: "מהו הכינוי של חנוכייה?",
    answers: ["מנורת שבעת הקנים", "חנוכייה", "קנדלברה", "כל הנקרא"],
    correct: 1,
    fact: "בימי החנוכה מדליקים חנוכייה בעלת שמונה קנים ונר נוסף – השמש."
  },
  {
    question: "מה תפקיד נר השמש?",
    answers: ["להוסיף נר כל ערב", "להדליק באמצעותו את הנרות", "להסיר כתמי שמן", "להיות הנר הראשון"],
    correct: 1,
    fact: "השמש משמש להדלקת נרות החנוכייה ואינו נחשב לאחד מנרות החג."
  },
  {
    question: "באיזה סדר מדליקים בחנוכה?",
    answers: ["מימין לשמאל", "משמאל לימין", "מגדול לקטן", "מהנר העליון"],
    correct: 1,
    fact: "בכל יום מוסיפים נר חדש משמאל; מדליקים את הנר החדש תחילה."
  },
  {
    question: "איזו ברכה נאמרת על הדלקת הנרות?",
    answers: ["שהחיינו", "בורא פרי הגפן", "שעשה נסים", "הודו לה׳"],
    correct: 2,
    fact: "מוסיפים שתי ברכות רגילות ובליל הראשון – גם את ברכת שהחיינו."
  }
];

let currentQuestion = 0;
let score = 0;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionNumber = document.getElementById("question-number");
const questionTotal = document.getElementById("question-total");
const questionText = document.getElementById("question-text");
const answersEl = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const scoreText = document.getElementById("score-text");

questionTotal.textContent = questions.length;

function showScreen(screen) {
  document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
  screen.classList.add("active");
}

function startGame() {
  currentQuestion = 0;
  score = 0;
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  const item = questions[currentQuestion];
  questionNumber.textContent = currentQuestion + 1;
  questionText.textContent = item.question;
  scoreText.textContent = `ניקוד: ${score}`;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  answersEl.innerHTML = "";
  feedback.hidden = true;
  feedback.className = "feedback";
  nextBtn.hidden = true;

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;
    button.addEventListener("click", () => chooseAnswer(index));
    answersEl.appendChild(button);
  });
}

function chooseAnswer(index) {
  const item = questions[currentQuestion];
  const buttons = [...answersEl.querySelectorAll(".answer-btn")];
  buttons.forEach(button => button.disabled = true);
  const chosen = buttons[index];
  const correct = buttons[item.correct];

  if (index === item.correct) {
    chosen.classList.add("correct");
    feedback.textContent = `נכון! ${item.fact}`;
    feedback.className = "feedback correct-text";
    score++;
  } else {
    chosen.classList.add("wrong");
    correct.classList.add("correct");
    feedback.textContent = `לא בדיוק. ${item.fact}`;
    feedback.className = "feedback wrong-text";
  }

  scoreText.textContent = `ניקוד: ${score}`;
  feedback.hidden = false;
  nextBtn.hidden = false;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "לצפייה בתוצאה" : "שאלה הבאה";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    showResult();
  } else {
    renderQuestion();
  }
}

function showResult() {
  showScreen(resultScreen);
  document.getElementById("final-score").textContent = score;

  let title, message;
  if (score === 10) {
    title = "אלופים של חנוכה!";
    message = "עניתם נכון על כל השאלות. אתם יודעים את ההיסטוריה והמסורת כמו גדולי המורים!";
  } else if (score >= 7) {
    title = "נרות בוערים!";
    message = "ביצוע מעולה — כמעט אין שאלה שהחמצתם!";
  } else if (score >= 4) {
    title = "חנוכה טוב!";
    message = "התחלה יפה. סיבוב נוסף יעזור לכם להפוך למומחים.";
  } else {
    title = "הדלקה ראשונה";
    message = "בכל ערב מוסיפים נר — ובכל משחק לומדים קצת יותר!";
  }

  document.getElementById("result-title").textContent = title;
  document.getElementById("result-message").textContent = message;
  createConfetti();
}

function createConfetti() {
  const colors = ["#f6c453", "#ffffff", "#5ba7c8", "#d9a62e", "#9ec4df"];
  for (let i = 0; i < 45; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * .8}s`;
    piece.style.animationDuration = `${2.2 + Math.random() * 1.8}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("restart-btn").addEventListener("click", startGame);
nextBtn.addEventListener("click", nextQuestion);
