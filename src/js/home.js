// -------- Fitty Specifications -------- //

const homeText = document.querySelector('#home #first-big');
const salesText = document.querySelector('#sales #first-big');

if (window.innerWidth >= 1024 && homeText != null) {
    fitty(homeText);
}

if (window.innerWidth >= 1024 && salesText != null) {
    fitty(salesText);
}


// -------- Eye Movement -------- //

const pupil = document.querySelector('#home .pupil');

window.addEventListener('mousemove', (event) => {
    let x = event.clientX * 30 / window.innerWidth + 44 + "%";
    let y = event.clientY * 30 / window.innerHeight + 33 + "%";

    if (pupil !== null) {
        pupil.style.left = x;
        pupil.style.top = y;
    }
})


// -------- Sales Transition -------- //

const homeContainer = document.querySelector('#home .wrapper');
const salesContainer = document.querySelector('#sales .wrapper');

let check = false;

function homeScroll() {
    let progres = window.scrollY / window.innerHeight;

    homeContainer.style.opacity = 1 - progres;
    salesContainer.style.opacity = progres;
}

window.addEventListener('scroll', homeScroll);
