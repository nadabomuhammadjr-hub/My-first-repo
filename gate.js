/* ============================================
   gate.js — registration / login gate
   FUGA Cyber Club

   Needs (loaded before this file):
   - firebase-app-compat.js
   - firebase-auth-compat.js
   - firebase-firestore-compat.js
   - firebase-config.js  (calls firebase.initializeApp)
   ============================================ */

(function () {
  // true  = new members must be approved by an admin before the site opens
  // false = anyone who registers gets in immediately
  var REQUIRE_APPROVAL = false;

  var auth = firebase.auth();
  var db = firebase.firestore();

  var mode = 'login'; // 'login' or 'register'
  var booted = false;

  function el(id) { return document.getElementById(id); }
  function show(id, on) { el(id).style.display = on ? 'block' : 'none'; }
  function setMsg(text) { el('gate-msg').textContent = text || ''; }
  function setNote(text) { el('gate-pending-note').textContent = text || ''; }

  // name: 'loading' | 'form' | 'pending'
  function showView(name) {
    document.body.classList.remove('unlocked');
    show('gate-loading', name === 'loading');
    show('gate-form-view', name === 'form');
    show('gate-pending', name === 'pending');
  }

  function unlock() {
    document.body.classList.add('unlocked');
    // Play the boot intro once, right after the visitor gets in
    if (!booted) {
      booted = true;
      if (typeof runBootSequence === 'function') runBootSequence();
    }
  }

  function setMode(m) {
    mode = m;
    var reg = m === 'register';
    el('gate-title').textContent = reg ? 'Create your account' : 'Member login';
    el('gate-sub').textContent = reg
      ? 'Register to join the FUGA Cyber Club.'
      : 'Log in to open the FUGA Cyber Club site.';
    show('gate-name-wrap', reg);
    el('gate-name').required = reg;
    el('gate-submit').textContent = reg ? 'Create account' : 'Log in';
    el('gate-toggle').textContent = reg
      ? 'Already have an account? Log in'
      : 'New here? Create an account';
    el('gate-password').autocomplete = reg ? 'new-password' : 'current-password';
    setMsg('');
  }

  function friendlyError(e) {
    switch (e && e.code) {
      case 'auth/email-already-in-use': return 'That email is already registered. Log in instead.';
      case 'auth/invalid-email': return 'Enter a valid email address.';
      case 'auth/weak-password': return 'Use a password with at least 6 characters.';
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found': return 'Wrong email or password.';
      case 'auth/too-many-requests': return 'Too many attempts. Wait a few minutes and try again.';
      case 'auth/network-request-failed': return 'No connection. Check your internet and try again.';
      case 'auth/operation-not-allowed': return 'Email/password sign-in is not turned on in Firebase yet.';
      case 'auth/unauthorized-domain': return 'This website address is not in the Firebase authorized domains list yet.';
      case 'auth/configuration-not-found':
      case 'auth/admin-restricted-operation': return 'Sign-up is not set up in Firebase yet. In Firebase open Authentication, click Get started, then turn on Email/Password.';
      case 'auth/invalid-api-key': return 'The Firebase API key in firebase-config.js is not valid.';
      case 'permission-denied': return 'Your account was created, but your details could not be saved. Ask an admin to check the Firestore rules.';
      default: return 'Something went wrong (' + ((e && e.code) || (e && e.message) || 'unknown') + '). Try again.';
    }
  }

  // Decide whether this signed-in user may see the site
  function checkAccess(user) {
    if (!REQUIRE_APPROVAL) {
      unlock();
      return Promise.resolve();
    }
    return db.collection('members').doc(user.uid).get()
      .then(function (doc) {
        if (doc.exists && doc.data().approved === true) {
          unlock();
          return;
        }
        setNote(doc.exists ? '' : 'We could not find your application yet. Press "Check again" in a moment.');
        showView('pending');
      })
      .catch(function () {
        setNote('Could not reach the database. Check your connection, then press "Check again".');
        showView('pending');
      });
  }

  auth.onAuthStateChanged(function (user) {
    if (!user) { showView('form'); return; }
    checkAccess(user);
  });

  el('gate-toggle').addEventListener('click', function () {
    setMode(mode === 'login' ? 'register' : 'login');
  });

  el('gate-form').addEventListener('submit', function (ev) {
    ev.preventDefault();
    setMsg('');

    var email = el('gate-email').value.trim();
    var password = el('gate-password').value;
    var name = el('gate-name').value.trim();
    var btn = el('gate-submit');
    btn.disabled = true;

    var task;
    if (mode === 'register') {
      task = auth.createUserWithEmailAndPassword(email, password).then(function (cred) {
        return db.collection('members').doc(cred.user.uid).set({
          name: name,
          email: email,
          approved: !REQUIRE_APPROVAL,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function () { return checkAccess(cred.user); });
      });
    } else {
      task = auth.signInWithEmailAndPassword(email, password);
    }

    task
      .catch(function (e) {
        console.error('Gate error:', e);
        setMsg(friendlyError(e));
        setNote(friendlyError(e));
      })
      .then(function () { btn.disabled = false; });
  });

  el('gate-recheck').addEventListener('click', function () {
    if (auth.currentUser) checkAccess(auth.currentUser);
  });

  function logout() {
    auth.signOut().then(function () {
      el('gate-form').reset();
      setMode('login');
      window.scrollTo(0, 0);
    });
  }

  el('gate-pending-logout').addEventListener('click', logout);

  var logoutLink = el('logoutBtn');
  if (logoutLink) {
    logoutLink.addEventListener('click', function (e) {
      e.preventDefault();
      logout();
    });
  }

  setMode('login');
})();