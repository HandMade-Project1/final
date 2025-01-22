// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC2zpAE0YqT_zQG1zwYjmjgBiKjDfvlA8",
  authDomain: "crafted-heart.firebaseapp.com",
  projectId: "crafted-heart",
  storageBucket: "crafted-heart.firebasestorage.app",
  messagingSenderId: "356981294414",
  appId: "1:356981294414:web:ea3a6c8e9dd59df7728a1f",
  measurementId: "G-PQ9WCXTS0L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let products = [
  { name: "Candle Set", category: "Candles Gift" },
  { name: "Decorative Vase", category: "Home Decor Gift" },
  { name: "Knitted Scarf", category: "Wool Gift" },
  { name: "Embroidery Art", category: "Embroidery Gift" },
  { name: "Woolen Jacket", category: "Wool Gift" },
  { name: "Family Threads", category: "Home Decor Gift" },
  { name: "Plant Straw", category: "Wool Gift" },
];

document.getElementById("category").addEventListener("change", function () {
  const selectedValue = this.value;
  if (selectedValue) {
    window.location.href = selectedValue;
  }
});

document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const searchQuery = document
    .getElementById("search")
    .value.trim()
    .toLowerCase();
  const selectedCategory = document.getElementById("category").value;

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;
    const matchesQuery = product.name.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesQuery;
  });

  if (filteredProducts.length > 0) {
    window.location.href = `product.html`;
  } else {
    // SweetAlert2 for no products found
    Swal.fire({
      icon: 'error',
      title: 'No Products Found',
      text: 'Sorry, no products match your search criteria.',
      confirmButtonText: 'OK'
    });
  }
});

////////////////// to hide and display login and sign up buttons if user //////////////////////////////////////
onAuthStateChanged(auth, (user) => {
  console.log("Auth state changed:", user);

  const welcomeMessageElement = document.getElementById("welcome-message");
  const loginButton = document.getElementById("login-button");
  const signupButton = document.getElementById("signup-button");
  const logoutButton = document.getElementById("logout-button");

  if (user) {
    console.log("User ID:", user.uid);
    fetchAndDisplayUserName(user.uid);

    loginButton.style.display = "none";
    signupButton.style.display = "none";
    logoutButton.style.display = "block"; // Show the logout button
  } else {
    console.log("No user signed in.");

    loginButton.style.display = "block";
    signupButton.style.display = "block";
    logoutButton.style.display = "none"; // Hide the logout button

    welcomeMessageElement.textContent = "";
  }
});

// Function to fetch and display the user's name
async function fetchAndDisplayUserName(uid) {
  try {
    // Check if the user is signed in via Google
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.displayName) {
      // Display the name from Google account
      document.getElementById(
        "welcome-message"
      ).innerHTML = `Welcome <span id="user-name">${currentUser.displayName}</span>!`;
      return;
    }

    // If no displayName, check Firestore
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userName = userDoc.data().firstName;
      document.getElementById(
        "welcome-message"
      ).innerHTML = `Welcome <span id="user-name">${userName}</span>!`;
    } else {
      console.error("No user data found");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

// Add an event listener to the logout button to handle sign out
document.getElementById("logout-button").addEventListener("click", async () => {
  try {
    await auth.signOut();
    console.log("User signed out.");

    // SweetAlert2 for successful logout
    Swal.fire({
      icon: 'success',
      title: 'Logged Out Successfully!',
      text: 'You have been signed out.',
      confirmButtonText: 'OK'
    }).then(() => {
      window.location.href = "login.html"; // Redirect after confirmation
    });
  } catch (error) {
    console.error("Error signing out:", error);

    // SweetAlert2 for logout error
    Swal.fire({
      icon: 'error',
      title: 'Logout Failed',
      text: error.message,
      confirmButtonText: 'OK'
    });
  }
});