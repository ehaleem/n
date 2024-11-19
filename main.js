
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"; 


const firebaseConfig = {
  apiKey: "AIzaSyBvCdjcc2f10CDlXVrGFUC-xJSHk-FSvhc",
  authDomain: "e-comerce-3ba75.firebaseapp.com",
  projectId: "e-comerce-3ba75",
  storageBucket: "e-comerce-3ba75.appspot.com",
  messagingSenderId: "892668004889",
  appId: "1:892668004889:web:95a7984669d99551c2f888"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  




async function addProductToFirestore(product) { 
        const docRef = await addDoc(collection(db, "products"), product);
}

// const products = [
//     {
//         image: "./image/25.png",
//         titles: {
//             mainTitle: "Woman Shawl Long",
//             category: "Women's Fashion"
//         },
//         price: 170.00,
//         rating: {
//             rate: 5.8,
//             count: 2
//         }
//     },
//     {
//         image: "./image/1.png",
//         titles: {
//             mainTitle: "Woman Shawl Long",
//             category: "Women's Fashion"
//         },
//         price: 170.00,
//         rating: {
//             rate: 5.8,
//             count: 2
//         }
//     },
//     {
//         image: "./image/12.png",
//         titles: {
//             mainTitle: "Woman Shawl Long",
//             category: "Women's Fashion"
//         },
//         price: 170.00,
//         rating: {
//             rate: 5.8,
//             count: 2
//         }
//     },
     
// ];

// async function addProducts() {
//     const promises = products.map(product =>  (product));
//     await Promise.all(promises);
//     console.log("All products added successfully.");
// }


// addProducts();







function displayProducts(products) {
    const productsContainer = document.getElementById("ps"); 
    productsContainer.innerHTML = ""; 
    
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "cart"; 
        productElement.innerHTML = `
            <div class="image">
                <img src="${product.image}" alt="">
            </div>
            <div class="text">
                <p>${product.titles.mainTitle}</p>
                <p>${product.titles.category}</p>
                <p>e£${product.price.toFixed(2)}</p>  
                <div class="rate">
                    <div class="star">
                        ${'<i class="fa-solid fa-star"></i>'.repeat(Math.round(product.rating.rate))} 
                    </div>
                    <span>${product.rating.rate}</span>
                </div>
                <button class="btn">+ add to cart</button>
            </div>
        `;
        productsContainer.appendChild(productElement); 
    });
}


async function fetchProducts() {

        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));


        if (products.length > 0) {
            displayProducts(products);
        }


}

fetchProducts()

let signOut = document.getElementById("signOut").addEventListener("click",function(){
    window.location.href="http://127.0.0.1:5501/login%20project1/login%20project1/index.html";
})




































let menu = document.getElementById("menu")
let icon = document.getElementById("menuIcon")


icon.addEventListener("click" , function() {
    menu.classList.toggle("show")
})

