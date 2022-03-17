// Import the functions you need from the SDKs you need

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
    signOut,
    onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

import {
    getFirestore,
    addDoc,
    collection,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,


} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyB_Yte44LOdEz_hPvhCjlHC_kMWeLE9A2E",
    authDomain: "cse134b-hw5-d450a.firebaseapp.com",
    projectId: "cse134b-hw5-d450a",
    storageBucket: "cse134b-hw5-d450a.appspot.com",
    messagingSenderId: "159230355036",
    appId: "1:159230355036:web:69d998338e635da46e2899",
    measurementId: "G-XFNVTRMRG6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// const writer = "cse134grader@ucsd.edu";
auth.onAuthStateChanged(user => {
    let signinSection = document.getElementById("signin-section");
    let signOutButton = document.getElementById("signOut");
    let newPostButton = document.getElementById("promptBtn");
    let displayEmail = document.getElementById("user-email");


    if (user) {
        console.log("logged in as ", user.email);
        signinSection.style.display = 'none';
        signOutButton.style.display = 'block';
        newPostButton.style.visibility = 'visible';
        displayEmail.innerHTML = user.email;
        loggedIn = true;

        showAllBlogPostFromDatabase(user.email);
    }
    else {
        console.log("user logged out");
        signinSection.style.display = 'block';
        signOutButton.style.display = 'none';
        newPostButton.style.visibility = 'hidden';
        displayEmail.innerHTML = "";
        loggedIn = false;
    }
});


// const analytics = getAnalytics(app);

document.getElementById("signIn").addEventListener("click", signInUser);
// document.getElementById("signUp").addEventListener("click", signUpUser);

document.getElementById("signOut").addEventListener("click", signOutUser);

// function signUpUser() {
//     // console.log("SIGN UP USER CALLED");
//     let email = document.getElementById("email").value;
//     let password = document.getElementById("password").value;

//     const auth = getAuth();
//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in 
//             const user = userCredential.user;
//             // console.log(user);
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log(errorCode + errorMessage);
//         });
// }


function signInUser() {
    // console.log("SIGN IN USER CALLED");
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;


    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            // console.log(user);
            console.log("email is: " + user.email);
            // showAllBlogs();
            // showAllBlogPostFromDatabase(user.email);


        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage);

        });
}

function signOutUser() {
    // console.log("SIGN OUT CALLED");
    // let tempUser = user;
    auth.signOut()
        .then(() => {
            // console.log(tempUser + "is signed out");
            console.log("user should be signed out");
            loggedIn = false;
            location.reload();
        })
}


const db = getFirestore(app);
// console.log(db);


const colRef = collection(db, 'blogposts');






// 📁 blog.js
const promptBtn = document.getElementById('promptBtn');
const promptDia = document.getElementById('diaPrompt');
promptDia.returnValue = true;
const promptInner = document.getElementById('promptInner');
promptInner.innerHTML = "Write a blog post"
let editMode = false;
let editID = null;
let editIndex = null;
let loggedIn = false;


window.onload = function () {

    getDocs(colRef)
        .then((snapshot) => {
            // console.log(snapshot.docs);

            let blogposts = [];
            snapshot.docs.forEach((doc) => {
                blogposts.push({ ...doc.data(), id: doc.id })
            });

            if (loggedIn != true) {
                generateALLBlogpostsFromDatabase(blogposts);
                let blogSectionGuest = document.getElementById("blog-section-guest");
                blogSectionGuest.style.display = 'flex';

            }


        })
        .catch(err => {
            console.log(err);
        })
};



promptBtn.addEventListener('click', function () {
    if (promptDia.open != true) {
        promptDia.showModal();
    }
});

const cancelPromptBtn = document.getElementById('cancel-prompt');
cancelPromptBtn.addEventListener('click', function () {
    // document.getElementById("outputMsg").innerHTML = "Prompt result: ";
    // document.getElementById("output").innerHTML = "you canceled";

});

const okPromptBtn = document.getElementById('ok-prompt');

// create (or update) a post
okPromptBtn.addEventListener('click', function () {
    const input = document.getElementById('ptitle').value;
    let clean = DOMPurify.sanitize(input);
    // document.getElementById("outputMsg").innerHTML = "Prompt result: ";
    // document.getElementById("output").innerHTML = clean;


    const newTitle = document.getElementById('ptitle').value;
    // const newDate = document.getElementById('pdate').value;
    const newSummary = document.getElementById('psummary').value;

    if (editMode == false) {
        // now for database on Firebase
        auth.onAuthStateChanged(user => {
            if (user) {
                addDoc(colRef, {
                    email: user.email,
                    title: newTitle,
                    summary: newSummary,
                    date: new Date(),
                    author: user.email,
                })
                    .then(() => {
                        console.log("New post just added for user " + user.email);
                    })

            }
            else {
                console.log("can't add a new post because user is NOT logged in");
            }
        })

    }
    else {
        // for updating in firebase
        auth.onAuthStateChanged(user => {
            if (user) {
                // database, collection name, id, 
                let docToUpdateRef = doc(db, 'blogposts', editID);

                updateDoc(docToUpdateRef, {
                    email: user.email,
                    title: newTitle,
                    summary: newSummary,
                    date: new Date()
                })
                    .then(() => {
                        editID = null;
                        console.log('just updated the post');
                    })
            }
            else {
                console.log("can't update the post because user is NOT logged in");
            }
        })
        editMode = false;
    }

    setTimeout(() => {
        location.reload();
    }, 500);


});








