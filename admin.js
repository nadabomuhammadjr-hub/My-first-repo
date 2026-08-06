// Lines that type out one by one in the hero terminal window
const terminalLines = [
    "initializing_defense_protocol...",
    "scanning_network... clear.",
    "access_granted: welcome to FUGA Cyber Club",
    "WELCOME TO DADDY PROGRAMMER WORLD"
];

// ---- Boot intro screen ----
const bootLines = [
    "booting ccsc_kernel...",
    "loading security modules... [OK]",
    "authenticating admin session...",
    "access granted.",
    "",
    "WELCOME TO DADDY PROGRAMMER WORLD"
];

function runBootSequence() {
    const introScreen = document.getElementById("intro-screen");
    const bootEl = document.getElementById("boot-lines");
    if (!introScreen || !bootEl) return;

    document.body.style.overflow = "hidden";

    let i = 0;
    function nextLine() {
        if (i >= bootLines.length) {
            setTimeout(() => {
                introScreen.classList.add("fade-out");
                document.body.style.overflow = "";
                setTimeout(() => introScreen.remove(), 800);
            }, 900);
            return;
        }
        const line = document.createElement("p");
        const isFinal = bootLines[i] === "WELCOME TO DADDY PROGRAMMER WORLD";
        if (isFinal) line.className = "boot-final";
        line.textContent = bootLines[i];
        bootEl.appendChild(line);
        i++;
        setTimeout(nextLine, isFinal ? 200 : 350);
    }
    nextLine();
}

function typeWriter(el, lines, lineIndex = 0, charIndex = 0) {
    if (lineIndex >= lines.length) {
        // restart the loop after a short pause
        setTimeout(() => typeWriter(el, lines, 0, 0), 2000);
        el.textContent = "";
        return;
    }

    const currentLine = lines[lineIndex];

    if (charIndex <= currentLine.length) {
        el.textContent = currentLine.slice(0, charIndex);
        setTimeout(() => typeWriter(el, lines, lineIndex, charIndex + 1), 45);
    } else {
        // pause at end of line, then clear and move to next
        setTimeout(() => {
            el.textContent = "";
            typeWriter(el, lines, lineIndex + 1, 0);
        }, 1200);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    runBootSequence();

    const el = document.getElementById("typewriter");
    if (el) {
        typeWriter(el, terminalLines);
    }

    renderGlossary();
    setupJoinForm();
});

// Button actions
function joinClub() {
    document.getElementById("join").scrollIntoView({ behavior: "smooth" });
}

function contactClub() {
    window.location.href = "mailto:cyberclub@gmail.com";
}

/* ============================================
   GLOSSARY (shared with admin.js)
   ============================================ */

// Built-in starter terms — always shown
const defaultGlossary = [
    { term: "Phishing", def: "A scam that tricks people into revealing sensitive info through fake emails, messages, or websites." },
    { term: "Malware", def: "Malicious software designed to damage, exploit, or gain unauthorized access to a system." },
    { term: "Firewall", def: "A security system that filters and controls incoming and outgoing network traffic." },
    { term: "VPN", def: "Virtual Private Network — encrypts your internet connection and hides your online activity." },
    { term: "Encryption", def: "The process of converting data into a coded form so only authorized parties can read it." },
    { term: "Two-Factor Authentication (2FA)", def: "A second layer of login security beyond just a password, e.g. an OTP code." },
    { term: "Ethical Hacking", def: "Legally testing systems for vulnerabilities with permission, to help fix them before attackers find them." },
    { term: "Social Engineering", def: "Manipulating people into giving up confidential information or access." },
    { term: "Zero-day Exploit", def: "An attack that targets a software flaw before the developer has released a fix." },
    { term: "DDoS Attack", def: "Distributed Denial of Service — overwhelming a system with traffic to take it offline." }
];

// Terms added via the admin page, saved on this device only
function getCustomGlossary() {
    try {
        return JSON.parse(localStorage.getItem("ccsc_custom_glossary")) || [];
    } catch {
        return [];
    }
}

function saveCustomGlossary(terms) {
    localStorage.setItem("ccsc_custom_glossary", JSON.stringify(terms));
}

function getAllGlossaryTerms() {
    return [...defaultGlossary, ...getCustomGlossary()];
}

function renderGlossary() {
    const grid = document.getElementById("glossary-grid");
    if (!grid) return;

    grid.innerHTML = "";
    getAllGlossaryTerms().forEach(item => {
        const card = document.createElement("div");
        card.className = "glossary-card";
        card.innerHTML = `<h3>${escapeHTML(item.term)}</h3><p>${escapeHTML(item.def)}</p>`;
        grid.appendChild(card);
    });
}

function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

/* ============================================
   JOIN FORM
   ============================================ */

// Replace this with your own Formspree endpoint so applications reach your inbox.
// 1. Go to formspree.io, create a free account
// 2. Create a new form, copy the endpoint it gives you
// 3. Paste it below in place of the placeholder
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

