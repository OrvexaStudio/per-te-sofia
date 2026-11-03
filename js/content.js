
/* =========================================
   PER TE, SOFIA
   CONTENT MANAGER
========================================= */

/*
    MODIFICA I CONTENUTI QUI.

    IMPORTANTE:
    Ogni modifica ai contenuti, anche un singolo
    carattere, produrrà una nuova versione del sito.

    La presentazione verrà riproposta alla visita
    successiva dopo la pubblicazione della modifica.
*/

const SITE_CONTENT = {

    // IDENTITÀ DEL SITO
    identity: {
        name: "Sofia",
        title: "Per te, Sofia"
    },

    // PAGINA INIZIALE
    home: {
        introduction: ""
    },

    // PRESENTAZIONE INIZIALE
    presentation: {
        story: "",
        feelings: "",
        memories: "",
        special: ""
    },

    // LA VOSTRA STORIA
    story: {
        introduction: "",

        moments: [
            {
                date: "",
                title: "",
                description: ""
            }

            /*
                Per aggiungere un altro momento:

                ,
                {
                    date: "",
                    title: "",
                    description: ""
                }
            */
        ]
    },

    // LETTERA
    letter: {
        greeting: "",
        content: "",
        signature: ""
    },

    // RICORDI E FOTOGRAFIE
    memories: {
        introduction: "",

        photos: [
            /*
                Esempio per aggiungere una fotografia:

                {
                    image: "assets/images/foto1.jpg",
                    title: "",
                    description: "",
                    date: ""
                }
            */
        ],

        note: "Questo spazio è in continua evoluzione. Nuove fotografie, ricordi e momenti speciali verranno aggiunti e aggiornati nel tempo."
    },

    // DEDICA FINALE
    special: {
        message: "",
        signature: ""
    }

};


/* =========================================
   VERSION MANAGEMENT
========================================= */

/*
    Il sistema genera un'impronta digitale
    dell'intero contenuto.

    Se cambia anche un solo carattere,
    l'impronta cambia.

    Questo evita di dover aggiornare
    manualmente il numero della versione.
*/

function generateContentVersion() {

    const serializedContent = JSON.stringify(SITE_CONTENT);

    let hash = 2166136261;

    for (let i = 0; i < serializedContent.length; i++) {

        hash ^= serializedContent.charCodeAt(i);

        hash = Math.imul(hash, 16777619);

    }

    return (
        "v-" +
        (hash >>> 0).toString(16)
    );

}


/* =========================================
   VERSION CHECK
========================================= */

const CONTENT_VERSION = generateContentVersion();

const VERSION_STORAGE_KEY = "sofia_site_viewed_version";


function hasNewContentVersion() {

    const previousVersion = localStorage.getItem(
        VERSION_STORAGE_KEY
    );

    return previousVersion !== CONTENT_VERSION;

}


function saveViewedVersion() {

    localStorage.setItem(
        VERSION_STORAGE_KEY,
        CONTENT_VERSION
    );

}


/* =========================================
   CONTENT ACCESS
========================================= */

function getSiteContent() {

    return SITE_CONTENT;

}


/* =========================================
   IMAGE VALIDATION
========================================= */

function isValidImagePath(path) {

    if (typeof path !== "string" || !path.trim()) {
        return false;
    }

    const allowedExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".avif"
    ];

    const cleanPath = path.toLowerCase().split("?")[0];

    return allowedExtensions.some(extension =>
        cleanPath.endsWith(extension)
    );

}
