// Custom Cursor Logic
const cursor = document.getElementById("cursor");
const cursorBlur = document.getElementById("cursor-blur");
const hoverTargets = document.querySelectorAll(".hover-target");

document.addEventListener("mousemove", (e) => {
    // Update main cursor dot instantly
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    
    // Update blur with a slight delay for smooth trailing effect
    setTimeout(() => {
        cursorBlur.style.left = e.clientX + "px";
        cursorBlur.style.top = e.clientY + "px";
    }, 100);
});

// Add hover effect to interactive elements
hoverTargets.forEach(target => {
    target.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-hover");
    });
    
    target.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover");
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal animations on scroll
const productCards = document.querySelectorAll('.product-card');

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

productCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
    observer.observe(card);
});
