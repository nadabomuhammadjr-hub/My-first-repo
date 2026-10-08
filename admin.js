./* ============================================
   ADMIN PAGE — admin.js
   Sign-in uses Firebase Authentication. The Firestore rules
   decide who may approve members and edit the glossary.
   ============================================ */

(function () {
    // The email of the admin account in Firebase → Authentication → Users
    const ADMIN_EMAIL = "muhammadbaimari@gmail.com";

    const auth = firebase.auth();
    const $ = (id) => document.getElementById(id);

    function isAdminUser(user) {
        return !!user && !!user.email &&
            user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
    }

    function friendlyAuthError(err) {
        switch (err && err.code) {
            case "auth/invalid-credential":
            case "auth/wrong-password":
            case "auth/user-not-found": return "Wrong admin password.";
            case "auth/too-many-requests": return "Too many attempts. Wait a few minutes and try again.";
            case "auth/network-request-failed": return "No connection. Check your internet and try again.";
            default: return "Could not sign in (" + ((err && err.code) || "unknown") + "). Try again.";
        }
    }

    function showLogin() {
        $("admin-login-section").classList.remove("hidden");
        $("admin-panel-section").classList.add("hidden");
    }

    function addLogoutButton() {
        if ($("admin-logout")) return;
        const btn = document.createElement("button");
        btn.id = "admin-logout";
        btn.className = "btn-secondary";
        btn.textContent = "Log out";
        btn.addEventListener("click", () => auth.signOut());
        $("admin-panel-section").prepend(btn);
    }

    function showPanel() {
        $("admin-login-section").classList.add("hidden");
        $("admin-panel-section").classList.remove("hidden");
        addLogoutButton();
        renderMembers();
        renderAdminTermList();
    }

    document.addEventListener("DOMContentLoaded", () => {
        const loginForm = $("admin-login-form");
        const addForm = $("admin-add-form");

        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const error = $("admin-login-error");
            const button = loginForm.querySelector("button");
            error.classList.add("hidden");

            button.disabled = true;
            try {
                await auth.signInWithEmailAndPassword(ADMIN_EMAIL, $("admin-password").value);
                $("admin-password").value = "";
            } catch (err) {
                console.error("Admin sign-in error:", err);
                error.textContent = friendlyAuthError(err);
                error.classList.remove("hidden");
            } finally {
                button.disabled = false;
            }
        });

        addForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const term = $("term-name").value.trim();
            const def = $("term-definition").value.trim();
            if (!term || !def) return;

            const button = addForm.querySelector("button");
            button.disabled = true;
            try {
                await addGlossaryTerm(term, def);
                addForm.reset();
                renderAdminTermList();
            } catch (err) {
                console.error(err);
                alert("Could not add the term. Make sure you are signed in as the admin and the Firestore rules allow it.");
            } finally {
                button.disabled = false;
            }
        });

        auth.onAuthStateChanged((user) => {
            if (isAdminUser(user)) showPanel();
            else showLogin();
        });
    });

    /* ---------- Members (approve / revoke) ---------- */

    function sectionHeading(text) {
        const h = document.createElement("h3");
        h.textContent = text;
        return h;
    }

    function note(text) {
        const p = document.createElement("p");
        p.className = "section-subtitle";
        p.textContent = text;
        return p;
    }

    function memberRow(m, isPending) {
        const row = document.createElement("div");
        row.className = "card admin-term-row";
        const joined = m.createdAt && m.createdAt.toDate
            ? m.createdAt.toDate().toLocaleDateString()
            : "";

        row.innerHTML = `
            <div>
                <h3>${escapeHTML(m.name || "(no name)")}</h3>
                <p>${escapeHTML(m.email || "")}</p>
                ${joined ? `<p>Registered ${escapeHTML(joined)}</p>` : ""}
            </div>
            <button ${isPending ? "" : 'class="btn-secondary"'}>${isPending ? "Approve" : "Revoke access"}</button>
        `;

        const button = row.querySelector("button");
        button.addEventListener("click", async () => {
            button.disabled = true;
            try {
                await db.collection("members").doc(m.id).update({ approved: isPending });
                renderMembers();
            } catch (err) {
                console.error(err);
                alert("Could not update this member. Check the Firestore rules.");
                button.disabled = false;
            }
        });
        return row;
    }

    async function renderMembers() {
        const listEl = $("admin-applications-list");
        listEl.innerHTML = `<p class="section-subtitle">Loading...</p>`;

        let members = [];
        try {
            const snapshot = await db.collection("members").get();
            snapshot.forEach(doc => members.push({ id: doc.id, ...doc.data() }));
        } catch (err) {
            console.error(err);
            listEl.innerHTML = `<p class="section-subtitle">Could not load members. Check the Firestore rules and that you are signed in as the admin.</p>`;
            return;
        }

        members = members.filter(m =>
            (m.email || "").toLowerCase() !== ADMIN_EMAIL.toLowerCase());
        members.sort((a, b) =>
            ((b.createdAt && b.createdAt.seconds) || 0) - ((a.createdAt && a.createdAt.seconds) || 0));

        const pending = members.filter(m => m.approved !== true);
        const approved = members.filter(m => m.approved === true);

        listEl.innerHTML = "";

        listEl.appendChild(sectionHeading(`Waiting for approval (${pending.length})`));
        if (pending.length === 0) listEl.appendChild(note("No one is waiting right now."));
        pending.forEach(m => listEl.appendChild(memberRow(m, true)));

        listEl.appendChild(sectionHeading(`Approved members (${approved.length})`));
        if (approved.length === 0) listEl.appendChild(note("No approved members yet."));
        approved.forEach(m => listEl.appendChild(memberRow(m, false)));
    }

    /* ---------- Glossary ---------- */

    async function renderAdminTermList() {
        const listEl = $("admin-term-list");
        listEl.innerHTML = `<p class="section-subtitle">Loading...</p>`;

        const custom = await getCustomGlossary();
        listEl.innerHTML = "";

        if (custom.length === 0) {
            listEl.innerHTML = `<p class="section-subtitle">No custom terms added yet. The starter terms are always shown on the site.</p>`;
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
                try {
                    await deleteGlossaryTerm(item.id);
                    renderAdminTermList();
                } catch (err) {
                    console.error(err);
                    alert("Could not remove the term. Make sure you are signed in as the admin.");
                }
            });
            listEl.appendChild(row);
        });
    }
})();