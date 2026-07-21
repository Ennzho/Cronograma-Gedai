// ======================================
// GEDAI Planner
// storage.js
// ======================================

// Chave utilizada no LocalStorage
const STORAGE_KEY = "gedaiPlannerPosts";

// Retorna todos os posts salvos
function getPosts() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return {};

    return JSON.parse(data);

}

// Retorna um único post
function getPost(dateKey) {

    const posts = getPosts();

    return posts[dateKey] || null;

}

// Salva um post
function savePost(dateKey, postData) {

    const posts = getPosts();

    posts[dateKey] = postData;

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(posts)
    );

    updateDashboard();

}

// Remove um post
function deletePost(dateKey) {

    const posts = getPosts();

    delete posts[dateKey];

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(posts)
    );

    updateDashboard();

}

// Atualiza os cards do topo
function updateDashboard() {

    const posts = getPosts();

    let total = 0;
    let publicados = 0;
    let pendentes = 0;

    for (const key in posts) {

        total++;

        if (posts[key].status === "Postado") {

            publicados++;

        }

        if (
            posts[key].status === "Pendente" ||
            posts[key].status === "Produção"
        ) {

            pendentes++;

        }

    }

    document.getElementById("totalPosts").innerText = total;

    document.getElementById("publicados").innerText = publicados;

    document.getElementById("pendentes").innerText = pendentes;

}

// Exportar Backup (.json)
function exportData() {

    const posts = getPosts();

    const blob = new Blob(
        [JSON.stringify(posts, null, 2)],
        {
            type: "application/json"
        }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "GEDAI-Backup.json";

    a.click();

    URL.revokeObjectURL(url);

}

// Importar Backup (.json)
function importData(file) {

    const reader = new FileReader();

    reader.onload = function(e){

        localStorage.setItem(
            STORAGE_KEY,
            e.target.result
        );

        updateDashboard();

        renderCalendar();

        alert("Backup importado com sucesso!");

    }

    reader.readAsText(file);

}

// Limpar tudo
function clearAllPosts(){

    if(confirm("Tem certeza que deseja apagar TODOS os posts?")){

        localStorage.removeItem(STORAGE_KEY);

        updateDashboard();

        renderCalendar();

    }

}

// Inicializa os cards
window.addEventListener("load", () => {

    updateDashboard();

});
