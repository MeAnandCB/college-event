/* ==========================================================================
   QUANTUMQUIZ ENGINE (app.js)
   ========================================================================== */

// ─── GOOGLE FORM CONFIG ────────────────────────────────────────────────────
// HOW TO GET YOUR ENTRY IDs (takes ~30 seconds):
//  1. Open your form in edit mode
//  2. Click the 3-dot menu (⋮) → "Get pre-filled link"
//  3. Type anything in each field → click "Get link"
//  4. The URL will show: ...?entry.123456789=test&entry.987654321=test
//  5. Paste those numbers below, replacing XXXXXXXXX and YYYYYYYYY
const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSffgdcw8wTvkRdSmlJAnhoCWvl_HikHSo5jDuLq-SNtygku1w/formResponse";
const GOOGLE_ENTRY_NAME = "entry.1330376225";   // Name field
const GOOGLE_ENTRY_PHONE = "entry.49910056";     // Phone Number field
// ───────────────────────────────────────────────────────────────────────────


// 1. QUESTION DATABASE
const QUIZ_QUESTIONS = [
    {
        category: "BASIC IT",
        question: "Which of the following acts as the 'brain' of a computer system, executing instructions and processing data?",
        options: [
            "Hard Disk Drive (HDD)",
            "Central Processing Unit (CPU)",
            "Random Access Memory (RAM)",
            "Graphics Processing Unit (GPU)"
        ],
        answer: 1,
        explanation: "The CPU (Central Processing Unit) is often called the brain of the computer because it interprets and runs instructions from programs."
    },
    {
        category: "CODING BASICS",
        question: "In programming, what is the primary purpose of a variable?",
        options: [
            "To permanently delete software files",
            "To store data values that can be used and changed later",
            "To connect the computer to the internet",
            "To speed up the monitor's display rate"
        ],
        answer: 1,
        explanation: "A variable is a named storage location in programming that holds data values (like numbers or text) for a program to use."
    },
    {
        category: "HTML & WEB",
        question: "What does the abbreviation 'HTML' stand for in web development?",
        options: [
            "HighText Machine Language",
            "HyperText Markup Language",
            "Home Tool Markup Language",
            "Hyperlink Text Management List"
        ],
        answer: 1,
        explanation: "HTML (HyperText Markup Language) is the standard markup language used to create the structure of web pages."
    },
    {
        category: "BASIC IT",
        question: "Which of the following is temporary (volatile) storage that holds data currently being used by the computer?",
        options: [
            "Solid State Drive (SSD)",
            "Read-Only Memory (ROM)",
            "Random Access Memory (RAM)",
            "USB Flash Drive"
        ],
        answer: 2,
        explanation: "RAM (Random Access Memory) is fast, temporary memory that keeps active applications and data open, but it gets cleared when the computer is turned off."
    },
    {
        category: "CODING BASICS",
        question: "What type of loop will run a specific block of code a predetermined number of times?",
        options: [
            "For Loop",
            "Infinite Loop",
            "Wait Loop",
            "Void Loop"
        ],
        answer: 0,
        explanation: "A 'for loop' is commonly used when you know in advance how many times you want to repeat a block of code."
    },
    {
        category: "BASIC IT",
        question: "Which keyboard shortcut is standard for copying selected text or items in most operating systems?",
        options: [
            "Ctrl + V (or Cmd + V)",
            "Ctrl + X (or Cmd + X)",
            "Ctrl + C (or Cmd + C)",
            "Ctrl + Z (or Cmd + Z)"
        ],
        answer: 2,
        explanation: "Ctrl + C (Windows) or Cmd + C (macOS) is the standard shortcut to copy items to the clipboard."
    },
    {
        category: "CODING BASICS",
        question: "In programming, which data type is used to represent text values rather than numbers?",
        options: [
            "Integer",
            "Boolean",
            "Float",
            "String"
        ],
        answer: 3,
        explanation: "A 'String' data type is a sequence of characters (letters, numbers, or symbols) representing text, typically enclosed in quotation marks."
    },
    {
        category: "NETWORKING",
        question: "What does 'IP' stand for in the context of an IP Address?",
        options: [
            "Internet Protocol",
            "Information Provider",
            "Internal Program",
            "Instant Port"
        ],
        answer: 0,
        explanation: "An IP (Internet Protocol) address is a unique numerical label assigned to each device connected to a computer network."
    },
    {
        category: "CODING BASICS",
        question: "What is a 'bug' in computer programming?",
        options: [
            "A physical insect inside the laptop keyboard",
            "An error or defect in a program that causes it to behave unexpectedly",
            "A specialized security tool used to encrypt files",
            "An internet browser extension that blocks advertisements"
        ],
        answer: 1,
        explanation: "A bug is an error, flaw, or fault in design or code that causes a program to produce an incorrect or unexpected result."
    },
    {
        category: "BASIC IT",
        question: "Which of the following is considered system software rather than application software?",
        options: [
            "Microsoft Word",
            "Google Chrome",
            "Windows Operating System",
            "Adobe Photoshop"
        ],
        answer: 2,
        explanation: "An Operating System (like Windows, macOS, or Linux) is system software that controls the basic operations of the computer and runs applications."
    }
];

