// -------- Fitty Specifications -------- //

const homeText = document.querySelector('#home #first-big');

if (window.innerWidth >= 1024 && homeText != null) fitty(homeText);

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

// -------- Accent Underline -------- //

const accents = document.querySelectorAll('.accent');

const accentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    })
});

accents.forEach(accent => accentObserver.observe(accent));


// -------- Portfolio Cards -------- //

const works = document.querySelectorAll('#portfolio .work');

function openCard(event) {
    const work = event.target;

    const site = work.querySelector('.site');
    const info = work.querySelector('.info');
    const title = work.querySelector('.title');

    title.classList.add('open');
    work.classList.add('open');
    site.classList.add('open');
    info.classList.add('open');
}

function closeCard(event) {
    const work = event.target;

    const site = work.querySelector('.site');
    const info = work.querySelector('.info');
    const title = work.querySelector('.title');

    title.classList.remove('open');
    work.classList.remove('open');
    site.classList.remove('open');
    info.classList.remove('open');
}

works.forEach(work => {
    work.addEventListener('mouseenter', openCard);
    work.addEventListener('mouseleave', closeCard);
});