function showAllBlogPostFromDatabase(email) {
    const blogposts = [];

    // is a promise
    getDocs(colRef)
        .then((snapshot) => {
            // console.log(snapshot.docs);

            let blogposts = [];
            snapshot.docs.forEach((doc) => {
                blogposts.push({ ...doc.data(), id: doc.id })
                // console.log("doc id is " + doc.id);
            });
            console.log("logged in is " + loggedIn);

            if (loggedIn) {
                generateMyBlogpostsFromDatabase(email, blogposts);
                let blogSectionGuest = document.getElementById("blog-section-guest");
                blogSectionGuest.style.display = 'none';
            }


        })
        .catch(err => {
            console.log(err);
        })
}


function generateMyBlogpostsFromDatabase(email, blogposts) {

    const allBlogs = blogposts.map(article => {
        // console.log("this article's id is " + article.id);

        if (email == article.email) {
            let blogSection = document.getElementById("blog-section");
            let blog = document.createElement("div");
            let tempTitle = document.createElement("h3");
            let tempDate = document.createElement("p");
            let tempAuthor = document.createElement("p");
            let tempSummary = document.createElement("p");
            let editBtn = document.createElement("button");
            let deleteBtn = document.createElement("button");

            let row = document.createElement("div");



            blog.setAttribute("class", "blogPost");
            tempTitle.innerHTML = article.title;
            tempAuthor.innerHTML = article.author;
            let newDate = new Date(article.date * 1000);
            let month = new Date(article.date * 1000).getMonth();
            let day = new Date(article.date * 1000).getDate();
            tempDate.innerHTML = month + "/" + day;
            tempSummary.innerHTML = article.summary;

            editBtn.innerHTML = "<img src='assets/images/pencil.png' height='15px' width='15px'>";
            deleteBtn.innerHTML = "<img src='assets/images/trash.png' height='15px' width='15px'>";
            editBtn.classList.add("editButtons")
            deleteBtn.classList.add("deleteButtons");
            editBtn.setAttribute('value', article.id);
            deleteBtn.setAttribute('value', article.id);

            tempAuthor.classList.add('small-date');
            tempDate.classList.add('small-date');
            blog.classList.add("centered");
            row.classList.add("horizontal");


            blog.appendChild(tempTitle);
            blog.appendChild(tempAuthor);

            blog.appendChild(tempDate);

            blog.appendChild(tempSummary);
            row.appendChild(editBtn);
            row.append(deleteBtn);
            blog.appendChild(row);

            // blog.appendChild(editBtn);
            // blog.appendChild(deleteBtn);
            blogSection.appendChild(blog);









            // for deleting, has to go here otherwise delete buttons won't exist yet lol

            const allDeleteButtons = document.getElementsByClassName('deleteButtons');


            if (allDeleteButtons != null) {
                for (let i = 0; i < allDeleteButtons.length; i++) {
                    allDeleteButtons[i].addEventListener('click', function openDeleteModal() {

                        let docRef = doc(db, 'blogposts', allDeleteButtons[i].value);
                        deleteDoc(docRef)
                            .then(() => {
                                console.log('just deleted post with id' + allDeleteButtons[i].value);
                                setTimeout(() => {
                                    location.reload();
                                }, 1000);

                            });
                    }
                    );
                }
            }


            // for editing
            const allEditButtons = document.getElementsByClassName('editButtons');

            if (allEditButtons != null) {
                for (let i = 0; i < allEditButtons.length; i++) {
                    allEditButtons[i].addEventListener('click', function openEditModal() {
                        editMode = true;
                        editIndex = i;
                        promptBtn.click();


                        getDocs(colRef)
                            .then((snapshot) => {

                                const testing = blogposts.map(article => {
                                    let idToEdit = allEditButtons[i].value;
                                    if (idToEdit == article.id) {
                                        document.getElementById('ptitle').value = article.title;
                                        // document.getElementById('pdate').value = article.date;
                                        document.getElementById('psummary').value = article.summary;

                                        editID = idToEdit;
                                    }

                                }
                                );
                            })
                            .catch(err => {
                                console.log(err);
                            })


                    }
                    );
                }

            }

        }
        else {
            console.log("Not showing this post because you didn't write it.");
        }

    });


}


// ============================


function generateALLBlogpostsFromDatabase(blogposts) {


    const allBlogs = blogposts.map(article => {
        let blogSectionGuest = document.getElementById("blog-section-guest");
        let blog = document.createElement("div");
        let tempTitle = document.createElement("h3");
        let tempAuthor = document.createElement("p");
        let tempDate = document.createElement("p");
        let tempSummary = document.createElement("p");
        let editBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");

        let row = document.createElement("div");



        blog.setAttribute("class", "blogPost");
        tempTitle.innerHTML = article.title;
        tempAuthor.innerHTML = article.author;
        let newDate = new Date(article.date * 1000);
        let month = new Date(article.date * 1000).getMonth();
        let day = new Date(article.date * 1000).getDate();
        tempDate.innerHTML = month + "/" + day;
        tempSummary.innerHTML = article.summary;

        editBtn.innerHTML = "<img src='assets/images/pencil.png' height='15px' width='15px'>";
        deleteBtn.innerHTML = "<img src='assets/images/trash.png' height='15px' width='15px'>";
        editBtn.classList.add("editButtons")
        deleteBtn.classList.add("deleteButtons");
        editBtn.setAttribute('value', article.id);
        deleteBtn.setAttribute('value', article.id);

        tempAuthor.classList.add('small-date');
        tempDate.classList.add('small-date');
        blog.classList.add("centered");
        row.classList.add("horizontal");


        blog.appendChild(tempTitle);
        blog.appendChild(tempAuthor);
        blog.appendChild(tempDate);
        blog.appendChild(tempSummary);

        blogSectionGuest.appendChild(blog);




    }



    );
}
