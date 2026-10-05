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
const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLScl39-5NEgeV3wJse5BBy5dcNOBShXgmNIXeHH1ovqjMG3sww/formResponse";
const GOOGLE_ENTRY_NAME = "entry.568779786";     // Full Name field
const GOOGLE_ENTRY_PHONE = "entry.1396241237";   // Contact No field
const GOOGLE_ENTRY_QUALIFICATION = "entry.1690160491"; // Qualification field
const GOOGLE_ENTRY_YEAR = "entry.995673296";     // Year of Pass out field
// ───────────────────────────────────────────────────────────────────────────

// Phone uniqueness registry (localStorage)
function getRegisteredPhones() {
    const data = localStorage.getItem("quantum_quiz_registered_phones");
    return data ? JSON.parse(data) : [];
}
function isPhoneRegistered(phone) {
    return getRegisteredPhones().includes(phone);
}
function registerPhone(phone) {
    const phones = getRegisteredPhones();
    if (!phones.includes(phone)) {
        phones.push(phone);
        localStorage.setItem("quantum_quiz_registered_phones", JSON.stringify(phones));
    }
}


// 1. QUESTION DATABASE
const QUIZ_QUESTIONS = [
    {
        category: "Networking",
        question: "Which protocol translates domain names into IP addresses?",
        options: ["DHCP", "DNS", "ARP", "ICMP"],
        answer: 1,
        explanation: "DNS (Domain Name System) resolves domain names to IP addresses."
    },
    {
        category: "Networking",
        question: "What is the default port number for HTTPS?",
        options: ["80", "8080", "443", "21"],
        answer: 2,
        explanation: "HTTPS uses port 443 by default."
    },
    {
        category: "Networking",
        question: "Which OSI layer is responsible for routing packets between networks?",
        options: ["Data Link", "Transport", "Network", "Session"],
        answer: 2,
        explanation: "The Network layer (layer 3) handles logical addressing and routing."
    },
    {
        category: "Networking",
        question: "Which sequence describes the TCP connection handshake?",
        options: ["SYN, ACK, FIN", "SYN, SYN-ACK, ACK", "ACK, FIN, RST", "HELLO, OK, BYE"],
        answer: 1,
        explanation: "The TCP handshake is SYN, then SYN-ACK, then ACK."
    },
    {
        category: "Networking",
        question: "Which of these is a private IP address?",
        options: ["8.8.8.8", "192.168.1.1", "1.1.1.1", "142.250.0.1"],
        answer: 1,
        explanation: "192.168.0.0/16 is a private range reserved for local networks."
    },
    {
        category: "Networking",
        question: "Which command checks whether a host is reachable by sending ICMP echo requests?",
        options: ["ping", "netstat", "ipconfig", "hostname"],
        answer: 0,
        explanation: "ping sends ICMP echo requests to a host."
    },
    {
        category: "Networking",
        question: "What is the main job of DHCP?",
        options: ["Assigns IP addresses automatically", "Encrypts network traffic", "Resolves domain names", "Filters web content"],
        answer: 0,
        explanation: "DHCP leases IP addresses and other settings to devices."
    },
    {
        category: "Security",
        question: "Which of these is a symmetric encryption algorithm?",
        options: ["RSA", "AES", "Diffie-Hellman", "ECDSA"],
        answer: 1,
        explanation: "AES uses the same key for encryption and decryption."
    },
    {
        category: "Security",
        question: "What is the main purpose of a hash function?",
        options: [
            "Encrypt data so it can be decrypted later",
            "Produce a fixed-size digest to check integrity",
            "Compress files",
            "Generate random numbers"
        ],
        answer: 1,
        explanation: "Hashes are one-way and are used to verify that data has not changed."
    },
    {
        category: "Database",
        question: "Which SQL clause filters groups created by GROUP BY?",
        options: ["WHERE", "HAVING", "ORDER BY", "LIMIT"],
        answer: 1,
        explanation: "HAVING filters aggregated groups; WHERE filters rows before grouping."
    },
    {
        category: "Database",
        question: "What does ACID stand for in database transactions?",
        options: [
            "Access, Control, Integrity, Detection",
            "Atomicity, Consistency, Isolation, Durability",
            "Availability, Consistency, Integrity, Dependency",
            "Atomicity, Concurrency, Indexing, Durability"
        ],
        answer: 1,
        explanation: "ACID stands for Atomicity, Consistency, Isolation, Durability."
    },
    {
        category: "Database",
        question: "Which normal form removes transitive dependencies?",
        options: ["1NF", "2NF", "3NF", "4NF"],
        answer: 2,
        explanation: "3NF removes transitive dependencies on the primary key."
    },
    {
        category: "Database",
        question: "What is a foreign key?",
        options: [
            "A column that uniquely identifies each row",
            "A column that references the primary key of another table",
            "An index on a table",
            "A column that does not allow duplicates"
        ],
        answer: 1,
        explanation: "A foreign key links a column to the primary key of another table."
    },
    {
        category: "Database",
        question: "Which JOIN returns every row from the left table, with matching rows from the right table or NULLs where there is no match?",
        options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "SELF JOIN"],
        answer: 1,
        explanation: "LEFT JOIN keeps all rows from the left table."
    },
    {
        category: "Data Structures",
        question: "What is the time complexity of binary search on a sorted array?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        answer: 1,
        explanation: "Each step halves the search space, so the time is O(log n)."
    },
    {
        category: "Data Structures",
        question: "Which data structure follows Last In, First Out (LIFO)?",
        options: ["Queue", "Stack", "Linked list", "Tree"],
        answer: 1,
        explanation: "A stack removes the most recently added item first."
    },
    {
        category: "Data Structures",
        question: "Which data structure is normally used to implement breadth-first search?",
        options: ["Stack", "Queue", "Heap", "Hash table"],
        answer: 1,
        explanation: "BFS visits nodes level by level, which a queue supports."
    },
    {
        category: "Data Structures",
        question: "What is the average time complexity of a hash table lookup?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
        answer: 2,
        explanation: "With a good hash function, lookups take constant time on average."
    },
    {
        category: "Data Structures",
        question: "Which sorting algorithm has average time complexity O(n log n) and is not stable in its usual form?",
        options: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Counting Sort"],
        answer: 2,
        explanation: "Quick Sort averages O(n log n) but is not stable in its usual implementation."
    },
    {
        category: "Programming",
        question: "In object-oriented programming, what is encapsulation?",
        options: [
            "Hiding internal state and exposing behaviour through methods",
            "Inheriting properties from a parent class",
            "Using one method name for many forms",
            "Creating objects from a template"
        ],
        answer: 0,
        explanation: "Encapsulation keeps internal data private and controls access through methods."
    },
    {
        category: "Web Development",
        question: "What does HTTP status code 404 mean?",
        options: ["Server error", "Not found", "Unauthorized", "Moved permanently"],
        answer: 1,
        explanation: "404 Not Found means the server cannot find the requested resource."
    },
    {
        category: "Web Development",
        question: "Which HTTP method is idempotent and typically used to replace an entire resource?",
        options: ["POST", "PUT", "PATCH", "CONNECT"],
        answer: 1,
        explanation: "PUT replaces the target resource, and repeating the same PUT gives the same result."
    },
    {
        category: "Web Development",
        question: "What is a cookie in web development?",
        options: [
            "A compiled program",
            "A small piece of data stored by the browser and sent with requests",
            "A type of database index",
            "A CSS framework"
        ],
        answer: 1,
        explanation: "Cookies store small pieces of data that the browser sends back to the server."
    },
    {
        category: "Web Development",
        question: "What does CORS control?",
        options: [
            "Which origins may make cross-origin requests to a server",
            "Database access rights",
            "Response compression",
            "Image caching"
        ],
        answer: 0,
        explanation: "CORS tells the browser which other origins may read a server's responses."
    },
    {
        category: "Web Development",
        question: "Which script attribute runs the script after the HTML is parsed while keeping script order?",
        options: ["async", "defer", "lazy", "module"],
        answer: 1,
        explanation: "defer runs scripts after parsing, in the order they appear."
    },
    {
        category: "Security",
        question: "What is Cross-Site Scripting (XSS)?",
        options: [
            "Injecting malicious scripts into pages that other users view",
            "A brute-force password attack",
            "A denial-of-service attack",
            "A way to encrypt cookies"
        ],
        answer: 0,
        explanation: "XSS runs attacker-supplied scripts in other users' browsers."
    },
    {
        category: "Security",
        question: "Which attack is prevented by using parameterized queries?",
        options: ["Cross-Site Scripting", "SQL Injection", "CSRF", "DDoS"],
        answer: 1,
        explanation: "Parameterized queries keep user input separate from the SQL code."
    },
    {
        category: "Security",
        question: "What is the main job of a firewall?",
        options: [
            "Speeds up the internet connection",
            "Filters network traffic according to rules",
            "Stores backups",
            "Compresses files"
        ],
        answer: 1,
        explanation: "A firewall allows or blocks traffic based on defined rules."
    },
    {
        category: "Security",
        question: "What does two-factor authentication (2FA) require?",
        options: [
            "Two separate passwords",
            "Two different kinds of verification factors",
            "Two devices running at the same time",
            "Two backup copies of data"
        ],
        answer: 1,
        explanation: "2FA combines two kinds of proof, such as a password and a one-time code."
    },
    {
        category: "Cloud Computing",
        question: "Which cloud service model provides ready-to-use software over the internet?",
        options: ["IaaS", "PaaS", "SaaS", "DBaaS"],
        answer: 2,
        explanation: "SaaS (Software as a Service) delivers complete applications over the internet."
    },
    {
        category: "Cloud Computing",
        question: "What is the key difference between a container and a virtual machine?",
        options: [
            "Containers include a full guest OS",
            "Containers share the host OS kernel",
            "VMs cannot run Linux",
            "Containers need more RAM than VMs"
        ],
        answer: 1,
        explanation: "Containers share the host kernel, while each VM runs its own guest OS."
    },
    {
        category: "DevOps",
        question: "What does CI/CD stand for?",
        options: [
            "Continuous Integration / Continuous Delivery",
            "Code Inspection / Code Deployment",
            "Central Integration / Central Delivery",
            "Continuous Improvement / Continuous Development"
        ],
        answer: 0,
        explanation: "CI/CD automates building, testing and delivering code changes."
    },
    {
        category: "Version Control",
        question: "Which Git command creates a new branch and switches to it?",
        options: ["git branch new", "git checkout -b new", "git merge new", "git clone new"],
        answer: 1,
        explanation: "git checkout -b creates the branch and switches to it in one step."
    },
    {
        category: "Version Control",
        question: "Which Git command saves staged changes to the local repository?",
        options: ["git push", "git commit", "git add", "git fetch"],
        answer: 1,
        explanation: "git commit records staged changes as a new commit."
    },
    {
        category: "Software Engineering",
        question: "What is the purpose of unit testing?",
        options: [
            "Test the whole system end to end",
            "Test individual components in isolation",
            "Measure network speed",
            "Deploy code to production"
        ],
        answer: 1,
        explanation: "Unit tests check small pieces of code on their own."
    },
    {
        category: "Web Development",
        question: "What does REST stand for?",
        options: [
            "Representational State Transfer",
            "Remote Execution Service Template",
            "Reliable Element Sharing Tool",
            "Relational System Transfer"
        ],
        answer: 0,
        explanation: "REST stands for Representational State Transfer."
    },
    {
        category: "Hardware",
        question: "Which type of memory is fastest and closest to the CPU?",
        options: ["RAM", "Cache", "SSD", "Hard Disk"],
        answer: 1,
        explanation: "CPU cache is the fastest memory after registers and sits closest to the processor."
    },
    {
        category: "Operating Systems",
        question: "What does the process scheduler do?",
        options: [
            "Allocates CPU time to processes",
            "Manages disk partitions",
            "Encrypts files",
            "Sends emails"
        ],
        answer: 0,
        explanation: "The scheduler decides which process runs on the CPU and when."
    },
    {
        category: "Operating Systems",
        question: "What is virtual memory?",
        options: [
            "Memory in cloud servers",
            "A technique that uses disk space to extend available RAM",
            "Memory built into the GPU",
            "Memory used only for graphics"
        ],
        answer: 1,
        explanation: "Virtual memory pages less-used data out to disk to extend usable memory."
    },
    {
        category: "Linux",
        question: "What numeric value does the permission rwx represent in octal?",
        options: ["4", "5", "7", "6"],
        answer: 2,
        explanation: "r=4, w=2, x=1, so rwx = 7."
    },
    {
        category: "Linux",
        question: "Which command prints the current working directory?",
        options: ["ls", "pwd", "cd", "whoami"],
        answer: 1,
        explanation: "pwd stands for print working directory."
    },
    {
        category: "Operating Systems",
        question: "What is a deadlock?",
        options: [
            "Processes waiting forever for resources held by each other",
            "A process running at high priority",
            "A full disk",
            "A network timeout"
        ],
        answer: 0,
        explanation: "In a deadlock, each process waits for a resource that another process holds."
    },
    {
        category: "Networking",
        question: "What is the purpose of a DNS cache?",
        options: [
            "Stores recent domain-to-IP lookups to speed up resolution",
            "Encrypts DNS queries",
            "Stores website files",
            "Balances server load"
        ],
        answer: 0,
        explanation: "A DNS cache reuses recent lookups instead of asking a DNS server again."
    },
    {
        category: "Hardware",
        question: "What does SSD stand for?",
        options: ["Solid State Drive", "Secure System Disk", "Static Storage Device", "Serial Storage Drive"],
        answer: 0,
        explanation: "SSD stands for Solid State Drive."
    },
    {
        category: "Networking",
        question: "Which protocol is used to send email from a client to a mail server?",
        options: ["IMAP", "POP3", "SMTP", "FTP"],
        answer: 2,
        explanation: "SMTP (Simple Mail Transfer Protocol) sends email."
    },
    {
        category: "Networking",
        question: "What is the main advantage of IPv6 over IPv4?",
        options: [
            "A much larger address space",
            "Faster encryption",
            "Built-in browser support",
            "Fewer network layers"
        ],
        answer: 0,
        explanation: "IPv6 uses 128-bit addresses, which avoids running out of addresses."
    },
    {
        category: "Security",
        question: "What does an API key mainly do?",
        options: [
            "Speeds up API responses",
            "Identifies and authenticates the calling application",
            "Compresses API data",
            "Stores user passwords"
        ],
        answer: 1,
        explanation: "An API key identifies the caller so the server can control access."
    },
    {
        category: "Web Development",
        question: "Which HTTP status code means a resource was successfully created?",
        options: ["200 OK", "201 Created", "204 No Content", "301 Moved Permanently"],
        answer: 1,
        explanation: "201 Created is returned after a new resource is created."
    },
    {
        category: "Networking",
        question: "What is the purpose of a load balancer?",
        options: [
            "Distributes incoming traffic across several servers",
            "Encrypts user passwords",
            "Stores database backups",
            "Compiles source code"
        ],
        answer: 0,
        explanation: "A load balancer spreads requests over multiple servers to share the load."
    },
    {
        category: "Networking",
        question: "What does latency measure in a network?",
        options: [
            "Amount of data transferred per second",
            "Time a packet takes to travel from source to destination",
            "Number of connected devices",
            "Available storage"
        ],
        answer: 1,
        explanation: "Latency is the delay between sending and receiving data."
    }
];

