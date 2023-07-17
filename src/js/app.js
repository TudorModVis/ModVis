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
        logo.classList.remove('active');
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

        setTimeout(() => {
            socialLinks.classList.add('active');
            languages.classList.add('active');
        }, 1400);
        
    } else {
        languages.classList.remove('active');
        cover.classList.remove('show');

        setTimeout(() => {
            cover.classList.remove('active');
            logo.classList.add('active');
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
                lines[1].style.transition = '0.3s';
            }
        });
    }
}

menuClicker.addEventListener('click', menuClick);