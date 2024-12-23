import source from "./source.js";

console.log(source);

//Mi aggancio agli elementi del DOM ----------------
//contenitore caselle
const adventBox = document.querySelector('.advent-box');
//Modale
const modal = document.querySelector('.modal');
//contenuto del modale
const modalContent = document.querySelector('.day-modal-text');
const closeModal = document.querySelector('.close-modal');
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

//invoco la funzione al click sulla x
closeModal.addEventListener('click', hideModal);

//Creo il calendario dell'avvento
function createCalendar() {
    for (let day = 1; day <= 25; day++) {
        //creo l'elemento div per ogni giorno
        const card = document.createElement('div');
        card.classList.add('card');//in style CSS
        card.textContent = day; // Mostra il numero del giorno nella casella

        //aggiungo l'evento al click per ogni casella
        card.addEventListener('click', () => {
            const randomItem = source[Math.floor(Math.random() * source.length)];

            let content = '';
            if (randomItem.type === 'image') {
                content = `<img src="${randomItem.url}" alt='Surprise image'>`;
            } else {
                content = `<p>${randomItem.text}</p>`;
            }
            showModal(content);
        }

        );
        // Aggiunge la casella creata al contenitore del calendario
        adventBox.appendChild(card);
    }
}


// Chiama la funzione per creare il calendario quando la pagina viene caricata
createCalendar();