function setupJoinForm() {
    const form = document.getElementById("join-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector("button[type=submit]");
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";

        const formData = new FormData(form);

        try {
            if (!FORM_ENDPOINT.includes("YOUR_FORM_ID")) {
                await fetch(FORM_ENDPOINT, {
                    method: "POST",
                    body: formData,
                    headers: { "Accept": "application/json" }
                });
            }
        } catch (err) {
            console.error("Application submission failed:", err);
        }

        form.classList.add("hidden");
        document.getElementById("join-pending").classList.remove("hidden");
    });
}

/* ============================================
   CYBER SECURITY QUIZ
   ============================================ */

const quizQuestions = [
    {
        q: "What does \"phishing\" refer to?",
        options: [
            "Tricking someone into revealing sensitive info via fake messages",
            "A type of firewall",
            "A network speed test",
            "A programming language"
        ],
        answer: 0
    },
    {
        q: "Which of these is the strongest password?",
        options: ["password123", "Gashua2026", "Tr#7!qLm9$vX", "12345678"],
        answer: 2
    },
    {
        q: "What does VPN stand for?",
        options: [
            "Virtual Private Network",
            "Verified Public Node",
            "Virtual Protected Node",
            "Very Personal Network"
        ],
        answer: 0
    },
    {
        q: "What is two-factor authentication (2FA)?",
        options: [
            "Using two different browsers",
            "A second layer of login verification beyond a password",
            "Having two email addresses",
            "Encrypting a file twice"
        ],
        answer: 1
    },
    {
        q: "What does \"HTTPS\" indicate about a website?",
        options: [
            "It's hosted in the US",
            "It has no ads",
            "The connection is encrypted",
            "It loads faster"
        ],
        answer: 2
    },
    {
        q: "What is malware?",
        options: [
            "A hardware component",
            "Malicious software designed to harm or exploit systems",
            "A type of antivirus",
            "A network cable standard"
        ],
        answer: 1
    },
    {
        q: "What is a firewall used for?",
        options: [
            "Speeding up your internet",
            "Storing passwords",
            "Filtering and controlling network traffic",
            "Compressing files"
        ],
        answer: 2
    },
    {
        q: "What does \"CTF\" stand for in cybersecurity?",
        options: [
            "Capture The Flag",
            "Cyber Threat Filter",
            "Central Traffic Firewall",
            "Coded Transfer Format"
        ],
        answer: 0
    },
    {
        q: "What's the safest thing to do with an unexpected email attachment?",
        options: [
            "Open it to see what it is",
            "Forward it to a friend first",
            "Avoid opening it and verify the sender first",
            "Rename the file"
        ],
        answer: 2
    },
    {
        q: "What does \"ethical hacking\" mean?",
        options: [
            "Hacking for personal gain",
            "Testing systems with permission to find and fix vulnerabilities",
            "Hacking only on weekends",
            "Writing hacking tutorials"
        ],
        answer: 1
    }
];

let quizIndex = 0;
let quizScore = 0;

function startQuiz() {
    quizIndex = 0;
    quizScore = 0;

    document.getElementById("quiz-start").classList.add("hidden");
    document.getElementById("quiz-result").classList.add("hidden");
    document.getElementById("quiz-question").classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    const q = quizQuestions[quizIndex];
    document.getElementById("quiz-progress").textContent =
        `Question ${quizIndex + 1} / ${quizQuestions.length}`;
    document.getElementById("quiz-score").textContent = `Score: ${quizScore}`;
    document.getElementById("quiz-question-text").textContent = q.q;
    document.getElementById("quiz-feedback").textContent = "";

    const optionsEl = document.getElementById("quiz-options");
    optionsEl.innerHTML = "";

    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(i);
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(i) {
    const q = quizQuestions[quizIndex];
    const buttons = document.querySelectorAll("#quiz-options .quiz-option");
    buttons.forEach(b => b.disabled = true);

    const feedback = document.getElementById("quiz-feedback");

    if (i === q.answer) {
        quizScore++;
        buttons[i].classList.add("correct");
        feedback.textContent = "Correct.";
        feedback.className = "quiz-feedback correct-text";
    } else {
        buttons[i].classList.add("wrong");
        buttons[q.answer].classList.add("correct");
        feedback.textContent = "Not quite.";
        feedback.className = "quiz-feedback wrong-text";
    }

    document.getElementById("quiz-score").textContent = `Score: ${quizScore}`;

    setTimeout(() => {
        quizIndex++;
        if (quizIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1100);
}

function showResult() {
    document.getElementById("quiz-question").classList.add("hidden");
    document.getElementById("quiz-result").classList.remove("hidden");

    const total = quizQuestions.length;
    document.getElementById("quiz-result-score").textContent =
        `You scored ${quizScore} / ${total}`;

    let rank;
    const pct = quizScore / total;
    if (pct === 1) rank = "Elite Hacker";
    else if (pct >= 0.8) rank = "White Hat Hacker";
    else if (pct >= 0.6) rank = "Security Analyst";
    else if (pct >= 0.4) rank = "Cyber Cadet";
    else rank = "Script Kiddie";

    document.getElementById("quiz-result-rank").textContent = `Rank: ${rank}`;
}
