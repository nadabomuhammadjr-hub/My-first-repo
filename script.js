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

    const modal =
        document.getElementById("cyberUpdateModal");

    const category =
        document.getElementById("modalCategory");

    const title =
        document.getElementById("modalTitle");

    const body =
        document.getElementById("modalBody");


    category.textContent =
        update.category;

    title.textContent =
        update.title;

    body.innerHTML =
        update.body;


    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";
}


function closeCyberUpdate() {

    const modal =
        document.getElementById("cyberUpdateModal");


    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";
}


/* Close when clicking outside */

document.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "cyberUpdateModal"
            );

        if (
            event.target === modal
        ) {
            closeCyberUpdate();
        }

    }
);


/* Close with ESC */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {
            closeCyberUpdate();
        }

    }
);


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

.
/* =========================================
   CYBERSECURITY GLOSSARY DATABASE
   ========================================= */

const glossaryTerms = [

    {
        term: "CIA Triad",
        category: "fundamentals",

        definition:
            "A foundational information-security model based on confidentiality, integrity, and availability.",

        details: `
            <h4>Confidentiality</h4>

            <p>
                Ensures that information is accessible only to authorized
                individuals, systems, or processes.
            </p>

            <h4>Integrity</h4>

            <p>
                Ensures that information remains accurate, complete, and
                protected from unauthorized modification.
            </p>

            <h4>Availability</h4>

            <p>
                Ensures that authorized users can access systems and
                information when required.
            </p>
        `
    },


    {
        term: "Authentication",
        category: "fundamentals",

        definition:
            "The process of verifying the identity of a user, device, service, or other entity.",

        details: `
            <p>
                Authentication answers the question:
                <strong>"Who are you?"</strong>
            </p>

            <h4>Common Factors</h4>

            <ul>
                <li>Something you know</li>
                <li>Something you have</li>
                <li>Something you are</li>
            </ul>

            <p>
                Multi-factor authentication combines two or more independent
                authentication factors.
            </p>
        `
    },


    {
        term: "Authorization",
        category: "fundamentals",

        definition:
            "The process of determining what an authenticated identity is permitted to access or perform.",

        details: `
            <p>
                Authentication establishes identity, while authorization
                determines permissions.
            </p>

            <h4>Example</h4>

            <p>
                A user may successfully authenticate to a university system
                but still be unauthorized to access administrative records.
            </p>
        `
    },


    {
        term: "Attack Surface",
        category: "fundamentals",

        definition:
            "The collection of points through which an unauthorized party could potentially interact with or attack a system.",

        details: `
            <p>
                An attack surface can include exposed services, applications,
                APIs, endpoints, user accounts, cloud resources, and physical
                interfaces.
            </p>

            <h4>Security Objective</h4>

            <p>
                Organizations attempt to reduce unnecessary exposure and
                continuously monitor assets that remain accessible.
            </p>
        `
    },


    {
        term: "Firewall",
        category: "network",

        definition:
            "A security control that monitors and regulates network traffic according to defined policies.",

        details: `
            <p>
                Firewalls can enforce rules based on characteristics such as
                source, destination, protocol, port, application, or identity.
            </p>

            <h4>Common Types</h4>

            <ul>
                <li>Network firewalls</li>
                <li>Host-based firewalls</li>
                <li>Next-generation firewalls</li>
                <li>Web application firewalls</li>
            </ul>
        `
    },


    {
        term: "IDS",
        category: "network",

        definition:
            "An Intrusion Detection System monitors activity and generates alerts when potentially malicious or policy-violating behavior is detected.",

        details: `
            <p>
                IDS technologies can analyze network traffic or activity
                occurring on individual hosts.
            </p>

            <h4>Detection Approaches</h4>

            <ul>
                <li>Signature-based detection</li>
                <li>Anomaly-based detection</li>
                <li>Behavior-based detection</li>
            </ul>
        `
    },


    {
        term: "VPN",
        category: "network",

        definition:
            "A Virtual Private Network creates an encrypted communication channel between endpoints across an underlying network.",

        details: `
            <p>
                VPN technologies can provide confidentiality and integrity
                for traffic while allowing users or networks to communicate
                across untrusted infrastructure.
            </p>
        `
    },


    {
        term: "SQL Injection",
        category: "web",

        definition:
            "A class of injection vulnerability in which untrusted input influences the construction of database queries.",

        details: `
            <p>
                SQL injection can occur when applications construct database
                queries unsafely using attacker-controlled input.
            </p>

            <h4>Prevention</h4>

            <ul>
                <li>Parameterized queries</li>
                <li>Prepared statements</li>
                <li>Input validation</li>
                <li>Least-privilege database accounts</li>
            </ul>
        `
    },


    {
        term: "Cross-Site Scripting",
        category: "web",

        definition:
            "A web application vulnerability in which attacker-controlled content is executed in a victim's browser.",

        details: `
            <p>
                XSS can affect applications that incorrectly handle
                untrusted content.
            </p>

            <h4>Common Categories</h4>

            <ul>
                <li>Stored XSS</li>
                <li>Reflected XSS</li>
                <li>DOM-based XSS</li>
            </ul>

            <h4>Defensive Measures</h4>

            <ul>
                <li>Context-aware output encoding</li>
                <li>Input validation</li>
                <li>Content Security Policy</li>
                <li>Secure framework practices</li>
            </ul>
        `
    },


    {
        term: "CSRF",
        category: "web",

        definition:
            "Cross-Site Request Forgery is a class of attack where a victim's browser is induced to send an unintended request to a trusted application.",

        details: `
            <p>
                Applications can mitigate CSRF using mechanisms such as
                anti-CSRF tokens, appropriate cookie attributes, and
                origin validation.
            </p>
        `
    },


    {
        term: "Penetration Testing",
        category: "offensive",

        definition:
            "An authorized security assessment designed to identify and validate vulnerabilities within a defined scope.",

        details: `
            <h4>Typical Phases</h4>

            <ul>
                <li>Planning and scope definition</li>
                <li>Reconnaissance</li>
                <li>Enumeration</li>
                <li>Vulnerability analysis</li>
                <li>Controlled exploitation</li>
                <li>Post-exploitation analysis</li>
                <li>Reporting and remediation</li>
            </ul>

            <p>
                Penetration testing must be performed only with appropriate
                authorization.
            </p>
        `
    },


    {
        term: "Privilege Escalation",
        category: "offensive",

        definition:
            "The exploitation of weaknesses to obtain privileges beyond those originally assigned to an account or process.",

        details: `
            <p>
                Privilege escalation can be broadly categorized as
                vertical or horizontal.
            </p>

            <ul>
                <li>
                    <strong>Vertical:</strong>
                    obtaining higher privileges.
                </li>

                <li>
                    <strong>Horizontal:</strong>
                    accessing resources belonging to another user with
                    comparable privileges.
                </li>
            </ul>
        `
    },


    {
        term: "SIEM",
        category: "defensive",

        definition:
            "Security Information and Event Management systems collect, correlate, analyze, and present security-relevant events.",

        details: `
            <p>
                SIEM platforms help security teams centralize telemetry and
                investigate suspicious activity.
            </p>

            <h4>Common Functions</h4>

            <ul>
                <li>Log collection</li>
                <li>Event correlation</li>
                <li>Alerting</li>
                <li>Threat detection</li>
                <li>Investigation</li>
                <li>Reporting</li>
            </ul>
        `
    },


    {
        term: "EDR",
        category: "defensive",

        definition:
            "Endpoint Detection and Response technology monitors endpoint activity and assists security teams in detecting and responding to threats.",

        details: `
            <p>
                EDR platforms can collect endpoint telemetry such as process
                activity, network connections, file operations, and other
                security-relevant events.
            </p>
        `
    },


    {
        term: "Digital Forensics",
        category: "forensics",

        definition:
            "The systematic examination and interpretation of digital evidence for investigative purposes.",

        details: `
            <h4>Common Areas</h4>

            <ul>
                <li>Disk forensics</li>
                <li>Memory forensics</li>
                <li>Network forensics</li>
                <li>Mobile forensics</li>
                <li>Cloud forensics</li>
            </ul>

            <p>
                Investigators must preserve evidence integrity and maintain
                appropriate documentation throughout the investigation.
            </p>
        `
    },


    {
        term: "IOC",
        category: "threat",

        definition:
            "An Indicator of Compromise is an observable artifact that may provide evidence of malicious activity or system compromise.",

        details: `
            <h4>Examples</h4>

            <ul>
                <li>Malicious file hashes</li>
                <li>Suspicious domains</li>
                <li>Known malicious IP addresses</li>
                <li>Unexpected processes</li>
                <li>Suspicious persistence mechanisms</li>
                <li>Abnormal authentication activity</li>
            </ul>
        `
    },


    {
        term: "Cryptographic Hash",
        category: "cryptography",

        definition:
            "A cryptographic hash function maps input data to a fixed-length output designed to provide specific security properties.",

        details: `
            <p>
                Cryptographic hashes are commonly used for integrity checking,
                password-storage mechanisms, digital signatures, and
                identification of digital artifacts.
            </p>

            <h4>Important Properties</h4>

            <ul>
                <li>Deterministic output</li>
                <li>Preimage resistance</li>
                <li>Second-preimage resistance</li>
                <li>Collision resistance</li>
            </ul>
        `
    },


    {
        term: "PKI",
        category: "cryptography",

        definition:
            "Public Key Infrastructure is a framework for managing public-key cryptography, certificates, identities, and trust relationships.",

        details: `
            <h4>Major Components</h4>

            <ul>
                <li>Certificate Authorities</li>
                <li>Digital certificates</li>
                <li>Public and private keys</li>
                <li>Certificate policies</li>
                <li>Revocation mechanisms</li>
            </ul>
        `
    },


    {
        term: "MITRE ATT&CK",
        category: "threat",

        definition:
            "A knowledge base describing adversary tactics and techniques based on real-world observations.",

        details: `
            <p>
                Security teams use MITRE ATT&CK to understand adversary
                behavior, map detections, develop defensive strategies, and
                structure threat-informed security programs.
            </p>

            <h4>Core Concepts</h4>

            <ul>
                <li>Tactics</li>
                <li>Techniques</li>
                <li>Sub-techniques</li>
                <li>Procedures</li>
            </ul>
        `
    }

];


