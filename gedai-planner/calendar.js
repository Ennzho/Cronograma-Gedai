// ===============================
// GEDAI PLANNER
// Calendar.js
// ===============================

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");

const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];

let currentDate = new Date();

function renderCalendar(){

    calendar.innerHTML = "";

    const year = currentDate.getFullYear();

    const month = currentDate.getMonth();

    monthYear.innerHTML = `${months[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();

    const totalDays = new Date(year, month + 1, 0).getDate();

    // Espaços antes do dia 1

    for(let i = 0; i < firstDay; i++){

        const empty = document.createElement("div");

        empty.className = "day";

        empty.style.visibility = "hidden";

        calendar.appendChild(empty);

    }

    // Dias

    for(let day = 1; day <= totalDays; day++){

        const card = document.createElement("div");

        card.className = "day";

        const dateKey = `${year}-${month+1}-${day}`;

        const data = getPost(dateKey);

        if(data){

            if(data.status === "Postado"){

                card.classList.add("postado");

            }

            if(data.status === "Produção"){

                card.classList.add("producao");

            }

            if(data.status === "Pendente"){

                card.classList.add("pendente");

            }

        }

        card.innerHTML = `

            <div class="day-number">

                ${day}

            </div>

            ${
                data
                ?

                `<div class="event">

                    ${iconByType(data.tipo)}
                    ${data.titulo}

                </div>`

                :

                ""

            }

        `;

        card.onclick = () => {

            openDay(dateKey, day, month, year);

        };

        calendar.appendChild(card);

    }

}

function iconByType(tipo){

    switch(tipo){

        case "Feed":

            return "📷";

        case "Stories":

            return "📱";

        case "Reels":

            return "🎥";

        case "Carrossel":

            return "📰";

        default:

            return "📝";

    }

}

// Botões

document.getElementById("prevMonth").onclick = ()=>{

    currentDate.setMonth(currentDate.getMonth()-1);

    renderCalendar();

}

document.getElementById("nextMonth").onclick = ()=>{

    currentDate.setMonth(currentDate.getMonth()+1);

    renderCalendar();

}

// Inicia

renderCalendar();
