function toggleMenu() {
    var menu = document.querySelector(".nav-links");
    menu.classList.toggle("active");
}

function logout() {
    localStorage.clear();
    window.location.href = "/login";
}

document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector(".scroll-content");
    const items = document.querySelectorAll(".scroll-item");

    // Duplica os itens para criar um efeito de rolagem contínua
    items.forEach(item => {
        const clone = item.cloneNode(true);
        scrollContainer.appendChild(clone);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector(".scroll-content");

    // Duplicando os elementos para criar um efeito contínuo
    const items = [...document.querySelectorAll(".scroll-item")];
    items.forEach(item => {
        const clone = item.cloneNode(true);
        scrollContainer.appendChild(clone);
    });

    let speed = 1; // Velocidade da rolagem
    function scroll() {
        scrollContainer.style.transform = `translateX(-${speed}px)`;
        speed += 0.5; // Ajusta a velocidade
        if (speed >= scrollContainer.scrollWidth / 2) {
            speed = 1; // Reinicia o efeito quando chega ao final
        }
        requestAnimationFrame(scroll);
    }
    scroll();
});
