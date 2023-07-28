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
    navigationTooltips: ['ГЛАВНАЯ', 'УСЛУГИ', 'ВОЗМОЖНОСТИ', 'ТИПЫ', 'ПРОЕКТЫ'],
    showActiveTooltip: true,
    licenseKey: 'gplv3-license',
    responsiveWidth: 1024,
    verticalCentered: false,
    onLeave: function(origin, destination, direction, trigger){
      if (destination.index == 4) {
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

    if (origin.index == 4) {
        socialMenu.style.display = 'block';
        anime({
            targets: socialMenu,
            opacity: 1,
            easing: 'easeOutQuad',
            duration: 300,
        });
    }
    
    if (destination.index == 3) {
        prindereVizibila.classList.add('active');
        deschidePrindereAscunsa(30, 200, 0.3, 0.7, 8.00, 14.93, 0.48, 0.2, '../images/SANDWICH/TYPES/prindere vizibila.webp');
        if (last != prindereVizibila) {
            last.classList.remove('active');
        };
        last = prindereVizibila;
    }

        if (window.innerWidth <= 1024) return;

        if (origin.index == 0) {
            header.classList.add('alt');
            logo.src = '../images/SANDWICH/logo-alb.webp';
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
            logo.src = '../images/SANDWICH/logo-negru.webp';
            iarba.classList.remove('open');
            house.classList.remove('open');
            navigationSpan.forEach(nav => nav.classList.remove('white'));
            navigationText.forEach(nav => nav.classList.remove('white'));

            circleLeft.style.left = '-50vw';
            circleRight.style.right = '-50vw';
        }

        if (destination.index == 2) {
            showBuildings();
        }
	}
});

const navigationSpan = document.querySelectorAll('#fp-nav ul li a span');
const navigationText = document.querySelectorAll('#fp-nav ul li .fp-tooltip.fp-left');

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

// -------- Scroll Mobile -------- //

const serviceSection = document.querySelector('#colab');

function scrollMobile() {
    if (window.innerWidth > 1023) return;

    if (serviceSection.getBoundingClientRect().top < 10) {
        circleLeft.style.left = '-150px';
        circleRight.style.right = '-150px';
        header.classList.add('mobile');
        logo.src = '../images/SANDWICH/logo-alb.webp';
    }
    else {
        circleLeft.style.left = '-350px';
        circleRight.style.right = '-350px';
        header.classList.remove('mobile');
        logo.src = '../images/SANDWICH/logo-negru.webp';
    }
} 

window.addEventListener('scroll', scrollMobile);

// -------- Menu -------- //
const lang = document.getElementById('lang');

function openMenu() {
    menu.classList.toggle('active');
  
    lineOne.classList.toggle('line-cross');
    lineTwo.classList.toggle('line-fade-out');
    lineThree.classList.toggle('line-cross');
  
    if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';

      logo.src = '../images/SANDWICH/logo-alb.webp';
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
  
        if (!header.classList.contains('mobile') && !header.classList.contains('alt')) logo.src = '../images/SANDWICH/logo-negru.webp';
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
  })


// -------- Sandwich types -------- //

const prindereAscunsa = document.getElementById('prindere-ascunsa');
const prindereVizibila = document.getElementById('prindere-vizibila');
const treiCute = document.getElementById('trei-cute');
const cinciCute = document.getElementById('cinci-cute');

const grosime = document.querySelectorAll('#grosime span');
const grosimeTabla = document.querySelectorAll('#grosime-tabla span');
const greutate = document.querySelectorAll('#greutate span');
const transfer = document.querySelectorAll('#transfer span');

const tipImg = document.getElementById('tip-img');

function deschidePrindereAscunsa(grosime1, grosime2, grosimeTabla1, grosimeTabla2, greutate1, greutate2, transfer1, transfer2, src) {
    countNumbers(grosime[0], grosime1, 1);
    countNumbers(grosime[1], grosime2, 1);
    countNumbers(grosimeTabla[0], grosimeTabla1, 10);
    countNumbers(grosimeTabla[1], grosimeTabla2, 10);
    countNumbers(greutate[0], greutate1, 100);
    countNumbers(greutate[1], greutate2, 100);
    countNumbers(transfer[0], transfer1, 100);
    countNumbers(transfer[1], transfer2, 100);

    tipImg.src = src;
}

function countNumbers(target, num, round) {
    anime({
        targets: target,
        innerHTML: [0, num],
        round: round,
        easing: 'easeOutSine',
        duration: 1000
    })
}

let last = prindereVizibila;

prindereAscunsa.addEventListener('click', () => {
    if (last == prindereAscunsa) return;
    prindereAscunsa.classList.add('active');
    deschidePrindereAscunsa(30, 200, 0.3, 0.7, 9.31, 15.79, 0.75, 0.13, '../images/SANDWICH/TYPES/prindere ascunsa.webp');
    last.classList.remove('active');
    last = prindereAscunsa;
});

