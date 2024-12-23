// import source from "./source.js";
import { source } from './source.js';

console.log(source);

//Mi aggancio agli elementi del DOM ----------------
//contenitore caselle
const adventBox = document.querySelector('.advent-box');
//Modale
const modal = document.querySelector('.modal');
//contenuto del modale
const modalContent = document.querySelector('.day-modal-text');
const closeModal = document.querySelector('.close-modal');
// Reset button
const resetButton = document.querySelector('.reset-button');
//---------------------------------------------------

//FUNZIONE per mostrare il modale 
function showModal(content) {
    modalContent.innerHTML = content;
    modal.classList.remove('hidden'); //se non tolgo questa classe il contenuto non appare
}

//Funzione per chiudere il MODALE
//alla chiusura aggiungi la classe hidden
function hideModal() {
    modal.classList.add('hidden');
}

// ------------------------- LOCALSTORAGE ---------------
// Funzione per caricare lo stato delle caselle (ovvero sapere quali sono già state aperte)
function loadCalendarState() {
    const openedCards = JSON.parse(localStorage.getItem('openedCards')) || []; // Se non ci sono caselle aperte, restituiamo un array vuoto
    return openedCards;
}

// Funzione per salvare lo stato delle caselle
function saveCalendarState(openedCards) {
    localStorage.setItem('openedCards', JSON.stringify(openedCards)); // Salviamo le caselle aperte nel localStorage
}

//invoco la funzione al click sulla x
closeModal.addEventListener('click', hideModal);

//Creo il calendario dell'avvento
function createCalendar() {
    // Otteniamo l'array delle caselle già aperte
    const openedCards = loadCalendarState();
    adventBox.innerHTML = ''; // Puliamo il contenitore prima di aggiungere le caselle o aggiunge altre caselle alla pagina!

    for (let day = 1; day <= 25; day++) {
        //creo l'elemento div per ogni giorno
        const card = document.createElement('div');
        card.classList.add('card');//in style CSS
        card.textContent = day; // Mostra il numero del giorno nella casella


        // Se la casella è già stata aperta (cioè è nel localStorage), la coloriamo di rosso
        if (openedCards.includes(day)) {
            card.classList.add('opened'); // Aggiungiamo la classe 'opened' se è già aperta
        }

        //aggiungo l'evento al click per ogni casella
        card.addEventListener('click', () => {
            // Se la casella è già stata aperta, non fare nulla
            if (card.classList.contains('opened')) {
                return;
            }
            //inserimento casuale tramite source
            const randomItem = source[Math.floor(Math.random() * source.length)];

            let content = '';
            if (randomItem.type === 'image') {
                content = `<img src="${randomItem.url}" alt='Surprise image'>`;
            } else {
                content = `<p>${randomItem.text}</p>`;
            }
            showModal(content);

            // Cambia lo stile della casella per indicare che è aperta
            card.classList.add('opened');

            // Aggiungiamo il numero della casella aperta all'array
            openedCards.push(day);
            saveCalendarState(openedCards); // Salviamo lo stato aggiornato nel localStorage
            console.log(openedCards);
        });

        // Aggiunge la casella creata al contenitore del calendario
        adventBox.appendChild(card);
    }
};


// Funzione per resettare il calendario
function resetCalendar() {
    localStorage.removeItem('openedCards'); // Rimuoviamo il localStorage per le caselle aperte
    createCalendar(); // Ricreiamo il calendario per riportarlo allo stato iniziale
};

// Aggiungiamo un evento al bottone di reset
resetButton.addEventListener('click', () => {
    resetCalendar(); // Chiamiamo la funzione di reset quando si clicca sul bottone
});

// Chiama la funzione per creare il calendario quando la pagina viene caricata
createCalendar();