// Helper to shuffle arrays in-place using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 2. STATE MANAGER
const gameState = {
    playerName: "",
    playerPhone: "",
    currentQuestionIndex: 0,
    score: 0,
    selectedOptionIdx: null,
    isLocked: false,
    timerInterval: null,
    timeLeft: 30,
    soundEnabled: true,
    audioCtx: null,

    // Shuffled queues
    activeQuestions: [],
    currentCorrectIdx: 0,
    currentOptions: []
};

// 3. SOUND SYNTHESIS ENGINE (Web Audio API)
function initAudio() {
    if (!gameState.audioCtx) {
        gameState.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (gameState.audioCtx.state === 'suspended') {
        gameState.audioCtx.resume();
    }
}

function playSynthSound(type) {
    if (!gameState.soundEnabled) return;
    initAudio();
    const ctx = gameState.audioCtx;
    if (!ctx) return;

    const time = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.setValueAtTime(0, time);

    if (type === 'tap') {
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, time);
        osc.frequency.exponentialRampToValueAtTime(1200, time + 0.05);
        osc.connect(masterGain);
        masterGain.gain.setValueAtTime(0.08, time);
        masterGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
        osc.start(time);
        osc.stop(time + 0.09);
    }
    else if (type === 'lock') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        osc1.type = 'sine';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(440, time);
        osc1.frequency.setValueAtTime(880, time + 0.06);
        osc2.frequency.setValueAtTime(220, time);
        osc2.frequency.setValueAtTime(440, time + 0.06);
        osc1.connect(masterGain);
        osc2.connect(masterGain);
        masterGain.gain.setValueAtTime(0.1, time);
        masterGain.gain.linearRampToValueAtTime(0.12, time + 0.05);
        masterGain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
        osc1.start(time); osc1.stop(time + 0.22);
        osc2.start(time); osc2.stop(time + 0.22);
    }
    else if (type === 'correct') {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const delay = idx * 0.06;
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time + delay);
            const oscGain = ctx.createGain();
            oscGain.gain.setValueAtTime(0, time);
            oscGain.gain.setValueAtTime(0.08, time + delay);
            oscGain.gain.exponentialRampToValueAtTime(0.001, time + delay + 0.35);
            osc.connect(oscGain);
            oscGain.connect(masterGain);
            osc.start(time + delay);
            osc.stop(time + delay + 0.4);
        });
        masterGain.gain.setValueAtTime(0.12, time);
        masterGain.gain.exponentialRampToValueAtTime(0.12, time + 0.1);
        masterGain.gain.exponentialRampToValueAtTime(0.001, time + 0.6);
    }
    else if (type === 'incorrect') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(140, time);
        osc1.frequency.linearRampToValueAtTime(70, time + 0.45);
        osc2.frequency.setValueAtTime(138, time);
        osc2.frequency.linearRampToValueAtTime(68, time + 0.45);
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(350, time);
        filter.frequency.exponentialRampToValueAtTime(100, time + 0.4);
        osc1.connect(filter); osc2.connect(filter);
        filter.connect(masterGain);
        masterGain.gain.setValueAtTime(0.14, time);
        masterGain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
        osc1.start(time); osc1.stop(time + 0.5);
        osc2.start(time); osc2.stop(time + 0.5);
    }
    else if (type === 'tick') {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(3200, time);
        osc.connect(masterGain);
        masterGain.gain.setValueAtTime(0.03, time);
        masterGain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
        osc.start(time);
        osc.stop(time + 0.03);
    }
    else if (type === 'triumph') {
        const sequence = [
            { f: 523.25, d: 0.1 },
            { f: 659.25, d: 0.1 },
            { f: 783.99, d: 0.1 },
            { f: 1046.50, d: 0.3 }
        ];
        let cumulativeTime = 0;
        sequence.forEach((note) => {
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(note.f, time + cumulativeTime);
            const g = ctx.createGain();
            g.gain.setValueAtTime(0.12, time + cumulativeTime);
            g.gain.exponentialRampToValueAtTime(0.001, time + cumulativeTime + note.d);
            osc.connect(g);
            g.connect(masterGain);
            osc.start(time + cumulativeTime);
            osc.stop(time + cumulativeTime + note.d + 0.05);
            cumulativeTime += 0.12;
        });
        masterGain.gain.setValueAtTime(0.12, time);
    }
}

