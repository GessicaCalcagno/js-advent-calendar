//acchiappo il contenitore del calendario
const adventBox = document.querySelector('.advent-box');
console.log(adventBox)

//Numero totale dei giorni sono 24 + 1 con messaggio unico
const totalDays = 25;

//funzione per creare il calendario
function createCalendar() {
    for (let day = 1; day <= totalDays; day++) {
        //creo un div per ogni casella e quindi per ogn giorno
        const card = document.createElement('div');
        card.classList.add('card');//devo aggiungere la classe al div 

        //inserisco il numero dei giorni all'interno della casella
        card.textContent = day;

        //aggiungo la casella al contenitore
        adventBox.appendChild(card);
    }
}

// Chiamo la funzione per creare il calendario
createCalendar();
