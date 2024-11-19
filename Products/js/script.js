let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to truncate title to three words
function truncateTitle(title) {
    const words = title.split(' ');
    return words.length > 2 ? words.slice(0, 2).join(' ') + '...' : title;
}

// Load clothing and accessory products from the API
function loadProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ''; // Clear previous products

    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            // Filter for clothing and accessories only
            const filteredProducts = products.filter(product => 
                product.category === "men's clothing" || 
                product.category === "women's clothing" || 
                product.category === "jewelery"
            );

            filteredProducts.forEach(product => {
                const card = `
                    <div class="col-md-3">
                        <div class="card">
                            <img class="C-image" src="${product.image}" alt="${product.title}">
                            <div class="card-body">
                                <h5 class="card-title">${truncateTitle(product.title)}</h5>
                                <h6>${product.category}</h6>
                                <p class="card-text">e£${product.price}</p>
                                <div class="rate-con">
                                    <div>
                                        ${'<i class="fa-solid fa-star"></i>'.repeat(Math.round(product.rating.rate))}
                                        <span style="color:Black">${'<i class="fa-solid fa-star"></i>'.repeat(5 - Math.round(product.rating.rate))}</span>
                                    </div>
                                    <span style="color:Black">${product.rating.rate}</span>
                                </div>
                                <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">+ Add to Cart</button>
                            </div>
                        </div>
                    </div>
                `;
                productList.innerHTML += card;
            });
        })
        .catch(error => {
            console.error("Error fetching products:", error);
            productList.innerHTML = '<p>Error loading products. Please try again later.</p>';
        });
}

// Add product to cart and navigate to checkout
function addToCart(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'checkout.html';
        })
        .catch(error => console.error("Error adding product to cart:", error));
}

// Load cart items on the checkout page
function loadCart() {
    const cartItems = document.getElementById("cart-items");
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.innerHTML = ''; // Clear previous items
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemHTML = `
            <div class="row align-items-center mb-2">
                <img class="CH-pic" src="${item.image}" alt="${item.title}">
                <div class="col-md-6">${item.title}</div>
                <div class="col-md-2">e£${item.price}</div>
                <div class="col-md-2 d-flex align-items-center">
                    <button class="btn btn-secondary btn-sm" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-secondary btn-sm" onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="col-md-2">e£${(item.price * item.quantity).toFixed(2)}</div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItems.innerHTML += itemHTML;
    });

    document.getElementById("total").innerText = total.toFixed(2);
}

// Initialize product load
if (document.getElementById("product-list")) {
    loadProducts();
}

// Initialize cart load
if (document.getElementById("cart-items")) {
    loadCart();
}

// Change quantity of products in the cart
function changeQuantity(productId, delta) {
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity += delta;
        if (cartItem.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }
    }
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Print bill
function printBill() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    const billContent = `
        <html>
            <head>
                <title>Bill</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        padding: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    table, th, td {
                        border: 1px solid #f49809;
                    }
                    th, td {
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                    .total {
                        font-weight: bold;
                        font-size: 1.2em;
                        text-align: right;
                        margin-top: 20px;
                    }
                    .seal {
                        margin: auto;
                        text-align: center;
                        font-size: 25px;
                    }
                </style>
            </head>
            <body>
                <h1>Bill</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cart.map(item => `
                            <tr>
                                <td>${item.title}</td>
                                <td>e£${item.price.toFixed(2)}</td>
                                <td>${item.quantity}</td>
                                <td>e£${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="total">Total: e£${total}</div>
                <div class="seal">seal</div>
            </body>
        </html>
    `;

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(billContent);
    printWindow.document.close();
    printWindow.print();
}
