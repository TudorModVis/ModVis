// -------- Circle Movement -------- //

const circles = document.querySelectorAll('.background .circle');

function moveCircles(event) {
    if (window.innerWidth < 1024) return;
    
    let x = (event.pageX / window.innerWidth - 0.5) ;
    let y = (event.pageY / window.innerHeight - 0.5);

    circles[0].style.transform = 'translate(' + x * 15 + '%,' + y * 15 +'%)';
    circles[1].style.transform = 'translate(' + x * -15 + '%,' + y * -15 +'%)';
}

window.addEventListener('mousemove', moveCircles);


// -------- Particle Movement -------- //

const particles = document.querySelectorAll(".background .particle");
let index = 0;

particles.forEach(particle => {
    particle.style.transform = 'translateY(' + anime.random(200, window.innerHeight) + 'px)';
    particle.style.animationDelay = index + 's';
    index ++;
});

anime({
    targets: particles,
    translateX: '110vw',
    translateY: function() {
        return anime.random(100, window.innerHeight);
      },
    duration: 10000,
    easing: 'linear',
    loop: true,
    delay: anime.stagger(2000)
});


// -------- Menu -------- //

const menu = document.querySelector('.menu');
const menuButton = document.querySelector('.menu-btn')
const menuLinks = menu.querySelectorAll('.link');
const currentLinks = menu.querySelectorAll('.unfold');

const lineOne = menuButton.querySelector('.line--1');
const lineTwo = menuButton.querySelector('.line--2');
const lineThree = menuButton.querySelector('.line--3');

function revealSections(event) {
    const link = event.currentTarget;
    const arrow = link.querySelector('img');
    const sections = link.nextElementSibling;
    const items = sections.querySelectorAll('a');

    arrow.classList.toggle('open');

    if (arrow.classList.contains('open')) {
        sections.classList.add('open');
        anime({
            targets: sections,
            height: el => el.scrollHeight,
            duration: 400,
            easing: 'easeOutCubic'
        });

        anime({
            targets: items,
            opacity:1,
            duration: 500,
            easing: 'easeOutCubic',
            delay: anime.stagger(100)
        });

    } else {
        anime.remove(items);
        anime({
            targets: items,
            opacity:0,
            duration: 200,
            easing: 'easeOutCubic',
            complete: () => {
                sections.classList.remove('open');
            }
        });
        anime({
            targets: sections,
            height: 0,
            duration: 400,
            easing: 'easeOutCubic',
            complete() {
            }
        });
    }
    
}

currentLinks.forEach(link => {
    link.addEventListener("click", revealSections);
});


// -------- Glass Panels -------- //

let cards = document.querySelectorAll('.glass .panel');
let currentCard, glassCircle;

function enterCard(event) {
    currentCard = event.currentTarget;
    glassCircle = currentCard.querySelector('.circle-glass');
    glassCircle.classList.remove('close');
    glassCircle.classList.add('open');
}

function moveCard(event) {
    let rect = currentCard.getBoundingClientRect();

    glassCircle.style.left = (event.clientX - rect.left) - (glassCircle.clientHeight / 2) + 'px';
    glassCircle.style.top = (event.clientY - rect.top) - (glassCircle.clientHeight / 2) + 'px';

    let x = (event.clientY - rect.top) / currentCard.clientHeight - 0.5;
    let y = ((event.clientX - rect.left) / currentCard.clientWidth - 0.5) * -1;

    currentCard.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
}

function leaveCard() {
    currentCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    glassCircle.classList.add('close');
    glassCircle.classList.remove('open');
}

cards.forEach(card => {
    card.addEventListener('mouseenter', enterCard);
    card.addEventListener('mouseleave', leaveCard);
    card.addEventListener('mousemove', moveCard);
});

// -------- Social Menu -------- //

const socialMenues = document.querySelectorAll('.social-menu');
let firstSocial;

function openSocialMenu(event) {
    const target = event.currentTarget;
    const links = target.parentNode.querySelectorAll('div');
    firstSocial = target;

    firstSocial.classList.add('active');

    anime({
        targets: links,
        top: function(el, i) {
            return -90 * i;
        },
        easing: 'easeOutQuad',
        duration: 250,
        delay: anime.stagger(150),
    });
}

function closeSocialMenu(event) {
    const target = event.currentTarget;
    const links = target.parentNode.querySelectorAll('div');
    firstSocial.classList.remove('active');

    anime({
        targets: links,
        top: 0,
        easing: 'easeOutQuad',
        duration: 300,
    });
}

socialMenues.forEach(menu => {
    const first = menu.querySelector('.first');
    const last = menu.querySelector('.last');

    first.addEventListener('click', openSocialMenu);
    last.addEventListener('click', closeSocialMenu);
})