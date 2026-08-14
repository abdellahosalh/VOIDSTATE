// ----- Custom Cursor Logic -----
const cursor = document.getElementById("cursor");
const cursorBlur = document.getElementById("cursor-blur");
const hoverTargets = document.querySelectorAll(".hover-target");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    setTimeout(() => {
        cursorBlur.style.left = e.clientX + "px";
        cursorBlur.style.top = e.clientY + "px";
    }, 80);
});

hoverTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-hover");
    });
    target.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover");
    });
});

// ----- Smooth Scroll for Anchor Links -----
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// ----- Scroll Reveal Animations for Products -----
const productCards = document.querySelectorAll(".product-card");
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

productCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
    observer.observe(card);
});

// ----- ADD TO CART FUNCTIONALITY -----
let cartCount = 0;
const cartSpan = document.getElementById("cart-count");

document.querySelectorAll(".add-to-cart").forEach((overlay) => {
    overlay.addEventListener("click", function (e) {
        e.stopPropagation();

        // Increment count
        cartCount++;
        cartSpan.textContent = `CART (${cartCount})`;

        // Bump animation on the cart text
        cartSpan.classList.add("bump");
        setTimeout(() => {
            cartSpan.classList.remove("bump");
        }, 200);

        // Get product details (for console log / future backend)
        const card = this.closest(".product-card");
        const productName = card.dataset.product || "Item";
        const price = card.dataset.price || "0";
        console.log(`🛒 Added: ${productName} - $${price} | Total items: ${cartCount}`);
    });
});

// ----- Bonus: Glitch effect refresh (optional) -----
console.log("VOID STATE — Embrace the Emptiness.");