/* =========================================
   GLOSSARY RENDERING
   ========================================= */

const glossaryGrid =
    document.getElementById("glossaryGrid");

const glossarySearch =
    document.getElementById("glossarySearch");

const glossaryCategory =
    document.getElementById("glossaryCategory");

const glossaryEmpty =
    document.getElementById("glossaryEmpty");


function renderGlossary() {

    const searchTerm =
        glossarySearch.value
            .trim()
            .toLowerCase();

    const category =
        glossaryCategory.value;


    const filteredTerms =
        glossaryTerms.filter(term => {

            const matchesSearch =
                term.term
                    .toLowerCase()
                    .includes(searchTerm) ||

                term.definition
                    .toLowerCase()
                    .includes(searchTerm);


            const matchesCategory =
                category === "all" ||
                term.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    glossaryGrid.innerHTML = "";


    if (filteredTerms.length === 0) {

        glossaryEmpty.style.display =
            "block";

        return;

    }


    glossaryEmpty.style.display =
        "none";


    filteredTerms.forEach(term => {

        const card =
            document.createElement("article");

        card.className =
            "glossary-card";


        const firstLetter =
            term.term.charAt(0)
                .toUpperCase();


        card.innerHTML = `

            <span class="glossary-letter">
                ${firstLetter}
            </span>

            <h3>
                ${term.term}
            </h3>

            <p>
                ${term.definition}
            </p>

            <span
                class="glossary-card-category">
                ${term.category
                    .replace("-", " ")
                    .toUpperCase()}
            </span>

        `;


        card.addEventListener(
            "click",
            () => openGlossary(term)
        );


        glossaryGrid.appendChild(card);

    });

}


function openGlossary(term) {

    const modal =
        document.getElementById(
            "glossaryModal"
        );


    document.getElementById(
        "glossaryModalCategory"
    ).textContent =
        term.category
            .replace("-", " ")
            .toUpperCase();


    document.getElementById(
        "glossaryModalTitle"
    ).textContent =
        term.term;


    document.getElementById(
        "glossaryModalBody"
    ).innerHTML =
        term.details;


    modal.classList.add(
        "active"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";
}


function closeGlossary() {

    const modal =
        document.getElementById(
            "glossaryModal"
        );


    modal.classList.remove(
        "active"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";
}


/* SEARCH */

if (glossarySearch) {

    glossarySearch.addEventListener(
        "input",
        renderGlossary
    );

}


/* CATEGORY FILTER */

if (glossaryCategory) {

    glossaryCategory.addEventListener(
        "change",
        renderGlossary
    );

}


/* CLOSE ON OUTSIDE CLICK */

document.addEventListener(
    "click",
    event => {

        const modal =
            document.getElementById(
                "glossaryModal"
            );


        if (
            event.target === modal
        ) {

            closeGlossary();

        }

    }
);


/* ESCAPE KEY */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeGlossary();

        }

    }
);
/* =========================================
   FUGA SOC DASHBOARD ENGINE
   ========================================= */

const socAdvisories = [

    {
        title:
            "Authentication controls review",

        date:
            "Current",

        severity:
            "REVIEW"
    },


    {
        title:
            "Software patch management",

        date:
            "Current",

        severity:
            "PRIORITY"
    },


    {
        title:
            "Security logging validation",

        date:
            "Current",

        severity:
            "REVIEW"
    },


    {
        title:
            "Phishing awareness exercise",

        date:
            "Scheduled",

        severity:
            "TRAINING"
    }

];


const socIncidents = [

    {
        name:
            "INC-001 — Suspicious Authentication",

        status:
            "ANALYZING",

        description:
            "Simulated authentication anomaly created for incident-response training."
    },


    {
        name:
            "INC-002 — Unusual Network Traffic",

        status:
            "INVESTIGATING",

        description:
            "Controlled network investigation scenario for SOC analyst training."
    }

];


/* =========================================
   RENDER ADVISORIES
   ========================================= */

function renderSOCAdvisories() {

    const container =
        document.getElementById(
            "advisoryList"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    socAdvisories.forEach(
        advisory => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "advisory-item";


            item.innerHTML = `

                <div>

                    <div
                        class="advisory-title">

                        ${advisory.title}

                    </div>

                    <span
                        class="advisory-date">

                        ${advisory.date}

                    </span>

                </div>


                <span
                    class="advisory-severity">

                    ${advisory.severity}

                </span>

            `;


            container.appendChild(
                item
            );

        }
    );

}


/* =========================================
   RENDER INCIDENTS
   ========================================= */

function renderSOCIncidents() {

    const container =
        document.getElementById(
            "incidentList"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        "";


    socIncidents.forEach(
        incident => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "incident-item";


            item.innerHTML = `

                <div
                    class="incident-top">

                    <span
                        class="incident-name">

                        ${incident.name}

                    </span>

                    <span
                        class="incident-status">

                        ${incident.status}

                    </span>

                </div>


                <p>

                    ${incident.description}

                </p>

            `;


            container.appendChild(
                item
            );

        }
    );

}


/* =========================================
   UPDATE SOC CLOCK
   ========================================= */

function updateSOCTime() {

    const element =
        document.getElementById(
            "socLastUpdate"
        );


    if (!element) {
        return;
    }


    const now =
        new Date();


    element.textContent =
        now.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );

}


