// -------- Logo Hide -------- //

let logoVisible = true;

function hideLogo() {
    if (window.scrollY > 0) {
        if (logoVisible == false) return;
        logo.classList.add('active');
        languages.classList.add('hide');
        logoVisible = false;
    } else {
        if (logoVisible == true) return;
        logo.classList.remove('active');
        languages.classList.remove('hide');
        logoVisible = true;
    }
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
});