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

const home = document.querySelector('#home');
let check = false;

function homeScroll() {
    if (!check) {
        console.log('check')
    }
    check = true;
}

window.addEventListener('scroll', homeScroll);
