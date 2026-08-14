:root {
    --bg-color: #050505;
    --text-color: #f0f0f0;
    --accent-color: #ff0033;
    --gray: #2a2a2a;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    cursor: none;
}

html {
    scroll-behavior: smooth;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
}

h1, h2, h3, .logo, .footer-logo {
    font-family: 'Monument Extended', sans-serif;
    text-transform: uppercase;
}

/* ----- Custom Cursor ----- */
#cursor {
    height: 20px;
    width: 20px;
    background-color: var(--text-color);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s, background-color 0.3s;
    mix-blend-mode: difference;
}

#cursor-blur {
    height: 300px;
    width: 300px;
    background-color: rgba(255, 0, 51, 0.12);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    filter: blur(50px);
    transition: all 0.8s ease-out;
}

.cursor-hover {
    width: 50px !important;
    height: 50px !important;
    background-color: var(--accent-color) !important;
    mix-blend-mode: normal !important;
}

/* ----- Navigation ----- */
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.8rem 4rem;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 100;
    background: rgba(5, 5, 5, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.logo {
    display: flex;
    align-items: center;
}

.brand-link {
    display: flex;
    align-items: center;
    text-decoration: none;
}

/* YOUR CUSTOM PNG LOGO - Forced to pure white for the dark theme */
.brand-logo-img {
    height: 50px;  /* Adjust this size if you want it bigger/smaller */
    width: auto;
    display: block;
    filter: brightness(0) invert(1);
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
}

/* If your logo is ALREADY white, remove the "filter: brightness(0) invert(1);" line above */

.nav-links {
    display: flex;
    gap: 3rem;
}

.nav-links a {
    color: var(--text-color);
    text-decoration: none;
    font-size: 0.8rem;
    letter-spacing: 3px;
    font-weight: 400;
    position: relative;
    transition: color 0.3s;
}

.nav-links a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1.5px;
    bottom: -5px;
    left: 0;
    background-color: var(--accent-color);
    transition: width 0.3s ease;
}

.nav-links a:hover::after {
    width: 100%;
}

.nav-links a:hover {
    color: var(--accent-color);
}

.cart span {
    font-size: 0.8rem;
    letter-spacing: 2px;
    font-weight: 600;
    transition: all 0.2s;
}

.cart span.bump {
    transform: scale(1.2);
    color: var(--accent-color);
}

/* ----- Hero Section ----- */
.hero {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    padding: 0 2rem;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(255, 0, 51, 0.06) 0%, transparent 70%);
    z-index: -1;
}

.hero-content h1 {
    font-size: clamp(4rem, 15vw, 9rem);
    font-weight: 900;
    letter-spacing: -3px;
    margin-bottom: 1.5rem;
    position: relative;
    line-height: 1;
}

/* Glitch Effect */
.glitch {
    position: relative;
    color: white;
}

.glitch::before,
.glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-color);
    overflow: hidden;
}

.glitch::before {
    left: 2px;
    text-shadow: -2px 0 var(--accent-color);
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 5s infinite linear alternate-reverse;
}

.glitch::after {
    left: -2px;
    text-shadow: -2px 0 #00aaff;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim2 5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
    0% {
        clip: rect(13px, 9999px, 83px, 0);
    }
    20% {
        clip: rect(32px, 9999px, 14px, 0);
    }
    40% {
        clip: rect(78px, 9999px, 55px, 0);
    }
    60% {
        clip: rect(45px, 9999px, 23px, 0);
    }
    80% {
        clip: rect(90px, 9999px, 67px, 0);
    }
    100% {
        clip: rect(12px, 9999px, 88px, 0);
    }
}

@keyframes glitch-anim2 {
    0% {
        clip: rect(65px, 9999px, 100px, 0);
    }
    20% {
        clip: rect(12px, 9999px, 55px, 0);
    }
    40% {
        clip: rect(89px, 9999px, 23px, 0);
    }
    60% {
        clip: rect(34px, 9999px, 78px, 0);
    }
    80% {
        clip: rect(56px, 9999px, 12px, 0);
    }
    100% {
        clip: rect(99px, 9999px, 45px, 0);
    }
}