/* =========================================
   REFRESH SOC
   ========================================= */

function refreshSOC() {

    updateSOCTime();

    renderSOCAdvisories();

    renderSOCIncidents();


    const button =
        document.querySelector(
            ".soc-refresh"
        );


    if (button) {

        button.textContent =
            "✓ Updated";


        setTimeout(
            () => {

                button.textContent =
                    "↻ Refresh";

            },
            1500
        );

    }

}


/* =========================================
   INITIALIZE SOC
   ========================================= */

function initializeSOC() {

    renderSOCAdvisories();

    renderSOCIncidents();

    updateSOCTime();

}


initializeSOC();


/* Update displayed SOC time */

setInterval(
    updateSOCTime,
    1000
);


/* INITIALIZE */

if (glossaryGrid) {

    renderGlossary();

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
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/My-first-repo/service-worker.js');
}
/* =========================================
   FUGA CYBER SECURITY QUIZ ENGINE
   ========================================= */

const quizQuestions = {

    beginner: [

        {
            category: "SECURITY FUNDAMENTALS",

            question:
                "Which three principles form the CIA Triad?",

            answers: [
                "Confidentiality, Integrity, Availability",
                "Control, Identification, Authentication",
                "Confidentiality, Identification, Authorization",
                "Control, Integrity, Authentication"
            ],

            correct: 0,

            explanation:
                "The CIA Triad consists of Confidentiality, Integrity, and Availability. It is a foundational model used to reason about information-security objectives."
        },


        {
            category: "AUTHENTICATION",

            question:
                "Which option represents multi-factor authentication?",

            answers: [
                "Password + another password",
                "Username + password",
                "Password + hardware security key",
                "PIN + password"
            ],

            correct: 2,

            explanation:
                "A password is something you know, while a hardware security key is something you have. Combining independent factors provides multi-factor authentication."
        },


        {
            category: "NETWORK SECURITY",

            question:
                "What is the primary purpose of a firewall?",

            answers: [
                "Increase CPU performance",
                "Control network traffic according to security rules",
                "Store passwords",
                "Encrypt every file on a computer"
            ],

            correct: 1,

            explanation:
                "A firewall monitors and controls network traffic according to configured security policies."
        },


        {
            category: "CRYPTOGRAPHY",

            question:
                "What is the primary security purpose of a cryptographic hash?",

            answers: [
                "Data compression",
                "Integrity verification",
                "Increasing network speed",
                "Replacing authentication"
            ],

            correct: 1,

            explanation:
                "Cryptographic hashes can be used to detect changes to data because a modification normally results in a different hash value."
        },


        {
            category: "SECURITY AWARENESS",

            question:
                "What is phishing?",

            answers: [
                "A network-routing protocol",
                "A social-engineering technique used to deceive victims",
                "A type of encryption",
                "A hardware failure"
            ],

            correct: 1,

            explanation:
                "Phishing is a social-engineering technique where attackers attempt to deceive users into revealing information, opening malicious content, or performing an unwanted action."
        }

    ],


    intermediate: [

        {
            category: "WEB SECURITY",

            question:
                "Which vulnerability occurs when untrusted input is incorporated into a database query without appropriate protections?",

            answers: [
                "SQL Injection",
                "DNS Spoofing",
                "ARP Poisoning",
                "Buffer Overflow"
            ],

            correct: 0,

            explanation:
                "SQL Injection occurs when attacker-controlled input can influence database queries. Parameterized queries and prepared statements are important defenses."
        },


        {
            category: "NETWORK SECURITY",

            question:
                "What is the primary difference between IDS and IPS?",

            answers: [
                "IDS detects while IPS can detect and actively prevent/block traffic",
                "IDS encrypts traffic while IPS decrypts it",
                "IDS stores passwords while IPS manages identities",
                "There is no difference"
            ],

            correct: 0,

            explanation:
                "An IDS primarily detects and alerts on suspicious activity, while an IPS can be deployed inline to detect and actively block malicious traffic."
        },


        {
            category: "INCIDENT RESPONSE",

            question:
                "What is an Indicator of Compromise (IOC)?",

            answers: [
                "A programming language",
                "An artifact that may indicate malicious activity",
                "A firewall rule",
                "An encryption algorithm"
            ],

            correct: 1,

            explanation:
                "IOCs are observable artifacts that may provide evidence of compromise, such as malicious file hashes, domains, IP addresses, or suspicious system activity."
        },


        {
            category: "SECURITY OPERATIONS",

            question:
                "What is the primary function of a SIEM platform?",

            answers: [
                "Replace operating systems",
                "Collect, correlate, and analyze security events",
                "Physically protect servers",
                "Generate encryption keys only"
            ],

            correct: 1,

            explanation:
                "SIEM platforms centralize security-relevant telemetry and support correlation, alerting, investigation, and security monitoring."
        },


        {
            category: "ACCESS CONTROL",

            question:
                "What does the principle of least privilege mean?",

            answers: [
                "Users should have administrator privileges",
                "Users should receive only the access necessary for their responsibilities",
                "Users should never authenticate",
                "Every system should have the same permissions"
            ],

            correct: 1,

            explanation:
                "Least privilege limits users, processes, and systems to the minimum permissions necessary to perform authorized tasks."
        }

    ],


    advanced: [

        {
            category: "THREAT INTELLIGENCE",

            question:
                "Within MITRE ATT&CK, what does a tactic generally represent?",

            answers: [
                "The adversary's technical tool",
                "The adversary's objective or reason for performing an action",
                "A malware file hash",
                "A firewall configuration"
            ],

            correct: 1,

            explanation:
                "MITRE ATT&CK tactics represent the goals adversaries are trying to accomplish, while techniques describe how those goals can be achieved."
        },


        {
            category: "CRYPTOGRAPHY",

            question:
                "Which property is primarily associated with a secure cryptographic hash function?",

            answers: [
                "Easy recovery of the original message",
                "Preimage resistance",
                "Guaranteed compression",
                "Reversible encryption"
            ],

            correct: 1,

            explanation:
                "Preimage resistance means it should be computationally infeasible to recover an input corresponding to a given hash output."
        },


        {
            category: "WEB SECURITY",

            question:
                "Which vulnerability class involves a server making requests to an attacker-influenced destination?",

            answers: [
                "SSRF",
                "XSS",
                "CSRF",
                "Clickjacking"
            ],

            correct: 0,

            explanation:
                "Server-Side Request Forgery (SSRF) occurs when an application can be induced to make requests to unintended resources controlled or influenced by an attacker."
        },


        {
            category: "DIGITAL FORENSICS",

            question:
                "Why is maintaining chain of custody important during a forensic investigation?",

            answers: [
                "To improve CPU performance",
                "To document the handling and integrity of evidence",
                "To encrypt all network traffic",
                "To increase storage capacity"
            ],

            correct: 1,

            explanation:
                "Chain of custody provides documentation showing how evidence was collected, transferred, stored, and handled, supporting its integrity and credibility."
        },


        {
            category: "SECURITY ARCHITECTURE",

            question:
                "What is a central principle of Zero Trust architecture?",

            answers: [
                "Trust everything inside the network",
                "Never authenticate internal users",
                "Continuously verify access based on identity, context, and policy",
                "Allow unrestricted administrator access"
            ],

            correct: 2,

            explanation:
                "Zero Trust assumes that network location alone should not establish trust. Access decisions should be based on identity, device, context, policy, and other relevant signals."
        }

    ]

};