// 4. STARFIELD BACKGROUND
function initStarfield() {
    const canvas = document.getElementById("starfield");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let numStars = 85;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    class Star {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.6 + 0.4;
            this.speedX = Math.random() * 0.2 - 0.1;
            this.speedY = Math.random() * 0.15 + 0.05;
            this.alpha = Math.random() * 0.6 + 0.2;
            this.color = Math.random() > 0.6 ? '#06b6d4' : (Math.random() > 0.8 ? '#a78bfa' : '#ffffff');
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = this.size * 3;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.y > height) { this.y = 0; this.x = Math.random() * width; }
            if (this.x < 0 || this.x > width) { this.speedX = -this.speedX; }
        }
    }

    function init() {
        stars = [];
        for (let i = 0; i < numStars; i++) stars.push(new Star());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(star => { star.update(); star.draw(); });
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        init();
    });

    init();
    animate();
}

// 5. LEADERBOARD SYSTEM (Local Storage)
function getLeaderboard() {
    const data = localStorage.getItem("quantum_quiz_leaderboard");
    return data ? JSON.parse(data) : [
        { name: "NEO_LINUX", phone: "9876543210", score: 10, time: "2026-05-26" },
        { name: "ALAN_T", phone: "9988776655", score: 9, time: "2026-05-26" },
        { name: "ADA_L", phone: "9123456789", score: 8, time: "2026-05-26" },
        { name: "CURIE_M", phone: "9000000001", score: 7, time: "2026-05-26" }
    ];
}

function saveScore(name, phone, score) {
    const leaderboard = getLeaderboard();
    leaderboard.push({
        name: name.toUpperCase().substring(0, 24),
        phone: phone || "N/A",
        score: parseInt(score),
        time: new Date().toISOString().split('T')[0]
    });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("quantum_quiz_leaderboard", JSON.stringify(leaderboard));
}

// 6. GOOGLE FORM SUBMISSION
// Uses no-cors mode — data lands in your Google Sheet silently.
// You will NOT see a success/error response in JS; that is normal behaviour.
function submitToGoogleForm(name, phone) {
    const body = new URLSearchParams();
    body.append(GOOGLE_ENTRY_NAME, name);
    body.append(GOOGLE_ENTRY_PHONE, phone);

    fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",   // required for Google Forms cross-origin submission
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
    }).catch(() => {
        // Silently ignore network errors — local CSV export is the backup
    });
}

// 7. GAME ENGINE FLOW
function startTimer() {
    clearInterval(gameState.timerInterval);
    gameState.timeLeft = 30;

    const timerText = document.getElementById("timer-seconds");
    const timerRing = document.getElementById("timer-ring-progress");
    const timerContainer = document.querySelector(".timer-container");

    if (timerText) timerText.textContent = gameState.timeLeft;
    if (timerRing) timerRing.style.strokeDashoffset = "0";
    if (timerContainer) timerContainer.classList.remove("timer-urgent");

    const dashTotal = 113;

    gameState.timerInterval = setInterval(() => {
        gameState.timeLeft--;
        if (timerText) timerText.textContent = gameState.timeLeft;

        const dashOffset = dashTotal - (dashTotal * (gameState.timeLeft / 30));
        if (timerRing) timerRing.style.strokeDashoffset = dashOffset;

        if (gameState.timeLeft <= 5) {
            if (timerContainer) timerContainer.classList.add("timer-urgent");
            playSynthSound('tick');
        }

        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timerInterval);
            autoLockTimeExpired();
        }
    }, 1000);
}

