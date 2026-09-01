/* ============================================
   CYBER SECURITY CLUB — script.js
   ============================================ */

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

/* =========================================
   CYBER SECURITY UPDATE SYSTEM
   ========================================= */

const cyberUpdates = {

    cve: {
        category: "VULNERABILITY",
        title: "Understanding CVEs",

        body: `
            <p>
                A CVE, or Common Vulnerabilities and Exposures identifier,
                provides a standardized reference for a publicly known
                cybersecurity vulnerability.
            </p>

            <h4>Why CVEs Matter</h4>

            <p>
                Security teams use CVE identifiers to track vulnerabilities,
                correlate security advisories, prioritize remediation, and
                communicate about affected software and systems.
            </p>

            <h4>Typical Vulnerability Workflow</h4>

            <ul>
                <li>Vulnerability discovery</li>
                <li>Technical analysis</li>
                <li>Responsible disclosure</li>
                <li>CVE identification</li>
                <li>Vendor remediation</li>
                <li>Security patching</li>
                <li>Risk assessment</li>
            </ul>

            <h4>Club Focus</h4>

            <p>
                Members should learn how to interpret vulnerability
                information, determine affected versions, understand severity,
                and apply appropriate defensive remediation.
            </p>
        `
    },


    "threat-intelligence": {

        category: "THREAT INTELLIGENCE",

        title: "Threat Intelligence",

        body: `
            <p>
                Cyber threat intelligence is the collection, processing,
                analysis, and interpretation of information about threats
                affecting digital environments.
            </p>

            <h4>Types of Intelligence</h4>

            <ul>
                <li>Strategic intelligence</li>
                <li>Operational intelligence</li>
                <li>Tactical intelligence</li>
                <li>Technical intelligence</li>
            </ul>

            <h4>What Analysts Examine</h4>

            <ul>
                <li>Threat actors</li>
                <li>Attack techniques</li>
                <li>Indicators of compromise</li>
                <li>Malware families</li>
                <li>Infrastructure</li>
                <li>Campaign activity</li>
            </ul>

            <p>
                The objective is to transform security information into
                actionable intelligence that can improve detection,
                prevention, and incident response.
            </p>
        `
    },


    ioc: {

        category: "INCIDENT RESPONSE",

        title: "Indicators of Compromise",

        body: `
            <p>
                Indicators of Compromise, commonly called IOCs, are artifacts
                or observations that may indicate malicious activity or a
                security compromise.
            </p>

            <h4>Examples</h4>

            <ul>
                <li>Suspicious file hashes</li>
                <li>Malicious domains</li>
                <li>Known malicious IP addresses</li>
                <li>Unexpected processes</li>
                <li>Unusual authentication activity</li>
                <li>Suspicious registry or system changes</li>
                <li>Unexpected network connections</li>
            </ul>

            <h4>Why IOCs Matter</h4>

            <p>
                Incident responders can use indicators to investigate systems,
                search security logs, identify potentially affected hosts,
                and support containment and remediation activities.
            </p>
        `
    },


    cti: {

        category: "SECURITY RESEARCH",

        title: "Cyber Threat Intelligence",

        body: `
            <p>
                Cyber threat intelligence combines technical evidence,
                contextual information, and analytical processes to develop
                an understanding of cyber threats.
            </p>

            <h4>Intelligence Cycle</h4>

            <ul>
                <li>Planning and direction</li>
                <li>Collection</li>
                <li>Processing</li>
                <li>Analysis</li>
                <li>Dissemination</li>
                <li>Feedback</li>
            </ul>

            <p>
                Effective intelligence allows security teams to move beyond
                simply reacting to incidents and instead make informed
                decisions about detection, prevention, and risk reduction.
            </p>
        `
    }

};


function openCyberUpdate(updateName) {

    const update = cyberUpdates[updateName];

    if (!update) {
        return;
    }

    const modal = document.getElementById("cyberUpdateModal");
    const category = document.getElementById("modalCategory");
    const title = document.getElementById("modalTitle");
    const body = document.getElementById("modalBody");

    category.textContent = update.category;
    title.textContent = update.title;
    body.innerHTML = update.body;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}


function closeCyberUpdate() {
    const modal = document.getElementById("cyberUpdateModal");
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}


/* Close when clicking outside */
document.addEventListener("click", function(event) {
    const modal = document.getElementById("cyberUpdateModal");
    if (event.target === modal) {
        closeCyberUpdate();
    }
});


/* Close with ESC */
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeCyberUpdate();
    }
});


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

// Terms added via the admin page — stored in Firestore, visible to everyone
async function getCustomGlossary() {
    try {
        const snapshot = await db.collection("glossary").get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
        console.error("Failed to load glossary from database:", err);
        return [];
    }
}

async function addGlossaryTerm(term, def) {
    await db.collection("glossary").add({ term, def });
}

async function deleteGlossaryTerm(id) {
    await db.collection("glossary").doc(id).delete();
}

async function getAllGlossaryTerms() {
    const custom = await getCustomGlossary();
    return [...defaultGlossary, ...custom];
}

async function renderGlossary() {
    const grid = document.getElementById("glossary-grid");
    if (!grid) return;

    grid.innerHTML = `<p class="section-subtitle">Loading...</p>`;
    const terms = await getAllGlossaryTerms();

    grid.innerHTML = "";
    terms.forEach(item => {
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

        const name = document.getElementById("join-name").value.trim();
        const email = document.getElementById("join-email").value.trim();
        const interest = document.getElementById("join-interest").value.trim();

        try {
            await db.collection("applications").add({
                name,
                email,
                interest,
                status: "pending",
                submittedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (err) {
            console.error("Application submission failed:", err);
        }

        // Optional: also email you a copy if you've set up Formspree
        try {
            if (!FORM_ENDPOINT.includes("YOUR_FORM_ID")) {
                await fetch(FORM_ENDPOINT, {
                    method: "POST",
                    body: new FormData(form),
                    headers: { "Accept": "application/json" }
                });
            }
        } catch (err) {
            console.error("Formspree notification failed:", err);
        }

        form.classList.add("hidden");
        document.getElementById("join-pending").classList.remove("hidden");
    });
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/My-first-repo/service-worker.js');
}