/* =========================================
   QUIZ STATE
   ========================================= */

let currentQuizLevel = "";

let currentQuizQuestions = [];

let currentQuizIndex = 0;

let currentQuizScore = 0;

let answeredQuestion = false;


/* =========================================
   START QUIZ
   ========================================= */

function startQuiz(level) {

    currentQuizLevel =
        level;

    currentQuizQuestions =
        [...quizQuestions[level]];


    /* Shuffle questions */

    currentQuizQuestions.sort(
        () => Math.random() - 0.5
    );


    currentQuizIndex = 0;

    currentQuizScore = 0;

    answeredQuestion = false;


    document.getElementById(
        "quizStart"
    ).style.display = "none";


    document.getElementById(
        "quizResults"
    ).style.display = "none";


    document.getElementById(
        "quizGame"
    ).style.display = "block";


    loadQuizQuestion();

}


/* =========================================
   LOAD QUESTION
   ========================================= */

function loadQuizQuestion() {

    const question =
        currentQuizQuestions[
            currentQuizIndex
        ];


    answeredQuestion =
        false;


    document.getElementById(
        "quizLevel"
    ).textContent =
        currentQuizLevel
            .toUpperCase();


    document.getElementById(
        "quizQuestionNumber"
    ).textContent =
        `Question ${
            currentQuizIndex + 1
        } of ${
            currentQuizQuestions.length
        }`;


    document.getElementById(
        "quizCategory"
    ).textContent =
        question.category;


    document.getElementById(
        "quizQuestion"
    ).textContent =
        question.question;


    document.getElementById(
        "quizScore"
    ).textContent =
        `Score: ${currentQuizScore}`;


    const answersContainer =
        document.getElementById(
            "quizAnswers"
        );


    answersContainer.innerHTML =
        "";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "quiz-answer";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                () =>
                    selectQuizAnswer(
                        index
                    )
            );


            answersContainer.appendChild(
                button
            );

        }
    );


    document.getElementById(
        "quizExplanation"
    ).style.display =
        "none";


    document.getElementById(
        "quizExplanation"
    ).innerHTML =
        "";


    document.getElementById(
        "nextQuestionButton"
    ).style.display =
        "none";


    const progress =
        (
            currentQuizIndex /
            currentQuizQuestions.length
        ) * 100;


    document.getElementById(
        "quizProgressBar"
    ).style.width =
        `${progress}%`;

}


/* =========================================
   SELECT ANSWER
   ========================================= */

