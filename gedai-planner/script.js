// ======================================
// GEDAI Planner
// script.js
// ======================================

const modal = document.getElementById("modal");

const closeModalBtn = document.getElementById("closeModal");

const selectedDate = document.getElementById("selectedDate");

const titulo = document.getElementById("titulo");

const tipo = document.getElementById("tipo");

const legenda = document.getElementById("legenda");

const drive = document.getElementById("drive");

const thumb = document.getElementById("thumb");

const status = document.getElementById("status");

const saveBtn = document.getElementById("saveBtn");

let currentKey = null;

// ======================================
// Abrir Modal
// ======================================

function openDay(dateKey, day, month, year){

    currentKey = dateKey;

    selectedDate.innerHTML =
        `${day} de ${months[month]} de ${year}`;

    const post = getPost(dateKey);

    if(post){

        titulo.value = post.titulo || "";

        tipo.value = post.tipo || "Feed";

        legenda.value = post.legenda || "";

        drive.value = post.drive || "";

        thumb.value = post.thumb || "";

        status.value = post.status || "Pendente";

    }else{

        titulo.value = "";

        tipo.value = "Feed";

        legenda.value = "";

        drive.value = "";

        thumb.value = "";

        status.value = "Pendente";

    }

    modal.style.display = "flex";

}

// ======================================
// Fechar
// ======================================

closeModalBtn.onclick = ()=>{

    modal.style.display = "none";

}

window.onclick = (e)=>{

    if(e.target == modal){

        modal.style.display = "none";

    }

}

// ======================================
// Salvar
// ======================================

saveBtn.onclick = ()=>{

    if(titulo.value.trim() == ""){

        alert("Digite um título para o post.");

        return;

    }

    savePost(currentKey,{

        titulo: titulo.value,

        tipo: tipo.value,

        legenda: legenda.value,

        drive: drive.value,

        thumb: thumb.value,

        status: status.value

    });

    modal.style.display = "none";

    renderCalendar();

}

// ======================================
// Atalhos
// ======================================

// CTRL + S salva

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key === "s"){

        e.preventDefault();

        if(modal.style.display == "flex"){

            saveBtn.click();

        }

    }

});

// ESC fecha

document.addEventListener("keydown",(e)=>{

    if(e.key == "Escape"){

        modal.style.display = "none";

    }

});
