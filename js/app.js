
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
       MILESTONES - DATE MANAGEMENT
    ===================================== */

    function getLocalDateString() {

        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;

    }


    function isMilestoneCompleted(moment, today) {

        // I traguardi senza data possono essere
        // già raggiunti, come il primo "ti amo".
        if (!moment.date) {
            return moment.type === "completed";
        }

        // Le date future rimangono in attesa.
        // Quelle odierne o passate risultano raggiunte.
        return moment.date <= today;

    }


    /* =====================================
       MILESTONES - RENDER
    ===================================== */

    function renderMilestones() {

        const container = document.getElementById(
            "milestoneTimeline"
        );

        const introduction = document.getElementById(
            "milestoneIntroduction"
        );

        if (!container || !content.milestones) return;

        const milestones = content.milestones.moments || [];

        if (introduction) {
            introduction.textContent =
                content.milestones.introduction || "";
        }

        container.innerHTML = "";

        if (milestones.length === 0) return;

        const today = getLocalDateString();

        const completedStates = milestones.map(moment =>
            isMilestoneCompleted(moment, today)
        );

        const lastCompletedIndex = completedStates.lastIndexOf(true);

        const progress = milestones.length > 1
            ? Math.max(
                0,
                lastCompletedIndex / (milestones.length - 1)
            ) * 100
            : completedStates[0] ? 100 : 0;

        container.style.setProperty(
            "--timeline-progress",
            `${progress}%`
        );

        milestones.forEach((moment, index) => {

            const completed = completedStates[index];

            const item = document.createElement("article");

            item.className = [
                "milestone-item",
                completed ? "completed" : "upcoming"
            ].join(" ");

            item.dataset.milestoneIndex = index;

            const marker = document.createElement("div");
            marker.className = "milestone-marker";

            const card = document.createElement("div");
            card.className = "milestone-card";

            const date = document.createElement("span");
            date.className = "milestone-date";
            date.textContent = moment.dateLabel || "";

            const title = document.createElement("h3");
            title.className = "milestone-title";
            title.textContent = moment.title;

            const description = document.createElement("p");
            description.className = "milestone-description";
            description.textContent = moment.description || "";

            const status = document.createElement("span");
            status.className = "milestone-status";

            status.textContent = completed
                ? "Traguardo raggiunto"
                : "Ancora da vivere";

            card.appendChild(date);
            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(status);

            item.appendChild(marker);
            item.appendChild(card);

            container.appendChild(item);

        });

        initializeScrollAnimations();

    }


    /* =====================================
       AUTOMATIC MIDNIGHT UPDATE
    ===================================== */

    function scheduleMilestoneUpdate() {

        const now = new Date();

        const nextMidnight = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            0, 0, 1
        );

        const delay = nextMidnight.getTime() - now.getTime();

        window.setTimeout(() => {

            renderMilestones();

            scheduleMilestoneUpdate();

        }, delay);

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


/* =========================================
   RENDER MEMORIES AND MEDIA ALBUMS
========================================= */

