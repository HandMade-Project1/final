import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

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

//  function

async function displayProducts() {
  const embroideryCollection = collection(db, "Embroidery");
  const embroideryDocs = await getDocs(embroideryCollection);

  const embroideryContainer = document.getElementById("Embroidery");

  embroideryDocs.forEach((doc) => {
    const product = doc.data();
    const productElement = `
      <div class="product-card">
        <div class="product-card-image">
        <img src="${product.imageURL}" alt="${product.name}" />
        </div>
        <div class="product-card-content">
        <h2 class="product-card-title">${product.name}</h2>
        <div class="price-and-details">
        <span class="product-card-price">$${product.price}</span>
        <a href="../details/product-details.html?id=${doc.id}" class="product-card-button">View Details</a>
        <div>
        </div>
      </div>
        `;
    embroideryContainer.innerHTML += productElement;
  });

  ////////////////////////////////////////

  const CandlesAndSoap = collection(db, "Candles and soap");
  const CandlesAndSpapDocs = await getDocs(CandlesAndSoap);

  const CandlesAndSpapContainer = document.getElementById("Candles-and-soap");

  CandlesAndSpapDocs.forEach((doc) => {
    const product = doc.data();
    const productElement = `
      <div class="product-card">
        <div class="product-card-image">
        <img src="${product.imageURL}" alt="${product.name}" />
        </div>
        <div class="product-card-content">
        <h2 class="product-card-title">${product.name}</h2>
        <div class="price-and-details">
        <span class="product-card-price">$${product.price}</span>
        <a href="../details/product-details.html?id=${doc.id}" class="product-card-button">View Details</a>
        <div>
        </div>
      </div>
        `;
    CandlesAndSpapContainer.innerHTML += productElement;
  });

  ////////////////////////////////////////

  const HomeDecor = collection(db, "Home Decor");
  const HomeDecorDocs = await getDocs(HomeDecor);

  const HomeDecorContainer = document.getElementById("Home-Decor");

  HomeDecorDocs.forEach((doc) => {
    const product = doc.data();
    const productElement = `
      <div class="product-card">
        <div class="product-card-image">
        <img src="${product.imageURL}" alt="${product.name}" />
        </div>
        <div class="product-card-content">
        <h2 class="product-card-title">${product.name}</h2>
        <div class="price-and-details">
        <span class="product-card-price">$${product.price}</span>
        <a href="../details/product-details.html?id=${doc.id}" class="product-card-button">View Details</a>
        <div>
        </div>
      </div>
        `;
    HomeDecorContainer.innerHTML += productElement;
  });

  ////////////////////////////////////////

  const WoolCollection = collection(db, "Wool products");
  const WoolDocs = await getDocs(WoolCollection);

  const WoolContainer = document.getElementById("Wool");

  WoolDocs.forEach((doc) => {
    const product = doc.data();
    const productElement = `
      <div class="product-card">
        <div class="product-card-image">
        <img src="${product.imageURL}" alt="${product.name}" />
        </div>
        <div class="product-card-content">
        <h2 class="product-card-title">${product.name}</h2>
        <div class="price-and-details">
        <span class="product-card-price">$${product.price}</span>
        <a href="../details/product-details.html?id=${doc.id}" class="product-card-button">View Details</a>
        <div>
        </div>
      </div>
        `;
    WoolContainer.innerHTML += productElement;
  });

  ////////////////////////////////////////
}

displayProducts();