function selectQuizAnswer(selectedIndex) {

    if (answeredQuestion) {
        return;
    }


    answeredQuestion =
        true;


    const question =
        currentQuizQuestions[
            currentQuizIndex
        ];


    const buttons =
        document.querySelectorAll(
            ".quiz-answer"
        );


    buttons.forEach(
        (button, index) => {

            button.disabled =
                true;


            if (
                index ===
                question.correct
            ) {

                button.classList.add(
                    "correct"
                );

            }


            if (
                index ===
                selectedIndex &&
                selectedIndex !==
                question.correct
            ) {

                button.classList.add(
                    "wrong"
                );

            }

        }
    );


    if (
        selectedIndex ===
        question.correct
    ) {

        currentQuizScore++;

    }


    document.getElementById(
        "quizScore"
    ).textContent =
        `Score: ${currentQuizScore}`;


    const explanation =
        document.getElementById(
            "quizExplanation"
        );
/* =========================================
   FUGA LEARNING PATH ENGINE
   ========================================= */

const learningData = {

    beginner: {

        title:
            "Beginner Security Foundation",

        description:
            "Designed for members who are new to cybersecurity. Start here if you have little or no previous cybersecurity experience. You will build the technical foundation required for more advanced security topics.",

        courses: [

            {
                title:
                    "Introduction to Cybersecurity",

                description:
                    "Understand what cybersecurity is, what security professionals protect, common attack categories, and the responsibilities of ethical security practitioners.",

                topics: [
                    "CIA Triad",
                    "Threats",
                    "Risk",
                    "Security Principles"
                ]
            },


            {
                title:
                    "Networking Fundamentals",

                description:
                    "Learn how computers communicate and develop the networking knowledge required for network security and security analysis.",

                topics: [
                    "IP Addresses",
                    "TCP/IP",
                    "Ports",
                    "DNS",
                    "HTTP/HTTPS"
                ]
            },


            {
                title:
                    "Linux Fundamentals",

                description:
                    "Develop essential Linux skills including filesystems, permissions, processes, users, packages, and command-line operations.",

                topics: [
                    "Terminal",
                    "Files",
                    "Permissions",
                    "Processes",
                    "Shell"
                ]
            },


            {
                title:
                    "Cyber Threats & Attacks",

                description:
                    "Learn how common attacks work at a conceptual level and how defenders recognize and mitigate them.",

                topics: [
                    "Phishing",
                    "Malware",
                    "Social Engineering",
                    "DoS",
                    "Credential Attacks"
                ]
            },


            {
                title:
                    "Security & Privacy",

                description:
                    "Understand authentication, passwords, multi-factor authentication, data protection, privacy, and secure online behavior.",

                topics: [
                    "MFA",
                    "Passwords",
                    "Privacy",
                    "Encryption"
                ]
            },


            {
                title:
                    "Security Ethics",

                description:
                    "Learn authorization, responsible disclosure, acceptable use, legal boundaries, and the ethical responsibilities of security researchers.",

                topics: [
                    "Authorization",
                    "Ethics",
                    "Disclosure",
                    "Legal Boundaries"
                ]
            }

        ]

    },


    intermediate: {

        title:
            "Intermediate Cybersecurity Development",

        description:
            "For members who understand the fundamentals and want to develop practical cybersecurity skills through controlled labs, analysis, and security exercises.",

        courses: [

            {
                title:
                    "Web Application Security",

                description:
                    "Study common web security weaknesses and defensive techniques in authorized laboratory environments.",

                topics: [
                    "OWASP",
                    "Authentication",
                    "Sessions",
                    "Input Validation",
                    "Access Control"
                ]
            },


            {
                title:
                    "Network Security",

                description:
                    "Explore network monitoring, segmentation, secure protocols, firewalls, and traffic analysis.",

                topics: [
                    "Firewalls",
                    "IDS/IPS",
                    "Packets",
                    "Segmentation",
                    "Monitoring"
                ]
            },


            {
                title:
                    "Digital Forensics",

                description:
                    "Learn how investigators preserve, examine, and interpret digital evidence during security investigations.",

                topics: [
                    "Evidence",
                    "Disk Analysis",
                    "Artifacts",
                    "Timeline Analysis"
                ]
            },


            {
                title:
                    "Cryptography",

                description:
                    "Understand the principles behind encryption, hashing, digital signatures, and secure key management.",

                topics: [
                    "AES",
                    "RSA",
                    "Hashing",
                    "Keys",
                    "Signatures"
                ]
            },


            {
                title:
                    "OSINT",

                description:
                    "Learn how publicly available information can be collected, validated, analyzed, and used responsibly.",

                topics: [
                    "Reconnaissance",
                    "Search",
                    "Metadata",
                    "Verification"
                ]
            },


            {
                title:
                    "Security Monitoring",

                description:
                    "Develop foundational SOC skills including log analysis, alert triage, detection concepts, and incident escalation.",

                topics: [
                    "SIEM",
                    "Logs",
                    "Alerts",
                    "Triage",
                    "SOC"
                ]
            }

        ]

    },


    advanced: {

        title:
            "Advanced Security Operations",

        description:
            "For experienced members who are ready to study security operations, threat intelligence, incident response, security engineering, and advanced defensive research.",

        courses: [

            {
                title:
                    "SOC Operations",

                description:
                    "Study the processes used by security operations teams to detect, investigate, prioritize, and respond to security events.",

                topics: [
                    "Detection",
                    "SIEM",
                    "Triage",
                    "Escalation",
                    "SOC"
                ]
            },


            {
                title:
                    "Threat Intelligence",

                description:
                    "Learn how threat intelligence is collected, evaluated, contextualized, and converted into useful defensive knowledge.",

                topics: [
                    "IOCs",
                    "TTPs",
                    "Threat Actors",
                    "Analysis"
                ]
            },


            {
                title:
                    "Incident Response",

                description:
                    "Explore structured approaches for preparing for, detecting, containing, eradicating, and recovering from security incidents.",

                topics: [
                    "Preparation",
                    "Detection",
                    "Containment",
                    "Recovery"
                ]
            },


            {
                title:
                    "Security Engineering",

                description:
                    "Learn how security controls can be designed into systems, applications, networks, and organizational infrastructure.",

                topics: [
                    "Architecture",
                    "Zero Trust",
                    "Hardening",
                    "Access Control"
                ]
            },


            {
                title:
                    "Advanced CTF",

                description:
                    "Solve authorized cybersecurity challenges involving multiple security disciplines and develop structured problem-solving skills.",

                topics: [
                    "Web",
                    "Crypto",
                    "Forensics",
                    "Reverse Engineering"
                ]
            },


            {
                title:
                    "Security Research",

                description:
                    "Develop responsible security research skills including vulnerability analysis, documentation, validation, and responsible disclosure.",

                topics: [
                    "Research",
                    "Analysis",
                    "Disclosure",
                    "Reporting"
                ]
            }

        ]

    }

};


/* =========================================
   LEARNING ELEMENTS
   ========================================= */

const learningButtons =
    document.querySelectorAll(
        ".learning-level"
    );

const learningDescription =
    document.getElementById(
        "learningDescription"
    );

const learningCourses =
    document.getElementById(
        "learningCourses"
    );


/* =========================================
   RENDER LEARNING PATH
   ========================================= */

function renderLearningPath(level) {

    const data =
        learningData[level];


    if (!data) {
        return;
    }


    learningDescription.innerHTML = `

        <h3>
            ${data.title}
        </h3>

        <p>
            ${data.description}
        </p>

    `;


    learningCourses.innerHTML =
        "";


    data.courses.forEach(
        (course, index) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "learning-course";


            const topics =
                course.topics
                    .map(
                        topic =>
                            `
                            <span
                                class="course-topic">

                                ${topic}

                            </span>
                            `
                    )
                    .join("");


            card.innerHTML = `

                <span
                    class="course-number">

                    MODULE ${String(
                        index + 1
                    ).padStart(2, "0")}

                </span>


                <h3>
                    ${course.title}
                </h3>


                <p>
                    ${course.description}
                </p>


                <div
                    class="course-topics">

                    ${topics}

                </div>


                <button
                    class="course-button"
                    onclick="openLearningModule(
                        '${level}',
                        ${index}
                    )">

                    View Module →

                </button>

            `;


            learningCourses.appendChild(
                card
            );

        }
    );

}
/* =========================================
   FUGA LEARNING MODULE ENGINE
   ========================================= */


/*
 * Current module
 */

let currentLearningModule = null;


/*
 * Module lesson content
 */

