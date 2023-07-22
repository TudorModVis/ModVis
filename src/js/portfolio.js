// -------- Logo Hide -------- //

function hideLogo() {
    if (window.scrollY > 0) logo.classList.add('active'); else logo.classList.remove('active');
}

window.addEventListener('scroll', hideLogo);

// -------- Cursour Text -------- //

const projects = document.querySelectorAll('.background');

projects.forEach(project => {
    project.addEventListener('mouseover', () => {
        cursor.classList.add('active');
        cursor.querySelector('img').classList.add('active');
    });
    project.addEventListener('mouseout', () => {
        cursor.classList.remove('active');
        cursor.querySelector('img').classList.remove('active');
    });
})
