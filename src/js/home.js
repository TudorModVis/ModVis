// -------- Fitty-------- //
if (window.innerWidth >= 1024) {
    fitty('#sales #big');
}


// -------- Eye Movement -------- //

const pupil = document.querySelector('#home .pupil');

window.addEventListener('mousemove', (event) => {
    let offsetX = 35, offsetY = 33, mult = 40;

    if (window.innerWidth >= 1024) {
        offsetX = 29;
        offsetY = 33;
        mult = 30;
    }

    let x = event.clientX * mult / window.innerWidth + offsetX + "%";
    let y = event.clientY * mult / window.innerHeight + offsetY + "%";

    pupil.style.left = x;
    pupil.style.top = y;
})


// -------- Sales Transition -------- //

const home = document.querySelector('#home');
const salesContainer = document.querySelector('#sales .wrapper');

function homeScroll() {
    let progres = window.scrollY / window.innerHeight;

}

window.addEventListener('scroll', homeScroll);


// -------- Word Change -------- //

const change = document.querySelector('.change');
const changeContainer = document.querySelector('.change-container');
let index = 1, changeImage;

function changeWords() {
    imageSelector();
    setImageHeigth();

    let changeImageHeight = changeImage.getBoundingClientRect().height;
    let rate = -1 * changeImageHeight;

    change.style.transform = 'translateY(' + rate * index + 'px)';
    if (index == 2) change.classList.remove('active');

    if (index == 5) {
        index = 1;
        
        setTimeout(() => {
            change.classList.add('active');
        }, 1500);
    } else index++;
}

function imageSelector() {
    if (window.innerWidth >=1024) {
        changeImage = changeContainer.querySelector('#pc');
    } else changeImage = changeContainer.querySelector('#mobile');
}

function setImageHeigth() {
    const images = change.querySelectorAll('img');
    images.forEach(image => {
        image.style.height = changeImage.getBoundingClientRect().height + 'px';
    });
}

changeWords();

setInterval(changeWords, 2000);


// -------- Menu -------- //

const menu = document.querySelector('.menu');
const menuButton = document.querySelector('.menu-btn');
const menuClicker = menuButton.querySelector('span');
const lines = menuButton.querySelectorAll('div');
const cover = document.querySelector('.cover');
const logo = document.querySelector('.logo');
const languages = document.querySelector('header .languages');

const menuLinks = menu.querySelectorAll('.link');
const menuWave = menu.querySelector('h1');
const socialLinks = menu.querySelector('.social');

anime({
    targets: menuLinks,
    translateX: 100,
    duration: 1500,
    opacity: 0
});

function menuClick () {
    menuClicker.classList.toggle('active');
    menu.classList.toggle('open');
    menuButton.classList.toggle('active');
    
    document.body.classList.toggle('open-menu');
    
    lines.forEach(line => {
        line.classList.toggle('cross');
    })

    if (menu.classList.contains('open')) {
        logo.classList.add('active');
        cover.classList.add('active');
        setTimeout(() => {cover.classList.add('show')}, 100);

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
            languages.classList.add('active');
        }, 1400);
        
    } else {
        languages.classList.remove('active');
        cover.classList.remove('show');
        setTimeout(() => {
            cover.classList.remove('active');
            logo.classList.remove('active');
        }, 300);

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

menuClicker.addEventListener('click', menuClick);


// -------- Sales Gradient -------- //

const salesGradient = document.querySelector('#sales .container div');

function moveGradient() {
    let progress = (window.scrollY / (window.innerHeight * 2) - 0.5) * 100;
    if (progress <= 0 || progress > 120) salesGradient.style.display = 'none';
    else salesGradient.style.display = 'block';
    salesGradient.style.backgroundPosition = 'center ' + progress + '%';
}

window.addEventListener('scroll', moveGradient);