const moduleLessons = {

    "Introduction to Cybersecurity": {

        objectives: [
            "Understand the purpose of cybersecurity.",
            "Explain confidentiality, integrity, and availability.",
            "Identify major categories of cyber threats.",
            "Understand the importance of ethical security practice."
        ],

        lesson: `

            <h4>What Is Cybersecurity?</h4>

            <p>
                Cybersecurity is the practice of protecting
                systems, networks, applications, devices, and
                information from unauthorized access, disruption,
                manipulation, or destruction.
            </p>


            <h4>The CIA Triad</h4>

            <p>
                Three fundamental security objectives are
                confidentiality, integrity, and availability.
            </p>


            <ul>

                <li>
                    <strong>Confidentiality:</strong>
                    information should only be accessible to
                    authorized individuals.
                </li>

                <li>
                    <strong>Integrity:</strong>
                    information should remain accurate and
                    protected from unauthorized modification.
                </li>

                <li>
                    <strong>Availability:</strong>
                    authorized users should be able to access
                    systems and information when required.
                </li>

            </ul>


            <h4>Security Is More Than Hacking</h4>

            <p>
                Cybersecurity includes risk management, secure
                software development, identity management,
                network defense, monitoring, incident response,
                digital forensics, governance, and security
                awareness.
            </p>

        `,

        quiz: {

            question:
                "Which of the following is NOT part of the CIA Triad?",

            options: [

                "Confidentiality",

                "Integrity",

                "Availability",

                "Authentication"

            ],

            answer: 3

        }

    },


    "Networking Fundamentals": {

        objectives: [

            "Understand basic computer networking.",

            "Explain IP addresses and ports.",

            "Understand common network protocols.",

            "Recognize the importance of network security."

        ],

        lesson: `

            <h4>Why Networking Matters</h4>

            <p>
                Cybersecurity professionals need networking
                knowledge because many security events occur
                through network communication.
            </p>


            <h4>IP Addresses</h4>

            <p>
                An IP address identifies a network interface
                within an IP network. IPv4 uses 32-bit addresses,
                while IPv6 uses 128-bit addresses.
            </p>


            <h4>Ports</h4>

            <p>
                Ports help operating systems and network services
                distinguish different types of communication.
                For example, web services commonly use TCP ports
                associated with HTTP and HTTPS.
            </p>


            <h4>Common Protocols</h4>

            <ul>

                <li>TCP/IP</li>

                <li>DNS</li>

                <li>HTTP</li>

                <li>HTTPS</li>

                <li>SSH</li>

            </ul>

        `,

        quiz: {

            question:
                "What does DNS primarily help translate?",

            options: [

                "Domain names into IP addresses",

                "Passwords into usernames",

                "Files into programs",

                "Ports into MAC addresses"

            ],

            answer: 0

        }

    },


    "Linux Fundamentals": {

        objectives: [

            "Understand the Linux filesystem.",

            "Use basic command-line concepts.",

            "Understand file permissions.",

            "Recognize why Linux is important in cybersecurity."

        ],

        lesson: `

            <h4>Linux and Cybersecurity</h4>

            <p>
                Linux is widely used in servers, security tools,
                cloud infrastructure, networking systems, and
                cybersecurity laboratories.
            </p>


            <h4>The Command Line</h4>

            <p>
                Security professionals frequently use command-line
                interfaces to inspect systems, analyze logs,
                manage files, automate tasks, and troubleshoot
                security issues.
            </p>


            <h4>File Permissions</h4>

            <p>
                Linux permissions control who can read, modify,
                or execute files and directories. Understanding
                permissions is essential for system hardening.
            </p>

        `,

        quiz: {

            question:
                "Which Linux concept controls who can read, write, or execute a file?",

            options: [

                "DNS",

                "File permissions",

                "HTTP",

                "Routing"

            ],

            answer: 1

        }

    }

};


/* =========================================
   OPEN MODULE
   ========================================= */

function openLearningModule(level, index) {

    const module =
        learningData[level].courses[index];


    const modal =
        document.getElementById(
            "learningModuleModal"
        );


    if (!modal) {

        console.error(
            "Learning module modal not found."
        );

        return;

    }


    currentLearningModule =
        module;


    const content =
        moduleLessons[module.title];


    document.getElementById(
        "moduleLevel"
    ).textContent =
        level.toUpperCase();


    document.getElementById(
        "moduleTitle"
    ).textContent =
        module.title;


    document.getElementById(
        "moduleDescription"
    ).textContent =
        module.description;


    document.getElementById(
        "moduleTopics"
    ).innerHTML =
        module.topics
            .map(
                topic =>
                    `<li>${topic}</li>`
            )
            .join("");


    /*
     * Objectives
     */

    const objectives =
        document.getElementById(
            "moduleObjectives"
        );


    if (content) {

        objectives.innerHTML =
            content.objectives
                .map(
                    objective =>
                        `<li>${objective}</li>`
                )
                .join("");


        document.getElementById(
            "moduleLesson"
        ).innerHTML =
            content.lesson;


        loadModuleQuiz(
            content.quiz
        );

    } else {

        objectives.innerHTML = `

            <li>
                Understand the fundamental concepts.
            </li>

            <li>
                Identify important security principles.
            </li>

            <li>
                Apply the concepts in authorized environments.
            </li>

        `;


        document.getElementById(
            "moduleLesson"
        ).innerHTML = `

            <p>
                This module is currently being developed.
                More FUGA training material will be added here.
            </p>

        `;


        document.getElementById(
            "moduleQuiz"
        ).innerHTML = `

            <p>
                Quiz coming soon.
            </p>

        `;

    }


    updateModuleProgress(
        module.title
    );


    modal.classList.add(
        "active"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================
   CLOSE MODULE
   ========================================= */

function closeLearningModule() {

    const modal =
        document.getElementById(
            "learningModuleModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "active"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* =========================================
   LOAD QUIZ
   ========================================= */

function loadModuleQuiz(quiz) {

    const container =
        document.getElementById(
            "moduleQuiz"
        );


    if (!container || !quiz) {
        return;
    }


    container.innerHTML = `

        <div
            class="quiz-question">

            ${quiz.question}

        </div>


        ${quiz.options
            .map(
                (option, index) => `

                    <label
                        class="quiz-option">

                        <input
                            type="radio"
                            name="fugaQuiz"
                            value="${index}">

                        ${option}

                    </label>

                `
            )
            .join("")}

    `;


    document.getElementById(
        "quizResult"
    ).textContent =
        "";

}


/* =========================================
   SUBMIT QUIZ
   ========================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.id !==
            "quizSubmit"
        ) {

            return;

        }


        if (!currentLearningModule) {

            return;

        }


        const content =
            moduleLessons[
                currentLearningModule.title
            ];


        if (!content || !content.quiz) {

            return;

        }


        const selected =
            document.querySelector(
                'input[name="fugaQuiz"]:checked'
            );


        const result =
            document.getElementById(
                "quizResult"
            );


        if (!selected) {

            result.textContent =
                "Please select an answer first.";

            return;

        }


        const answer =
            Number(
                selected.value
            );


        if (
            answer ===
            content.quiz.answer
        ) {

            result.textContent =
                "✓ Correct. Excellent work!";


            updateModuleProgress(
                currentLearningModule.title,
                100
            );

        } else {

            result.textContent =
                "✗ Incorrect. Review the lesson and try again.";

        }

    }
);


/* =========================================
   MODULE COMPLETION
   ========================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.id !==
            "completeModule"
        ) {

            return;

        }


        if (!currentLearningModule) {

            return;

        }


        updateModuleProgress(
            currentLearningModule.title,
            100
        );


        event.target.textContent =
            "✓ Module Completed";


        event.target.disabled =
            true;


        event.target.style.opacity =
            "0.6";

    }
);


/* =========================================
   PROGRESS STORAGE
   ========================================= */

function updateModuleProgress(
    moduleTitle,
    forcedProgress = null
) {

    const key =
        "fuga_progress_" +
        moduleTitle;


    let progress =
        localStorage.getItem(
            key
        );


    if (forcedProgress !== null) {

        progress =
            forcedProgress;

        localStorage.setItem(
            key,
            progress
        );

    }


    progress =
        Number(progress) || 0;


    const progressText =
        document.getElementById(
            "moduleProgressText"
        );


    const progressBar =
        document.getElementById(
            "moduleProgressBar"
        );


    if (progressText) {

        progressText.textContent =
            `${progress}%`;

    }


    if (progressBar) {

        progressBar.style.width =
            `${progress}%`;

    }

}


/* =========================================
   ESCAPE KEY
   ========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeLearningModule();

        }

    }
);


/* =========================================
   CLICK OUTSIDE MODULE
   ========================================= */

document.addEventListener(
    "click",
    event => {

        const modal =
            document.getElementById(
                "learningModuleModal"
            );


        if (
            event.target === modal
        ) {

            closeLearningModule();

        }

    }
);


/* =========================================
   LEVEL SWITCHING
   ========================================= */

learningButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                learningButtons
                    .forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                button.classList.add(
                    "active"
                );


                renderLearningPath(
                    button.dataset.level
                );

            }
        );

    }
);


