document.addEventListener('DOMContentLoaded', () => {

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger a bit later for book effect if desired
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after animation if you don't want it repeating
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove class to repeat animation on scroll up
                // entry.target.classList.remove('visible');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    // *** IMPORTANT: Update querySelectorAll to target the new animation class ***
    const elementsToAnimate = document.querySelectorAll('.animate-fade-in, .animate-book-open'); // Include both if fade-in is still used elsewhere
    elementsToAnimate.forEach(el => observer.observe(el));


    // --- Footer Year ---
    const yearElement = document.getElementById('year');
    if(yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // --- Particles.js Config (Enhanced Version) ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80, // Increased particle count
                    "density": { "enable": true, "value_area": 800 }
                 },
                "color": { "value": "#ffffff" }, // White particles
                "shape": { "type": "circle" },
                "opacity": {
                    "value": 0.4, // Slightly more visible
                     "random": true,
                     "anim": { "enable": true, "speed": 0.8, "opacity_min": 0.1, "sync": false } // Slightly faster fade
                     },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 130, // Slightly shorter lines
                    "color": "#ffffff", // White lines
                    "opacity": 0.2, // Slightly more visible lines
                    "width": 1
                 },
                "move": {
                    "enable": true,
                    "speed": 1.5, // Slightly faster movement
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": true // Make particles bounce off edges
                 }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                         "mode": "grab" // Grab on hover
                         },
                    "onclick": {
                        "enable": true, // Enable click interaction
                         "mode": "push" // Push particles on click
                         },
                    "resize": true
                    },
                "modes": {
                    "grab": {
                         "distance": 150, // Increase grab distance
                         "line_linked": { "opacity": 0.4 } // Make grab line thicker
                         },
                    "bubble": { "distance": 200, "size": 8, "duration": 2, "opacity": 0.8 },
                    "repulse": { "distance": 100, "duration": 0.4 },
                    "push": { "particles_nb": 4 } // Number of particles to push on click
                }
            },
            "retina_detect": true
        });
    } else {
        console.error("particles.js library not loaded. Make sure the script tag is present in HTML before script.js.");
    }


    // --- Basic Contact Form Handling (Placeholder - Remains the same) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            console.log("Form submitted data (replace this with actual sending):", new FormData(contactForm));
            setTimeout(() => {
                 alert('Form submission simulated. Check console. Implement actual sending logic.');
                 submitButton.textContent = 'Sent!';
                 contactForm.reset();
                 setTimeout(() => {
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                 }, 3000);
            }, 1500);
        });
    }


    // --- Hero Sub-Navigation Active State on Click (Remains the same) ---
    const subNavLinks = document.querySelectorAll('.hero-sub-nav a');
    subNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            subNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });


    // --- Active Sub-Nav Link Highlighting on Scroll (Remains the same) ---
    const sections = document.querySelectorAll('main section[id]');
    function changeNavOnScroll() {
        let scrollY = window.pageYOffset;
        let currentSectionId = null;
        const activationOffset = 150;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - activationOffset;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = current.getAttribute('id');
            }
        });

         let foundActive = false;
         subNavLinks.forEach(link => {
             link.classList.remove('active');
             if (link.getAttribute('href') === `#${currentSectionId}`) {
                 link.classList.add('active');
                 foundActive = true;
             }
         });

         if (!foundActive && (window.innerHeight + scrollY) >= document.body.offsetHeight - 50) {
             const contactLink = document.querySelector('.hero-sub-nav a[href="#contact"]');
             if (contactLink) contactLink.classList.add('active');
         }
         else if (!foundActive && scrollY < sections[0].offsetTop - activationOffset) {
             const homeLink = document.querySelector('.hero-sub-nav a[href="#hero"]');
             if (homeLink) homeLink.classList.add('active');
         }
    }
    let scrollTimeout;
    window.addEventListener('scroll', () => {
         if (scrollTimeout) { clearTimeout(scrollTimeout); }
         scrollTimeout = setTimeout(changeNavOnScroll, 50);
    }, { passive: true });
     changeNavOnScroll();


    // --- Interactive Project List Logic (Remains the same) ---
    const projectListItems = document.querySelectorAll('.project-list-item');
    const projectDisplayContents = document.querySelectorAll('.project-display-content');
    const projectDisplayContainer = document.querySelector('.project-display');

    function switchProject(targetProjectId) {
        const targetContent = document.getElementById(`project-${targetProjectId}`);
        projectDisplayContents.forEach(div => {
            div.classList.remove('active');
            if (window.innerWidth > 768) {
                 div.style.display = 'none';
            }
        });
        if (targetContent) {
             if (window.innerWidth > 768) {
                 targetContent.style.display = 'flex';
             }
            targetContent.classList.add('active');
             if (projectDisplayContainer) projectDisplayContainer.scrollTop = 0;
        }
    }

    projectListItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetProjectId = item.dataset.project;
            projectListItems.forEach(li => li.classList.remove('active'));
            item.classList.add('active');
            switchProject(targetProjectId);
        });
    });

     function initializeActiveProject() {
         const activeListItem = document.querySelector('.project-list-item.active');
         if (activeListItem) {
             const activeProjectId = activeListItem.dataset.project;
             switchProject(activeProjectId);
         } else if (projectListItems.length > 0) {
             projectListItems[0].classList.add('active');
             const firstProjectId = projectListItems[0].dataset.project;
             switchProject(firstProjectId);
         }
     }
     initializeActiveProject();
     window.addEventListener('resize', initializeActiveProject);

}); // End DOMContentLoaded