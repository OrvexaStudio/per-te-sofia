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
        story: "La nostra storia, raccontata in modo diverso.",
        feelings: "Le sensazioni più belle.",
        memories: "I nostri ricordi migliori.",
        special: "Qualcosa di speciale, come te."
    },

    // LA VOSTRA STORIA
    story: {
        introduction: "Qui verranno pubblicati i nostri momenti, solo i più belli, perchè mettere ogni secondo passato con te è impossibile.",

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
                           ,
                {
                    date: "31/10/2026",
                    title: "Quel MESSAGGIO",
                    description: "Il messaggio in cui ci siamo detti che ci stavamo innamorando, indescrivibile è l'emozione che ho provato."
                }
                           ,
                {
                    date: "07/11/2026",
                    title: "IL NOSTRO PRIMO BACIO",
                    description: "Indescrivibile, indimenticabile, semplicemente unico."
                },
            {
                    date: "09/11/2026",
                    title: "Il giorno in cui ci siamo fidanzati",
                    description: "Finalmente è arrivato il giorno che aspettavo tanto."
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
        content: " in un mondo in cui tutto si perde velocemente, vorrei che tu fossi ciò che rimane per sempre. Non saprei neanche da dove iniziare per scriverti qualcosa, perché le parole che potrei dirti sono così tante che sono difficili da scegliere, ma allo stesso tempo sono così poche per descrivere qualcosa di così grande tanto da sembrare infinito. In questo periodo mi hai fatto stare bene, mi hai fatto divertire e mi hai fatto sentire capito davvero. Non so cosa accadrà tra di noi, ma se la nostra storia dovesse andare avanti ti darei tutto quello che ho da darti per renderla stupenda, per farti stare bene e per cercare di eliminare qualsiasi tua insicurezza e le tue paure. Ti chiederai perché mi sono legato così tanto a te. Ti rispondo. Io e te siamo molto diversi, ma nella nostra disuguaglianza siamo così tanto simili. È difficile da spiegare, ma in te ho visto una luce che brilla più forte del Sole che, anche se non lo mostri, ha bisogno di essere alimentata, ha bisogno di essere coltivata per farla splendere sempre di più. Sei una donna fantastica, non parlo di aspetto fisico perché quello sarebbe troppo scontato, ma perché hai tutti i valori che molte ragazze della tua età si sognerebbero, come per esempio la capacità di essere realista, come osservi tu la realtà, come sei attenta tu alla realtà non lo è nessuna. Perché alla fine, tutti abbiamo bisogno di un posto in cui ci sentiamo al sicuro, un posto che riesca a calmarci, un posto che possa essere definito casa. E tu sei quel mio posto, un posto dove ogni preoccupazione svanisce e dove ogni paura si attenua. Ricordati per sempre che sei una ragazza bellissima. Non dubitare mai di te e del tuo aspetto fisico, perché sei davvero stupenda, la tua bellezza è unica. come te. Ti auguro di fare tutto ciò che vuoi nella vita. Non ascoltare mai chi ti giudica e chi ti mette il bastone tra le ruote, perché solo tu sai davvero dove puoi arrivare e puoi arrivare in alto, tanto in alto. Sei intelligente e hai tutte le capacità per diventare chi vuoi essere. Ti auguro il meglio e tutta la fortuna possibile nella tua vita. Non permettere mai a nessuno di rovinarti, di abbatterti o di farti mettere i piedi in testa. Vali tanto. Sei tanto. E nessuno potrà mai eliminare ciò che sei davvero. Questa lettera la sto scrivendo perché ho capito che non sei una ragazza come tante, sei la ragazza in mezzo a tante. C’è una differenza enorme. Sei diversa, sei migliore, sei semplicemente tu, che con il tuo modo di fare e di essere, mi hai fatto innamorare e perdere nei tuoi bellissimi occhi. Ti amo Sofia, e non è descrivibile quanto.",
        signature: "Checco"
    },

    // RICORDI: LE COSE CHE FATE INSIEME
    memories: {
        introduction: "Qui verranno pubblicate le nostre esperienze, tutto quello che faremo insieme.",

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
        message: "Ti amo infinitamente, non ti cambierei per nulla al mondo. Come te, nessuna. Sei la differenza in un mondo che fa acqua da tutte le parti. E tu, sei la toppa di questo mondo.",
        signature: "Checco TUO"
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