function renderMemories() {

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

    const moments = content.memories.moments || [];
    const albums = content.memories.albums || [];

    // RICORDI TESTUALI

    moments.forEach(moment => {

        const card = document.createElement("article");

        card.className = "memory-card";

        const caption = document.createElement("div");
        caption.className = "memory-caption";

        const date = document.createElement("span");
        date.className = "memory-date";
        date.textContent = moment.date || "";

        const title = document.createElement("h3");
        title.textContent = moment.title || "";

        const description = document.createElement("p");
        description.textContent = moment.description || "";

        caption.appendChild(date);
        caption.appendChild(title);
        caption.appendChild(description);

        card.appendChild(caption);

        container.appendChild(card);

    });

    // ALBUM MULTIMEDIALI

    albums.forEach(album => {

        const card = document.createElement("article");

        card.className = "memory-album-card";
        card.dataset.albumId = album.id;

        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute(
            "aria-label",
            `Apri l'album: ${album.title}`
        );

        const cover = document.createElement("div");
        cover.className = "album-card-cover";

        const coverDecoration = document.createElement("span");
        coverDecoration.className = "album-cover-decoration";
        coverDecoration.textContent = "♡";

        const coverLabel = document.createElement("span");
        coverLabel.className = "album-cover-label";
        coverLabel.textContent = "UN RICORDO DA CONSERVARE";

        cover.appendChild(coverDecoration);
        cover.appendChild(coverLabel);

        const caption = document.createElement("div");
        caption.className = "album-card-caption";

        const title = document.createElement("h3");
        title.textContent = album.title || "";

        const description = document.createElement("p");
        description.textContent = album.description || "";

        const instruction = document.createElement("span");
        instruction.className = "album-card-instruction";
        instruction.textContent =
            album.instruction || "Clicca per vedere foto e video";

        caption.appendChild(title);
        caption.appendChild(description);
        caption.appendChild(instruction);

        card.appendChild(cover);
        card.appendChild(caption);

        card.addEventListener("click", () => {
            openMemoryAlbum(album);
        });

        card.addEventListener("keydown", event => {

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openMemoryAlbum(album);
            }

        });

        container.appendChild(card);

    });

    // MESSAGGIO SE NON CI SONO CONTENUTI

    if (moments.length === 0 && albums.length === 0) {

        const empty = document.createElement("div");

        empty.className = "empty-memories";
        empty.innerHTML = `
            <span>♡</span>
            <p>I nostri ricordi troveranno posto qui.</p>
        `;

        container.appendChild(empty);

    }

    initializeScrollAnimations();

}

   /* =========================================
   MEMORY ALBUM MODAL
========================================= */

let memoryAlbumModal = null;
let memoryImageViewer = null;
let previousAlbumFocus = null;


/* =========================================
   CREATE ALBUM MODAL
========================================= */

function createMemoryAlbumModal() {

    if (memoryAlbumModal) return;

    memoryAlbumModal = document.createElement("div");

    memoryAlbumModal.className = "album-modal";
    memoryAlbumModal.setAttribute("aria-hidden", "true");

    memoryAlbumModal.innerHTML = `
        <div class="album-modal-content">

            <button
                class="album-modal-close"
                type="button"
                aria-label="Chiudi album"
            >×</button>

            <div class="album-modal-heading">
                <span class="album-modal-eyebrow">
                    UN RICORDO DA CONSERVARE
                </span>

                <h2 class="album-modal-title"></h2>

                <p class="album-modal-description"></p>
            </div>

            <div class="album-media-gallery"></div>

            <p class="album-modal-empty">
                Le nostre foto e i nostri video appariranno qui.
            </p>

        </div>

        <div class="album-image-viewer" aria-hidden="true">

            <button
                class="album-image-close"
                type="button"
                aria-label="Chiudi fotografia"
            >×</button>

            <img src="" alt="">

            <p class="album-image-caption"></p>

        </div>
    `;

    document.body.appendChild(memoryAlbumModal);

    memoryImageViewer = memoryAlbumModal.querySelector(
        ".album-image-viewer"
    );

    const closeButton = memoryAlbumModal.querySelector(
        ".album-modal-close"
    );

    const imageCloseButton = memoryAlbumModal.querySelector(
        ".album-image-close"
    );

    closeButton.addEventListener("click", closeMemoryAlbum);

    imageCloseButton.addEventListener(
        "click",
        closeMemoryImage
    );

    memoryAlbumModal.addEventListener("click", event => {

        if (event.target === memoryAlbumModal) {
            closeMemoryAlbum();
        }

    });

    memoryImageViewer.addEventListener("click", event => {

        if (event.target === memoryImageViewer) {
            closeMemoryImage();
        }

    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (
                memoryImageViewer &&
                memoryImageViewer.classList.contains("active")
            ) {
                closeMemoryImage();
                return;
            }

            if (
                memoryAlbumModal &&
                memoryAlbumModal.classList.contains("active")
            ) {
                closeMemoryAlbum();
            }

        }

    });

}


