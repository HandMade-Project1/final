import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
  doc,
  getDoc,
  getFirestore, collection,   addDoc,  getDocs, query,   orderBy,   serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { where } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAC2zpAE0YqT_zQG1zwYjmjgBiKjDfvlA8",
  authDomain: "crafted-heart.firebaseapp.com",
  projectId: "crafted-heart",
  storageBucket: "crafted-heart.firebasestorage.app",
  messagingSenderId: "356981294414",
  appId: "1:356981294414:web:ea3a6c8e9dd59df7728a1f",
  measurementId: "G-PQ9WCXTS0L",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const productDetailsContainer = document.getElementById(
  "product-details-container"
);

async function getProductById(productId) {
  try {
    const collections = [
      "Candles and soap",
      "Embroidery",
      "Home Decor",
      "Wool products",
    ];
    let productData = null;

    for (const collectionName of collections) {
      const productDocRef = doc(db, collectionName, productId);
      const productDocSnap = await getDoc(productDocRef);

      if (productDocSnap.exists()) {
        productData = { ...productDocSnap.data() };
        break;
      }
    }

    return productData;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

function renderProductDetails(product) {
  productDetailsContainer.innerHTML = `
    <div class="product-details-card">
      <div class="product-details-image">
        <img src="${product.imageURL}" alt="${product.name}">
      </div>
      <div class="product-details-content"><br>
        <h2>${product.name}</h2><br>
        <h5>Description:</h5>
        <p>${product.description}</p>
        <span class="product-details-price">Price: $${product.price}.00</span>
          <a class="checkout-button" href="../checkOut.html">Check Out</a>
    </div>
  `;
}

async function fetchProductDetails() {
  const product = await getProductById(productId);

  if (product) {
    renderProductDetails(product);
  } else {
    productDetailsContainer.innerHTML = "<p>Product not found.</p>";
  }
}



const reviewsCollection = collection(db, "reviews");

const form = document.getElementById("review-form");
const reviewsDiv = document.getElementById("reviews");
const stars = document.getElementsByClassName("star");
const ratingInput = document.getElementById("rating");

const updateRating = (rating) => {
    ratingInput.value = rating;

    Array.from(stars).forEach((star, index) => {
        star.className = "star";
        if (index < rating) {
            star.classList.add(["one", "two", "three", "four", "five"][rating - 1]);
        }
    });
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const rating = parseInt(ratingInput.value);
    const review = form.review.value.trim();

    if (!name || !rating || !review) {
        alert("Please fill out all fields and select a rating.");
        return;
    }

    try {
        await addDoc(reviewsCollection, {
            name,
            rating,
            review,
            productId,
            timestamp: serverTimestamp()
        });
        form.reset();
        Array.from(stars).forEach(star => star.className = "star");
        loadReviews();
    } catch (error) {
        console.error("Error adding review:", error);
    }
});

const loadReviews = async () => {
  reviewsDiv.innerHTML = "";  

  try {
      const q = query(
          reviewsCollection, 
          where("productId", "==", productId),
          orderBy("timestamp", "desc")
      );

      const querySnapshot = await getDocs(q); 

      querySnapshot.forEach((doc) => {
          const { name, rating, review, timestamp } = doc.data();
          console.log(name,rating,review,timestamp);
          const reviewElement = document.createElement("div");
          reviewElement.classList.add("review");
          reviewElement.innerHTML = `
          <small>${name}</small>
              <h3>${rating}/5</h3> 
              <h3>${review}</h3>
              <small>${new Date(timestamp?.toDate()).toLocaleString()}</small>
          `;
          reviewsDiv.appendChild(reviewElement);
      });
  } catch (error) {
      console.error("Error loading reviews:", error);
  }
};


Array.from(stars).forEach((star, index) => {
    star.addEventListener("click", () => updateRating(index + 1));
});

loadReviews();


fetchProductDetails();
