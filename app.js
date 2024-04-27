let navbar = document.querySelector('.navbar');

document.querySelector("#menu-btn").onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
    wishItem.classList.remove('active');
};

let searchForm = document.querySelector('.search-form');

document.querySelector("#search-btn").onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
    wishItem.classList.remove('active');
};


let cartItem = document.querySelector('.cart-items-container');

document.querySelector("#cart-btn").onclick = () => {
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    wishItem.classList.remove('active');
};

let wishItem = document.querySelector('.wishlist-container');

document.querySelector("#wishlist-btn").onclick = () => {
    wishItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
};

window.onscroll =()=>{
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
    wishItem.classList.remove('active');
}

function scrollToSection(section) {
    section.scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.getElementById("search-box");
    const searchIcon = document.querySelector('.fas.fa-search');
    const menuSection = document.getElementById("menu");
    const productSection = document.getElementById("products");


searchIcon.addEventListener("click", function () {
    handleSearch();
});

searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        handleSearch();
    }
});

function handleSearch() {
    const searchText = searchBox.value.trim().toLowerCase();
    if (searchText) {
        const menuItems = menuSection.querySelectorAll(".box h3");
        const matchedMenuItem = Array.from(menuItems).find(item => item.textContent.trim().toLowerCase().includes(searchText));
        if (matchedMenuItem) {
            scrollToSection(menuSection);
            highlightMatchedItem(matchedMenuItem);
            return;
        }

        const productItems = productSection.querySelectorAll(".box h3");
        const matchedProductItem = Array.from(productItems).find(item => item.textContent.trim().toLowerCase().includes(searchText));
        if (matchedProductItem) {
            scrollToSection(productSection);
            highlightMatchedItem(matchedProductItem);
            return;
        }
        alert("No matching item found.");
    }
}

function highlightMatchedItem(matchedItem) {
    matchedItem.classList.add("highlight");
}
});

function removeHighlight() {
    let highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(element => {
        element.classList.remove('highlight');
    });
}

document.getElementById("search-box").addEventListener("input", function() {
    let searchQuery = this.value.trim().toLowerCase();
    if (searchQuery === "") {
        removeHighlight();
    }
});

function closeSearchBox() {
    removeHighlight();
    let searchForm = document.querySelector('.search-form');
    searchForm.classList.remove('active');
}

document.body.addEventListener('click', function(event) {
    if (!event.target.closest('.search-form') && !event.target.closest('#search-btn')) {
        closeSearchBox();
    }
});



var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
   loop:true,
   speed:3500,
  });


const product = [
    {
        id:0,
        image:'Images/card1.jpg',
        title:'Classic Brew',
        price: 20,    
    },
    {
        id:1,
        image:'Images/card2.jpg',
        title:'Creamy Latte',
        price: 25,    
    },
    {
        id:2,
        image:'Images/card3.jpg',
        title:'Tasty and Healthy Boost',
        price: 31,    
    },
    {
        id:3,
        image:'Images/card4.jpg',
        title:'Morning Blend',
        price: 29,    
    },
    {
        id:4,
        image:'Images/card5.jpg',
        title:'Golden Mist Espresso',
        price: 40,    
    },
    {
        id:5,
        image:'Images/card6.jpg',
        title:'Bold Mocha',
        price: 36,    
    },
    {
        id:6,
        image:'Images/p1.jpg',
        title:'Dark Roast Delicacy',
        price: 152,    
    },
    {
        id:7,
        image:'Images/p2.jpg',
        title:'Dusk Blend Doppio',
        price: 186,    
    },
    {
        id:8,
        image:'Images/p3.jpg',
        title:'Midnight Magic Blends',
        price: 292,    
    },
]


let cartItems = [];

function addtocart(productId) {
    const selectedItem = product.find(item => item.id === productId);
    
    if (selectedItem) {
        cartItems.push(selectedItem);
        displayCart();
    } else {
        console.error('Product not found');
    }
}

