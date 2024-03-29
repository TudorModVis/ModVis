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
let langTimeout;
let logoSwitch;

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
        if (logo.classList.contains('active')) {
            logoSwitch = true;

            if (window.innerWidth >= 1024) {
                logo.classList.remove('active');
            }
        }

        if (window.innerWidth < 1024) {
            logo.classList.add('active');
        }

        cover.classList.add('active');
        setTimeout(() => {cover.classList.add('show')}, 100);

        menuWave.classList.add('active');
        lines[1].style.transition = 'all 700ms cubic-bezier(.9, 0, .33, 1)';

        setTimeout(() => {
            anime.remove(menuLinks);
            anime({
                targets: menuLinks,
                translateX: 0,
                duration: 1500,
                opacity: 1,
                delay: anime.stagger(100),
                complete: () => {
                    menuLinks.forEach(link => {
                        link.classList.add('active');
                    });
                }
            });
        }, 400);

        if (window.innerWidth >= 1024) {
            languages.classList.remove('hide');
            languages.classList.add('active');
        }

        langTimeout = setTimeout(() => {
            socialLinks.classList.add('active');
            languages.classList.remove('hide');
            languages.classList.add('active');
        }, 1400);
        
    } else {
        clearTimeout(langTimeout);
        languages.classList.remove('active');
        cover.classList.remove('show');

        setTimeout(() => {
            cover.classList.remove('active');
            if (logoSwitch == true) {
                logo.classList.add('active');
                languages.classList.add('hide');
                logoSwitch = false;
            }
        }, 300);

        anime.remove(menuLinks);
        menuLinks.forEach(link => {
            link.classList.remove('active');
        });
        socialLinks.classList.remove('active');

        anime({
            targets: menuLinks,
            translateX: 100,
            duration: 1500,
            opacity: 0,
            delay: anime.stagger(100),
            complete: () => {
                menuWave.classList.remove('active');

                if (window.innerWidth > 1024) lines[1].style.transition = '0.3s';
            }
        });
    }
}

menuClicker.addEventListener('click', menuClick);


// -------- Hide Logo -------- //

function hideLogo() {
    if (window.innerWidth >= 1024) return;

    if (window.scrollY > 0) logo.classList.add('active'); else {logo.classList.remove('active')}
}

window.addEventListener('scroll', hideLogo);

// -------- Page Transition -------- //

const pageTransition = document.querySelector('.page-transition');
const pageLinks = document.querySelectorAll('.page-link');
const bodyContainer = document.querySelector('body');
const loadingScreen = document.querySelector('.loading');

pageTransition.classList.add('ready');
loadingScreen.querySelector('div').classList.add('active');
let timeout = (window.innerWidth < 1024)? 1000 : 1600;

setTimeout(() => {
    pageTransition.classList.add('active');
    loadingScreen.classList.add('active');
    bodyContainer.classList.add('load');
    bodyContainer.classList.remove('open-menu');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 1300);
}, timeout);

pageLinks.forEach(link => {
    link.addEventListener('click', () => {
        bodyContainer.classList.add('transition');
        pageTransition.classList.add('transition');
    })
});

(function () {
    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
})();

// -------- Cursor Follow -------- //

const cursor = document.querySelector("#cursorFollow");

function followCursor() {
    const cursorHeight = cursor.clientHeight / 2;
    const cursorWidth = cursor.clientWidth / 2;

    const y = event.pageY;
    const x = event.pageX;
    const scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    setTimeout ( () => {
      cursor.style.top = (y - cursorHeight) - scrollTop + 'px';
      cursor.style.left = (x - cursorWidth) - scrollLeft + 'px';
    } ,70);
}

window.addEventListener("mousemove", followCursor);

let cursourButtons = document.querySelectorAll('.cursour-button');

function enterCursour() {
    cursor.classList.add('active');
}

function exitCursour() {
    cursor.classList.remove('active');
}

cursourButtons.forEach(button => {
    button.addEventListener('mouseover', enterCursour);
    button.addEventListener('mouseout', exitCursour);
});


// -------- Footer -------- //

const footer = document.querySelector('footer');
const footerLogo = document.getElementById('footer-logo');
const footerEye = document.querySelector('.footer .circle');

const footerAnim = anime({
    targets: footerLogo,
    autoplay: false,
    translateY: [100, 0],
    easing: 'easeOutQuad',
});


function animateFooter() {
    let percent = Math.abs(footer.getBoundingClientRect().bottom - window.innerHeight) / footer.clientHeight;
    footerAnim.seek((1 -percent) * footerAnim.duration);

    if (percent < .4) footerEye.classList.add('active'); else footerEye.classList.remove('active')
}

window.addEventListener('scroll', animateFooter)