prindereVizibila.addEventListener('click', () => {
    if (last == prindereVizibila) return;
    prindereVizibila.classList.add('active');
    deschidePrindereAscunsa(30, 200, 0.3, 0.7, 8.00, 14.93, 0.48, 0.2, '../images/SANDWICH/TYPES/prindere vizibila.webp');
    last.classList.remove('active');
    last = prindereVizibila;
});

treiCute.addEventListener('click', () => {
    if (last == treiCute) return;
    treiCute.classList.add('active');
    deschidePrindereAscunsa(30, 150, 0.4, 0.7, 9.83, 11.49, 0.59, 0.2, '../images/SANDWICH/TYPES/trei cute.webp');
    last.classList.remove('active');
    last = treiCute;
});

cinciCute.addEventListener('click', () => {
    if (last == cinciCute) return;
    cinciCute.classList.add('active');
    deschidePrindereAscunsa(30, 150, 0.4, 0.7, 9.85, 15.46, 0.73, 0.16, '../images/SANDWICH/TYPES/cinci cute.webp');
    last.classList.remove('active');
    last = cinciCute;
});


// -------- Panel Carousell -------- //

const panelContainer = document.querySelector('#colab .carousell');
const mobilePanelContainer = document.querySelector('#colab .mobile');
const panelImages = document.querySelectorAll('#colab .image');
let panelNavCircles = document.querySelectorAll('.nav-circle');    

let panelCircles = document.querySelectorAll('#colab .circle');

let panelIndex = 0, lastCircle = panelCircles[0], lastCircleIndex = 0;

function moveRight() {
    let tempContainer;
    if (window.innerWidth <= 1024) {
        tempContainer = mobilePanelContainer;
    } else {
        tempContainer = panelContainer;
    }

    let widthPanel = tempContainer.querySelector('.first');
    let panels = tempContainer.querySelectorAll('.panel');

    var style = widthPanel.currentStyle || window.getComputedStyle(widthPanel);
    const width = widthPanel.clientWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight) + parseFloat(style.borderLeft) + parseFloat(style.borderRight);
    panelIndex++;

    if (panelIndex >= panels.length) {
        panelIndex--;
        return;
    }
    panelCircles[panelIndex].classList.add('active');
    if (lastCircle != panelCircles[panelIndex]) {
        lastCircle.classList.remove('active');
        lastCircle = panelCircles[panelIndex]; 
    }

    tempContainer.style.transform = 'translateX(' + panelIndex * -width + 'px)';

    if (lastCircleIndex < panelIndex) {
        enterImage(panelImages[panelIndex].querySelectorAll('img'), 250);
        exitImage(panelImages[lastCircleIndex].querySelectorAll('img'), -250);
    } else {
        enterImage(panelImages[panelIndex].querySelectorAll('img'), -250);
        exitImage(panelImages[lastCircleIndex].querySelectorAll('img'), 250);
    }

    lastCircleIndex = panelIndex;
}

function moveLeft() {
    let tempContainer;
    if (window.innerWidth <= 1024) {
        tempContainer = mobilePanelContainer;
    } else {
        tempContainer = panelContainer;
    }

    let widthPanel = tempContainer.querySelector('.first');

    var style = widthPanel.currentStyle || window.getComputedStyle(widthPanel);
    const width = widthPanel.clientWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight) + parseFloat(style.borderLeft) + parseFloat(style.borderRight);
    panelIndex--;

    if (panelIndex < 0) {
        panelIndex = 0;
        return;
    }

    panelCircles[panelIndex].classList.add('active');
    if (lastCircle != panelCircles[panelIndex]) {
        lastCircle.classList.remove('active');
        lastCircle = panelCircles[panelIndex]; 
    }

    tempContainer.style.transform = 'translateX(' + panelIndex * -width + 'px)';

    if (lastCircleIndex < panelIndex) {
        enterImage(panelImages[panelIndex].querySelectorAll('img'), 250);
        exitImage(panelImages[lastCircleIndex].querySelectorAll('img'), -250);
    } else {
        enterImage(panelImages[panelIndex].querySelectorAll('img'), -250);
        exitImage(panelImages[lastCircleIndex].querySelectorAll('img'), 250);
    }

    lastCircleIndex = panelIndex;
}

const leftArrows = document.querySelectorAll('#colab .arrow.left');
const rightArrows = document.querySelectorAll('#colab .arrow.right');

leftArrows.forEach(arrow => {
    arrow.addEventListener('click', moveLeft);
});

rightArrows.forEach(arrow => {
    arrow.addEventListener('click', moveRight);
})