function loadQuestion() {
    const qData = gameState.activeQuestions[gameState.currentQuestionIndex];

    gameState.selectedOptionIdx = null;
    gameState.isLocked = false;

    // Shuffle options and track correct index dynamically
    const mappedOptions = qData.options.map((opt, idx) => ({
        text: opt,
        isCorrect: idx === qData.answer
    }));
    shuffleArray(mappedOptions);

    gameState.currentCorrectIdx = mappedOptions.findIndex(o => o.isCorrect);
    gameState.currentOptions = mappedOptions.map(o => o.text);

    // Update UI counters
    const currentQNum = document.getElementById("current-q-num");
    const totalQNum = document.getElementById("total-q-num");
    if (currentQNum) currentQNum.textContent = gameState.currentQuestionIndex + 1;
    if (totalQNum) totalQNum.textContent = gameState.activeQuestions.length;

    // Progress bar
    const progressBar = document.getElementById("progress-bar-fill");
    if (progressBar) {
        const pct = ((gameState.currentQuestionIndex + 1) / gameState.activeQuestions.length) * 100;
        progressBar.style.width = `${pct}%`;
    }

    // Category & question text
    const catTag = document.getElementById("question-category");
    const qText = document.getElementById("question-text");
    if (catTag) catTag.textContent = qData.category;
    if (qText) qText.textContent = qData.question;

    // Option cards with shuffle animation
    const optionCards = document.querySelectorAll(".option-card");
    optionCards.forEach((card, idx) => {
        card.className = "option-card";

        const randomX = (Math.random() * 160 - 80) + "px";
        const randomY = (Math.random() * 60 - 30) + "px";
        const randomRotate = (Math.random() * 24 - 12) + "deg";

        card.style.setProperty("--shuffle-x", randomX);
        card.style.setProperty("--shuffle-y", randomY);
        card.style.setProperty("--shuffle-r", randomRotate);
        card.classList.add("shuffling");

        setTimeout(() => card.classList.remove("shuffling"), 550);

        const optionLabel = card.querySelector(".option-label");
        const optionContent = card.querySelector(".option-content");

        if (optionLabel) optionLabel.textContent = ["A", "B", "C", "D"][idx];
        if (optionContent) optionContent.textContent = gameState.currentOptions[idx];
    });

    // Reset controls
    const lockBtn = document.getElementById("lock-btn");
    const lockBtnText = document.getElementById("lock-btn-text");
    const nextBtn = document.getElementById("next-btn");
    const feedbackPanel = document.getElementById("feedback-panel");

    if (lockBtn) {
        lockBtn.disabled = true;
        lockBtn.className = "btn primary-btn active-lock-btn";
        if (lockBtnText) lockBtnText.textContent = "SELECT OPTION";
    }
    if (nextBtn) nextBtn.classList.add("hidden");
    if (feedbackPanel) feedbackPanel.classList.add("hidden");

    startTimer();
}

function handleOptionSelection(optionIndex) {
    if (gameState.isLocked) return;

    gameState.selectedOptionIdx = optionIndex;
    playSynthSound('tap');

    document.querySelectorAll(".option-card").forEach((card, idx) => {
        card.classList.toggle("selected", idx === optionIndex);
    });

    const lockBtn = document.getElementById("lock-btn");
    const lockBtnText = document.getElementById("lock-btn-text");
    if (lockBtn) {
        lockBtn.disabled = false;
        if (lockBtnText) lockBtnText.textContent = "LOCK OPTION";
    }
}

function lockAnswer() {
    if (gameState.selectedOptionIdx === null || gameState.isLocked) return;

    clearInterval(gameState.timerInterval);
    gameState.isLocked = true;
    playSynthSound('lock');

    const qData = gameState.activeQuestions[gameState.currentQuestionIndex];
    const isCorrect = (gameState.selectedOptionIdx === gameState.currentCorrectIdx);
    if (isCorrect) gameState.score++;

    document.querySelectorAll(".option-card").forEach((card, idx) => {
        card.classList.add("locked-mode");
        card.classList.remove("selected");
        if (idx === gameState.currentCorrectIdx) card.classList.add("correct");
        else if (idx === gameState.selectedOptionIdx) card.classList.add("incorrect");
    });

    setTimeout(() => showFeedbackPanel(isCorrect, qData.explanation), 280);

    const lockBtn = document.getElementById("lock-btn");
    const lockBtnText = document.getElementById("lock-btn-text");
    if (lockBtn) {
        lockBtn.disabled = true;
        lockBtn.className = "btn primary-btn active-lock-btn disabled";
        if (lockBtnText) lockBtnText.textContent = "ADVANCING SEQUENCE...";
    }

    setTimeout(() => handleNextQuestion(), 2500);
}

