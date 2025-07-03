import React, { useState, useEffect } from "react";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const stored = localStorage.getItem(`product-${productId}`);
    if (stored) {
      setProduct(JSON.parse(stored));
    }
  }, []);

  if (!product) {
    return (
      <div style={{ margin: 30, fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ textAlign: "center" }}>Product Details</h2>
        <div className="details-container">
          <p>Product not found in local storage.</p>
        </div>
      </div>
    );
  }

  const images =
    product.images?.length >= 1
      ? product.images.slice(0, 4)
      : Array(4).fill(product.thumbnail);

  const showSlide = (idx) => {
    setCurrentSlide(idx);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  return (
    <div style={{ margin: 30, fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Product Details</h2>
      <div
        className="details-container"
        style={{
          maxWidth: 800,
          margin: "auto",
          border: "1px solid #ddd",
          padding: 20,
          borderRadius: 10,
          backgroundColor: "#fefefe",
        }}
      >
        <div
          className="slider"
          style={{
            position: "relative",
            width: "100%",
            height: 300,
            marginBottom: 20,
            overflow: "hidden",
            borderRadius: 6,
          }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`slide-${i}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: i === currentSlide ? "block" : "none",
              }}
            />
          ))}
          <button
            className="slider-btn left"
            style={{
              position: "absolute",
              top: "50%",
              left: 10,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              border: "none",
              padding: 10,
              cursor: "pointer",
            }}
            onClick={prevSlide}
            aria-label="Previous Slide"
          >
            &#10094;
          </button>
          <button
            className="slider-btn right"
            style={{
              position: "absolute",
              top: "50%",
              right: 10,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              border: "none",
              padding: 10,
              cursor: "pointer",
            }}
            onClick={nextSlide}
            aria-label="Next Slide"
          >
            &#10095;
          </button>
        </div>
        <h2>{product.title}</h2>
        <p>
          <strong>ID:</strong> {product.id}
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Brand:</strong> {product.brand}
        </p>
        <p>
          <strong>SKU:</strong> {product.sku || "N/A"}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>Discount:</strong> {product.discountPercentage}%
        </p>
        <p>
          <strong>Rating:</strong> {product.rating}
        </p>
        <p>
          <strong>Stock:</strong> {product.stock}
        </p>
        <p>
          <strong>Weight:</strong> {product.weight || "N/A"}g
        </p>
        <p>
          <strong>Dimensions:</strong>{" "}
          {product.dimensions?.width || "?"} x {product.dimensions?.height || "?"} x{" "}
          {product.dimensions?.depth || "?"} cm
        </p>
        <p>
          <strong>Warranty:</strong> {product.warrantyInformation || "N/A"}
        </p>
        <p>
          <strong>Shipping Info:</strong> {product.shippingInformation || "N/A"}
        </p>
        <p>
          <strong>Availability:</strong> {product.availabilityStatus || "N/A"}
        </p>
        <p>
          <strong>Return Policy:</strong> {product.returnPolicy || "N/A"}
        </p>
        <p>
          <strong>Minimum Order Quantity:</strong> {product.minimumOrderQuantity || "N/A"}
        </p>
        <p>
          <strong>Tags:</strong> {product.tags?.join(", ") || "None"}
        </p>
        <p>
          <strong>QR Code:</strong>
          <br />
          <img
            src={product.meta?.qrCode || "#"}
            alt="QR Code"
            width={150}
          />
        </p>
        <h3>Reviews:</h3>
        {(product.reviews || []).map((review, idx) => (
          <div
            className="review"
            key={idx}
            style={{
              marginTop: 10,
              borderTop: "1px solid #ccc",
              paddingTop: 10,
            }}
          >
            <p>
              <strong>{review.reviewerName}</strong> ({review.reviewerEmail})
            </p>
            <p>
              <strong>Rating:</strong> {review.rating}
            </p>
            <p>
              <em>{review.comment}</em>
            </p>
            <p>
              <small>{new Date(review.date).toLocaleDateString()}</small>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