function getImageName(productId) {
    const selectedProduct = product.find(item => item.id === productId);
    if (selectedProduct) {
        return selectedProduct.image.toLowerCase();
    } else {
        return ''; 
    }
}

function displayCart() {
    let cartItemContainer = document.getElementById("cartItem");
    let checkoutButton = document.getElementById("checkoutButton"); 
    
    cartItemContainer.innerHTML = "";

    if (cartItems.length === 0) {
        cartItemContainer.innerHTML = "Your cart is empty";
        document.getElementById("total").textContent = "₹ 0.00";
        checkoutButton.style.display = "none";
        return; 
    }

    cartItems.forEach(item => {
        let itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
        <div class="item">
            <img src="Images/card${item.id + 1}.jpg" alt="" class="item-image">
            <div class="item-details">
                <h4>${item.title}</h4>
                <div class="price">₹${item.price}/-</div>
            </div>
            <a class="delete-item" onclick="removeItem(${item.id})">
                <i class="fas fa-trash-alt"></i>
            </a>
        </div>
    `;
      
        cartItemContainer.appendChild(itemElement);
    });

    let total = cartItems.reduce((acc, curr) => acc + curr.price, 0);
    document.getElementById("total").textContent = `₹ ${total.toFixed(2)}`;

    if (cartItems.length > 0) {
        checkoutButton.style.display = "block"; 
    } else {
        checkoutButton.style.display = "none"; 
    }
}


function removeItem(productId) {
    const index = cartItems.findIndex(item => item.id === productId);
    
    if (index !== -1) {
        cartItems.splice(index, 1);
        displayCart();
    }
}


function showCheckoutButton() {
    let checkoutButton = document.getElementById("checkoutButton");
    checkoutButton.style.display = "block";
}


let wishItems = [];

function addtowish(productId) {
    const selectedItem = product.find(item => item.id === productId);
    
    if (selectedItem) {
        wishItems.push(selectedItem);
        displayWish();
    } else {
        console.error('Product not found');
    }
}

function displayWish() {
    let wishListContainer = document.getElementById("wishItem");
    
    wishListContainer.innerHTML = "";

    if (wishItems.length === 0) {
        wishListContainer.innerHTML = "Your wishlist is empty";
        return; 
    }

    wishItems.forEach(item => {
        let itemElement = document.createElement("div");
        itemElement.classList.add("wish-item");
        
        itemElement.innerHTML = `
            <div class="item">
                <img src="Images/card${item.id + 1}.jpg" alt="" class="item-image">
                <div class="item-details">
                    <h4>${item.title}</h4>
                    <div class="price">₹${item.price}/-</div>
                </div>
                <div class="action-buttons">
                    <button class="fa-solid fa-cart-shopping" onclick="moveToCart(${item.id})"></button>
                    <a class="delete-item" onclick="removeItemFromWishlist(${item.id})">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                </div>
            </div>
        `;
      
        wishListContainer.appendChild(itemElement);
    });
}

function moveToCart(productId) {
    const selectedItem = wishItems.find(item => item.id === productId);
    
    if (selectedItem) {
        cartItems.push(selectedItem);
        removeItemFromWishlist(productId);
        displayCart();
    } else {
        console.error('Product not found');
    }
}


function removeItemFromWishlist(productId) {
    const index = wishItems.findIndex(item => item.id === productId);
    
    if (index !== -1) {
        wishItems.splice(index, 1);
        
        displayWish();
    }
}


document.getElementById("contact-button").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let number = document.getElementById("number").value.trim();
    
    let form = document.getElementById("contact-form");
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    if (name === "" || email === "" || number === "") {
        alert("Please fill in all fields.");
        return;
    }
    
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("number").value = "";
    
    let thankYouMessage = document.getElementById("thank-you-message");
    thankYouMessage.style.display = "block";
    
    setTimeout(function() {
        thankYouMessage.style.display = "none";
    }, 8000);
});



