// -------- FullPage Specification -------- //

const header = document.querySelector('header');
const iarba = document.querySelector('#iarba');
const house = document.querySelector('#house');
const circleLeft = document.querySelector('#circle-left');
const circleRight = document.querySelector('#circle-right');
const logo = document.getElementById('logo');

const socialMenu = document.querySelector('.social-menu');

const page = new fullpage('#fullpage', {
    navigation: true,
    navigationPosition: 'left',
    navigationTooltips: ['ACASĂ', 'TIPURI', 'CONTACTE'],
    showActiveTooltip: true,
    licenseKey: 'gplv3-license',
    responsiveWidth: 1024,
    verticalCentered: false,
    onLeave: function(origin, destination, direction, trigger){
      if (destination.index == 2) {
        anime({
            targets: socialMenu,
            opacity: 0,
            easing: 'easeOutQuad',
            duration: 300,
            complete: () => {
                socialMenu.style.display = 'none';
            }
        });
    }

    if (origin.index == 2) {
        socialMenu.style.display = 'block';
        anime({
            targets: socialMenu,
            opacity: 1,
            easing: 'easeOutQuad',
            duration: 300,
        });
    }

        if (window.innerWidth <= 1024) return;

        if (origin.index == 0) {
            header.classList.add('alt');
            logo.src = '../images/MODULARE/logo alb.webp';
            iarba.classList.add('open');
            house.classList.add('open');
            navigationSpan.forEach(nav => nav.classList.add('white'));
            navigationText.forEach(nav => nav.classList.add('white'));

            circleLeft.style.left = '-10vw';
            circleLeft.style.bottom = '-25vh';

            circleRight.style.right = '-10vw';
            circleRight.style.top = '10vh';
        }

        if (destination.index == 0) {
            header.classList.remove('alt');
            logo.src = '../images/MODULARE/logo negru.webp';
            iarba.classList.remove('open');
            house.classList.remove('open');
            navigationSpan.forEach(nav => nav.classList.remove('white'));
            navigationText.forEach(nav => nav.classList.remove('white'));

            circleLeft.style.left = '-50vw';
            circleRight.style.right = '-50vw';
        }

        if (destination.index == 1) {
            showBuildings();
        }
	}
});

const navigationSpan = document.querySelectorAll('#fp-nav ul li a span');
const navigationText = document.querySelectorAll('#fp-nav ul li .fp-tooltip.fp-left');

// -------- Scroll Mobile -------- //

const serviceSection = document.querySelector('#type');

function scrollMobile() {
    if (window.innerWidth > 1023) return;

    if (serviceSection.getBoundingClientRect().top < 10) {
        circleLeft.style.left = '-150px';
        circleRight.style.right = '-150px';
        header.classList.add('mobile');
        logo.src = '../images/MODULARE/logo alb.webp';
    }
    else {
        circleLeft.style.left = '-350px';
        circleRight.style.right = '-350px';
        header.classList.remove('mobile');
        logo.src = '../images/MODULARE/logo negru.webp';
    }
} 

window.addEventListener('scroll', scrollMobile);

// -------- Buildings -------- //

const buildings = document.querySelectorAll('.building .number');

function showBuildings() {
    anime({
        targets: buildings,
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(150, {start: 300}),
        duration: 2000
    })
}

// -------- Dialog Controls -------- //

const dialog = document.querySelector('.dialog');
const mobileDialog = document.querySelector('.mobile');

const exitButtons = document.querySelectorAll('.close');
const moduleHeading = document.getElementById('heading');

const standart = document.getElementById('standart');
const dubla = document.getElementById('dubla');
const unghiulara = document.getElementById('unghiulara');
const extinsa = document.getElementById('extinsa');

let suprafata, inaltime, lungime;

const casaTitle = document.getElementById('casa-title');

const tipImg = document.getElementById('tip-img');

function dateCasa (suprafataNum, inaltimeNum, lungime1, lungime2, src) {
    countNumbers(suprafata, suprafataNum);
    countNumbers(inaltime, inaltimeNum);
    countNumbers(lungime[0], lungime1);
    countNumbers(lungime[1], lungime2);

    tipImg.src = src;
}

function countNumbers(target, num) {
    anime({
        targets: target,
        innerHTML: [0, num],
        round: 1,
        easing: 'easeOutSine',
        duration: 1000
    })
}

