document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    fetch('product1.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === id);
            if (!product) {
                document.body.innerHTML = "<h2 style='color:white'>Product not found</h2>";
                return;
            }

            // Populate main product info
            document.querySelector('.featured_image').src = product.featured_image;
            document.querySelector('.thumb1').src = product.images[0];
            document.querySelector('.thumb2').src = product.images[1];
            document.querySelector('.category').textContent = product.category;
            document.querySelector('.name').textContent = product.name;
            document.querySelector('.price').textContent = `$${product.price}`;
            document.querySelector('.details').textContent = product.details;
            document.querySelector('.accordion-description').textContent = product.description;
            document.querySelector('.user').textContent = `${product.reviews[0].user} rated this product `;
            document.querySelector('.rating').textContent = `${product.reviews[0].rating}/5`;
            document.querySelector('.comment').textContent = `"${product.reviews[0].comment}"`;


            // ✅ Related Products Section
            const relatedContainer = document.querySelector('.related-products-container');

            if (relatedContainer) {
                const related = products.filter(p => p.category === product.category && p.id !== product.id);

                related.slice(0, 4).forEach(relatedProduct => {
                    const li = document.createElement('li');
                    li.classList.add('product');

                    li.innerHTML = `
                <a href="single-product.html?id=${relatedProduct.id}">
                    <img src="${relatedProduct.featured_image}" alt="${relatedProduct.name}" />
                    <h3 class="woocommerce-loop-product__title">${relatedProduct.name}</h3>
                    <p class="price">$${relatedProduct.price}</p>
                </a>
            `;

                    relatedContainer.appendChild(li);
                });
            }
        })
        .catch(error => {
            console.error("Error loading product:", error);
        });

    // review and description toggle
    const buttons = document.querySelectorAll('.toggle-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.closest('.collapsible');
            const content = section.querySelector('.content');
            const isOpen = content.style.display === 'block';
            content.style.display = isOpen ? 'none' : 'block';
            button.textContent = isOpen ? '+' : '-';
        });
    });

    document.querySelector('.review-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const name = this.querySelector('#name').value.trim();
        const reviewText = this.querySelector('#review').value.trim();
        const ratingInput = this.querySelector('input[name="rating"]:checked');
        const rating = ratingInput ? ratingInput.value : '';

        // Basic validation
        if (!name || !reviewText || !rating) {
            alert('Please fill out all fields and select a rating.');
            return;
        }

        // Create a new .review element
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');
        reviewDiv.innerHTML = `
            <div class="review-header">
            <span class="user">${name}</span>
            <span class="rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</span>
            </div>
            <p class="comment">"${reviewText}"</p>
            `;

        // Insert the new review before the form
        const contentDiv = this.closest('.content');
        contentDiv.insertBefore(reviewDiv, this);

        // Reset the form
        this.reset();
    });


    // Quantity control logic
    const quantitySelector = document.querySelector('.quantity-selector');
    if (quantitySelector) {
        const quantityInput = quantitySelector.querySelector('input[type="number"]');
        const [decreaseBtn, increaseBtn] = quantitySelector.querySelectorAll('button.qty-btn');

        decreaseBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > parseInt(quantityInput.min)) {
                quantityInput.value = currentValue - 1;
            }
        });

        increaseBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
    }
});

const container = document.querySelector('.feature-image');
const image = container.querySelector('.featured_image');

container.addEventListener('mouseenter', () => {
    image.style.transform = 'scale(2)'; // zoom level
});

container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    image.style.transformOrigin = `${x}% ${y}%`;
});

container.addEventListener('mouseleave', () => {
    image.style.transform = 'scale(1)';
    image.style.transformOrigin = 'center center';
});