function autoLockTimeExpired() {
    gameState.isLocked = true;
    const qData = gameState.activeQuestions[gameState.currentQuestionIndex];

    document.querySelectorAll(".option-card").forEach((card, idx) => {
        card.classList.add("locked-mode");
        card.classList.remove("selected");
        if (idx === gameState.currentCorrectIdx) card.classList.add("correct");
        else if (idx === gameState.selectedOptionIdx) card.classList.add("incorrect");
    });

    showFeedbackPanel(false, `Time protocol exceeded! ${qData.explanation}`);

    const lockBtn = document.getElementById("lock-btn");
    const lockBtnText = document.getElementById("lock-btn-text");
    if (lockBtn) {
        lockBtn.disabled = true;
        lockBtn.className = "btn primary-btn active-lock-btn disabled";
        if (lockBtnText) lockBtnText.textContent = "ADVANCING SEQUENCE...";
    }

    setTimeout(() => handleNextQuestion(), 2500);
}

function showFeedbackPanel(isCorrect, explanation) {
    const panel = document.getElementById("feedback-panel");
    const verdict = document.getElementById("feedback-verdict");
    const icon = document.getElementById("feedback-icon");
    const text = document.getElementById("explanation-text");

    if (!panel) return;

    if (isCorrect) {
        panel.className = "feedback-panel panel-correct";
        if (verdict) verdict.textContent = "CORRECT PROTOCOL";
        if (icon) icon.innerHTML = "🏆";
        playSynthSound('correct');
    } else {
        panel.className = "feedback-panel panel-incorrect";
        if (verdict) verdict.textContent = "PROTOCOL ERROR";
        if (icon) icon.innerHTML = "⚠️";
        playSynthSound('incorrect');
    }

    if (text) text.textContent = explanation;
    panel.classList.remove("hidden");
}

