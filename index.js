fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((res) => {
    const products = res.products;
    const container = document.getElementById("box");

    products.forEach(product => {
      container.innerHTML += `
        <div class="product-box" onclick="viewProductDetails(${product.id})">
          <img src="${product.images[0]}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p><strong>Brand:</strong> ${product.brand}</p>
          <p><strong>Category:</strong> ${product.category}</p>
          <p><strong>Price:</strong> $${product.price}</p>
        </div>
      `;

      // Store each product in localStorage
      localStorage.setItem(`product-${product.id}`, JSON.stringify(product));
    });
  })
  .catch(err => {
    console.error("Error fetching products:", err);
  });

function viewProductDetails(productId) {
  window.location.href = `details.html?id=${productId}`;
}
