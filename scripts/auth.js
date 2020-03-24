// LISTEN FOR AUTH STATUS CHANGED
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in', user)
        // if user logged in then GET DATA
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
        }, err => {
            console.log(err.message)
        });
    } else {
        console.log('user logged out')
        // pass the empty array
        setupUI();
        setupGuides([]);
    }
});


// CREATE NEW GUIDE
const createGuide = document.querySelector('#create-form');
createGuide.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('guides').add({
        title: createGuide['title'].value,
        content: createGuide['content'].value
    }).then(() => {
        // close the modal and reset form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createGuide.reset();
    }).catch(err => {
        console.log(err.message)
    })
})

// SIGN UP FORM
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user & add firestore data
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        });
    }).then(() => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});


// LOGOUT
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault()
    auth.signOut();
});


// LOGIN FORM
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('login', (e) => {
    e.preventDefault()

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // close the login form and rest the form
        const modal = document.querySelector("#modal-login");
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
});