function cirlceMove(event) {
    event.currentTarget.classList.add('active');
    if (lastCircle != event.currentTarget) {
        lastCircle.classList.remove('active');
        lastCircle = event.currentTarget; 
    }

    let tempContainer;
    if (window.innerWidth <= 1024) {
        tempContainer = mobilePanelContainer;
    } else {
        tempContainer = panelContainer;
    }

    let widthPanel = tempContainer.querySelector('.first');

    var style = widthPanel.currentStyle || window.getComputedStyle(widthPanel);
    const width = widthPanel.clientWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight) + parseFloat(style.borderLeft) + parseFloat(style.borderRight);

    for (let i = 0; i < panelCircles.length; i++) {
        if (panelCircles[i].isEqualNode(event.currentTarget)) {
            panelIndex = i;

            tempContainer.style.transform = 'translateX(' + panelIndex * -width + 'px)';
            if (lastCircleIndex < panelIndex) {
                enterImage(panelImages[i].querySelectorAll('img'), 250);
                exitImage(panelImages[lastCircleIndex].querySelectorAll('img'), -250);
            } else {
                enterImage(panelImages[i].querySelectorAll('img'), -250);
                exitImage(panelImages[lastCircleIndex].querySelectorAll('img'), 250);
            }
            lastCircleIndex = panelIndex;
            return;
        }
    }
}

function cirlceNavMove(event) {
    let tempContainer;
    if (window.innerWidth <= 1024) {
        tempContainer = mobilePanelContainer;
    } else {
        tempContainer = panelContainer;
    }

    let panels = tempContainer.querySelectorAll('.panel');
    panelNavCircles = panels[panelIndex].querySelectorAll('.nav-circle');
    let widthPanel = tempContainer.querySelector('.first');

    var style = widthPanel.currentStyle || window.getComputedStyle(widthPanel);
    const width = widthPanel.clientWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight) + parseFloat(style.borderLeft) + parseFloat(style.borderRight);
    for (let i = 0; i < panelNavCircles.length; i++) {
        if (panelNavCircles[i].isEqualNode(event.target)) {
            panelIndex = i;
            tempContainer.style.transform = 'translateX(' + panelIndex * -width + 'px)';

            panelCircles[panelIndex].classList.add('active');
            if (lastCircle != panelCircles[panelIndex]) {
                lastCircle.classList.remove('active');
                lastCircle = panelCircles[panelIndex]; 
            }

            if (lastCircleIndex < panelIndex) {
                enterImage(panelImages[panelIndex].querySelectorAll('img'), 250);
                exitImage(panelImages[lastCircleIndex].querySelectorAll('img'), -250);
            } else {
                enterImage(panelImages[panelIndex].querySelectorAll('img'), -250);
                exitImage(panelImages[lastCircleIndex].querySelectorAll('img'), 250);
            }
            lastCircleIndex = panelIndex;
            return;
        }
    }
}

panelCircles.forEach (circle => {
    circle.addEventListener('click', cirlceMove);
});

panelNavCircles.forEach (circle => {
    circle.addEventListener('click', cirlceNavMove);
});

let panelStartX = 0, panelDist = 0;

function touchStart(e) {
    let touchobj = e.changedTouches[0];
    panelStartX = parseInt(touchobj.clientX);
}

function touchMove(e) {
    let touchobj = e.changedTouches[0];
    panelDist = parseInt(touchobj.clientX) - panelStartX;

}

function touchEnd() {
    if (panelDist > 50) {
        moveLeft();
     } else if (panelDist < -50) {
        moveRight();
     }
     panelDist = 0;
}

const mobilePanels = mobilePanelContainer.querySelectorAll('.panel');

mobilePanels.forEach (panel => {
    panel.addEventListener('touchstart', touchStart);
    panel.addEventListener('touchmove', touchMove);
    panel.addEventListener('touchend', touchEnd);
});

let dragStartX = 0;

function dragStart(event) {
    dragStartX = parseInt(event.clientX);
}

function dragEnd(event) {
    let distance = parseInt(event.clientX - dragStartX);

    if (distance > 50) {
        moveLeft();
     } else if (distance < -50) {
        moveRight();
     }
}

const pcPanels = panelContainer.querySelectorAll('.panel');

pcPanels.forEach(panel => {
    panel.addEventListener('mousedown', dragStart);
    panel.addEventListener('mouseup', dragEnd);
})


function enterImage(target, x) {
    anime({
        targets: target,
        opacity: [0, 1],
        translateX: [x, 0],
        delay: anime.stagger(100, {direction: 'reverse'}),
        easing: 'easeOutQuad',
        duration: 700,
    });
}

function exitImage(target, x) {
    anime({
        targets: target,
        opacity: [1, 0],
        translateX: [0, x],
        delay: anime.stagger(100, {direction: 'reverse'}),
        easing: 'easeOutQuad',
        duration: 700
    });
}

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