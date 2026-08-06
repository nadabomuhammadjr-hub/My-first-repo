/* ============================================
   ADMIN PAGE — admin.js
   ============================================ */

// Change this to your own password before you publish the site.
// This is a simple client-side gate, not real security — don't use it
// to protect anything sensitive, just to keep casual visitors out.
const ADMIN_PASSWORD = "ccsc-admin-2026";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("admin-login-form");
    const addForm = document.getElementById("admin-add-form");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const entered = document.getElementById("admin-password").value;
        const error = document.getElementById("admin-login-error");

        if (entered === ADMIN_PASSWORD) {
            document.getElementById("admin-login-section").classList.add("hidden");
            document.getElementById("admin-panel-section").classList.remove("hidden");
            renderApplications();
            renderAdminTermList();
        } else {
            error.classList.remove("hidden");
        }
    });

    addForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const term = document.getElementById("term-name").value.trim();
        const def = document.getElementById("term-definition").value.trim();
        if (!term || !def) return;

        addForm.querySelector("button").disabled = true;
        await addGlossaryTerm(term, def);
        addForm.reset();
        addForm.querySelector("button").disabled = false;
        renderAdminTermList();
    });
});

/* ---------- Applications ---------- */

async function renderApplications() {
    const listEl = document.getElementById("admin-applications-list");
    listEl.innerHTML = `<p class="section-subtitle">Loading...</p>`;

    const snapshot = await db.collection("applications")
        .where("status", "==", "pending")
        .get();

    listEl.innerHTML = "";

    if (snapshot.empty) {
        listEl.innerHTML = `<p class="section-subtitle">No pending applications right now.</p>`;
        return;
    }

    snapshot.forEach(doc => {
        const app = doc.data();
        const row = document.createElement("div");
        row.className = "card admin-term-row";
        row.innerHTML = `
            <div>
                <h3>${escapeHTML(app.name)}</h3>
                <p>${escapeHTML(app.email)}</p>
                <p>${escapeHTML(app.interest)}</p>
            </div>
            <div style="display:flex; gap:8px;">
                <button data-action="approve">Approve</button>
                <button class="btn-secondary" data-action="reject">Reject</button>
            </div>
        `;
        row.querySelector('[data-action="approve"]').addEventListener("click", () => updateApplicationStatus(doc.id, "approved"));
        row.querySelector('[data-action="reject"]').addEventListener("click", () => updateApplicationStatus(doc.id, "rejected"));
        listEl.appendChild(row);
    });
}

async function updateApplicationStatus(id, status) {
    await db.collection("applications").doc(id).update({ status });
    renderApplications();
}

/* ---------- Glossary ---------- */

async function renderAdminTermList() {
    const listEl = document.getElementById("admin-term-list");
    listEl.innerHTML = `<p class="section-subtitle">Loading...</p>`;

    const custom = await getCustomGlossary();
    listEl.innerHTML = "";

    if (custom.length === 0) {
        listEl.innerHTML = `<p class="section-subtitle">No custom terms added yet. The 10 starter terms are always shown on the site.</p>`;
        return;
    }

    custom.forEach(item => {
        const row = document.createElement("div");
        row.className = "card admin-term-row";
        row.innerHTML = `
            <div>
                <h3>${escapeHTML(item.term)}</h3>
                <p>${escapeHTML(item.def)}</p>
            </div>
            <button class="btn-secondary">Remove</button>
        `;
        row.querySelector("button").addEventListener("click", async () => {
            await deleteGlossaryTerm(item.id);
            renderAdminTermList();
        });
        listEl.appendChild(row);
    });
}
