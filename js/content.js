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
        introduction: "Ciao Sofi, forse ti sembrerà strano il modo con cui ti sto parlando ma, a me, le cose troppo semplici e scontate non mi piacciono. Questo sito, o qualunque cosa esso sia, può dirti tante cose: verrà aggiornato, potrei scriverti qualcosa in ogni momento."
    },

    // PRESENTAZIONE INIZIALE
    presentation: {
        story: "esempio",
        feelings: "esempio",
        memories: "esempio",
        special: "esempio"
    },

    // LA VOSTRA STORIA
    story: {
        introduction: "esempio",

        moments: [
            {
                date: "03/09/2026",
                title: "Il nostro primo messaggio",
                description: "Il nostro primo messaggio è stato per il video della Maria, poteva andare decisamente meglio."
            }

                           ,
                {
                    date: "29/09 - oggi",
                    title: "Da quanto scriviamo",
                    description: "Scriviamo da un po', ancora poco, dovremo farlo per il resto dei nostri giorni."
                }
                           ,
                {
                    date: "30/10/2026",
                    title: "DICIOTTESIMO MARIA",
                    description: "Una delle cose più belle che abbiamo fatto, stare abbracciato con te è bellissimo."
                }
                           ,
                {
                    date: "31/10/2026",
                    title: "Netflix insieme",
                    description: "Questa è la cosa più bella che abbiamo fatto, fino ad ora. Siamo stati tutto il tempo abbracciati, penso che cosa più bella non possa esserci. La voglia di baciarti era tanta."
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
        greeting: "Cara Sofia,",
        content: "Ti conosco da poco ma ti amo come se ti conoscessi da sempre. Non ricordo precisamente perché abbiamo iniziato a fare chiamate lunghissime che non finivano più, ma potrei dirti tranquillamente quanto mi faccia stare bene farle e quando amo stare con te. Ti amo Sofia, e lo farò sempre.",
        signature: "Checco"
    },

    // RICORDI: LE COSE CHE FATE INSIEME
    memories: {
        introduction: "esempio",

        moments: [
            {
                date: "esempio",
                title: "esempio",
                description: "esempio"
            }

            /*
                Per aggiungere un altro ricordo:

                ,
                {
                    date: "",
                    title: "",
                    description: ""
                }
            */
        ],

        note: "Questo spazio è in continua evoluzione. Nuovi ricordi e momenti speciali verranno aggiunti e aggiornati nel tempo."
    },

    // DEDICA FINALE
    special: {
        message: "esempio",
        signature: "esempio"
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

/*
    La funzione viene mantenuta per compatibilità
    con il resto del sito, anche se nella sezione
    Ricordi non utilizziamo più fotografie.
*/

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