function closeDialog() {
    let temp = dialog;
    if (window.innerWidth < 1024) temp = mobileDialog;
    document.body.style.overflow = 'auto';

    moduleHeading.classList.remove('active');
    anime({
        targets: temp,
        opacity: 0,
        easing: 'easeOutQuad',
        duration: 500,
        complete: () => {
            temp.style.display = 'none';
        }
    })
}

function openDialog() {
    let temp = dialog;
    if (window.innerWidth < 1024) {
        temp = mobileDialog;
        document.body.style.overflow = 'hidden';
    }

    suprafata = temp.querySelector('.suprafata span');
    inaltime = temp.querySelector('.inaltime span');
    lungime = temp.querySelectorAll('.lungime span');

    moduleHeading.classList.add('active');
    temp.style.display = 'flex';

    anime({
        targets: temp,
        opacity: 1,
        duration: 500,
        easing: 'easeOutQuad',
    })
}

standart.addEventListener('click', () => {
    casaTitle.textContent = 'Casa Modulară Standart';
    openDialog();
    dateCasa(15, 2700, 6000, 2500 , '../images/MODULARE/TYPES/standart.webp');
});

dubla.addEventListener('click', () => {
    casaTitle.textContent = 'Casa Modulară Dublă';
    openDialog();
    dateCasa(30, 2700, 6000, 5000, '../images/MODULARE/TYPES/dubla.webp');
});

unghiulara.addEventListener('click', () => {
    casaTitle.textContent = 'Casa Modulară Unghiulară';
    openDialog();
    dateCasa(30, 2700, 6000, 8500, '../images/MODULARE/TYPES/unghiulara.webp');
});

extinsa.addEventListener('click', () => {
    casaTitle.textContent = 'Casa Modulară Extinsă';
    openDialog();
    dateCasa(45, 2700, 6000, 11000, '../images/MODULARE/TYPES/extinsa.webp');
});

exitButtons.forEach(button => {
    button.addEventListener('click', closeDialog);
});


// -------- Menu -------- //

const lang = document.getElementById('lang');
function openMenu() {
  menu.classList.toggle('active');

  lineOne.classList.toggle('line-cross');
  lineTwo.classList.toggle('line-fade-out');
  lineThree.classList.toggle('line-cross');

  if (menu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';

    logo.src = '../images/MODULARE/logo alb.webp';
    header.classList.toggle('menu');
      setTimeout(() => {
          anime({
              targets: menuLinks,
              translateX: [100, 0],
              duration: 1500,
              opacity: 1,
              delay: anime.stagger(100)
          });
      }, 400);
      lang.style.display = 'block';
        anime({
            targets: lang,
            opacity: 1,
            delay: 400
        });
  } else {
    anime({
        targets: lang,
        opacity: 0,
        duration: 200,
        complete: () => {
            lang.style.display = 'none';
        }
    });
    
    document.body.style.overflow = 'auto';

      closeSection();

      if (!header.classList.contains('mobile') && !header.classList.contains('alt')) logo.src = '../images/MODULARE/logo negru.webp';
      setTimeout(() => { header.classList.toggle('menu'); }, 500)

      anime({
          targets: menuLinks,
          translateX: 100,
          duration: 1500,
          opacity: 0,
          delay: anime.stagger(100)
      });
  }
}

function closeSection() {
    const link = document.querySelector('.unfold');
    const arrow = link.querySelector('img');
    const sections = link.nextElementSibling;
    const items = sections.querySelectorAll('a');

    arrow.classList.remove('open');

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

menuButton.addEventListener('click', openMenu);

const sectionLinks =  document.querySelectorAll('.sections a');

sectionLinks.forEach(link => {
    link.addEventListener("click", () => {
        openMenu();
    })
});

// -------- Loading -------- //
const loadingScreens = document.querySelector('.loading');
if (window.innerWidth >= 1024) {
    document.body.style.overflow = 'hidden';
    fullpage_api.setAllowScrolling(false);
  }

function stopLoading() {
    setTimeout(() => {
        anime({
            targets: loadingScreens,
            opacity: 0,
            complete: () => {
                fullpage_api.setAllowScrolling(true);
                document.body.style.overflow = 'auto';
                loadingScreens.style.display = 'none';
            },
            easing: 'easeInOutQuad',
            duration: 800
        });
    }, 2800);
}

window.addEventListener('load', stopLoading);