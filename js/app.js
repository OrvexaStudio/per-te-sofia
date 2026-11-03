
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

        const targetSlides = [
            1, 2, 3, 4
        ];

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

        introduction.textContent =
            content.story.introduction;

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

            card.querySelector(".card-date").textContent =
                moment.date;

            card.querySelector("h3").textContent =
                moment.title;

            card.querySelector("p").textContent =
                moment.description;

            container.appendChild(card);

        });

    }


    /* =====================================
       RENDER LETTER
    ===================================== */

    function renderLetter() {

        const greeting = document.querySelector(
            ".letter-greeting"
        );

        const letter = document.querySelector(
            ".letter-text"
        );

        const signature = document.querySelector(
            ".letter-signature"
        );

        greeting.textContent =
            content.letter.greeting;

        letter.textContent =
            content.letter.content;

        signature.textContent =
            content.letter.signature;

    }


    /* =====================================
       RENDER MEMORIES
    ===================================== */

    function renderMemories() {

        const container = document.getElementById(
            "memoryGallery"
        );

        const introduction = document.querySelector(
            "#memories .section-heading p"
        );

        const note = document.querySelector(
            ".gallery-note"
        );

        introduction.textContent =
            content.memories.introduction;

        note.textContent =
            content.memories.note;

        container.innerHTML = "";

        content.memories.photos.forEach(photo => {

            if (!isValidImagePath(photo.image)) {
                return;
            }

            const card = document.createElement("article");

            card.className = "memory-card";

            const image = document.createElement("img");

            image.src = photo.image;

            image.alt = photo.title || "Un nostro ricordo";

            image.loading = "lazy";

            const imageContainer = document.createElement("div");

            imageContainer.className =
                "memory-image-placeholder";

            imageContainer.appendChild(image);

            const caption = document.createElement("div");

            caption.className = "memory-caption";

            const title = document.createElement("h3");

            title.textContent = photo.title || "";

            const description = document.createElement("p");

            description.textContent =
                photo.description || "";

            caption.appendChild(title);
            caption.appendChild(description);

            card.appendChild(imageContainer);
            card.appendChild(caption);

            container.appendChild(card);

        });

        if (content.memories.photos.length === 0) {

            const empty = document.createElement("div");

            empty.className = "empty-memories";

            empty.innerHTML = `
                <span>♡</span>
                <p>I nostri ricordi troveranno posto qui.</p>
            `;

            container.appendChild(empty);

        }

    }


    /* =====================================
       RENDER SPECIAL SECTION
    ===================================== */

    function renderSpecial() {

        const message = document.querySelector(
            ".special-content p"
        );

        const signature = document.querySelector(
            ".special-signature"
        );

        message.textContent =
            content.special.message;

        signature.textContent =
            content.special.signature;

    }


    /* =====================================
       MOBILE NAVIGATION
    ===================================== */

    function initializeNavigation() {

        const toggle = document.getElementById(
            "menuToggle"
        );

        const navigation = document.getElementById(
            "navigation"
        );

        const links = document.querySelectorAll(
            ".nav-link"
        );

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

        const sections = document.querySelectorAll(
            ".website-section"
        );

        const links = document.querySelectorAll(
            ".nav-link"
        );

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                links.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") ===
                        `#${entry.target.id}`
                    );

                });

            });

        }, {
            threshold: 0.35
        });

        sections.forEach(section => {
            observer.observe(section);
        });

    }


    /* =====================================
       SCROLL REVEAL ANIMATIONS
    ===================================== */

    function initializeScrollAnimations() {

        const elements = document.querySelectorAll(
            ".romantic-card, .letter-card, .memory-card, .section-heading, .special-content"
        );

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

            element.classList.add("reveal");

            observer.observe(element);

        });

    }


    /* =====================================
       AMBIENT PARTICLES
    ===================================== */

    function createParticles() {

        const container = document.getElementById("particles");

        if (!container) {
            return;
        }

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

    renderMemories();

    renderSpecial();

    initializeNavigation();

    initializeScrollNavigation();

    initializeScrollAnimations();

    createParticles();

});
