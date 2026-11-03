
/* =========================================
   PER TE, SOFIA
   MAIN APPLICATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const content = getSiteContent();


    /* =====================================
       RENDER PRESENTATION TEXTS
    ===================================== */

    function renderPresentationTexts() {

        const presentationTexts = [
            content.presentation.story,
            content.presentation.feelings,
            content.presentation.memories,
            content.presentation.special
        ];

        const targetSlides = [1, 2, 3, 4];

        targetSlides.forEach((slideIndex, index) => {

            const slide = document.querySelector(
                `[data-slide="${slideIndex}"] .slide-description`
            );

            if (slide) {
                slide.textContent = presentationTexts[index];
            }

        });

    }


    /* =====================================
       RENDER HOME
    ===================================== */

    function renderHome() {

        const description = document.querySelector(
            ".hero-description"
        );

        if (description) {
            description.textContent = content.home.introduction;
        }

    }


    /* =====================================
       RENDER STORY
    ===================================== */

    function renderStory() {

        const container = document.getElementById("storyCards");

        const introduction = document.querySelector(
            "#story .section-heading p"
        );

        if (!container || !introduction) return;

        introduction.textContent = content.story.introduction;

        container.innerHTML = "";

        content.story.moments.forEach(moment => {

            const card = document.createElement("article");

            card.className = "romantic-card story-card";

            card.innerHTML = `
                <div class="card-icon">♡</div>
                <span class="card-date"></span>
                <h3></h3>
                <p></p>
            `;

            card.querySelector(".card-date").textContent = moment.date;
            card.querySelector("h3").textContent = moment.title;
            card.querySelector("p").textContent = moment.description;

            container.appendChild(card);

        });

    }


    /* =====================================
       RENDER LETTER
    ===================================== */

    function renderLetter() {

        const greeting = document.querySelector(".letter-greeting");
        const letter = document.querySelector(".letter-text");
        const signature = document.querySelector(".letter-signature");

        if (greeting) greeting.textContent = content.letter.greeting;
        if (letter) letter.textContent = content.letter.content;
        if (signature) signature.textContent = content.letter.signature;

    }


    /* =====================================
       LOAD AUTOMATIC MEMORIES
    ===================================== */

    async function loadMemories() {

        try {

            const response = await fetch("./ricordi.json", {
                cache: "no-store"
            });

            if (!response.ok) {
                throw new Error("Impossibile caricare le fotografie");
            }

            const images = await response.json();

            renderMemories(images);

        } catch (error) {

            console.error("Errore nella galleria:", error);

            // Mantiene le fotografie eventualmente
            // presenti nel vecchio content.js.
            renderMemories(
                content.memories.photos.map(photo => ({
                    path: photo.image,
                    title: photo.title,
                    description: photo.description
                }))
            );

        }

    }


    /* =====================================
       RENDER MEMORIES
    ===================================== */

    function renderMemories(images) {

        const container = document.getElementById("memoryGallery");

        const introduction = document.querySelector(
            "#memories .section-heading p"
        );

        const note = document.querySelector(".gallery-note");

        if (!container) return;

        if (introduction) {
            introduction.textContent = content.memories.introduction;
        }

        if (note) {
            note.textContent = content.memories.note;
        }

        container.innerHTML = "";

        if (!images || images.length === 0) {

            const empty = document.createElement("div");

            empty.className = "empty-memories";
            empty.innerHTML = `
                <span>♡</span>
                <p>I nostri ricordi troveranno posto qui.</p>
            `;

            container.appendChild(empty);

            return;
        }

        images.forEach((item, index) => {

            // Supporta sia il nuovo formato automatico
            // sia il vecchio formato di content.js.
            const path = typeof item === "string"
                ? item
                : item.path || item.image;

            const title = typeof item === "string"
                ? ""
                : item.title || "";

            const description = typeof item === "string"
                ? ""
                : item.description || "";

            if (!path || !/\.(jpg|jpeg|png|webp|avif)$/i.test(path)) {
                return;
            }

            const card = document.createElement("article");
            card.className = "memory-card";

            const imageContainer = document.createElement("div");
            imageContainer.className = "memory-image-placeholder";

            const image = document.createElement("img");

            image.src = path;
            image.alt = title || `Un nostro ricordo ${index + 1}`;
            image.loading = "lazy";

            image.addEventListener("error", () => {
                card.remove();
            });

            imageContainer.appendChild(image);

            const caption = document.createElement("div");
            caption.className = "memory-caption";

            if (title) {
                const heading = document.createElement("h3");
                heading.textContent = title;
                caption.appendChild(heading);
            }

            if (description) {
                const paragraph = document.createElement("p");
                paragraph.textContent = description;
                caption.appendChild(paragraph);
            }

            card.appendChild(imageContainer);
            card.appendChild(caption);

            // Apertura fotografia ingrandita
            card.addEventListener("click", () => {
                openMemoryImage(path, title);
            });

            card.style.cursor = "pointer";

            container.appendChild(card);

        });

        // Attiva le animazioni anche sulle nuove fotografie
        initializeScrollAnimations();

    }


    /* =====================================
       IMAGE LIGHTBOX
    ===================================== */

    function openMemoryImage(path, title) {

        let lightbox = document.getElementById("memoryLightbox");

        if (!lightbox) {

            lightbox = document.createElement("div");

            lightbox.id = "memoryLightbox";
            lightbox.className = "memory-lightbox";

            lightbox.innerHTML = `
                <button class="lightbox-close" aria-label="Chiudi">×</button>
                <img src="" alt="">
                <p></p>
            `;

            document.body.appendChild(lightbox);

            lightbox.addEventListener("click", event => {

                if (
                    event.target === lightbox ||
                    event.target.classList.contains("lightbox-close")
                ) {
                    lightbox.classList.remove("active");
                }

            });

            document.addEventListener("keydown", event => {

                if (event.key === "Escape") {
                    lightbox.classList.remove("active");
                }

            });

        }

        const lightboxImage = lightbox.querySelector("img");
        const lightboxTitle = lightbox.querySelector("p");

        lightboxImage.src = path;
        lightboxImage.alt = title || "Un nostro ricordo";

        lightboxTitle.textContent = title || "";

        lightbox.classList.add("active");

    }


    /* =====================================
       RENDER SPECIAL SECTION
    ===================================== */

    function renderSpecial() {

        const message = document.querySelector(".special-content p");
        const signature = document.querySelector(".special-signature");

        if (message) {
            message.textContent = content.special.message;
        }

        if (signature) {
            signature.textContent = content.special.signature;
        }

    }


    /* =====================================
       MOBILE NAVIGATION
    ===================================== */

    function initializeNavigation() {

        const toggle = document.getElementById("menuToggle");
        const navigation = document.getElementById("navigation");

        const links = document.querySelectorAll(".nav-link");

        if (!toggle || !navigation) return;

        toggle.addEventListener("click", () => {
            navigation.classList.toggle("open");
        });

        links.forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("open");

                links.forEach(item => {
                    item.classList.remove("active");
                });

                link.classList.add("active");

            });

        });

    }


    /* =====================================
       ACTIVE NAVIGATION ON SCROLL
    ===================================== */

    function initializeScrollNavigation() {

        const sections = document.querySelectorAll(".website-section");
        const links = document.querySelectorAll(".nav-link");

        if (!("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                links.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${entry.target.id}`
                    );

                });

            });

        }, {
            threshold: 0.35
        });

        sections.forEach(section => observer.observe(section));

    }


    /* =====================================
       SCROLL REVEAL ANIMATIONS
    ===================================== */

    function initializeScrollAnimations() {

        const elements = document.querySelectorAll(
            ".romantic-card, .letter-card, .memory-card, .section-heading, .special-content"
        );

        if (!("IntersectionObserver" in window)) {
            elements.forEach(element => {
                element.classList.add("revealed");
            });
            return;
        }

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        elements.forEach(element => {

            if (element.classList.contains("revealed")) return;

            element.classList.add("reveal");
            observer.observe(element);

        });

    }


    /* =====================================
       AMBIENT PARTICLES
    ===================================== */

    function createParticles() {

        const container = document.getElementById("particles");

        if (!container) return;

        const particleCount = window.innerWidth < 650 ? 12 : 24;

        for (let i = 0; i < particleCount; i++) {

            const particle = document.createElement("span");

            particle.className = "ambient-particle";

            particle.style.left = Math.random() * 100 + "%";

            particle.style.animationDelay =
                Math.random() * 12 + "s";

            particle.style.animationDuration =
                9 + Math.random() * 12 + "s";

            particle.style.opacity =
                0.2 + Math.random() * 0.5;

            container.appendChild(particle);

        }

    }


    /* =====================================
       INITIALIZE EVERYTHING
    ===================================== */

    renderPresentationTexts();

    renderHome();

    renderStory();

    renderLetter();

    renderSpecial();

    initializeNavigation();

    initializeScrollNavigation();

    initializeScrollAnimations();

    createParticles();

    // Carica la galleria senza bloccare il resto del sito
    loadMemories();

});
