// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getDatabase, ref, set, push } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://qa-interns-portal-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to open the form
window.openForm = function(courseName) {
    document.getElementById('courseName').value = courseName; // Set course name in hidden input
    document.getElementById('studentModal').style.display = 'flex'; // Show modal
};

// Function to close the form
window.closeForm = function() {
    document.getElementById('studentModal').style.display = 'none'; // Hide modal
};

// Function to handle form submission
window.submitForm = function(event) {
    event.preventDefault(); // Prevent default form submission

    const studentName = document.getElementById('studentName').value;
    const studentEmail = document.getElementById('studentEmail').value;
    const courseName = document.getElementById('courseName').value;

    // Create a reference for the new student entry under the specified course
    const newStudentRef = push(ref(database, 'courses/' + courseName));
    
    set(newStudentRef, {
        name: studentName,
        email: studentEmail,
        addedAt: new Date().toISOString()
    })
    .then(() => {
        alert("Student added successfully!");
        closeForm(); // Close the form after submission
        document.getElementById('studentForm').reset(); // Reset the form fields
    })
    .catch((error) => {
        console.error("Error adding student:", error);
        alert("Failed to add student.");
    });
};