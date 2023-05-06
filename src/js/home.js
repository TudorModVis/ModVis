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
let index = 0, rate, changeWordsInterval;


function changeWords() {
    if (window.innerWidth >= 1536) rate = -14.5;
    else rate = -16;
    change.style.transform = 'translateY(' + rate * index + 'vh)';

    if (index == 1) change.classList.remove('active');

    if (index == 4) {
        index = 0;
        
        setTimeout(() => {
            change.classList.add('active');
        }, 1000);
    } else index++;
}

changeWords();

function startInterval() {
    changeWordsInterval = setInterval(changeWords, 2000);
}

function endInterval() {
    clearInterval(changeWordsInterval);
}

startInterval();



// -------- Menu -------- //

const menu = document.querySelector('.menu');
const menuButton = document.querySelector('.menu-btn');
const lines = menuButton.querySelectorAll('div');

const menuLinks = menu.querySelectorAll('.link');
const menuWave = menu.querySelector('h1');
const socialLinks = menu.querySelector('.social');

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
            });
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

        setTimeout(() => {
            socialLinks.classList.add('active');
        }, 1400);
        
    } else {
        setTimeout(() => {
            lines[1].style.transition = '0.3s';
            menuWave.classList.remove('active');
        }, 700);

        menuLinks.forEach(link => {
            link.classList.remove('active');
        });
        socialLinks.classList.remove('active');

        anime({
            targets: menuLinks,
            translateX: 100,
            duration: 1500,
            opacity: 0,
            delay: anime.stagger(100)
        });
    }
}