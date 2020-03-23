// get data
db.collection('guides').get().then(snapshot => {
    setupGuides(snapshot.docs)
})


// listen for auth status changes.
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("user logged in");
    }else{
        console.log("user logged out");
    }
})


// SIGN UP
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get form data
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // signup the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        // close the signup modal and reset the form
        const modal = document.querySelector('#modal-signup');
        M.modal.getInstance(modal).close();
        signupForm.reset();
    });
});


// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('user signed out');
    });
});


// LOGIN
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        // close the login modal and reset the from
        const modal = document.querySelector('#modal-login');
        M.modal.getInstance(modal).close();
        loginForm.reset();
    });
});