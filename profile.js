const bioText = "I’m Fathyra, a university student with a strong interest in literature. This portfolio showcases my academic work, projects, and learning journey. I created this website as a platform to document my progress and share my work.";
let i = 0;
let hasStartedTyping = false;

// --- 1. TYPEWRITER EFFECT FOR PARAGRAPH ---
function typeWriterEffect() {
    const container = document.getElementById("typewriter-p");
    if (i < bioText.length) {
        container.innerHTML = bioText.substring(0, i + 1) + '<span class="typing-cursor"></span>';
        i++;
        setTimeout(typeWriterEffect, 15); // Fast speed
    } else {
        container.innerHTML = bioText; // Remove cursor at end
    }
}

// --- 2. COUNTER ANIMATION FUNCTION ---
function startCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1500; // 1.5 seconds to complete
    const increment = target / (duration / 16); 
    let current = 0;

    const updateCount = () => {
        current += increment;
        if (current < target) {
            el.innerText = Math.ceil(current);
            requestAnimationFrame(updateCount);
        } else {
            el.innerText = target;
        }
    };
    updateCount();
}

// --- 3. INTERSECTION OBSERVER ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger Heading Typewriter
            if (entry.target.classList.contains('typewriter')) {
                entry.target.classList.add('active');
                setTimeout(() => {
                    entry.target.style.borderRight = "none";
                }, 1500);
            }
            
            // Trigger Paragraph Typewriter
            if (entry.target.id === "typewriter-p" && !hasStartedTyping) {
                hasStartedTyping = true;
                typeWriterEffect();
            }

            // Trigger Number Counters
            if (entry.target.classList.contains('counter')) {
                startCounter(entry.target);
                observer.unobserve(entry.target); // Runs only once
            }
        }
    });
}, { threshold: 0.3 });

// Start watching elements
document.querySelectorAll('.typewriter').forEach(el => observer.observe(el));
document.querySelectorAll('.counter').forEach(el => observer.observe(el));
const pElement = document.getElementById('typewriter-p');
if (pElement) observer.observe(pElement);