function handleNextQuestion() {
    gameState.currentQuestionIndex++;
    playSynthSound('tap');

    if (gameState.currentQuestionIndex < gameState.activeQuestions.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    clearInterval(gameState.timerInterval);

    // 1. Save to local leaderboard (CSV backup)
    saveScore(gameState.playerName, gameState.playerPhone, gameState.score);

    // 2. ─── SUBMIT TO GOOGLE FORM ────────────────────────────────────────
    submitToGoogleForm(gameState.playerName, gameState.playerPhone);
    // ─────────────────────────────────────────────────────────────────────

    // 3. Save latest attempt for Welcome screen display
    localStorage.setItem("quantum_quiz_last_attempt", JSON.stringify({
        name: gameState.playerName,
        phone: gameState.playerPhone,
        score: gameState.score
    }));

    // 4. Audio cue
    if (gameState.score === 1) {
        playSynthSound('triumph');
    } else {
        playSynthSound('incorrect');
    }

    // 5. Return to Welcome screen
    returnToWelcomeScreen();
}

function returnToWelcomeScreen() {
    clearInterval(gameState.timerInterval);

    const lastAttempt = localStorage.getItem("quantum_quiz_last_attempt");
    if (lastAttempt) {
        const { name, phone, score } = JSON.parse(lastAttempt);
        updateRecentAttemptDisplay(name, phone, score);
    }

    const quizScreen = document.getElementById("quiz-screen");
    const welcomeScreen = document.getElementById("welcome-screen");

    if (quizScreen) {
        quizScreen.classList.remove("active");
        quizScreen.classList.add("hidden");
    }
    if (welcomeScreen) {
        welcomeScreen.classList.remove("hidden");
        welcomeScreen.classList.add("active");
    }

    // Clear input fields
    const nameInput = document.getElementById("player-name");
    const phoneInput = document.getElementById("player-phone");
    if (nameInput) nameInput.value = "";
    if (phoneInput) phoneInput.value = "";

    // Reset game state
    gameState.currentQuestionIndex = 0;
    gameState.score = 0;
    gameState.selectedOptionIdx = null;
    gameState.isLocked = false;
    gameState.playerName = "";
    gameState.playerPhone = "";
}

function updateRecentAttemptDisplay(name, phone, score) {
    const container = document.getElementById("recent-mark-container");
    const nameText = document.getElementById("recent-player-name");
    const phoneText = document.getElementById("recent-player-phone");
    const badge = document.getElementById("recent-player-badge");

    if (!container) return;

    if (name) {
        if (nameText) nameText.textContent = name;
        if (phoneText) phoneText.textContent = `📞 ${phone}`;

        if (badge) {
            if (score === 1) {
                badge.textContent = "1/1 PASSED";
                badge.style.background = "rgba(16, 185, 129, 0.12)";
                badge.style.border = "1px solid rgba(16, 185, 129, 0.25)";
                badge.style.color = "var(--success)";
            } else {
                badge.textContent = "0/1 FAILED";
                badge.style.background = "rgba(239, 68, 68, 0.12)";
                badge.style.border = "1px solid rgba(239, 68, 68, 0.25)";
                badge.style.color = "var(--error)";
            }
        }
        container.style.display = "block";
    } else {
        container.style.display = "none";
    }
}

// 8. INITIALIZE DOM BINDINGS
document.addEventListener("DOMContentLoaded", () => {
    initStarfield();

    // Show latest attempt on Welcome screen if it exists
    const lastAttempt = localStorage.getItem("quantum_quiz_last_attempt");
    if (lastAttempt) {
        const { name, phone, score } = JSON.parse(lastAttempt);
        updateRecentAttemptDisplay(name, phone, score);
    }

    // Form submission → start quiz
    const startForm = document.getElementById("start-form");
    if (startForm) {
        startForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nameInput = document.getElementById("player-name");
            const phoneInput = document.getElementById("player-phone");

            if (nameInput && nameInput.value.trim() && phoneInput && phoneInput.value.trim()) {
                gameState.playerName = nameInput.value.trim();
                gameState.playerPhone = phoneInput.value.trim();

                // Pick 1 random question from the shuffled pool
                const allQuestions = [...QUIZ_QUESTIONS];
                shuffleArray(allQuestions);
                gameState.activeQuestions = [allQuestions[0]];
                gameState.currentQuestionIndex = 0;
                gameState.score = 0;

                initAudio();
                playSynthSound('tap');

                const welcomeScreen = document.getElementById("welcome-screen");
                const quizScreen = document.getElementById("quiz-screen");

                if (welcomeScreen) welcomeScreen.classList.add("hidden");
                if (quizScreen) {
                    quizScreen.classList.remove("hidden");
                    quizScreen.classList.add("active");
                }

                loadQuestion();
            }
        });
    }

    // Option card click listeners
    document.querySelectorAll(".option-card").forEach((card) => {
        card.addEventListener("click", () => {
            handleOptionSelection(parseInt(card.getAttribute("data-idx")));
        });
    });

    // Lock button
    const lockBtn = document.getElementById("lock-btn");
    if (lockBtn) lockBtn.addEventListener("click", lockAnswer);

    // Export CSV button
    const exportCsvBtn = document.getElementById("export-csv-btn");
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener("click", () => {
            const list = getLeaderboard();
            if (list.length === 0) { alert("No records to export!"); return; }

            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "Name,Phone Number,Score,Date\n";
            list.forEach(row => {
                csvContent += `"${row.name}","${row.phone || "N/A"}",${row.score},"${row.time}"\n`;
            });

            const link = document.createElement("a");
            link.setAttribute("href", encodeURI(csvContent));
            link.setAttribute("download", `quiz_data_export_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            playSynthSound('tap');
        });
    }

    // Audio toggle
    const audioToggleBtn = document.getElementById("audio-toggle-btn");
    const soundOnIcon = document.getElementById("sound-on-icon");
    const soundOffIcon = document.getElementById("sound-off-icon");

    if (audioToggleBtn) {
        audioToggleBtn.addEventListener("click", () => {
            gameState.soundEnabled = !gameState.soundEnabled;
            if (gameState.soundEnabled) {
                if (soundOnIcon) soundOnIcon.classList.remove("hidden");
                if (soundOffIcon) soundOffIcon.classList.add("hidden");
                initAudio();
                playSynthSound('tap');
            } else {
                if (soundOnIcon) soundOnIcon.classList.add("hidden");
                if (soundOffIcon) soundOffIcon.classList.remove("hidden");
            }
        });
    }
});