/* =========================================
   MODULE BUTTON
   ========================================= */

function openLearningModule(
    level,
    index
) {

    const module =
        learningData[level]
            .courses[index];


    alert(
        `${module.title}\n\n` +
        `${module.description}\n\n` +
        `Topics:\n` +
        `${module.topics.join(", ")}`
    );

}


/* =========================================
   INITIALIZE
   ========================================= */

if (
    learningDescription &&
    learningCourses
) {

    renderLearningPath(
        "beginner"
    );

}



    explanation.innerHTML = `

        <strong>
            ${
                selectedIndex ===
                question.correct
                    ? "✓ Correct"
                    : "✕ Incorrect"
            }
        </strong>

        <p>
            ${question.explanation}
        </p>

    `;


    explanation.style.display =
        "block";


    document.getElementById(
        "nextQuestionButton"
    ).style.display =
        "inline-block";

}


/* =========================================
   NEXT QUESTION
   ========================================= */

function nextQuizQuestion() {

    currentQuizIndex++;


    if (
        currentQuizIndex >=
        currentQuizQuestions.length
    ) {

        showQuizResults();

        return;

    }


    loadQuizQuestion();

}


/* =========================================
   RESULTS
   ========================================= */

function showQuizResults() {

    document.getElementById(
        "quizGame"
    ).style.display =
        "none";


    document.getElementById(
        "quizResults"
    ).style.display =
        "block";


    const total =
        currentQuizQuestions.length;


    const correct =
        currentQuizScore;


    const wrong =
        total - correct;


    const percentage =
        Math.round(
            (correct / total) * 100
        );


    document.getElementById(
        "finalScore"
    ).textContent =
        `${percentage}%`;


    document.getElementById(
        "correctAnswers"
    ).textContent =
        correct;


    document.getElementById(
        "wrongAnswers"
    ).textContent =
        wrong;


    document.getElementById(
        "totalQuestions"
    ).textContent =
        total;


    let message = "";


    if (percentage >= 90) {

        message =
            "Excellent performance. Your understanding of the assessed security concepts is strong.";

    }

    else if (percentage >= 70) {

        message =
            "Strong performance. Continue developing your practical analysis and security engineering skills.";

    }

    else if (percentage >= 50) {

        message =
            "Good foundation. Review the concepts you missed and continue with the club's technical training.";

    }

    else {

        message =
            "Keep learning. Review the fundamentals and retake the assessment after further study.";

    }


    document.getElementById(
        "resultMessage"
    ).textContent =
        message;

}


/* =========================================
   RESTART
   ========================================= */

function restartQuiz() {

    document.getElementById(
        "quizResults"
    ).style.display =
        "none";


    document.getElementById(
        "quizStart"
    ).style.display =
        "block";

}
/* =========================================
   FUGA CYBERSECURITY LAB ENGINE
   ========================================= */

const labData = {

    "http-recon": {

        title: "HTTP Reconnaissance",

        difficulty: "BEGINNER",

        body: `

            <h4>Objective</h4>

            <p>
                Examine a deliberately configured training application
                and identify security-relevant information exposed through
                HTTP responses and application metadata.
            </p>

            <h4>Learning Objectives</h4>

            <ul>

                <li>
                    Understand HTTP request and response structure.
                </li>

                <li>
                    Identify security-relevant HTTP headers.
                </li>

                <li>
                    Recognize unnecessary information disclosure.
                </li>

                <li>
                    Understand why excessive server information can
                    increase an application's attack surface.
                </li>

            </ul>

            <h4>Required Skills</h4>

            <p>
                HTTP fundamentals, browser developer tools, basic
                web-security concepts.
            </p>

        `
    },


    "cipher-analysis": {

        title: "Cipher Analysis",

        difficulty: "BEGINNER",

        body: `

            <h4>Objective</h4>

            <p>
                Analyze a controlled ciphertext and determine the
                characteristics of the transformation used to produce it.
            </p>

            <h4>Learning Objectives</h4>

            <ul>

                <li>
                    Distinguish encoding from encryption.
                </li>

                <li>
                    Recognize characteristics of classical ciphers.
                </li>

                <li>
                    Understand frequency analysis at a conceptual level.
                </li>

                <li>
                    Document analytical assumptions and conclusions.
                </li>

            </ul>

        `
    },
/* =========================================
   CYBERSECURITY UPDATES
   ========================================= */

.security-updates {

    max-width: 1200px;

    margin: 100px auto;

    padding: 40px 20px;
}


/* CONTROLS */

.update-controls {

    display: flex;

    gap: 15px;

    margin-bottom: 35px;

    flex-wrap: wrap;
}


.update-search {

    flex: 1;

    min-width: 250px;
}


.update-search input {

    width: 100%;

    box-sizing: border-box;

    padding: 15px 18px;

    border-radius: 12px;

    border:
        1px solid rgba(128,128,128,0.3);

    background:
        rgba(128,128,128,0.05);

    color: inherit;

    outline: none;

    font-size: 0.95rem;
}


.update-search input:focus {

    border-color:
        rgba(0,255,170,0.5);
}


#updateCategory {

    min-width: 220px;

    padding: 15px;

    border-radius: 12px;

    border:
        1px solid rgba(128,128,128,0.3);

    background:
        rgba(128,128,128,0.05);

    color: inherit;

    outline: none;

    cursor: pointer;
}


/* UPDATE GRID */

.updates-grid {

    display: grid;

    grid-template-columns:
        repeat(3, minmax(0,1fr));

    gap: 20px;
}


/* CARD */

.update-card {

    display: flex;

    flex-direction: column;

    padding: 25px;

    border-radius: 18px;

    border:
        1px solid rgba(128,128,128,0.25);

    background:
        rgba(128,128,128,0.04);

    transition:
        transform 0.25s ease,
        border-color 0.25s ease;
}


.update-card:hover {

    transform:
        translateY(-5px);

    border-color:
        rgba(0,255,170,0.45);
}


.update-card-meta {

    display: flex;

    justify-content:
        space-between;

    gap: 10px;

    margin-bottom: 18px;

    font-size: 0.65rem;

    font-weight: 800;

    letter-spacing: 1px;

    opacity: 0.65;
}


.update-type {

    text-transform:
        uppercase;
}


.update-card h3 {

    margin:
        0 0 12px;

    line-height: 1.4;
}


.update-card p {

    line-height: 1.7;

    opacity: 0.75;

    font-size: 0.9rem;

    flex-grow: 1;
}


.update-read-more {

    margin-top: 20px;

    padding: 12px;

    border-radius: 10px;

    border:
        1px solid rgba(128,128,128,0.25);

    background:
        rgba(128,128,128,0.06);

    color: inherit;

    cursor: pointer;

    font-weight: 800;

    transition:
        0.25s ease;
}


.update-read-more:hover {

    border-color:
        rgba(0,255,170,0.5);
}


/* EMPTY */

.updates-empty {

    display: none;

    text-align: center;

    padding: 50px 20px;

    opacity: 0.7;
}


