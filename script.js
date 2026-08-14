// ----- CUSTOM CURSOR -----
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
    target.addEventListener("mouseenter", () => cursor.classList.add("cursor-hover"));
    target.addEventListener("mouseleave", () => cursor.classList.remove("cursor-hover"));
});

// ----- SMOOTH SCROLL -----
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

// ----- SCROLL REVEAL (Products) -----
const productCards = document.querySelectorAll(".product-card");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.15, rootMargin: "0px 0px -30px 0px" });

productCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
    observer.observe(card);
});

// ============================================================
// 1. CART FUNCTIONALITY (with sidebar & product listing)
// ============================================================
let cartItems = [];
const cartSpan = document.getElementById("cart-count");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsList = document.getElementById("cart-items-list");
const cartTotalPrice = document.getElementById("cart-total-price");

// Toggle cart sidebar
document.getElementById("cart-toggle").addEventListener("click", (e) => {
    e.stopPropagation();
    openCart();
});
document.getElementById("cart-close").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

function openCart() {
    cartSidebar.classList.add("open");
    cartOverlay.classList.add("active");
    renderCart();
}

function closeCart() {
    cartSidebar.classList.remove("open");
    cartOverlay.classList.remove("active");
}

// Add to Cart
document.querySelectorAll(".add-to-cart").forEach((overlay) => {
    overlay.addEventListener("click", function (e) {
        e.stopPropagation();
        const card = this.closest(".product-card");
        const name = card.dataset.product;
        const price = parseFloat(card.dataset.price);
        const id = card.dataset.id;

        // Check if item already in cart
        const existing = cartItems.find(item => item.id === id);
        if (existing) {
            existing.qty += 1;
        } else {
            cartItems.push({ id, name, price, qty: 1 });
        }

        updateCartUI();
        renderCart(); // update sidebar if open

        // Bump animation
        cartSpan.classList.add("bump");
        setTimeout(() => cartSpan.classList.remove("bump"), 200);

        console.log(`🛒 Added: ${name} | Total items: ${cartItems.reduce((sum, i) => sum + i.qty, 0)}`);
    });
});

function updateCartUI() {
    const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
    cartSpan.textContent = `CART (${totalQty})`;
}

