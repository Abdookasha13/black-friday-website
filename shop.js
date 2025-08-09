var xhr = new XMLHttpRequest();
xhr.open("GET", "product.json");
xhr.send();

let products = []
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    var data = JSON.parse(xhr.responseText);
    products = data.products;
    displayProducts(products);
    // console.log(products);
  }
}

function displayProducts(products) {
  var container = document.getElementById("products-container");
  container.innerHTML = null;
  for (let i = 0; i < products.length; i++) {
    let product = products[i];

    var card = document.createElement("div");
    card.className = "product-card";

    // صورة مميزة خارجية قبل الهوفر
    var imgTag = document.createElement("img");
    imgTag.src = product.featured_image;

    // نحفظ صورة الهوفر في data-attribute
    imgTag.setAttribute("data-hover", product.images[0]);

    imgTag.addEventListener("mouseover", function () {
      this.dataset.original = this.src;
      this.src = this.getAttribute("data-hover");
      //  imgTag.src = product.images[0];

    });

    imgTag.addEventListener("mouseout", function () {
      this.src = this.dataset.original;
      //  imgTag.src = product.images[1];

    });

    card.appendChild(imgTag);

    // جزء الخصم فوق الصورة
    var discount = document.createElement("div");
    discount.className = "discount-badge";
    discount.innerText = product.discount + "%";
    card.appendChild(discount);

    // اسم المنتج
    var title = document.createElement("h3");
    title.textContent = product.name;
    card.appendChild(title);

    var priceP = product.price - product.price * (product.discount / 100);
    // السعر
    var price = document.createElement("p");
    price.innerHTML =
      "<span class='old-price'>" + product.price + "</span> $" + priceP;
    card.appendChild(price);


    // card
    let btn = document.createElement("button");
    btn.className = "btncart";
    btn.textContent = "Add to Cart";

    card.appendChild(btn);
    btn.onclick = function () {
      addToCart(product);
    };

    container.appendChild(card);

    imgTag.addEventListener('click', function () {
      const bodyShop = document.getElementsByClassName('body-shop')[0];
      const loading = document.getElementsByClassName('loading')[0];
      loading.style.display = 'block';
      setTimeout(function () {
        window.open(`single-product.html?id=${product.id}`, "_self");
        loading.style.display = 'none';
      }, 800)
    });
  }
};




var cartCountt = document.getElementsByClassName('num-product-in-cart')[0];
function addToCart(product) {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];

  var exists = false;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      exists = true;
      cart[i].quantity = (cart[i].quantity || 1) + 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      renderCart()
      return;
    }
  }

  product.quantity = 1;
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart()
}


function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalCount = 0;
  for (let i = 0; i < cart.length; i++) {
    totalCount += cart[i].quantity || 1;
  }
  localStorage.setItem('totalCountt', totalCount)
  cartCountt.innerHTML = localStorage.getItem('totalCountt');
}