/* =========================================
   UPDATE MODAL
   ========================================= */

.update-modal {

    position: fixed;

    inset: 0;

    z-index: 12000;

    display: none;

    align-items: center;

    justify-content: center;

    padding: 20px;

    background:
        rgba(0,0,0,0.82);

    backdrop-filter:
        blur(8px);
}


.update-modal.active {

    display: flex;
}


.update-modal-content {

    position: relative;

    width:
        min(800px,100%);

    max-height: 85vh;

    overflow-y: auto;

    padding: 40px;

    border-radius: 20px;

    border:
        1px solid rgba(128,128,128,0.3);

    background:
        rgba(18,18,18,0.98);
}


.update-close {

    position: absolute;

    top: 15px;

    right: 20px;

    border: none;

    background: transparent;

    color: inherit;

    font-size: 2rem;

    cursor: pointer;
}


.update-modal-meta {

    display: flex;

    justify-content:
        space-between;

    gap: 20px;

    margin-bottom: 15px;

    font-size: 0.7rem;

    font-weight: 800;

    letter-spacing: 1.5px;

    opacity: 0.6;
}


#updateModalTitle {

    margin-bottom: 25px;

    line-height: 1.4;
}


.update-modal-body {

    line-height: 1.8;
}


.update-modal-body h4 {

    margin-top: 28px;
}


.update-modal-body ul {

    padding-left: 20px;
}


.update-source {

    margin-top: 35px;

    padding: 18px;

    border-radius: 12px;

    background:
        rgba(128,128,128,0.07);
}


.update-source strong {

    font-size: 0.7rem;

    letter-spacing: 1.5px;
}


.update-source p {

    margin-bottom: 0;

    margin-top: 8px;

    word-break: break-word;

    opacity: 0.75;
}


/* MOBILE */

@media (max-width: 900px) {

    .updates-grid {

        grid-template-columns:
            repeat(2, minmax(0,1fr));
    }

}


@media (max-width: 600px) {

    .updates-grid {

        grid-template-columns: 1fr;
    }


    .update-modal-content {

        padding: 30px 20px;
    }


    .update-modal-meta {

        flex-direction: column;

        gap: 5px;
    }

}



    "digital-evidence": {

        title: "Digital Evidence",

        difficulty: "INTERMEDIATE",

        body: `

            <h4>Objective</h4>

            <p>
                Investigate a simulated evidence package and identify
                artifacts relevant to a fictional security incident.
            </p>

            <h4>Investigation Areas</h4>

            <ul>

                <li>
                    File metadata
                </li>

                <li>
                    Timestamps
                </li>

                <li>
                    Authentication records
                </li>

                <li>
                    Suspicious artifacts
                </li>

                <li>
                    Indicators of compromise
                </li>

            </ul>

            <h4>Expected Output</h4>

            <p>
                Produce a short forensic report explaining the evidence,
                methodology, observations, and conclusions.
            </p>

        `
    },


    "packet-investigation": {

        title: "Packet Investigation",

        difficulty: "INTERMEDIATE",

        body: `

            <h4>Objective</h4>

            <p>
                Analyze a controlled packet capture to identify unusual
                communication patterns and determine which network
                activities require further investigation.
            </p>

            <h4>Learning Objectives</h4>

            <ul>

                <li>
                    Understand packet capture fundamentals.
                </li>

                <li>
                    Identify common network protocols.
                </li>

                <li>
                    Examine source and destination relationships.
                </li>

                <li>
                    Recognize suspicious traffic patterns.
                </li>

            </ul>

            <h4>Recommended Tool</h4>

            <p>
                Wireshark or another authorized packet-analysis tool.
            </p>

        `
    },


    "osint-investigation": {

        title: "OSINT Investigation",

        difficulty: "INTERMEDIATE",

        body: `

            <h4>Objective</h4>

            <p>
                Conduct a controlled open-source intelligence investigation
                using publicly available information.
            </p>

            <h4>Investigation Principles</h4>

            <ul>

                <li>
                    Verify information using multiple sources.
                </li>

                <li>
                    Record the source and time of observations.
                </li>

                <li>
                    Separate facts from assumptions.
                </li>

                <li>
                    Respect privacy and applicable laws.
                </li>

            </ul>

            <h4>Expected Output</h4>

            <p>
                Submit an intelligence summary explaining the evidence
                discovered and how each conclusion was reached.
            </p>

        `
    },


    "web-assessment": {

        title: "Web Application Assessment",

        difficulty: "ADVANCED",

        body: `

            <h4>Objective</h4>

            <p>
                Perform a structured security assessment against a
                deliberately vulnerable training application.
            </p>

            <h4>Assessment Areas</h4>

            <ul>

                <li>
                    Authentication controls
                </li>

                <li>
                    Authorization boundaries
                </li>

                <li>
                    Input validation
                </li>

                <li>
                    Session management
                </li>

                <li>
                    Security headers
                </li>

                <li>
                    Error handling
                </li>

            </ul>

            <h4>Reporting Requirement</h4>

            <p>
                Every finding should include the affected component,
                risk explanation, evidence, impact, and recommended
                remediation.
            </p>

        `
    }

};


/* =========================================
   OPEN LAB
   ========================================= */

function openLab(labId) {

    const lab =
        labData[labId];

    if (!lab) {
        return;
    }


    document.getElementById(
        "labModalDifficulty"
    ).textContent =
        lab.difficulty;


    document.getElementById(
        "labModalTitle"
    ).textContent =
        lab.title;


    document.getElementById(
        "labModalBody"
    ).innerHTML =
        lab.body;


    const modal =
        document.getElementById(
            "labModal"
        );


    modal.classList.add(
        "active"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";
}


/* =========================================
   CLOSE LAB
   ========================================= */

function closeLab() {

    const modal =
        document.getElementById(
            "labModal"
        );


    modal.classList.remove(
        "active"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";
}


/* =========================================
   FILTER LABS
   ========================================= */

const labFilters =
    document.querySelectorAll(
        ".lab-filter"
    );


const labCards =
    document.querySelectorAll(
        ".lab-card"
    );


labFilters.forEach(
    filter => {

        filter.addEventListener(
            "click",
            () => {

                const selected =
                    filter.dataset.filter;


                labFilters.forEach(
                    button =>
                        button.classList.remove(
                            "active"
                        )
                );


                filter.classList.add(
                    "active"
                );


                labCards.forEach(
                    card => {

                        const category =
                            card.dataset.category;


                        if (
                            selected === "all" ||
                            category === selected
                        ) {

                            card.style.display =
                                "";

                        } else {

                            card.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    }
);


/* =========================================
   CLOSE MODAL BY CLICKING OUTSIDE
   ========================================= */

document.addEventListener(
    "click",
    event => {

        const modal =
            document.getElementById(
                "labModal"
            );


        if (
            event.target === modal
        ) {

            closeLab();

        }

    }
);


/* =========================================
   ESCAPE KEY
   ========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeLab();

        }

    }
);


/* =========================================
   LAB BUTTON
   ========================================= */

function startLab() {

    alert(
        "The practical lab environment will be connected here. Challenges should run only inside an authorized training environment."
    );

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