.hero-content p {
    font-size: clamp(0.8rem, 1.5vw, 1.2rem);
    letter-spacing: 5px;
    color: #888;
    margin-bottom: 3rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
}

.cta-button {
    display: inline-block;
    padding: 1.2rem 3.5rem;
    border: 1px solid var(--text-color);
    color: var(--text-color);
    text-decoration: none;
    font-family: 'Monument Extended', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 3px;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    position: relative;
    overflow: hidden;
    z-index: 1;
}

.cta-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--text-color);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    z-index: -1;
}

.cta-button:hover {
    color: var(--bg-color);
    border-color: var(--text-color);
}

.cta-button:hover::before {
    transform: scaleX(1);
    transform-origin: left;
}

/* ----- Products Section ----- */
.products {
    padding: 8rem 4rem 4rem;
    max-width: 1400px;
    margin: 0 auto;
}

.section-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: 4rem;
    border-bottom: 1px solid var(--gray);
    padding-bottom: 1.5rem;
    letter-spacing: 1px;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 4rem;
}

.product-card {
    position: relative;
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.product-card:hover {
    transform: translateY(-12px);
}

.image-wrapper {
    position: relative;
    overflow: hidden;
    aspect-ratio: 3 / 4;
    background-color: #111;
    border-radius: 4px;
}

.image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
    filter: grayscale(30%);
}

.product-card:hover .image-wrapper img {
    transform: scale(1.06);
    filter: grayscale(0%);
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
    backdrop-filter: blur(2px);
}

.product-card:hover .overlay {
    opacity: 1;
}

.overlay span {
    font-family: 'Monument Extended', sans-serif;
    padding: 1rem 2.5rem;
    background: var(--text-color);
    color: var(--bg-color);
    letter-spacing: 2px;
    font-size: 0.8rem;
    font-weight: 800;
    transition: transform 0.3s ease;
}

.overlay:hover span {
    transform: scale(1.05);
    background: var(--accent-color);
    color: white;
}

.product-info {
    margin-top: 1.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product-info h3 {
    font-size: 1rem;
    letter-spacing: 1.5px;
    font-weight: 700;
}

.product-info p {
    font-size: 1.2rem;
    color: var(--accent-color);
    font-weight: 700;
}

/* ----- Dummy Sections (for nav links) ----- */
.dummy-section {
    padding: 6rem 4rem;
    text-align: center;
    border-top: 1px solid var(--gray);
    max-width: 1400px;
    margin: 0 auto;
}

.dummy-section h2 {
    font-family: 'Monument Extended', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 1.5rem;
    letter-spacing: 2px;
}

.dummy-section p {
    color: #888;
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.8;
}

/* ----- Footer ----- */
footer {
    padding: 4rem 2rem;
    border-top: 1px solid var(--gray);
    text-align: center;
    margin-top: 4rem;
}

.footer-logo {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #444;
    letter-spacing: 4px;
}

footer p {
    font-size: 0.75rem;
    color: #555;
    letter-spacing: 3px;
}

/* ----- Responsive Design ----- */
@media (max-width: 768px) {
    nav {
        padding: 1.2rem 1.5rem;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .nav-links {
        gap: 1.5rem;
        order: 3;
        width: 100%;
        justify-content: center;
    }

    .nav-links a {
        font-size: 0.7rem;
        letter-spacing: 1.5px;
    }

    .brand-logo-img {
        height: 40px;
    }

    .products {
        padding: 6rem 1.5rem 2rem;
    }

    .product-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
    }

    .hero-content h1 {
        font-size: clamp(3rem, 15vw, 5rem);
    }

    .dummy-section {
        padding: 4rem 1.5rem;
    }
}

@media (max-width: 480px) {
    .brand-logo-img {
        height: 32px;
    }

    .cta-button {
        padding: 0.8rem 2rem;
        font-size: 0.7rem;
    }

    .product-info h3 {
        font-size: 0.85rem;
    }
}
