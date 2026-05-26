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
        category: "Computer Basics",
        question: "What does CPU stand for?",
        options: [
            "Central Process Unit",
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Processor Utility"
        ],
        answer: 1,
        explanation: "CPU stands for Central Processing Unit."
    },
    {
        category: "Operating Systems",
        question: "Which of the following is an operating system?",
        options: [
            "Python",
            "Linux",
            "HTML",
            "MySQL"
        ],
        answer: 1,
        explanation: "Linux is an operating system."
    },
    {
        category: "Computer Memory",
        question: "What is the full form of RAM?",
        options: [
            "Random Access Memory",
            "Read Access Memory",
            "Run Access Memory",
            "Random Actual Memory"
        ],
        answer: 0,
        explanation: "RAM stands for Random Access Memory."
    },
    {
        category: "Web Development",
        question: "Which language is mainly used for web page structure?",
        options: [
            "CSS",
            "Python",
            "HTML",
            "Java"
        ],
        answer: 2,
        explanation: "HTML creates the structure of web pages."
    },
    {
        category: "Networking",
        question: "Which protocol is secure?",
        options: [
            "HTTP",
            "FTP",
            "HTTPS",
            "SMTP"
        ],
        answer: 2,
        explanation: "HTTPS is the secure version of HTTP."
    },
    {
        category: "Programming",
        question: "Which company developed Python?",
        options: [
            "Microsoft",
            "Apple",
            "Google",
            "Guido van Rossum"
        ],
        answer: 3,
        explanation: "Python was created by Guido van Rossum."
    },
    {
        category: "Networking",
        question: "Which device is used to connect networks?",
        options: [
            "Monitor",
            "Router",
            "Keyboard",
            "Printer"
        ],
        answer: 1,
        explanation: "A router connects multiple networks."
    },
    {
        category: "Artificial Intelligence",
        question: "What does AI stand for?",
        options: [
            "Automated Internet",
            "Artificial Intelligence",
            "Advanced Interface",
            "Artificial Internet"
        ],
        answer: 1,
        explanation: "AI stands for Artificial Intelligence."
    },
    {
        category: "Database",
        question: "Which of the following is a database language?",
        options: [
            "SQL",
            "HTML",
            "CSS",
            "XML"
        ],
        answer: 0,
        explanation: "SQL is used for database management."
    },
    {
        category: "Computer Memory",
        question: "Which memory is temporary?",
        options: [
            "ROM",
            "Hard Disk",
            "RAM",
            "DVD"
        ],
        answer: 2,
        explanation: "RAM stores temporary data."
    },
    {
        category: "Hardware",
        question: "Which of the following is an input device?",
        options: [
            "Printer",
            "Speaker",
            "Keyboard",
            "Monitor"
        ],
        answer: 2,
        explanation: "Keyboard is an input device."
    },
    {
        category: "Computer Basics",
        question: "What is the brain of the computer?",
        options: [
            "RAM",
            "CPU",
            "Hard Disk",
            "GPU"
        ],
        answer: 1,
        explanation: "CPU is considered the brain of the computer."
    },
    {
        category: "Python",
        question: "Which symbol is used for comments in Python?",
        options: [
            "//",
            "<!-- -->",
            "#",
            "%%"
        ],
        answer: 2,
        explanation: "Python uses # for comments."
    },
    {
        category: "Web Development",
        question: "Which technology is used for styling web pages?",
        options: [
            "HTML",
            "CSS",
            "SQL",
            "Python"
        ],
        answer: 1,
        explanation: "CSS styles web pages."
    },
    {
        category: "Programming",
        question: "Which of the following is a programming language?",
        options: [
            "Windows",
            "Linux",
            "Python",
            "Google"
        ],
        answer: 2,
        explanation: "Python is a programming language."
    },
    {
        category: "Cybersecurity",
        question: "What is phishing?",
        options: [
            "Fishing game",
            "Cyber attack to steal information",
            "Database management",
            "Programming method"
        ],
        answer: 1,
        explanation: "Phishing is a cyber attack to steal information."
    },
    {
        category: "Cloud Computing",
        question: "Which one is a cloud platform?",
        options: [
            "AWS",
            "MS Word",
            "VLC",
            "Notepad"
        ],
        answer: 0,
        explanation: "AWS is a cloud platform."
    },
    {
        category: "Internet",
        question: "What does URL stand for?",
        options: [
            "Uniform Resource Locator",
            "Universal Resource Link",
            "Uniform Read Locator",
            "Universal Read Link"
        ],
        answer: 0,
        explanation: "URL stands for Uniform Resource Locator."
    },
    {
        category: "Open Source",
        question: "Which of the following is open-source?",
        options: [
            "Windows",
            "Linux",
            "MS Office",
            "Photoshop"
        ],
        answer: 1,
        explanation: "Linux is open-source software."
    },
    {
        category: "Data Science",
        question: "Which field deals with analyzing large amounts of data?",
        options: [
            "Cybersecurity",
            "Networking",
            "Data Science",
            "Web Design"
        ],
        answer: 2,
        explanation: "Data Science analyzes large datasets."
    },
    {
        category: "Python Libraries",
        question: "Which library is mainly used for data analysis in Python?",
        options: [
            "NumPy",
            "Pandas",
            "Matplotlib",
            "TensorFlow"
        ],
        answer: 1,
        explanation: "Pandas is mainly used for data analysis."
    },
    {
        category: "Data Visualization",
        question: "Which of the following is used for data visualization?",
        options: [
            "Pandas",
            "NumPy",
            "Matplotlib",
            "Flask"
        ],
        answer: 2,
        explanation: "Matplotlib is used for visualization."
    },
    {
        category: "Machine Learning",
        question: "What is the primary purpose of train-test split?",
        options: [
            "To clean data",
            "To increase dataset size",
            "To evaluate model performance",
            "To visualize data"
        ],
        answer: 2,
        explanation: "Train-test split evaluates model performance."
    },
    {
        category: "Machine Learning",
        question: "Which algorithm is used for classification problems?",
        options: [
            "Linear Regression",
            "Logistic Regression",
            "K-Means",
            "PCA"
        ],
        answer: 1,
        explanation: "Logistic Regression is used for classification."
    },
    {
        category: "Data Science",
        question: "What does NaN represent in a dataset?",
        options: [
            "Negative value",
            "No assigned number",
            "Missing value",
            "Null array number"
        ],
        answer: 2,
        explanation: "NaN represents missing values."
    },
    {
        category: "Machine Learning",
        question: "Which metric is commonly used for classification evaluation?",
        options: [
            "Mean Squared Error",
            "Accuracy",
            "RMSE",
            "R-Squared"
        ],
        answer: 1,
        explanation: "Accuracy is used for classification evaluation."
    },
    {
        category: "Machine Learning",
        question: "Which library is widely used for machine learning?",
        options: [
            "OpenCV",
            "Scikit-learn",
            "BeautifulSoup",
            "Flask"
        ],
        answer: 1,
        explanation: "Scikit-learn is widely used for ML."
    },
    {
        category: "Machine Learning",
        question: "What is overfitting in Machine Learning?",
        options: [
            "Model performs well on training and test data",
            "Model performs poorly on both datasets",
            "Model memorizes training data and performs poorly on new data",
            "Model ignores training data"
        ],
        answer: 2,
        explanation: "Overfitting occurs when a model memorizes training data."
    },
    {
        category: "Machine Learning",
        question: "Which technique is used to reduce dimensionality?",
        options: [
            "Random Forest",
            "PCA",
            "Logistic Regression",
            "Decision Tree"
        ],
        answer: 1,
        explanation: "PCA reduces dimensionality."
    },
    {
        category: "Data Visualization",
        question: "Which plot is best for checking correlation between two variables?",
        options: [
            "Pie Chart",
            "Scatter Plot",
            "Histogram",
            "Bar Chart"
        ],
        answer: 1,
        explanation: "Scatter plots show correlation between variables."
    },
    {
        category: "Pandas",
        question: "What is the output type of df.head() in Pandas?",
        options: [
            "Series",
            "List",
            "DataFrame",
            "Dictionary"
        ],
        answer: 2,
        explanation: "df.head() returns a DataFrame."
    },
    {
        category: "Pandas",
        question: "Which function is used to read a CSV file using Pandas?",
        options: [
            "read_excel()",
            "read_csv()",
            "open_csv()",
            "csv_read()"
        ],
        answer: 1,
        explanation: "read_csv() reads CSV files."
    },
    {
        category: "Machine Learning",
        question: "Which learning type uses labeled data?",
        options: [
            "Unsupervised Learning",
            "Reinforcement Learning",
            "Supervised Learning",
            "Deep Learning"
        ],
        answer: 2,
        explanation: "Supervised learning uses labeled data."
    },
    {
        category: "Data Preprocessing",
        question: "What is the purpose of normalization?",
        options: [
            "Increase dataset size",
            "Reduce model accuracy",
            "Scale features into a common range",
            "Remove labels"
        ],
        answer: 2,
        explanation: "Normalization scales features."
    },
    {
        category: "Machine Learning",
        question: "Which algorithm is commonly used for clustering?",
        options: [
            "K-Means",
            "Linear Regression",
            "CNN",
            "Naive Bayes"
        ],
        answer: 0,
        explanation: "K-Means is used for clustering."
    },
    {
        category: "Data Science",
        question: "What does EDA stand for?",
        options: [
            "Exploratory Data Analysis",
            "Experimental Data Access",
            "External Data Analysis",
            "Estimated Data Accuracy"
        ],
        answer: 0,
        explanation: "EDA means Exploratory Data Analysis."
    },
    {
        category: "Regression",
        question: "Which metric is commonly used for regression problems?",
        options: [
            "Accuracy",
            "Precision",
            "Mean Squared Error",
            "Recall"
        ],
        answer: 2,
        explanation: "MSE is used in regression problems."
    },
    {
        category: "Machine Learning",
        question: "What is the main purpose of a confusion matrix?",
        options: [
            "Data cleaning",
            "Feature scaling",
            "Evaluate classification performance",
            "Data visualization"
        ],
        answer: 2,
        explanation: "Confusion matrix evaluates classification performance."
    },
    {
        category: "Machine Learning",
        question: "Which of the following is an unsupervised learning algorithm?",
        options: [
            "Decision Tree",
            "Logistic Regression",
            "K-Means",
            "Linear Regression"
        ],
        answer: 2,
        explanation: "K-Means is an unsupervised algorithm."
    },
    {
        category: "Deep Learning",
        question: "Which library is commonly used for deep learning?",
        options: [
            "TensorFlow",
            "NumPy",
            "Pandas",
            "Seaborn"
        ],
        answer: 0,
        explanation: "TensorFlow is widely used for deep learning."
    },
    {
        category: "Generative AI",
        question: "What is Generative AI mainly used for?",
        options: [
            "Storing data",
            "Generating new content",
            "Deleting data",
            "Encrypting files"
        ],
        answer: 1,
        explanation: "Generative AI creates new content."
    },
    {
        category: "Generative AI",
        question: "Which model is commonly used in Generative AI?",
        options: [
            "Decision Tree",
            "GAN",
            "KNN",
            "Linear Regression"
        ],
        answer: 1,
        explanation: "GANs are used in Generative AI."
    },
    {
        category: "Artificial Intelligence",
        question: "What does GPT stand for?",
        options: [
            "General Processing Tool",
            "Generative Pre-trained Transformer",
            "Global Predictive Technology",
            "Graph Processing Technique"
        ],
        answer: 1,
        explanation: "GPT stands for Generative Pre-trained Transformer."
    },
    {
        category: "Generative AI",
        question: "Which of the following is a text-to-image model?",
        options: [
            "BERT",
            "Stable Diffusion",
            "K-Means",
            "Random Forest"
        ],
        answer: 1,
        explanation: "Stable Diffusion generates images from text."
    },
    {
        category: "Generative AI",
        question: "What is a prompt in Generative AI?",
        options: [
            "Dataset",
            "Input instruction given to model",
            "Output result",
            "Training error"
        ],
        answer: 1,
        explanation: "A prompt is the instruction given to the AI."
    },
    {
        category: "Artificial Intelligence",
        question: "Which architecture is used in most large language models?",
        options: [
            "CNN",
            "RNN",
            "Transformer",
            "SVM"
        ],
        answer: 2,
        explanation: "Transformers power modern LLMs."
    },
    {
        category: "Generative AI",
        question: "What is hallucination in Generative AI?",
        options: [
            "Model becomes slow",
            "Model generates incorrect or false information",
            "Model stops working",
            "Model deletes data"
        ],
        answer: 1,
        explanation: "Hallucination means generating false information."
    },
    {
        category: "Artificial Intelligence",
        question: "Which company developed ChatGPT?",
        options: [
            "Google",
            "Microsoft",
            "OpenAI",
            "Meta"
        ],
        answer: 2,
        explanation: "ChatGPT was developed by OpenAI."
    },
    {
        category: "Artificial Intelligence",
        question: "What is fine-tuning in AI?",
        options: [
            "Deleting a model",
            "Training model from scratch",
            "Adjusting a pre-trained model for a specific task",
            "Compressing data"
        ],
        answer: 2,
        explanation: "Fine-tuning adapts pre-trained models."
    },
    {
        category: "Generative AI",
        question: "Which of the following is NOT a Generative AI application?",
        options: [
            "Text generation",
            "Image generation",
            "Data sorting",
            "Music generation"
        ],
        answer: 2,
        explanation: "Data sorting is not a Generative AI application."
    },
    {
        category: "Generative AI",
        question: "What does LLM stand for?",
        options: [
            "Large Language Model",
            "Linear Learning Machine",
            "Language Logic Model",
            "Large Learning Machine"
        ],
        answer: 0,
        explanation: "LLM stands for Large Language Model."
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
                badge.textContent = "WELL DONE WINNER";
                badge.style.background = "rgba(16, 185, 129, 0.12)";
                badge.style.border = "1px solid rgba(16, 185, 129, 0.25)";
                badge.style.color = "var(--success)";
            } else {
                badge.textContent = "BETTER LUCK NEXT TIME";
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