/* =========================================
   OPEN ALBUM
========================================= */

function openMemoryAlbum(album) {

    createMemoryAlbumModal();

    previousAlbumFocus = document.activeElement;

    const title = memoryAlbumModal.querySelector(
        ".album-modal-title"
    );

    const description = memoryAlbumModal.querySelector(
        ".album-modal-description"
    );

    const gallery = memoryAlbumModal.querySelector(
        ".album-media-gallery"
    );

    const emptyMessage = memoryAlbumModal.querySelector(
        ".album-modal-empty"
    );

    title.textContent = album.title || "";
    description.textContent = album.description || "";

    gallery.innerHTML = "";

    const media = album.media || [];

    emptyMessage.style.display =
        media.length === 0 ? "block" : "none";

    media.forEach(item => {

        if (!item.src || !["image", "video"].includes(item.type)) {
            return;
        }

        const mediaCard = document.createElement("div");
        mediaCard.className = "album-media-item";

        if (item.type === "image") {

            const image = document.createElement("img");

            image.src = item.src;
            image.alt = item.alt || album.title || "Fotografia";
            image.loading = "lazy";

            image.addEventListener("click", () => {
                openMemoryImage(item);
            });

            mediaCard.appendChild(image);

        }

        if (item.type === "video") {

            const video = document.createElement("video");

            video.src = item.src;
            video.controls = true;
            video.playsInline = true;
            video.preload = "metadata";

            mediaCard.appendChild(video);

        }

        if (item.caption) {

            const caption = document.createElement("p");

            caption.className = "album-media-caption";
            caption.textContent = item.caption;

            mediaCard.appendChild(caption);

        }

        gallery.appendChild(mediaCard);

    });

    memoryAlbumModal.classList.add("active");
    memoryAlbumModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("album-modal-open");

    memoryAlbumModal.querySelector(
        ".album-modal-close"
    ).focus();

}


/* =========================================
   CLOSE ALBUM
========================================= */

function closeMemoryAlbum() {

    if (!memoryAlbumModal) return;

    closeMemoryImage();

    memoryAlbumModal.classList.remove("active");
    memoryAlbumModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("album-modal-open");

    // Ferma eventuali video in riproduzione.

    memoryAlbumModal.querySelectorAll("video").forEach(video => {
        video.pause();
        video.currentTime = 0;
    });

    if (
        previousAlbumFocus &&
        typeof previousAlbumFocus.focus === "function"
    ) {
        previousAlbumFocus.focus();
    }

}


/* =========================================
   OPEN IMAGE VIEWER
========================================= */

function openMemoryImage(item) {

    if (!memoryImageViewer) return;

    const image = memoryImageViewer.querySelector("img");

    const caption = memoryImageViewer.querySelector(
        ".album-image-caption"
    );

    image.src = item.src;
    image.alt = item.alt || "Fotografia";

    caption.textContent = item.caption || "";

    memoryImageViewer.classList.add("active");
    memoryImageViewer.setAttribute("aria-hidden", "false");

}


/* =========================================
   CLOSE IMAGE VIEWER
========================================= */

function closeMemoryImage() {

    if (!memoryImageViewer) return;

    memoryImageViewer.classList.remove("active");
    memoryImageViewer.setAttribute("aria-hidden", "true");

    const image = memoryImageViewer.querySelector("img");

    image.src = "";

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
            ".romantic-card, .letter-card, .memory-card, " +
            ".section-heading, .special-content, .milestone-item"
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

    renderMilestones();

    scheduleMilestoneUpdate();

    renderLetter();

    renderMemories();

    renderSpecial();

    initializeNavigation();

    initializeScrollNavigation();

    initializeScrollAnimations();

    createParticles();

});