function renderCart() {
  let container = document.getElementById("cart-container");

  if (!container) return; // ✅ لو مش في صفحة الكارت، متعملش حاجة

  container.innerHTML = "";
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    let totalPrice = document.getElementsByClassName('subtotal1')[0];
    if (totalPrice) {
      totalPrice.textContent = "Total: $0.00";
      localStorage.removeItem("cart");
    }
  } else {
    container.innerHTML = "";
    for (let i = 0; i < cart.length; i++) {
      let item = cart[i];


      let box1 = document.createElement("div");
      box1.className = "cart-item1";


      let name = document.createElement("p");
      name.textContent = item.name;

      container.appendChild(box1)
      box1.appendChild(name);


      let box = document.createElement("div");
      box.className = "cart-item";

      let img = document.createElement("img");
      img.src = item.featured_image;


      let finalPrice = item.price - (item.price * item.discount) / 100;

      // ✅ إنشاء input للكمية
      let quantityLabel = document.createElement("label");
      quantityLabel.textContent = "Quantity: ";

      // إنشاء input و + -
      let controls = document.createElement("div");
      controls.className = "quantity-controls";

      let minusBtn = document.createElement("button");
      minusBtn.textContent = "-";
      minusBtn.className = "qty-btn";

      let plusBtn = document.createElement("button");
      plusBtn.textContent = "+";
      plusBtn.className = "qty-btn";

      let quantityInput = document.createElement("input");
      quantityInput.setAttribute("class", "quantityInput");
      quantityInput.type = "number";
      quantityInput.value = item.quantity || 1;
      quantityInput.min = 1;

      minusBtn.onclick = function () {
        if (cart[i].quantity > 1) {
          cart[i].quantity--;
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartCount();
          renderCart();
        }
      };

      plusBtn.onclick = function () {
        cart[i].quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        renderCart();
      };

      controls.appendChild(minusBtn);
      controls.appendChild(quantityInput);
      controls.appendChild(plusBtn);

      box.appendChild(img);
      box.appendChild(quantityLabel);
      box.appendChild(controls);



      // ✅ السعر الفردي * الكمية
      let price = document.createElement("p");
      let totalItemPrice = finalPrice * (item.quantity || 1);
      price.textContent = "$" + totalItemPrice.toFixed(2);

      total += totalItemPrice;

      let btn = document.createElement("button");
      btn.textContent = "Remove";
      btn.onclick = function () {
        cart.splice(i, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        box1.remove();
        updateCartCount()
        renderCart()
      };

      box1.appendChild(box);
      box.appendChild(price);
      box.appendChild(btn);

    }

    // ✅ إضافة السعر الإجمالي في آخر الصفحة
    let totalPrice = document.getElementsByClassName('subtotal1')[0];
    if (totalPrice) {
      totalPrice.textContent = "Total: $" + total.toFixed(2);
    }
  }
}


// // ==========================search=========================
// function search(e) {
//   const value = e.value.toLowerCase().trim();
//   const feltered = products.filter(function (product) {
//     return product.name.toLowerCase().includes(value);
//   });

//   displayProducts(feltered);

// }
// // ==========================end-search=========================

// // ==============================filtter====================
// const menBtn = document.getElementsByClassName('Mens')[0];
// const womanBtn = document.getElementsByClassName('Womans')[0];
// menBtn.addEventListener('click', function () {
//   menBtn.classList.add('active-btn');
//   womanBtn.classList.remove('active-btn');
//   const mens = products.filter(function (product) {
//     return product.category == 'Men';
//   })
//   displayProducts(mens)
// });

// womanBtn.addEventListener('click', function () {
//   womanBtn.classList.add('active-btn');
//   menBtn.classList.remove('active-btn');
//   const mens = products.filter(function (product) {

//     return product.category == 'Women';
//   })
//   displayProducts(mens)
// });
// // ==============================end-filtter====================

// window.onload = function () {
//   updateCartCount();
//   renderCart();

//   const searchInput = document.querySelector(".search-container input");
//   if (searchInput && searchInput.value.trim() !== "") {
//     search(searchInput);
//   }
// };



let selectedCategory = 'All';

const searchInput = document.querySelector(".search-container input");

// Function to filter products based on search input and selected category
function search() {
  const value = searchInput.value.toLowerCase().trim();

  const filtered = products.filter(function (product) {
    const matchSearch = product.name.toLowerCase().includes(value);
    const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  displayProducts(filtered);
}

// ======================= Filter Buttons ===========================
const allBtn = document.getElementsByClassName('All')[0];
const menBtn = document.getElementsByClassName('Mens')[0];
const womanBtn = document.getElementsByClassName('Womans')[0];

// All button - shows all products
allBtn.addEventListener('click', function () {
  selectedCategory = 'All';
  allBtn.classList.add('active-btn');
  menBtn.classList.remove('active-btn');
  womanBtn.classList.remove('active-btn');
  search();
});

// Men button - filters by Men category
menBtn.addEventListener('click', function () {
  selectedCategory = 'Men';
  menBtn.classList.add('active-btn');
  womanBtn.classList.remove('active-btn');
  allBtn.classList.remove('active-btn');
  search();
});

// Women button - filters by Women category
womanBtn.addEventListener('click', function () {
  selectedCategory = 'Women';
  womanBtn.classList.add('active-btn');
  menBtn.classList.remove('active-btn');
  allBtn.classList.remove('active-btn');
  search();
});

// ======================= Search Input Listener ===========================
if (searchInput) {
  searchInput.addEventListener("input", search);
}

// ======================= On Page Load ===========================
window.onload = function () {
  updateCartCount();
  renderCart();
  search();
};