// Helper to shuffle arrays in-place using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 1b. QUESTION DECK
// Every question is asked once per cycle, in shuffled order. The rest of the
// current cycle is saved in this browser, so nobody repeats a question until
// the whole cycle has been asked.
const QUESTION_DECK_KEY = "quantum_quiz_question_deck";

// Identifies the current question list, so a saved deck from an older list is discarded
function questionSetId() {
    const text = QUIZ_QUESTIONS.map((q) => q.question).join("|");
    let hash = 5381;
    for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) + hash + text.charCodeAt(i)) | 0;
    }
    return `${QUIZ_QUESTIONS.length}-${hash}`;
}

function loadQuestionState() {
    try {
        const saved = JSON.parse(localStorage.getItem(QUESTION_DECK_KEY));
        const isValid = (i) => Number.isInteger(i) && i >= 0 && i < QUIZ_QUESTIONS.length;
        if (saved && saved.setId === questionSetId() && Array.isArray(saved.remaining)) {
            return {
                remaining: saved.remaining.filter(isValid),
                last: isValid(saved.last) ? saved.last : null
            };
        }
    } catch (e) {
        // Unreadable storage: start a new cycle
    }
    return { remaining: [], last: null };
}

function saveQuestionState(state) {
    try {
        localStorage.setItem(QUESTION_DECK_KEY, JSON.stringify({ ...state, setId: questionSetId() }));
    } catch (e) {
        // Storage unavailable: the deck still works for this visit
    }
}

