function toggleMenu() {
    var menu = document.querySelector(".nav-links");
    menu.classList.toggle("active");
}

function logout() {
    localStorage.clear();
    window.location.href = "/login";
}