function renderCart() {
    if (cartItems.length === 0) {
        cartItemsList.innerHTML = `<p class="empty-cart-msg">Your void is empty.<br>Add something bold.</p>`;
        cartTotalPrice.textContent = `$0.00`;
        return;
    }

    let html = '';
    let total = 0;
    cartItems.forEach((item) => {
        total += item.price * item.qty;
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Qty: ${item.qty}</p>
                </div>
                <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
            </div>
        `;
    });
    cartItemsList.innerHTML = html;
    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
}

// ============================================================
// 2. AI STYLE CONCIERGE (Chatbot logic)
// ============================================================
const chatBtn = document.getElementById("ai-chat-btn");
const chatWindow = document.getElementById("ai-chat-window");
const chatClose = document.getElementById("chat-close");
const chatMessages = document.getElementById("chat-messages");
const chatOptions = document.getElementById("chat-options");

let chatState = 0; // 0: start, 1: asked fit, 2: asked vibe, 3: result
let selectedProduct = null;

// Toggle chat
chatBtn.addEventListener("click", () => {
    chatWindow.classList.toggle("open");
    if (chatWindow.classList.contains("open")) {
        chatOptions.innerHTML = '';
        if (chatState === 0) showInitialOptions();
    }
});
chatClose.addEventListener("click", () => chatWindow.classList.remove("open"));

function addBotMessage(text, isHtml = false) {
    const div = document.createElement("div");
    div.className = "chat-msg bot";
    if (isHtml) div.innerHTML = text;
    else div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addUserMessage(text) {
    const div = document.createElement("div");
    div.className = "chat-msg user";
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function clearOptions() {
    chatOptions.innerHTML = '';
}

function addOptions(optionsArray) {
    clearOptions();
    optionsArray.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = `chat-option-btn ${opt.class || ''}`;
        btn.textContent = opt.label;
        btn.onclick = () => opt.action();
        chatOptions.appendChild(btn);
    });
}

// ----- Chat Flow -----
function showInitialOptions() {
    chatState = 0;
    clearOptions();
    // Reset messages (keep only the first bot message)
    chatMessages.innerHTML = `
        <div class="chat-msg bot">
            <p>🖤 Welcome to <strong>VOID STATE</strong>.<br>I'm your AI Style Concierge. Let's find your perfect piece.</p>
        </div>
    `;
    addOptions([
        { label: "👕 I want a Tee", action: () => askFit("tee") },
        { label: "🧥 I want a Hoodie", action: () => askFit("hoodie") },
        { label: "🤔 Surprise me", action: () => askFit("surprise") }
    ]);
}

function askFit(preference) {
    if (preference === "surprise") {
        // Randomly pick
        const picks = ["tee", "hoodie"];
        preference = picks[Math.floor(Math.random() * picks.length)];
    }
    selectedProduct = preference;
    addUserMessage(preference === "tee" ? "I want a Tee" : "I want a Hoodie");
    chatState = 1;
    addBotMessage("Perfect. How do you want it to fit?");
    addOptions([
        { label: "📐 Oversized & Relaxed", action: () => askVibe("oversized") },
        { label: "📏 True to size / Sharp", action: () => askVibe("fitted") }
    ]);
}

function askVibe(fit) {
    addUserMessage(fit === "oversized" ? "Oversized & Relaxed" : "True to size / Sharp");
    chatState = 2;
    addBotMessage("Got it. What's your vibe today?");
    addOptions([
        { label: "🔥 Bold & Statement", action: () => showResult("bold") },
        { label: "🌫️ Minimal & Quiet", action: () => showResult("minimal") }
    ]);
}

function showResult(vibe) {
    addUserMessage(vibe === "bold" ? "Bold & Statement" : "Minimal & Quiet");
    chatState = 3;

    let productName = "";
    let productPrice = "";
    let productId = "";
    let desc = "";

    if (selectedProduct === "tee") {
        productName = "Signature Oversized Tee";
        productPrice = "45.00";
        productId = "tee";
        desc = "Effortless, breathable, and loud in its silence.";
    } else {
        productName = "Concrete Heavyweight Hoodie";
        productPrice = "85.00";
        productId = "hoodie";
        desc = "Built to last. A fortress of comfort and edge.";
    }

    addBotMessage(`
        <strong>${productName}</strong><br>
        <span style="color:#ff0033; font-weight:bold;">$${productPrice}</span><br>
        ${desc}<br><br>
        <em>Shall I add this to your cart?</em>
    `, true);

    addOptions([
        { label: "✅ Add to Cart", class: "chat-add-btn", action: () => {
            // Add to cart programmatically
            const existing = cartItems.find(item => item.id === productId);
            if (existing) existing.qty += 1;
            else cartItems.push({ id: productId, name: productName, price: parseFloat(productPrice), qty: 1 });
            updateCartUI();
            renderCart();
            addUserMessage("Added to cart! 🖤");
            addBotMessage("Done. Check your cart at the top right to proceed.");
            clearOptions();
            setTimeout(() => {
                addOptions([
                    { label: "🔄 Start over", action: () => {
                        chatMessages.innerHTML = '';
                        chatState = 0;
                        showInitialOptions();
                    }},
                    { label: "❌ Close chat", action: () => chatWindow.classList.remove("open") }
                ]);
            }, 800);
        }},
        { label: "🔄 Try something else", action: () => {
            addUserMessage("Try something else");
            chatMessages.innerHTML = '';
            chatState = 0;
            showInitialOptions();
        }}
    ]);
}

// Start the chat with the initial message if it's the first time
setTimeout(() => {
    if (chatWindow.classList.contains("open")) {
        showInitialOptions();
    }
}, 100);

console.log("🖤 VOID STATE — Style Concierge is ready.");
