// Botão Voltar ao Topo
const topButton = document.getElementById('topButton');

window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        topButton.classList.remove('hidden');
    } else {
        topButton.classList.add('hidden');
    }
};

topButton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Suavizar rolagem para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Botão de cola
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("Copiado: " + text);
    }).catch(err => {
        console.error("Erro ao copiar:", err);
    });
}

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.textContent = message;

    document.body.appendChild(toast);

    // Mostra a notificação
    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    // Remove após 2 segundos
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 2000);
}