function drawQuestion() {
    const state = loadQuestionState();

    if (state.remaining.length === 0) {
        // Start a new shuffled cycle with every question
        state.remaining = QUIZ_QUESTIONS.map((_, i) => i);
        shuffleArray(state.remaining);

        // Avoid asking the question that was just asked at the start of the new cycle
        if (state.remaining.length > 1 && state.remaining[0] === state.last) {
            [state.remaining[0], state.remaining[1]] = [state.remaining[1], state.remaining[0]];
        }
    }

    const idx = state.remaining.shift();
    state.last = idx;
    saveQuestionState(state);
    return QUIZ_QUESTIONS[idx];
}

// 2. STATE MANAGER
const gameState = {
    playerName: "",
    playerPhone: "",
    playerQualification: "",
    playerYear: "",
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
function submitToGoogleForm(name, phone, qualification, year) {
    const body = new URLSearchParams();
    body.append(GOOGLE_ENTRY_NAME, name);
    body.append(GOOGLE_ENTRY_PHONE, phone);
    body.append(GOOGLE_ENTRY_QUALIFICATION, qualification || "");
    body.append(GOOGLE_ENTRY_YEAR, year || "");

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

    // 2. ─── LOCK PHONE AS USED ───────────────────────────────────────────
    registerPhone(gameState.playerPhone);

    // 3. ─── SUBMIT TO GOOGLE FORM ────────────────────────────────────────
    submitToGoogleForm(gameState.playerName, gameState.playerPhone, gameState.playerQualification, gameState.playerYear);
    // ─────────────────────────────────────────────────────────────────────

    // 4. Save latest attempt for Welcome screen display
    localStorage.setItem("quantum_quiz_last_attempt", JSON.stringify({
        name: gameState.playerName,
        phone: gameState.playerPhone,
        score: gameState.score
    }));

    // 5. Audio cue
    if (gameState.score === 1) {
        playSynthSound('triumph');
    } else {
        playSynthSound('incorrect');
    }

    // 6. Return to Welcome screen
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
    const yearInput = document.getElementById("player-year");
    if (yearInput) yearInput.value = "";

    // Clear qualification selection
    document.querySelectorAll(".qual-btn").forEach(b => b.classList.remove("qual-selected"));
    const qualError  = document.getElementById("qual-error");
    const phoneError = document.getElementById("phone-error");
    const yearError  = document.getElementById("year-error");
    if (qualError)  qualError.style.display  = "none";
    if (phoneError) phoneError.style.display = "none";
    if (yearError)  yearError.style.display  = "none";

    // Reset game state
    gameState.currentQuestionIndex = 0;
    gameState.score = 0;
    gameState.selectedOptionIdx = null;
    gameState.isLocked = false;
    gameState.playerName = "";
    gameState.playerPhone = "";
    gameState.playerQualification = "";
    gameState.playerYear = "";
    updateRegistrationProgress();
}

function updateRecentAttemptDisplay(name, phone, score) {
    const container = document.getElementById("recent-mark-container");
    const nameText = document.getElementById("recent-player-name");
    const phoneText = document.getElementById("recent-player-phone");
    const badge = document.getElementById("recent-player-badge");
    const initials = document.getElementById("recent-player-initials");

    if (!container) return;

    if (name) {
        const isWinner = score === 1;
        if (nameText) nameText.textContent = name;
        if (phoneText) phoneText.textContent = `📞 ${phone}`;
        if (initials) {
            initials.textContent = name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
        }
        if (badge) badge.textContent = isWinner ? "WELL DONE WINNER" : "BETTER LUCK NEXT TIME";

        // Colours come from CSS via this class; hiding and re-showing restarts the entrance animation
        container.classList.toggle("is-winner", isWinner);
        container.style.display = "none";
        void container.offsetWidth;
        container.style.display = "block";
    } else {
        container.style.display = "none";
    }
}

// 7b. REGISTRATION FORM FEEDBACK
// Same rules the submit handler enforces, so the bar only fills for valid details.
function updateRegistrationProgress() {
    const checks = [
        { id: "player-name",  ok: (v) => v.length > 0 },
        { id: "player-phone", ok: (v) => /^[0-9]{10}$/.test(v) },
        { id: "player-year",  ok: (v) => /^[0-9]{4}$/.test(v) }
    ];

    let done = 0;
    checks.forEach(({ id, ok }) => {
        const input = document.getElementById(id);
        if (!input) return;
        const valid = ok(input.value.trim());
        input.closest(".field").classList.toggle("is-valid", valid);
        if (valid) done++;
    });
    if (gameState.playerQualification) done++;

    const total = checks.length + 1;
    const fill = document.getElementById("reg-progress-fill");
    const count = document.getElementById("reg-progress-count");
    if (fill) fill.style.width = `${(done / total) * 100}%`;
    if (count) count.textContent = `${done} / ${total}`;
}

function shakeRegistrationForm() {
    const form = document.getElementById("start-form");
    if (!form) return;
    form.classList.remove("shake");
    void form.offsetWidth; // restart the animation if it is already running
    form.classList.add("shake");
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

    // Clear phone error while user corrects the number
    const phoneInputEl = document.getElementById("player-phone");
    if (phoneInputEl) {
        phoneInputEl.addEventListener("input", () => {
            const phoneError = document.getElementById("phone-error");
            if (phoneError) phoneError.style.display = "none";
        });
    }

    // Live progress + validity feedback for the registration fields
    ["player-name", "player-phone", "player-year"].forEach((id) => {
        const input = document.getElementById(id);
        if (input) input.addEventListener("input", updateRegistrationProgress);
    });
    updateRegistrationProgress();

    // Qualification button selection
    document.querySelectorAll(".qual-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".qual-btn").forEach(b => b.classList.remove("qual-selected"));
            btn.classList.add("qual-selected");
            gameState.playerQualification = btn.getAttribute("data-val");
            updateRegistrationProgress();
            const qualError = document.getElementById("qual-error");
            if (qualError) qualError.style.display = "none";
        });
    });

    // Form submission → start quiz
    const startForm = document.getElementById("start-form");
    if (startForm) {
        startForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nameInput  = document.getElementById("player-name");
            const phoneInput = document.getElementById("player-phone");
            const phoneError = document.getElementById("phone-error");
            const yearInput  = document.getElementById("player-year");
            const yearError  = document.getElementById("year-error");
            const qualError  = document.getElementById("qual-error");

            let hasError = false;

            // Qualification required
            if (!gameState.playerQualification) {
                if (qualError) qualError.style.display = "block";
                hasError = true;
            }

            // Phone: exactly 10 digits
            const phone = phoneInput ? phoneInput.value.trim() : "";
            if (!/^[0-9]{10}$/.test(phone)) {
                if (phoneError) {
                    phoneError.textContent = "Please enter a valid 10-digit mobile number.";
                    phoneError.style.display = "block";
                }
                hasError = true;
            } else if (isPhoneRegistered(phone)) {
                if (phoneError) {
                    phoneError.textContent = "This number has already participated. Only one attempt per number is allowed.";
                    phoneError.style.display = "block";
                }
                hasError = true;
            }

            // Year of Pass out: exactly 4 digits
            const year = yearInput ? yearInput.value.trim() : "";
            if (!/^[0-9]{4}$/.test(year)) {
                if (yearError) {
                    yearError.textContent = "Please enter a valid 4-digit year.";
                    yearError.style.display = "block";
                }
                hasError = true;
            }

            const name = nameInput ? nameInput.value.trim() : "";
            if (!name) hasError = true;

            if (hasError) {
                shakeRegistrationForm();
                return;
            }

            gameState.playerName  = name;
            gameState.playerPhone = phone;
            gameState.playerYear  = year;

            // Next question from the current cycle; repeats only after every question has been asked
            gameState.activeQuestions = [drawQuestion()];
            gameState.currentQuestionIndex = 0;
            gameState.score = 0;

            initAudio();
            playSynthSound('tap');

            const welcomeScreen = document.getElementById("welcome-screen");
            const quizScreen    = document.getElementById("quiz-screen");

            if (welcomeScreen) welcomeScreen.classList.add("hidden");
            if (quizScreen) {
                quizScreen.classList.remove("hidden");
                quizScreen.classList.add("active");
            }

            loadQuestion();
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