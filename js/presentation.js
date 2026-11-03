
/* =========================================
   PER TE, SOFIA
   PRESENTATION ENGINE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const presentation = document.getElementById("presentation");
    const website = document.getElementById("mainWebsite");

    const slides = Array.from(
        document.querySelectorAll(".presentation-slide")
    );

    const nextButton = document.getElementById("nextSlide");
    const previousButton = document.getElementById("previousSlide");

    const nextButtonText = document.getElementById("nextButtonText");

    const slideCounter = document.getElementById("slideCounter");
    const progressBar = document.getElementById("progressBar");

    let currentSlide = 0;

    const totalSlides = slides.length;


    /* =====================================
       INITIALIZATION
    ===================================== */

    function initializePresentation() {

        const shouldShowPresentation = hasNewContentVersion();

        if (!shouldShowPresentation) {

            presentation.classList.add("hide");

            website.classList.remove("hidden");

            requestAnimationFrame(() => {
                website.classList.add("visible");
            });

            return;
        }

        presentation.classList.remove("hide");

        website.classList.add("hidden");

        showSlide(0);

    }


    /* =====================================
       UPDATE SLIDE
    ===================================== */

    function showSlide(index) {

        currentSlide = Math.max(
            0,
            Math.min(index, totalSlides - 1)
        );

        slides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        });


        /* COUNTER */

        const currentNumber = String(
            currentSlide + 1
        ).padStart(2, "0");

        const totalNumber = String(
            totalSlides
        ).padStart(2, "0");

        slideCounter.textContent =
            `${currentNumber} / ${totalNumber}`;


        /* PROGRESS */

        const progress =
            ((currentSlide + 1) / totalSlides) * 100;

        progressBar.style.width = `${progress}%`;


        /* BUTTON LABEL */

        if (currentSlide === totalSlides - 1) {

            nextButtonText.textContent = "Entra nel nostro mondo";

        } else {

            nextButtonText.textContent = "Continua";

        }


        /* PREVIOUS BUTTON */

        previousButton.style.visibility =
            currentSlide === 0 ? "hidden" : "visible";

    }


    /* =====================================
       NEXT
    ===================================== */

    function nextSlide() {

        if (currentSlide < totalSlides - 1) {

            showSlide(currentSlide + 1);

        } else {

            finishPresentation();

        }

    }


    /* =====================================
       PREVIOUS
    ===================================== */

    function previousSlideAction() {

        if (currentSlide > 0) {

            showSlide(currentSlide - 1);

        }

    }


    /* =====================================
       FINISH
    ===================================== */

    function finishPresentation() {

        /*
            Salviamo la versione solo quando
            la presentazione è stata completata.
        */

        saveViewedVersion();

        presentation.classList.add("hide");

        website.classList.remove("hidden");

        requestAnimationFrame(() => {

            website.classList.add("visible");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================
       EVENT LISTENERS
    ===================================== */

    nextButton.addEventListener(
        "click",
        nextSlide
    );

    previousButton.addEventListener(
        "click",
        previousSlideAction
    );


    /* =====================================
       KEYBOARD
    ===================================== */

    document.addEventListener("keydown", event => {

        if (presentation.classList.contains("hide")) {
            return;
        }

        if (event.key === "ArrowRight") {
            nextSlide();
        }

        if (event.key === "ArrowLeft") {
            previousSlideAction();
        }

    });


    /* =====================================
       TOUCH SWIPE
    ===================================== */

    let touchStartX = 0;

    presentation.addEventListener("touchstart", event => {

        touchStartX = event.changedTouches[0].screenX;

    }, { passive: true });


    presentation.addEventListener("touchend", event => {

        const touchEndX = event.changedTouches[0].screenX;

        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) < 70) {
            return;
        }

        if (difference > 0) {
            nextSlide();
        } else {
            previousSlideAction();
        }

    }, { passive: true });


    /* =====================================
       START
    ===================================== */

    initializePresentation();

});
