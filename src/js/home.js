// -------- Fitty Specifications -------- //

const homeText = document.querySelector('#home #first-big');
const salesText = document.querySelector('#sales #first-big');
const websiteText = document.querySelector('#webiste #title');

if (window.innerWidth >= 1024) {
    fitty(homeText);
    fitty(salesText);
    // fitty(websiteText);
}

// -------- Eye Movement -------- //

const pupil = document.querySelector('#home .pupil');

window.addEventListener('mousemove', (event) => {
    let x = event.clientX * 30 / window.innerWidth + 29 + "%";
    let y = event.clientY * 30 / window.innerHeight + 33 + "%";

    pupil.style.left = x;
    pupil.style.top = y;
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

// window.addEventListener('scroll', homeScroll);


// -------- Word Change -------- //

const change = document.querySelector('.change');
const changeWrapper = change.querySelector('.change-wrapper');
const words = change.querySelectorAll('h1');


// -------- Menu -------- //

const menu = document.querySelector('.menu');
const menuButton = document.querySelector('.menu-btn');
const lines = menuButton.querySelectorAll('div');

const menuLinks = menu.querySelectorAll('.link');
const menuWave = menu.querySelector('h1');

anime({
    targets: menuLinks,
    translateX: 100,
    duration: 1500,
    opacity: 0
});

menuButton.onclick = () => {
    menu.classList.toggle('open');
    
    // document.body.classList.toggle('open-menu');
    
    lines.forEach(line => {
        line.classList.toggle('cross');
    })

    if (menu.classList.contains('open')) {
        menuWave.classList.add('active');
        lines[1].style.transition = 'all 700ms cubic-bezier(.9, 0, .33, 1)';

        setTimeout(() => {
            menuLinks.forEach(link => {
                link.classList.add('active');
            })
        }, 1700);

        setTimeout(() => {
            anime({
                targets: menuLinks,
                translateX: 0,
                duration: 1500,
                opacity: 1,
                delay: anime.stagger(100)
            });
        }, 400);
        
    } else {
        setTimeout(() => {
            lines[1].style.transition = '0.3s';
            menuWave.classList.remove('active');
        }, 700);

        menuLinks.forEach(link => {
            link.classList.remove('active');
        })

        anime({
            targets: menuLinks,
            translateX: 100,
            duration: 1500,
            opacity: 0,
            delay: anime.stagger(100)
        });
    }
}